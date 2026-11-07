import {
  DEFAULT_SEASON_1,
  SEASON_1_TEAMS,
  SEASON_1_ID,
  validateTeamJoinOrSwitch,
  createInitialLeaderboardState,
  applyEvidenceEventToLeaderboard,
  rebuildLeaderboardFromEvents,
  type TeamMembership,
  type LeaderboardState,
  type TeamDefinition,
  type SeasonDefinition,
  type GameplayEvidenceEvent,
} from "@defi-trail/shared";

interface LeaderboardQueryOptions {
  seasonId?: string;
  includeDemo?: boolean;
  limit?: number;
  offset?: number;
  teamId?: string;
}

export class EngagementStore {
  private static instance: EngagementStore | null = null;

  private seasons: Map<string, SeasonDefinition> = new Map([
    [SEASON_1_ID, DEFAULT_SEASON_1],
  ]);

  private teamsBySeason: Map<string, readonly TeamDefinition[]> = new Map([
    [SEASON_1_ID, SEASON_1_TEAMS],
  ]);

  // Key: `${seasonId}:${player.toLowerCase()}`
  private memberships: Map<string, TeamMembership> = new Map();

  // All verified evidence events stored for audit and rebuild parity
  private storedEvents: GameplayEvidenceEvent[] = [];

  // Active projected read models
  private competitiveLeaderboards: Map<string, LeaderboardState> = new Map();
  private demoLeaderboards: Map<string, LeaderboardState> = new Map();

  private constructor() {
    this.competitiveLeaderboards.set(
      SEASON_1_ID,
      createInitialLeaderboardState(SEASON_1_ID, SEASON_1_TEAMS, false),
    );
    this.demoLeaderboards.set(
      SEASON_1_ID,
      createInitialLeaderboardState(SEASON_1_ID, SEASON_1_TEAMS, true),
    );
  }

  public static getInstance(): EngagementStore {
    if (!EngagementStore.instance) {
      EngagementStore.instance = new EngagementStore();
    }
    return EngagementStore.instance;
  }

  /** Reset instance for testing purposes */
  public static resetInstance(): void {
    EngagementStore.instance = null;
  }

  public getSeason(seasonId = SEASON_1_ID): SeasonDefinition | null {
    return this.seasons.get(seasonId) ?? null;
  }

  public getTeams(seasonId = SEASON_1_ID): readonly TeamDefinition[] {
    return this.teamsBySeason.get(seasonId) ?? [];
  }

  public getMembership(
    seasonId = SEASON_1_ID,
    player: string,
  ): TeamMembership | null {
    const key = `${seasonId}:${player.toLowerCase()}`;
    return this.memberships.get(key) ?? null;
  }

  public joinOrSwitchTeam(input: {
    seasonId?: string;
    player: string;
    targetTeamId?: string;
    inviteCode?: string;
  }): {
    success: boolean;
    membership?: TeamMembership;
    reason?: string;
    violationCode?: string;
    isSwitch?: boolean;
  } {
    const seasonId = input.seasonId ?? SEASON_1_ID;
    const season = this.getSeason(seasonId);
    if (!season) {
      return {
        success: false,
        reason: `Season '${seasonId}' không tồn tại.`,
        violationCode: "SEASON_NOT_ACTIVE",
      };
    }

    const teams = this.getTeams(seasonId);
    const currentMembership = this.getMembership(seasonId, input.player);

    const decision = validateTeamJoinOrSwitch({
      season,
      teams,
      currentMembership,
      targetTeamId: input.targetTeamId,
      inviteCode: input.inviteCode,
    });

    if (!decision.allowed) {
      return {
        success: false,
        reason: decision.reason,
        violationCode: decision.violationCode,
        isSwitch: decision.isSwitch,
      };
    }

    const playerKey = `${seasonId}:${input.player.toLowerCase()}`;
    const nextMembership: TeamMembership = {
      seasonId,
      player: input.player,
      teamId: decision.targetTeamId,
      joinedAt: new Date().toISOString(),
      inviteCodeUsed: input.inviteCode,
      switchCount: currentMembership
        ? currentMembership.switchCount + 1
        : 0,
      contributedPoints: currentMembership
        ? currentMembership.contributedPoints
        : 0,
    };

    this.memberships.set(playerKey, nextMembership);

    // Update memberCount in both competitive and demo leaderboard projections
    this.updateTeamMemberCounts(seasonId);

    return {
      success: true,
      membership: nextMembership,
      isSwitch: decision.isSwitch,
    };
  }

  private updateTeamMemberCounts(seasonId: string): void {
    const counts: Record<string, number> = {};
    for (const membership of this.memberships.values()) {
      if (membership.seasonId === seasonId) {
        counts[membership.teamId] = (counts[membership.teamId] ?? 0) + 1;
      }
    }

    const compState = this.competitiveLeaderboards.get(seasonId);
    if (compState) {
      for (const team of Object.values(compState.teams)) {
        team.memberCount = counts[team.teamId] ?? 0;
      }
    }

    const demoState = this.demoLeaderboards.get(seasonId);
    if (demoState) {
      for (const team of Object.values(demoState.teams)) {
        team.memberCount = counts[team.teamId] ?? 0;
      }
    }
  }

