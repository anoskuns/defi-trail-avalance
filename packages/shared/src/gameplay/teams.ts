import type {
  IsoDateTime,
  SeasonDefinition,
  TeamDefinition,
  TeamScoreReason,
} from "./types";

export const SEASON_1_ID = "season-1";

export const SCORE_POINTS_BY_REASON: Readonly<Record<TeamScoreReason, number>> = {
  CHECKPOINT_CONFIRMED: 50,
  TRAIL_COMPLETED: 200,
  QUEST_COMPLETED: 150,
  SPONSOR_REDEMPTION: 100,
} as const;

export const MAX_TEAM_SWITCHES_PER_SEASON = 1;

export interface CommunityMilestone {
  points: number;
  label: string;
  unlockedDescription: string;
}

export interface CommunityGoalDefinition {
  seasonId: string;
  title: string;
  description: string;
  targetPoints: number;
  milestones: CommunityMilestone[];
}

export const COMMUNITY_GOAL_S1: CommunityGoalDefinition = {
  seasonId: SEASON_1_ID,
  title: "Avalanche Campus Awakening",
  description:
    "Hợp sức cùng các đội khám phá toàn bộ khuôn viên, tích lũy điểm evidence để đánh thức Rương Bí Ẩn Kết Mùa!",
  targetPoints: 10000,
  milestones: [
    {
      points: 2500,
      label: "25% - Thám Hiểm Lối Mở",
      unlockedDescription: "Mở khóa bản đồ gợi ý các rương hiếm khu ký túc xá.",
    },
    {
      points: 5000,
      label: "50% - Trạm Tiếp Sức Giữa Chặng",
      unlockedDescription: "Tăng 10% năng lượng nạp hàng ngày cho tất cả người chơi.",
    },
    {
      points: 7500,
      label: "75% - Đỉnh Gió Băng",
      unlockedDescription: "Mở khóa huy hiệu kỷ niệm Season 1 Contributor cho top đóng góp.",
    },
    {
      points: 10000,
      label: "100% - Campus Hoàn Toàn Thức Tỉnh",
      unlockedDescription: "Kích hoạt Rương Kết Mùa đặc biệt cho toàn bộ sinh viên tham gia.",
    },
  ],
};

export const SEASON_1_TEAMS: readonly (TeamDefinition & {
  inviteCodes: readonly string[];
  motto: string;
})[] = [
  {
    id: "team-avax-rush",
    seasonId: SEASON_1_ID,
    name: "Avalanche Rush",
    description: "Biệt đội tốc độ dẫn đầu trong việc hoàn thành các chặng đường mòn khuôn viên.",
    colorKey: "#E84142",
    motto: "Tốc độ • Bền bỉ • Tiên phong",
    enabled: true,
    inviteCodes: ["AVAXRUSH", "TEAM-RED", "RUSH2026"],
  },
  {
    id: "team-subnet-pioneers",
    seasonId: SEASON_1_ID,
    name: "Subnet Pioneers",
    description: "Những nhà kiến trúc kết nối các điểm checkpoint và tối ưu hóa lộ trình DeFi.",
    colorKey: "#F5AC37",
    motto: "Sáng tạo • Kết nối • Bứt phá",
    enabled: true,
    inviteCodes: ["PIONEERS", "TEAM-GOLD", "SUBNET"],
  },
  {
    id: "team-blizzard-guardians",
    seasonId: SEASON_1_ID,
    name: "Blizzard Guardians",
    description: "Biệt đội kiên cố bảo vệ các tọa độ trọng yếu và duy trì điểm số ổn định.",
    colorKey: "#3888FF",
    motto: "Kiên định • Đoàn kết • Bất khả chiến bại",
    enabled: true,
    inviteCodes: ["BLIZZARD", "TEAM-BLUE", "GUARDIAN"],
  },
  {
    id: "team-echo-sentinels",
    seasonId: SEASON_1_ID,
    name: "Echo Sentinels",
    description: "Đội ngũ thám báo lắng nghe tín hiệu cross-chain ICM và khám phá bí ẩn nhanh nhất.",
    colorKey: "#10B981",
    motto: "Linh hoạt • Nhạy bén • Chuẩn xác",
    enabled: true,
    inviteCodes: ["SENTINELS", "TEAM-GREEN", "ECHO"],
  },
] as const;

export const DEFAULT_SEASON_1: SeasonDefinition = {
  id: SEASON_1_ID,
  version: 1,
  name: "Mùa 1: Avalanche Campus Discovery",
  themeKey: "campus_discovery",
  startsAt: "2026-11-01T00:00:00.000Z",
  endsAt: "2026-12-01T00:00:00.000Z",
  teamIds: SEASON_1_TEAMS.map((t) => t.id),
  trailIds: ["today-campus-trail"],
  badgeIds: ["badge-first-step", "badge-trail-blazer"],
  perkCampaignIds: ["perk-camp-free-coffee"],
  status: "ACTIVE",
};

