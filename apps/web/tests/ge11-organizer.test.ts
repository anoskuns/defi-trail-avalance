import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import {
  OrganizerContentError,
  OrganizerContentService,
  getOrganizerContentService,
} from "@/lib/organizer-content-service";
import {
  GET as getOrganizerWorkspace,
  POST as mutateOrganizerWorkspace,
} from "@/app/api/organizer/content/route";
import { GET as getActiveSeason } from "@/app/api/gameplay/seasons/active/route";
import { GET as getActiveCampaigns } from "@/app/api/gameplay/campaigns/active/route";

function request(
  method: "GET" | "POST",
  body?: Record<string, unknown>,
  token?: string,
) {
  return new NextRequest("http://localhost:3000/api/organizer/content", {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

describe("GE-11 Organizer workflow", () => {
  beforeEach(() => {
    OrganizerContentService.resetInstance();
    process.env.ORGANIZER_ACCESS_TOKEN = "organizer-test-secret";
    process.env.ORGANIZER_ROLE = "organizer";
    process.env.ORGANIZER_ACTOR_ID = "campus-ops";
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-07T12:00:00.000Z"));
  });

  it("requires a valid organizer role for reads and every mutation", async () => {
    expect((await getOrganizerWorkspace(request("GET"))).status).toBe(401);

    process.env.ORGANIZER_ROLE = "viewer";
    const forbidden = await getOrganizerWorkspace(
      request("GET", undefined, "organizer-test-secret"),
    );
    expect(forbidden.status).toBe(403);
    expect((await forbidden.json()).error.code).toBe("FORBIDDEN_ROLE");

    process.env.ORGANIZER_ROLE = "admin";
    const allowed = await getOrganizerWorkspace(
      request("GET", undefined, "organizer-test-secret"),
    );
    expect(allowed.status).toBe(200);
    expect(JSON.stringify(await allowed.json())).not.toContain(
      "organizer-test-secret",
    );

    const mutation = await mutateOrganizerWorkspace(
      request("POST", { action: "ARCHIVE" }),
    );
    expect(mutation.status).toBe(401);
  });

  it("refuses to publish invalid time, duplicate checkpoint, missing badge, or missing perk references", () => {
    const service = getOrganizerContentService();
    const content = service.getWorkspace().draft.content;
    const trail = content.trails[0]!;
    trail.endsAt = trail.startsAt;
    trail.checkpointSlots = [
      trail.checkpointSlots[0]!,
      { ...trail.checkpointSlots[0]!, id: "duplicate-slot" },
    ];
    trail.completionBadgeId = "missing-badge";
    trail.perkCampaignId = "missing-perk";

    service.saveDraft(content, "campus-ops");
    const workspace = service.getWorkspace();
    expect(workspace.validation.map((item) => item.code)).toEqual(
      expect.arrayContaining([
        "DUPLICATE_CHECKPOINT",
        "MISSING_BADGE",
        "MISSING_PERK",
      ]),
    );
    expect(() =>
      service.publish({
        actorId: "campus-ops",
        expectedPublishedVersion: 1,
        confirmation: "PUBLISH",
      }),
    ).toThrowError(
      expect.objectContaining<Partial<OrganizerContentError>>({
        code: "INVALID_DRAFT",
        status: 422,
      }),
    );
    expect(service.getWorkspace().currentPublishedVersion).toBe(1);
  });

  it("only accepts checkpoints and campaigns from approved seeds", () => {
    const service = getOrganizerContentService();
    const content = service.getWorkspace().draft.content;
    content.trails[0]!.checkpointSlots[0]!.slot = 999;
    content.campaigns[0]!.id = "unapproved-campaign";
    service.saveDraft(content, "campus-ops");

    const codes = service.getWorkspace().validation.map((item) => item.code);
    expect(codes).toContain("UNSEEDED_CHECKPOINT");
    expect(codes).toContain("UNSEEDED_CAMPAIGN");
  });

  it("blocks overlapping active trails that would make the player API ambiguous", () => {
    const service = getOrganizerContentService();
    const content = service.getWorkspace().draft.content;
    content.trails.push({
      ...structuredClone(content.trails[0]!),
      id: "overlapping-campus-trail",
      checkpointSlots: structuredClone(content.trails[0]!.checkpointSlots).map(
        (checkpoint, index) => ({
          ...checkpoint,
          id: `overlap-checkpoint-${index + 1}`,
        }),
      ),
    });
    service.saveDraft(content, "campus-ops");
    expect(service.getWorkspace().validation).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "AMBIGUOUS_ACTIVE_TRAILS" }),
      ]),
    );
    expect(() =>
      service.publish({
        actorId: "campus-ops",
        expectedPublishedVersion: 1,
        confirmation: "PUBLISH",
      }),
    ).toThrowError(
      expect.objectContaining<Partial<OrganizerContentError>>({
        code: "INVALID_DRAFT",
      }),
    );
  });

  it("rejects arbitrary economic and secret-bearing content fields", () => {
    const service = getOrganizerContentService();
    const content = service.getWorkspace().draft.content as unknown as Record<
      string,
      unknown
    >;
    content.rewardReserve = "999999";

    expect(() => service.saveDraft(content, "campus-ops")).toThrowError(
      expect.objectContaining<Partial<OrganizerContentError>>({
        code: "ECONOMIC_FIELD_FORBIDDEN",
      }),
    );
  });

  it("publishes immutable versions and rolls back only by creating a higher version", () => {
    const service = getOrganizerContentService();
    const v2Content = service.getWorkspace().draft.content;
    v2Content.season.name = "Campus Week Two";
    service.saveDraft(v2Content, "campus-ops");
    const version2 = service.publish({
      actorId: "campus-ops",
      expectedPublishedVersion: 1,
      confirmation: "PUBLISH",
    });
    expect(version2.version).toBe(2);
    expect(version2.content.season.name).toBe("Campus Week Two");

    service.restoreVersion(1, "campus-ops");
    const restoredDraft = service.getWorkspace().draft;
    expect(restoredDraft.targetVersion).toBe(3);
    expect(restoredDraft.sourceVersion).toBe(1);
    expect(restoredDraft.content.season.name).toBe("DeFi Trail Campus Pilot");

    const version3 = service.publish({
      actorId: "campus-ops",
      expectedPublishedVersion: 2,
      confirmation: "PUBLISH",
    });
    expect(version3.version).toBe(3);
    expect(version3.sourceVersion).toBe(1);

    const history = service.getWorkspace().versions;
    expect(history.map((version) => version.version)).toEqual([3, 2, 1]);
    expect(history.find((version) => version.version === 2)?.seasonName).toBe(
      "Campus Week Two",
    );
    expect(
      service
        .getWorkspace()
        .audit.filter((event) => event.eventType === "PUBLISHED"),
    ).toHaveLength(3);
  });

  it("requires explicit confirmation and optimistic version agreement", () => {
    const service = getOrganizerContentService();
    expect(() =>
      service.publish({
        actorId: "campus-ops",
        expectedPublishedVersion: 1,
        confirmation: "yes",
      }),
    ).toThrowError(
      expect.objectContaining<Partial<OrganizerContentError>>({
        code: "PUBLISH_CONFIRMATION_REQUIRED",
      }),
    );
    expect(() =>
      service.publish({
        actorId: "campus-ops",
        expectedPublishedVersion: 99,
        confirmation: "PUBLISH",
      }),
    ).toThrowError(
      expect.objectContaining<Partial<OrganizerContentError>>({
        code: "VERSION_CONFLICT",
      }),
    );
  });

  it("keeps player APIs on active published content and hides drafts or archives", async () => {
    const service = getOrganizerContentService();
    const content = service.getWorkspace().draft.content;
    content.season.name = "Unpublished Organizer Draft";
    service.saveDraft(content, "campus-ops");

    const beforePublish = await (await getActiveSeason()).json();
    expect(beforePublish.data.season.name).toBe("DeFi Trail Campus Pilot");
    expect(beforePublish.meta.configVersion).toBe(1);
    const campaignBeforePublish = await (await getActiveCampaigns()).json();
    expect(campaignBeforePublish.data.campaigns[0].title).toBe(
      "Complimentary drink size upgrade",
    );

    service.publish({
      actorId: "campus-ops",
      expectedPublishedVersion: 1,
      confirmation: "PUBLISH",
    });
    const afterPublish = await (await getActiveSeason()).json();
    expect(afterPublish.data.season.name).toBe("Unpublished Organizer Draft");
    expect(afterPublish.meta.configVersion).toBe(2);

    service.archive({
      actorId: "campus-ops",
      expectedPublishedVersion: 2,
      confirmation: "ARCHIVE",
    });
    const afterArchive = await (await getActiveSeason()).json();
    expect(afterArchive).toMatchObject({
      state: "EMPTY",
      data: null,
      meta: { reason: "NO_ACTIVE_SEASON" },
    });
    const campaignsAfterArchive = await (await getActiveCampaigns()).json();
    expect(campaignsAfterArchive).toMatchObject({
      state: "EMPTY",
      data: null,
      meta: { reason: "NO_ACTIVE_CAMPAIGN" },
    });
    expect(
      service.getWorkspace().audit.at(0),
    ).toMatchObject({ eventType: "ARCHIVED", version: 2 });
  });

  it("exposes a read-only readiness DTO without secrets or economic controls", () => {
    const workspace = getOrganizerContentService().getWorkspace();
    expect(workspace.readiness).toMatchObject({
      status: "READY",
      publishedVersion: 1,
      lifecycle: "ACTIVE",
      validationIssueCount: 0,
    });
    const serialized = JSON.stringify(workspace.readiness);
    expect(serialized).not.toMatch(
      /token|secret|private|balance|principal|rewardReserve|apr/i,
    );
  });
});
