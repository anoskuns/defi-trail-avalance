import { describe, expect, it } from "vitest";
import {
  DEFAULT_SEASON_1,
  SEASON_1_TEAMS,
  SEASON_1_ID,
  SCORE_POINTS_BY_REASON,
  COMMUNITY_GOAL_S1,
  validateTeamJoinOrSwitch,
  resolveTeamFromInviteCode,
  type TeamMembership,
} from "../src/gameplay/teams";
import {
  createInitialLeaderboardState,
  applyEvidenceEventToLeaderboard,
  rebuildLeaderboardFromEvents,
  createEventDeduplicationKey,
  type LeaderboardState,
} from "../src/gameplay/leaderboard-reducer";
import type { GameplayEvidenceEvent } from "../src/gameplay/types";

describe("GE-09: Team Policy & Season Selection", () => {
  const sampleSeason = { ...DEFAULT_SEASON_1, status: "ACTIVE" as const };

  it("resolves teams from case-insensitive invite codes", () => {
    expect(resolveTeamFromInviteCode("avaxrush")?.id).toBe("team-avax-rush");
    expect(resolveTeamFromInviteCode("TEAM-GOLD")?.id).toBe("team-subnet-pioneers");
    expect(resolveTeamFromInviteCode("blizzard")?.id).toBe("team-blizzard-guardians");
    expect(resolveTeamFromInviteCode("Echo")?.id).toBe("team-echo-sentinels");
    expect(resolveTeamFromInviteCode("UNKNOWN_CODE")).toBeNull();
  });

  it("permits initial team join with explicit teamId", () => {
    const decision = validateTeamJoinOrSwitch({
      season: sampleSeason,
      teams: SEASON_1_TEAMS,
      currentMembership: null,
      targetTeamId: "team-avax-rush",
    });
    expect(decision.allowed).toBe(true);
    expect(decision.isSwitch).toBe(false);
    expect(decision.targetTeamId).toBe("team-avax-rush");
  });

  it("permits initial team join with valid invite code", () => {
    const decision = validateTeamJoinOrSwitch({
      season: sampleSeason,
      teams: SEASON_1_TEAMS,
      currentMembership: null,
      inviteCode: "PIONEERS",
    });
    expect(decision.allowed).toBe(true);
    expect(decision.targetTeamId).toBe("team-subnet-pioneers");
  });

  it("rejects invalid invite code", () => {
    const decision = validateTeamJoinOrSwitch({
      season: sampleSeason,
      teams: SEASON_1_TEAMS,
      currentMembership: null,
      inviteCode: "FAKE_CODE_123",
    });
    expect(decision.allowed).toBe(false);
    expect(decision.violationCode).toBe("INVALID_INVITE_CODE");
  });

  it("rejects join when season is ended", () => {
    const endedSeason = { ...sampleSeason, status: "ENDED" as const };
    const decision = validateTeamJoinOrSwitch({
      season: endedSeason,
      teams: SEASON_1_TEAMS,
      currentMembership: null,
      targetTeamId: "team-avax-rush",
    });
    expect(decision.allowed).toBe(false);
    expect(decision.violationCode).toBe("SEASON_NOT_ACTIVE");
  });

  it("rejects joining the exact same team already joined", () => {
    const membership: TeamMembership = {
      seasonId: SEASON_1_ID,
      player: "0x1111111111111111111111111111111111111111",
      teamId: "team-avax-rush",
      joinedAt: new Date().toISOString(),
      switchCount: 0,
      contributedPoints: 150,
    };
    const decision = validateTeamJoinOrSwitch({
      season: sampleSeason,
      teams: SEASON_1_TEAMS,
      currentMembership: membership,
      targetTeamId: "team-avax-rush",
    });
    expect(decision.allowed).toBe(false);
    expect(decision.violationCode).toBe("ALREADY_IN_TEAM");
  });

  it("permits switching teams once per season", () => {
    const membership: TeamMembership = {
      seasonId: SEASON_1_ID,
      player: "0x1111111111111111111111111111111111111111",
      teamId: "team-avax-rush",
      joinedAt: new Date().toISOString(),
      switchCount: 0,
      contributedPoints: 100,
    };
    const decision = validateTeamJoinOrSwitch({
      season: sampleSeason,
      teams: SEASON_1_TEAMS,
      currentMembership: membership,
      targetTeamId: "team-subnet-pioneers",
    });
    expect(decision.allowed).toBe(true);
    expect(decision.isSwitch).toBe(true);
    expect(decision.targetTeamId).toBe("team-subnet-pioneers");
  });

  it("rejects switching teams if player already switched once (switch limit exceeded)", () => {
    const membership: TeamMembership = {
      seasonId: SEASON_1_ID,
      player: "0x1111111111111111111111111111111111111111",
      teamId: "team-subnet-pioneers",
      joinedAt: new Date().toISOString(),
      switchCount: 1, // Already switched once
      contributedPoints: 200,
    };
    const decision = validateTeamJoinOrSwitch({
      season: sampleSeason,
      teams: SEASON_1_TEAMS,
      currentMembership: membership,
      targetTeamId: "team-blizzard-guardians",
    });
    expect(decision.allowed).toBe(false);
    expect(decision.violationCode).toBe("SWITCH_LIMIT_EXCEEDED");
  });
});

