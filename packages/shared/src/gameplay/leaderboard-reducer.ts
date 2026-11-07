import type {
  GameplayEvidenceEvent,
  IsoDateTime,
  TeamDefinition,
  TeamScoreReason,
} from "./types";
import {
  COMMUNITY_GOAL_S1,
  SCORE_POINTS_BY_REASON,
  SEASON_1_TEAMS,
  type CommunityGoalDefinition,
} from "./teams";

export interface TeamScoreAggregate {
  teamId: string;
  teamName: string;
  colorKey: string;
  score: number;
  memberCount: number;
  contributorCount: number;
  rank: number;
  checkpointCount: number;
  trailsCompleted: number;
}

export interface PlayerContributionAggregate {
  player: string;
  teamId?: string;
  score: number;
  rank: number;
  checkpointCount: number;
  trailsCompleted: number;
  lastContributedAt: IsoDateTime;
}

export interface CommunityGoalStatus {
  targetPoints: number;
  currentPoints: number;
  percentage: number;
  isUnlocked: boolean;
  unlockedMilestones: {
    points: number;
    label: string;
    unlockedDescription: string;
  }[];
  nextMilestone: {
    points: number;
    label: string;
    unlockedDescription: string;
  } | null;
}

export interface LeaderboardState {
  seasonId: string;
  teams: Record<string, TeamScoreAggregate>;
  players: Record<string, PlayerContributionAggregate>;
  processedEventKeys: string[];
  processedEventKeySet: Set<string>;
  communityGoal: CommunityGoalStatus;
  lastUpdatedAt: IsoDateTime;
  isDemoLeaderboard: boolean;
}

export interface ReducerOptions {
  allowDemo?: boolean;
}

export interface ApplyEvidenceResult {
  applied: boolean;
  reason?:
    | "DUPLICATE_EVENT"
    | "DEMO_MODE_EXCLUDED"
    | "UNSUPPORTED_EVENT_TYPE"
    | "SEASON_MISMATCH"
    | "INVALID_PAYLOAD";
  pointsAwarded?: number;
  scoreReason?: TeamScoreReason;
  state: LeaderboardState;
}

const ALLOWLISTED_EVENT_MAPPING: Record<
  string,
  { reason: TeamScoreReason; basePoints: number }
> = {
  CHEST_CONFIRMED: {
    reason: "CHECKPOINT_CONFIRMED",
    basePoints: SCORE_POINTS_BY_REASON.CHECKPOINT_CONFIRMED,
  },
  TRAIL_COMPLETED: {
    reason: "TRAIL_COMPLETED",
    basePoints: SCORE_POINTS_BY_REASON.TRAIL_COMPLETED,
  },
  QUEST_COMPLETED: {
    reason: "QUEST_COMPLETED",
    basePoints: SCORE_POINTS_BY_REASON.QUEST_COMPLETED,
  },
  PERK_REDEEMED: {
    reason: "SPONSOR_REDEMPTION",
    basePoints: SCORE_POINTS_BY_REASON.SPONSOR_REDEMPTION,
  },
};

export function createEventDeduplicationKey(event: GameplayEvidenceEvent): string {
  const sourceIdentity = event.requestId
    ? `req:${event.requestId}`
    : `evt:${event.eventId}`;
  const suffix = event.checkpointId ? `:${event.checkpointId}` : "";
  return `${event.seasonId}:${event.eventType}:${sourceIdentity}${suffix}`;
}

export function computeCommunityGoalStatus(
  currentPoints: number,
  definition: CommunityGoalDefinition = COMMUNITY_GOAL_S1,
): CommunityGoalStatus {
  const percentage = Math.min(
    100,
    Math.max(0, Math.floor((currentPoints / definition.targetPoints) * 100)),
  );
  const unlockedMilestones = definition.milestones.filter(
    (m) => currentPoints >= m.points,
  );
  const nextMilestone =
    definition.milestones.find((m) => currentPoints < m.points) ?? null;

  return {
    targetPoints: definition.targetPoints,
    currentPoints,
    percentage,
    isUnlocked: currentPoints >= definition.targetPoints,
    unlockedMilestones,
    nextMilestone,
  };
}

