import { beforeEach, describe, expect, it } from "vitest";
import { EngagementStore } from "@/lib/engagement-store";
import { GET as getTeamsRoute, POST as postTeamsRoute } from "@/app/api/gameplay/teams/route";
import { GET as getLeaderboardRoute, POST as postLeaderboardRoute } from "@/app/api/gameplay/leaderboard/route";
import { POST as postRebuildRoute } from "@/app/api/gameplay/leaderboard/rebuild/route";
import { NextRequest } from "next/server";
import { SEASON_1_ID } from "@defi-trail/shared";

function createMockRequest(
  url: string,
  options: { method?: string; body?: any } = {},
): NextRequest {
  const { method = "GET", body } = options;
  return new NextRequest(new URL(url, "http://localhost:3000").toString(), {
    method,
    headers: { "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

describe("GE-09: Teams & Leaderboard Integration Tests", () => {
  const player1 = "0x1111111111111111111111111111111111111111";
  const player2 = "0x2222222222222222222222222222222222222222";
  const player3 = "0x3333333333333333333333333333333333333333";

  beforeEach(() => {
    EngagementStore.resetInstance();
  });

  describe("1. Team Policy & Join/Switch API (/api/gameplay/teams)", () => {
    it("fetches active season teams, community goal, and empty membership for new player", async () => {
      const req = createMockRequest(`/api/gameplay/teams?seasonId=${SEASON_1_ID}&player=${player1}`);
      const res = await getTeamsRoute(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.teams).toHaveLength(4);
      expect(data.communityGoal.targetPoints).toBe(10000);
      expect(data.communityGoal.currentPoints).toBe(0);
      expect(data.membership).toBeNull();
    });

    it("allows initial team join with targetTeamId", async () => {
      const req = createMockRequest("/api/gameplay/teams", {
        method: "POST",
        body: {
          seasonId: SEASON_1_ID,
          player: player1,
          targetTeamId: "team-avax-rush",
        },
      });

      const res = await postTeamsRoute(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.isSwitch).toBe(false);
      expect(data.membership.teamId).toBe("team-avax-rush");
      expect(data.membership.switchCount).toBe(0);
    });

    it("allows team join via valid invite code", async () => {
      const req = createMockRequest("/api/gameplay/teams", {
        method: "POST",
        body: {
          seasonId: SEASON_1_ID,
          player: player2,
          inviteCode: "PIONEERS",
        },
      });

      const res = await postTeamsRoute(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.membership.teamId).toBe("team-subnet-pioneers");
    });

    it("rejects invalid invite code with 400", async () => {
      const req = createMockRequest("/api/gameplay/teams", {
        method: "POST",
        body: {
          seasonId: SEASON_1_ID,
          player: player3,
          inviteCode: "INVALID_CODE_999",
        },
      });

      const res = await postTeamsRoute(req);
      expect(res.status).toBe(400);

      const data = await res.json();
      expect(data.error.code).toBe("INVALID_INVITE_CODE");
    });

    it("rejects joining the team player is already in with 409 ALREADY_IN_TEAM", async () => {
      // 1st join
      await postTeamsRoute(
        createMockRequest("/api/gameplay/teams", {
          method: "POST",
          body: {
            seasonId: SEASON_1_ID,
            player: player1,
            targetTeamId: "team-avax-rush",
          },
        }),
      );

      // 2nd join same team
      const res = await postTeamsRoute(
        createMockRequest("/api/gameplay/teams", {
          method: "POST",
          body: {
            seasonId: SEASON_1_ID,
            player: player1,
            targetTeamId: "team-avax-rush",
          },
        }),
      );

      expect(res.status).toBe(409);
      const data = await res.json();
      expect(data.error.code).toBe("ALREADY_IN_TEAM");
    });

    it("allows 1 team switch, but rejects 2nd switch with 403 SWITCH_LIMIT_EXCEEDED", async () => {
      // 1. Initial join -> team-avax-rush
      await postTeamsRoute(
        createMockRequest("/api/gameplay/teams", {
          method: "POST",
          body: {
            seasonId: SEASON_1_ID,
            player: player1,
            targetTeamId: "team-avax-rush",
          },
        }),
      );

      // 2. First switch -> team-subnet-pioneers (ALLOWED)
      const switch1Res = await postTeamsRoute(
        createMockRequest("/api/gameplay/teams", {
          method: "POST",
          body: {
            seasonId: SEASON_1_ID,
            player: player1,
            targetTeamId: "team-subnet-pioneers",
          },
        }),
      );
      expect(switch1Res.status).toBe(200);
      const switch1Data = await switch1Res.json();
      expect(switch1Data.isSwitch).toBe(true);
      expect(switch1Data.membership.switchCount).toBe(1);

      // 3. Second switch -> team-blizzard-guardians (FORBIDDEN)
      const switch2Res = await postTeamsRoute(
        createMockRequest("/api/gameplay/teams", {
          method: "POST",
          body: {
            seasonId: SEASON_1_ID,
            player: player1,
            targetTeamId: "team-blizzard-guardians",
          },
        }),
      );
      expect(switch2Res.status).toBe(403);
      const switch2Data = await switch2Res.json();
      expect(switch2Data.error.code).toBe("SWITCH_LIMIT_EXCEEDED");
    });
  });

  describe("2. Idempotency, Retries & Out-of-Order Evidence Handling", () => {
    beforeEach(async () => {
      // Join player1 to team-avax-rush
      await postTeamsRoute(
        createMockRequest("/api/gameplay/teams", {
          method: "POST",
          body: {
            seasonId: SEASON_1_ID,
            player: player1,
            targetTeamId: "team-avax-rush",
          },
        }),
      );
    });

    it("5x replay of the same evidence event awards points exactly once", async () => {
      const eventPayload = {
        eventId: "evt_idempotent_1",
        eventType: "CHEST_CONFIRMED",
        player: player1,
        seasonId: SEASON_1_ID,
        trailId: "today-campus-trail",
        checkpointId: "campus-library",
        requestId: "0xreq_unique_100",
        occurredAt: new Date().toISOString(),
        mode: "GPS",
      };

      // 1st request -> success, +50 pts
      const firstRes = await postLeaderboardRoute(
        createMockRequest("/api/gameplay/leaderboard", {
          method: "POST",
          body: { event: eventPayload },
        }),
      );
      expect(firstRes.status).toBe(200);
      const firstData = await firstRes.json();
      expect(firstData.applied).toBe(true);
      expect(firstData.pointsAwarded).toBe(50);
      expect(firstData.communityTotal).toBe(50);

      // Replays 2 through 5 -> 409 DUPLICATE_EVENT, 0 points
      for (let i = 2; i <= 5; i++) {
        const replayRes = await postLeaderboardRoute(
          createMockRequest("/api/gameplay/leaderboard", {
            method: "POST",
            body: { event: eventPayload },
          }),
        );
        expect(replayRes.status).toBe(409);
        const replayData = await replayRes.json();
        expect(replayData.error.code).toBe("DUPLICATE_EVENT");
      }

      // Check leaderboard state: still exactly 50 points
      const lbRes = await getLeaderboardRoute(
        createMockRequest(`/api/gameplay/leaderboard?seasonId=${SEASON_1_ID}`),
      );
      const lbData = await lbRes.json();
      const rushTeam = lbData.leaderboard.teams.find((t: any) => t.teamId === "team-avax-rush");
      expect(rushTeam.score).toBe(50);
      expect(lbData.leaderboard.communityGoal.currentPoints).toBe(50);
    });

    it("handles out-of-order checkpoint confirmations correctly", async () => {
      const cp2 = {
        eventId: "evt_cp2",
        eventType: "CHEST_CONFIRMED",
        player: player1,
        seasonId: SEASON_1_ID,
        checkpointId: "cp_2",
        requestId: "0xreq_cp2",
        occurredAt: "2026-11-07T10:05:00.000Z",
        mode: "GPS",
      };
      const cp1 = {
        eventId: "evt_cp1",
        eventType: "CHEST_CONFIRMED",
        player: player1,
        seasonId: SEASON_1_ID,
        checkpointId: "cp_1",
        requestId: "0xreq_cp1",
        occurredAt: "2026-11-07T10:00:00.000Z",
        mode: "GPS",
      };

      await postLeaderboardRoute(
        createMockRequest("/api/gameplay/leaderboard", {
          method: "POST",
          body: { event: cp2 },
        }),
      );
      await postLeaderboardRoute(
        createMockRequest("/api/gameplay/leaderboard", {
          method: "POST",
          body: { event: cp1 },
        }),
      );

      const lbRes = await getLeaderboardRoute(
        createMockRequest(`/api/gameplay/leaderboard?seasonId=${SEASON_1_ID}`),
      );
      const lbData = await lbRes.json();
      const rushTeam = lbData.leaderboard.teams.find((t: any) => t.teamId === "team-avax-rush");
      expect(rushTeam.score).toBe(100);
      expect(rushTeam.checkpointCount).toBe(2);
    });
  });

  describe("3. Demo Mode Filtering", () => {
    beforeEach(async () => {
      await postTeamsRoute(
        createMockRequest("/api/gameplay/teams", {
          method: "POST",
          body: {
            seasonId: SEASON_1_ID,
            player: player1,
            targetTeamId: "team-avax-rush",
          },
        }),
      );
    });

    it("excludes DEMO events from the competitive leaderboard by default", async () => {
      const demoEvent = {
        eventId: "evt_demo_test",
        eventType: "CHEST_CONFIRMED",
        player: player1,
        seasonId: SEASON_1_ID,
        requestId: "0xreq_demo_1",
        occurredAt: new Date().toISOString(),
        mode: "DEMO",
      };

      // Sending DEMO event to store
      const store = EngagementStore.getInstance();
      const res = store.recordEvidenceAndApplyScore(demoEvent as any);
      expect(res.applied).toBe(true);

      // Competitive leaderboard query: DEMO points must NOT appear
      const compRes = await getLeaderboardRoute(
        createMockRequest(`/api/gameplay/leaderboard?seasonId=${SEASON_1_ID}&includeDemo=false`),
      );
      const compData = await compRes.json();
      const rushComp = compData.leaderboard.teams.find((t: any) => t.teamId === "team-avax-rush");
      expect(rushComp.score).toBe(0);
      expect(compData.leaderboard.communityGoal.currentPoints).toBe(0);

      // Demo leaderboard query: DEMO points ARE counted
      const demoRes = await getLeaderboardRoute(
        createMockRequest(`/api/gameplay/leaderboard?seasonId=${SEASON_1_ID}&includeDemo=true`),
      );
      const demoData = await demoRes.json();
      const rushDemo = demoData.leaderboard.teams.find((t: any) => t.teamId === "team-avax-rush");
      expect(rushDemo.score).toBe(50);
      expect(demoData.leaderboard.communityGoal.currentPoints).toBe(50);
    });
  });

  describe("4. Concurrent Reducer & Rebuild Parity", () => {
    it("handles concurrent applications across multiple teams safely and guarantees rebuild parity", async () => {
      // 1. Join players to different teams
      await postTeamsRoute(
        createMockRequest("/api/gameplay/teams", {
          method: "POST",
          body: { seasonId: SEASON_1_ID, player: player1, targetTeamId: "team-avax-rush" },
        }),
      );
      await postTeamsRoute(
        createMockRequest("/api/gameplay/teams", {
          method: "POST",
          body: { seasonId: SEASON_1_ID, player: player2, targetTeamId: "team-subnet-pioneers" },
        }),
      );

      // 2. Dispatch 10 concurrent events for player1 and 10 for player2
      const promises: Promise<any>[] = [];
      for (let i = 0; i < 10; i++) {
        promises.push(
          postLeaderboardRoute(
            createMockRequest("/api/gameplay/leaderboard", {
              method: "POST",
              body: {
                event: {
                  eventId: `evt_conc_p1_${i}`,
                  eventType: "CHEST_CONFIRMED",
                  player: player1,
                  seasonId: SEASON_1_ID,
                  requestId: `0xreq_conc_p1_${i}`,
                  occurredAt: new Date().toISOString(),
                  mode: "GPS",
                },
              },
            }),
          ),
        );
        promises.push(
          postLeaderboardRoute(
            createMockRequest("/api/gameplay/leaderboard", {
              method: "POST",
              body: {
                event: {
                  eventId: `evt_conc_p2_${i}`,
                  eventType: "CHEST_CONFIRMED",
                  player: player2,
                  seasonId: SEASON_1_ID,
                  requestId: `0xreq_conc_p2_${i}`,
                  occurredAt: new Date().toISOString(),
                  mode: "GPS",
                },
              },
            }),
          ),
        );
      }

      await Promise.all(promises);

      // Verify aggregate scores
      const lbBefore = await (
        await getLeaderboardRoute(
          createMockRequest(`/api/gameplay/leaderboard?seasonId=${SEASON_1_ID}`),
        )
      ).json();

      const rushBefore = lbBefore.leaderboard.teams.find((t: any) => t.teamId === "team-avax-rush");
      const subnetBefore = lbBefore.leaderboard.teams.find((t: any) => t.teamId === "team-subnet-pioneers");
      expect(rushBefore.score).toBe(500); // 10 * 50
      expect(subnetBefore.score).toBe(500); // 10 * 50
      expect(lbBefore.leaderboard.communityGoal.currentPoints).toBe(1000);

      // 3. Trigger rebuild command via API
      const rebuildRes = await postRebuildRoute(
        createMockRequest("/api/gameplay/leaderboard/rebuild", {
          method: "POST",
          body: { seasonId: SEASON_1_ID },
        }),
      );
      expect(rebuildRes.status).toBe(200);

      const rebuildData = await rebuildRes.json();
      expect(rebuildData.result.eventsProcessed).toBe(20);
      expect(rebuildData.result.eventsSkipped).toBe(0);
      expect(rebuildData.result.communityTotal).toBe(1000);

      // Verify state after rebuild is 100% identical
      const lbAfter = await (
        await getLeaderboardRoute(
          createMockRequest(`/api/gameplay/leaderboard?seasonId=${SEASON_1_ID}`),
        )
      ).json();
      const rushAfter = lbAfter.leaderboard.teams.find((t: any) => t.teamId === "team-avax-rush");
      const subnetAfter = lbAfter.leaderboard.teams.find((t: any) => t.teamId === "team-subnet-pioneers");

      expect(rushAfter.score).toBe(rushBefore.score);
      expect(subnetAfter.score).toBe(subnetBefore.score);
      expect(lbAfter.leaderboard.communityGoal.currentPoints).toBe(
        lbBefore.leaderboard.communityGoal.currentPoints,
      );
    });
  });

  describe("5. Unauthorized Mutation & Non-Pay-to-Win Invariant", () => {
    it("rejects unauthorized arbitrary score mutation attempts", async () => {
      // Attempting to post an unsupported or malicious event type
      const maliciousReq = createMockRequest("/api/gameplay/leaderboard", {
        method: "POST",
        body: {
          event: {
            eventId: "hack_1",
            eventType: "ARBITRARY_ADMIN_POINT_INJECTION",
            player: player1,
            seasonId: SEASON_1_ID,
            occurredAt: new Date().toISOString(),
            mode: "GPS",
          },
        },
      });

      const res = await postLeaderboardRoute(maliciousReq);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error.code).toBe("UNSUPPORTED_EVENT_TYPE");
    });

    it("verifies leaderboard scoring guide explicitly declares non-pay-to-win boundary", async () => {
      const res = await getLeaderboardRoute(
        createMockRequest(`/api/gameplay/leaderboard?seasonId=${SEASON_1_ID}`),
      );
      const data = await res.json();

      expect(data.scoringGuide.checkpointConfirmed).toBe(50);
      expect(data.scoringGuide.trailCompleted).toBe(200);
      expect(data.scoringGuide.questCompleted).toBe(150);
      expect(data.scoringGuide.sponsorRedemption).toBe(100);
      expect(data.scoringGuide.fairPlayNotice).toContain("YieldVault");
      expect(data.scoringGuide.fairPlayNotice).toContain("lending yield");
    });
  });
});