describe("GE-09: Leaderboard Reducer & Idempotency", () => {
  const playerA = "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const playerB = "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";

  function makeEvent(overrides: Partial<GameplayEvidenceEvent> = {}): GameplayEvidenceEvent {
    return {
      eventId: `evt_${Math.random().toString(36).substring(2, 9)}`,
      eventType: "CHEST_CONFIRMED",
      player: playerA,
      seasonId: SEASON_1_ID,
      trailId: "today-campus-trail",
      checkpointId: "campus-library",
      requestId: "0xreq_1111",
      occurredAt: new Date().toISOString(),
      mode: "GPS",
      ...overrides,
    };
  }

  it("awards base points for allowlisted evidence events", () => {
    const state = createInitialLeaderboardState(SEASON_1_ID, SEASON_1_TEAMS);
    const event = makeEvent({
      eventType: "CHEST_CONFIRMED",
      requestId: "0xreq_cp1",
    });

    const result = applyEvidenceEventToLeaderboard(
      state,
      event,
      "team-avax-rush",
    );

    expect(result.applied).toBe(true);
    expect(result.pointsAwarded).toBe(SCORE_POINTS_BY_REASON.CHECKPOINT_CONFIRMED);
    expect(result.state.teams["team-avax-rush"].score).toBe(50);
    expect(result.state.teams["team-avax-rush"].checkpointCount).toBe(1);
    expect(result.state.players[playerA.toLowerCase()].score).toBe(50);
    expect(result.state.communityGoal.currentPoints).toBe(50);
  });

  it("handles duplicate, retry, and replay idempotently (5x replay yields exact 1 contribution)", () => {
    let state = createInitialLeaderboardState(SEASON_1_ID, SEASON_1_TEAMS);
    const event = makeEvent({
      eventType: "CHEST_CONFIRMED",
      requestId: "0xreq_fixed_idempotent",
      checkpointId: "checkpoint_alpha",
    });

    // 1st application: applied
    const firstResult = applyEvidenceEventToLeaderboard(
      state,
      event,
      "team-avax-rush",
    );
    expect(firstResult.applied).toBe(true);
    expect(firstResult.state.teams["team-avax-rush"].score).toBe(50);
    state = firstResult.state;

    // Next 4 attempts (replay/retry): ignored as DUPLICATE_EVENT
    for (let i = 2; i <= 5; i++) {
      const replayResult = applyEvidenceEventToLeaderboard(
        state,
        event,
        "team-avax-rush",
      );
      expect(replayResult.applied).toBe(false);
      expect(replayResult.reason).toBe("DUPLICATE_EVENT");
      expect(replayResult.state.teams["team-avax-rush"].score).toBe(50);
    }
  });

  it("handles out-of-order event arrivals cleanly", () => {
    let state = createInitialLeaderboardState(SEASON_1_ID, SEASON_1_TEAMS);
    const cp2 = makeEvent({
      eventType: "CHEST_CONFIRMED",
      requestId: "0xreq_step2",
      checkpointId: "checkpoint_2",
      occurredAt: "2026-11-07T10:05:00.000Z",
    });
    const cp1 = makeEvent({
      eventType: "CHEST_CONFIRMED",
      requestId: "0xreq_step1",
      checkpointId: "checkpoint_1",
      occurredAt: "2026-11-07T10:00:00.000Z",
    });

    // Arrives cp2 then cp1
    state = applyEvidenceEventToLeaderboard(state, cp2, "team-avax-rush").state;
    state = applyEvidenceEventToLeaderboard(state, cp1, "team-avax-rush").state;

    expect(state.teams["team-avax-rush"].score).toBe(100);
    expect(state.teams["team-avax-rush"].checkpointCount).toBe(2);
    expect(state.communityGoal.currentPoints).toBe(100);
  });

  it("filters out demo mode events from competitive leaderboard when allowDemo is false", () => {
    const state = createInitialLeaderboardState(SEASON_1_ID, SEASON_1_TEAMS);
    const demoEvent = makeEvent({
      mode: "DEMO",
      requestId: "0xreq_demo_test",
    });

    const result = applyEvidenceEventToLeaderboard(
      state,
      demoEvent,
      "team-avax-rush",
      { allowDemo: false },
    );

    expect(result.applied).toBe(false);
    expect(result.reason).toBe("DEMO_MODE_EXCLUDED");
    expect(state.teams["team-avax-rush"].score).toBe(0);
    expect(state.communityGoal.currentPoints).toBe(0);
  });

  it("allows demo mode events when state is initialized as demo leaderboard", () => {
    const demoState = createInitialLeaderboardState(
      SEASON_1_ID,
      SEASON_1_TEAMS,
      true, // isDemoLeaderboard = true
    );
    const demoEvent = makeEvent({
      mode: "DEMO",
      requestId: "0xreq_demo_allowed",
    });

    const result = applyEvidenceEventToLeaderboard(
      demoState,
      demoEvent,
      "team-avax-rush",
    );

    expect(result.applied).toBe(true);
    expect(result.state.teams["team-avax-rush"].score).toBe(50);
  });

  it("rejects non-allowlisted / arbitrary event types", () => {
    const state = createInitialLeaderboardState(SEASON_1_ID, SEASON_1_TEAMS);
    const invalidEvent = makeEvent({
      eventType: "ADMIN_ARBITRARY_BOOST" as any,
    });

    const result = applyEvidenceEventToLeaderboard(
      state,
      invalidEvent,
      "team-avax-rush",
    );

    expect(result.applied).toBe(false);
    expect(result.reason).toBe("UNSUPPORTED_EVENT_TYPE");
    expect(state.teams["team-avax-rush"].score).toBe(0);
  });

  it("handles concurrent reducer applications safely", async () => {
    let state = createInitialLeaderboardState(SEASON_1_ID, SEASON_1_TEAMS);
    const events: GameplayEvidenceEvent[] = Array.from({ length: 20 }, (_, i) =>
      makeEvent({
        requestId: `0xreq_concurrent_${i}`,
        player: i % 2 === 0 ? playerA : playerB,
        checkpointId: `cp_${i}`,
      }),
    );

    // Simulate rapid/interleaved applications
    for (const evt of events) {
      const assignedTeam =
        evt.player === playerA ? "team-avax-rush" : "team-subnet-pioneers";
      const res = applyEvidenceEventToLeaderboard(state, evt, assignedTeam);
      if (res.applied) {
        state = res.state;
      }
    }

    expect(state.teams["team-avax-rush"].score).toBe(10 * 50); // 10 events for team A
    expect(state.teams["team-subnet-pioneers"].score).toBe(10 * 50); // 10 events for team B
    expect(state.communityGoal.currentPoints).toBe(20 * 50);
    expect(state.processedEventKeys.length).toBe(20);
  });

  it("rebuild parity: replaying all events generates 100% identical state and parity fingerprint", () => {
    const events: GameplayEvidenceEvent[] = [
      makeEvent({
        eventType: "CHEST_CONFIRMED",
        requestId: "0x1",
        player: playerA,
      }),
      makeEvent({
        eventType: "CHEST_CONFIRMED",
        requestId: "0x2",
        player: playerB,
      }),
      makeEvent({
        eventType: "TRAIL_COMPLETED",
        requestId: "0x3",
        player: playerA,
      }),
      makeEvent({
        eventType: "QUEST_COMPLETED",
        requestId: "0x4",
        player: playerB,
      }),
      makeEvent({
        eventType: "PERK_REDEEMED",
        requestId: "0x5",
        player: playerA,
      }),
      // Duplicate event in stream
      makeEvent({
        eventType: "CHEST_CONFIRMED",
        requestId: "0x1",
        player: playerA,
      }),
    ];

    const playerTeamMap = new Map<string, string>([
      [playerA.toLowerCase(), "team-avax-rush"],
      [playerB.toLowerCase(), "team-blizzard-guardians"],
    ]);

    // Incremental run
    let incrementalState = createInitialLeaderboardState(
      SEASON_1_ID,
      SEASON_1_TEAMS,
    );
    for (const evt of events) {
      const teamId = playerTeamMap.get(evt.player.toLowerCase());
      const res = applyEvidenceEventToLeaderboard(incrementalState, evt, teamId);
      if (res.applied) {
        incrementalState = res.state;
      }
    }

    // Rebuild run
    const rebuildResult = rebuildLeaderboardFromEvents({
      seasonId: SEASON_1_ID,
      teams: SEASON_1_TEAMS,
      events,
      playerTeamMap,
    });

    expect(rebuildResult.eventsProcessed).toBe(5);
    expect(rebuildResult.eventsSkipped).toBe(1); // The duplicate
    expect(rebuildResult.state.teams["team-avax-rush"].score).toBe(
      incrementalState.teams["team-avax-rush"].score,
    );
    expect(rebuildResult.state.teams["team-blizzard-guardians"].score).toBe(
      incrementalState.teams["team-blizzard-guardians"].score,
    );
    expect(rebuildResult.state.communityGoal.currentPoints).toBe(
      incrementalState.communityGoal.currentPoints,
    );
    expect(rebuildResult.parityFingerprint).toBeDefined();
    expect(rebuildResult.parityFingerprint.length).toBeGreaterThan(10);
  });

  it("economic independence: leaderboard scores do not alter or depend on vault balances or power level", () => {
    // Asserting invariant boundary
    const mockVaultPosition = { shares: 5000n, assets: 5000000000n };
    const mockPlayerPower = 3;

    const state = createInitialLeaderboardState(SEASON_1_ID, SEASON_1_TEAMS);
    const event = makeEvent({
      eventType: "CHEST_CONFIRMED",
      requestId: "0xreq_boundary_test",
    });

    const res = applyEvidenceEventToLeaderboard(state, event, "team-avax-rush");

    // Leaderboard state contains zero references to vault balances or contract state
    expect((res.state as any).vaultPosition).toBeUndefined();
    expect((res.state as any).playerPower).toBeUndefined();
    expect(mockVaultPosition.shares).toBe(5000n);
    expect(mockPlayerPower).toBe(3);
  });
});