export function createInitialLeaderboardState(
  seasonId: string,
  teams: readonly TeamDefinition[] = SEASON_1_TEAMS,
  isDemoLeaderboard = false,
): LeaderboardState {
  const teamRecords: Record<string, TeamScoreAggregate> = {};
  for (const team of teams) {
    teamRecords[team.id] = {
      teamId: team.id,
      teamName: team.name,
      colorKey: team.colorKey,
      score: 0,
      memberCount: 0,
      contributorCount: 0,
      rank: 1,
      checkpointCount: 0,
      trailsCompleted: 0,
    };
  }

  return {
    seasonId,
    teams: teamRecords,
    players: {},
    processedEventKeys: [],
    processedEventKeySet: new Set<string>(),
    communityGoal: computeCommunityGoalStatus(0),
    lastUpdatedAt: new Date().toISOString(),
    isDemoLeaderboard,
  };
}

function recalculateRanks(state: LeaderboardState): void {
  // Sort teams by score desc
  const sortedTeams = Object.values(state.teams).sort(
    (a, b) => b.score - a.score || a.teamName.localeCompare(b.teamName),
  );
  sortedTeams.forEach((team, index) => {
    state.teams[team.teamId].rank = index + 1;
  });

  // Sort players by score desc
  const sortedPlayers = Object.values(state.players).sort(
    (a, b) => b.score - a.score || a.player.localeCompare(b.player),
  );
  sortedPlayers.forEach((player, index) => {
    state.players[player.player.toLowerCase()].rank = index + 1;
  });
}

export function applyEvidenceEventToLeaderboard(
  state: LeaderboardState,
  event: GameplayEvidenceEvent,
  playerTeamId?: string,
  options: ReducerOptions = {},
): ApplyEvidenceResult {
  // 1. Season check
  if (event.seasonId !== state.seasonId) {
    return {
      applied: false,
      reason: "SEASON_MISMATCH",
      state,
    };
  }

  // 2. Allowlisted evidence event type check
  const mapping = ALLOWLISTED_EVENT_MAPPING[event.eventType];
  if (!mapping) {
    return {
      applied: false,
      reason: "UNSUPPORTED_EVENT_TYPE",
      state,
    };
  }

  // 3. Demo mode filtering
  if (event.mode === "DEMO" && !options.allowDemo && !state.isDemoLeaderboard) {
    return {
      applied: false,
      reason: "DEMO_MODE_EXCLUDED",
      state,
    };
  }

  // 4. Unique constraint & Idempotency
  const dedupKey = createEventDeduplicationKey(event);
  if (state.processedEventKeySet.has(dedupKey)) {
    return {
      applied: false,
      reason: "DUPLICATE_EVENT",
      state,
    };
  }

  // 5. Clone state shallowly for immutability
  const nextTeams: Record<string, TeamScoreAggregate> = {};
  for (const [id, team] of Object.entries(state.teams)) {
    nextTeams[id] = { ...team };
  }

  const nextPlayers: Record<string, PlayerContributionAggregate> = {};
  for (const [id, player] of Object.entries(state.players)) {
    nextPlayers[id] = { ...player };
  }

  const nextKeySet = new Set(state.processedEventKeySet);
  nextKeySet.add(dedupKey);
  const nextKeys = [...state.processedEventKeys, dedupKey];

  const points = mapping.basePoints;
  const playerKey = event.player.toLowerCase();

  // 6. Update Player Contribution
  const existingPlayer = nextPlayers[playerKey];
  const previousPlayerScore = existingPlayer ? existingPlayer.score : 0;
  const isFirstContribution = previousPlayerScore === 0;

  nextPlayers[playerKey] = {
    player: event.player,
    teamId: playerTeamId ?? existingPlayer?.teamId,
    score: previousPlayerScore + points,
    rank: existingPlayer?.rank ?? Object.keys(nextPlayers).length + 1,
    checkpointCount:
      (existingPlayer?.checkpointCount ?? 0) +
      (event.eventType === "CHEST_CONFIRMED" ? 1 : 0),
    trailsCompleted:
      (existingPlayer?.trailsCompleted ?? 0) +
      (event.eventType === "TRAIL_COMPLETED" ? 1 : 0),
    lastContributedAt: event.occurredAt,
  };

  // 7. Update Team Score if player is assigned to an existing team
  if (playerTeamId && nextTeams[playerTeamId]) {
    const team = nextTeams[playerTeamId];
    team.score += points;
    if (isFirstContribution) {
      team.contributorCount += 1;
    }
    if (event.eventType === "CHEST_CONFIRMED") {
      team.checkpointCount += 1;
    }
    if (event.eventType === "TRAIL_COMPLETED") {
      team.trailsCompleted += 1;
    }
  }

  // 8. Recompute Community Total
  const totalTeamScore = Object.values(nextTeams).reduce(
    (sum, t) => sum + t.score,
    0,
  );
  const communityGoal = computeCommunityGoalStatus(totalTeamScore);

  const nextState: LeaderboardState = {
    seasonId: state.seasonId,
    teams: nextTeams,
    players: nextPlayers,
    processedEventKeys: nextKeys,
    processedEventKeySet: nextKeySet,
    communityGoal,
    lastUpdatedAt: event.occurredAt,
    isDemoLeaderboard: state.isDemoLeaderboard,
  };

  // Re-rank
  recalculateRanks(nextState);

  return {
    applied: true,
    pointsAwarded: points,
    scoreReason: mapping.reason,
    state: nextState,
  };
}