export interface TeamMembership {
  seasonId: string;
  player: string;
  teamId: string;
  joinedAt: IsoDateTime;
  inviteCodeUsed?: string;
  switchCount: number;
  contributedPoints: number;
}

export type TeamPolicyViolationCode =
  | "SEASON_NOT_ACTIVE"
  | "TEAM_NOT_FOUND"
  | "ALREADY_IN_TEAM"
  | "SWITCH_LIMIT_EXCEEDED"
  | "INVALID_INVITE_CODE";

export interface TeamPolicyDecision {
  allowed: boolean;
  isSwitch: boolean;
  targetTeamId: string;
  violationCode?: TeamPolicyViolationCode;
  reason?: string;
}

export function resolveTeamFromInviteCode(
  code: string,
  seasonTeams: readonly (TeamDefinition & { inviteCodes: readonly string[] })[] = SEASON_1_TEAMS,
): TeamDefinition | null {
  const normalized = code.trim().toUpperCase();
  for (const team of seasonTeams) {
    if (team.inviteCodes.some((c) => c.toUpperCase() === normalized)) {
      return team;
    }
  }
  return null;
}

export function validateTeamJoinOrSwitch(input: {
  season: SeasonDefinition;
  teams: readonly (TeamDefinition & { inviteCodes?: readonly string[] })[];
  currentMembership: TeamMembership | null;
  targetTeamId?: string;
  inviteCode?: string;
}): TeamPolicyDecision {
  const { season, teams, currentMembership, targetTeamId, inviteCode } = input;

  if (season.status !== "ACTIVE") {
    return {
      allowed: false,
      isSwitch: false,
      targetTeamId: targetTeamId ?? "",
      violationCode: "SEASON_NOT_ACTIVE",
      reason: "Mùa giải hiện không trong trạng thái kích hoạt (ACTIVE).",
    };
  }

  let resolvedTeamId = targetTeamId;

  if (inviteCode && inviteCode.trim()) {
    const matched = resolveTeamFromInviteCode(
      inviteCode,
      SEASON_1_TEAMS,
    );
    if (!matched) {
      return {
        allowed: false,
        isSwitch: Boolean(currentMembership),
        targetTeamId: targetTeamId ?? "",
        violationCode: "INVALID_INVITE_CODE",
        reason: `Mã mời '${inviteCode}' không hợp lệ hoặc không khớp với đội nào.`,
      };
    }
    // If targetTeamId is also specified, verify consistency
    if (targetTeamId && targetTeamId !== matched.id) {
      return {
        allowed: false,
        isSwitch: Boolean(currentMembership),
        targetTeamId: targetTeamId,
        violationCode: "INVALID_INVITE_CODE",
        reason: `Mã mời '${inviteCode}' là của ${matched.name}, không khớp với đội được chọn.`,
      };
    }
    resolvedTeamId = matched.id;
  }

  if (!resolvedTeamId) {
    return {
      allowed: false,
      isSwitch: false,
      targetTeamId: "",
      violationCode: "TEAM_NOT_FOUND",
      reason: "Cần chọn một đội hợp lệ hoặc nhập mã mời.",
    };
  }

  const team = teams.find((t) => t.id === resolvedTeamId && t.enabled);
  if (!team) {
    return {
      allowed: false,
      isSwitch: false,
      targetTeamId: resolvedTeamId,
      violationCode: "TEAM_NOT_FOUND",
      reason: `Đội với mã '${resolvedTeamId}' không tồn tại hoặc đã bị vô hiệu hóa.`,
    };
  }

  // Initial Join
  if (!currentMembership) {
    return {
      allowed: true,
      isSwitch: false,
      targetTeamId: resolvedTeamId,
    };
  }

  // Already in this team
  if (currentMembership.teamId === resolvedTeamId) {
    return {
      allowed: false,
      isSwitch: false,
      targetTeamId: resolvedTeamId,
      violationCode: "ALREADY_IN_TEAM",
      reason: "Bạn đã là thành viên của đội này.",
    };
  }

  // Switch attempt
  if (currentMembership.switchCount >= MAX_TEAM_SWITCHES_PER_SEASON) {
    return {
      allowed: false,
      isSwitch: true,
      targetTeamId: resolvedTeamId,
      violationCode: "SWITCH_LIMIT_EXCEEDED",
      reason: `Bạn đã sử dụng hết quyền đổi đội trong mùa này (tối đa ${MAX_TEAM_SWITCHES_PER_SEASON} lần). Điểm số đã đóng góp được bảo toàn cho đội cũ.`,
    };
  }

  return {
    allowed: true,
    isSwitch: true,
    targetTeamId: resolvedTeamId,
  };
}