  /**
   * Applies an evidence event into the read-model reducer.
   * NOTE: Admin cannot edit scores arbitrarily. All points MUST stem from authentic GameplayEvidenceEvent!
   */
  public recordEvidenceAndApplyScore(event: GameplayEvidenceEvent): {
    applied: boolean;
    reason?: string;
    pointsAwarded?: number;
    teamId?: string;
    communityTotal: number;
  } {
    const seasonId = event.seasonId || SEASON_1_ID;
    const membership = this.getMembership(seasonId, event.player);
    const assignedTeamId = membership?.teamId;

    // Store event for rebuild replay audit
    this.storedEvents.push(event);

    const isDemo = event.mode === "DEMO";
    const targetBoard = isDemo
      ? this.demoLeaderboards.get(seasonId)
      : this.competitiveLeaderboards.get(seasonId);

    if (!targetBoard) {
      return {
        applied: false,
        reason: "SEASON_MISMATCH",
        communityTotal: 0,
      };
    }

    const result = applyEvidenceEventToLeaderboard(
      targetBoard,
      event,
      assignedTeamId,
      { allowDemo: isDemo },
    );

    if (result.applied) {
      if (isDemo) {
        this.demoLeaderboards.set(seasonId, result.state);
      } else {
        this.competitiveLeaderboards.set(seasonId, result.state);
      }

      // Update membership contribution record if player has a team
      if (membership && result.pointsAwarded) {
        membership.contributedPoints += result.pointsAwarded;
      }

      return {
        applied: true,
        pointsAwarded: result.pointsAwarded,
        teamId: assignedTeamId,
        communityTotal: result.state.communityGoal.currentPoints,
      };
    }

    return {
      applied: false,
      reason: result.reason,
      communityTotal: targetBoard.communityGoal.currentPoints,
    };
  }

  public getLeaderboard(options: LeaderboardQueryOptions = {}): {
    seasonId: string;
    isDemo: boolean;
    teams: Array<{
      teamId: string;
      teamName: string;
      colorKey: string;
      score: number;
      rank: number;
      memberCount: number;
      contributorCount: number;
      checkpointCount: number;
      trailsCompleted: number;
    }>;
    players: {
      items: Array<{
        player: string;
        teamId?: string;
        score: number;
        rank: number;
        checkpointCount: number;
        trailsCompleted: number;
        lastContributedAt: string;
      }>;
      total: number;
      limit: number;
      offset: number;
    };
    communityGoal: any;
    lastUpdatedAt: string;
  } {
    const seasonId = options.seasonId ?? SEASON_1_ID;
    const isDemo = Boolean(options.includeDemo);
    const state = isDemo
      ? this.demoLeaderboards.get(seasonId) ??
        createInitialLeaderboardState(seasonId, this.getTeams(seasonId), true)
      : this.competitiveLeaderboards.get(seasonId) ??
        createInitialLeaderboardState(seasonId, this.getTeams(seasonId), false);

    const sortedTeams = Object.values(state.teams).sort(
      (a, b) => a.rank - b.rank,
    );

    let filteredPlayers = Object.values(state.players);
    if (options.teamId) {
      filteredPlayers = filteredPlayers.filter(
        (p) => p.teamId === options.teamId,
      );
    }
    filteredPlayers.sort((a, b) => a.rank - b.rank);

    const limit = Math.min(100, Math.max(1, options.limit ?? 10));
    const offset = Math.max(0, options.offset ?? 0);
    const paginatedPlayers = filteredPlayers.slice(offset, offset + limit);

    return {
      seasonId,
      isDemo,
      teams: sortedTeams,
      players: {
        items: paginatedPlayers,
        total: filteredPlayers.length,
        limit,
        offset,
      },
      communityGoal: state.communityGoal,
      lastUpdatedAt: state.lastUpdatedAt,
    };
  }

  /**
   * Replays all stored events from scratch to guarantee parity.
   */
  public rebuildLeaderboard(
    seasonId = SEASON_1_ID,
    options: { allowDemo?: boolean } = {},
  ): {
    seasonId: string;
    eventsProcessed: number;
    eventsSkipped: number;
    parityFingerprint: string;
    communityTotal: number;
  } {
    const teams = this.getTeams(seasonId);
    const playerTeamMap = new Map<string, string>();
    for (const membership of this.memberships.values()) {
      if (membership.seasonId === seasonId) {
        playerTeamMap.set(
          membership.player.toLowerCase(),
          membership.teamId,
        );
      }
    }

    const isDemo = Boolean(options.allowDemo);
    const filteredEvents = this.storedEvents.filter(
      (e) => (isDemo ? e.mode === "DEMO" : e.mode !== "DEMO"),
    );

    const result = rebuildLeaderboardFromEvents({
      seasonId,
      teams,
      events: filteredEvents,
      playerTeamMap,
      options: { allowDemo: isDemo },
    });

    if (isDemo) {
      this.demoLeaderboards.set(seasonId, result.state);
    } else {
      this.competitiveLeaderboards.set(seasonId, result.state);
    }

    return {
      seasonId,
      eventsProcessed: result.eventsProcessed,
      eventsSkipped: result.eventsSkipped,
      parityFingerprint: result.parityFingerprint,
      communityTotal: result.state.communityGoal.currentPoints,
    };
  }
}

export function getEngagementStore(): EngagementStore {
  return EngagementStore.getInstance();
}