export function rebuildLeaderboardFromEvents(input: {
  seasonId: string;
  teams?: readonly TeamDefinition[];
  events: readonly GameplayEvidenceEvent[];
  playerTeamMap?: Map<string, string> | Record<string, string>;
  options?: ReducerOptions;
}): {
  state: LeaderboardState;
  eventsProcessed: number;
  eventsSkipped: number;
  parityFingerprint: string;
} {
  const { seasonId, teams = SEASON_1_TEAMS, events, playerTeamMap, options } = input;
  let currentState = createInitialLeaderboardState(
    seasonId,
    teams,
    Boolean(options?.allowDemo),
  );

  let eventsProcessed = 0;
  let eventsSkipped = 0;

  for (const event of events) {
    const playerKey = event.player.toLowerCase();
    const assignedTeamId =
      playerTeamMap instanceof Map
        ? playerTeamMap.get(playerKey)
        : playerTeamMap?.[playerKey];

    const result = applyEvidenceEventToLeaderboard(
      currentState,
      event,
      assignedTeamId,
      options,
    );

    if (result.applied) {
      currentState = result.state;
      eventsProcessed++;
    } else {
      eventsSkipped++;
    }
  }

  // Compute a deterministic fingerprint
  const teamScoresSummary = Object.values(currentState.teams)
    .sort((a, b) => a.teamId.localeCompare(b.teamId))
    .map((t) => `${t.teamId}:${t.score}:${t.contributorCount}`)
    .join("|");

  const playerScoresSummary = Object.values(currentState.players)
    .sort((a, b) => a.player.localeCompare(b.player))
    .map((p) => `${p.player.toLowerCase()}:${p.score}`)
    .join("|");

  const parityFingerprint = `${seasonId}::${currentState.communityGoal.currentPoints}::teams[${teamScoresSummary}]::players[${playerScoresSummary}]`;

  return {
    state: currentState,
    eventsProcessed,
    eventsSkipped,
    parityFingerprint,
  };
}

