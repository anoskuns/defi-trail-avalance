"use client";

import { useEffect, useState, useCallback, useId } from "react";
import type { CSSProperties } from "react";

interface TeamItem {
  id: string;
  name: string;
  description: string;
  colorKey: string;
  motto?: string;
  score?: number;
  rank?: number;
  memberCount?: number;
  contributorCount?: number;
  checkpointCount?: number;
  trailsCompleted?: number;
}

interface CommunityMilestone {
  points: number;
  label: string;
  unlockedDescription: string;
}

interface CommunityGoal {
  targetPoints: number;
  currentPoints: number;
  percentage: number;
  isUnlocked: boolean;
  unlockedMilestones: CommunityMilestone[];
  nextMilestone: CommunityMilestone | null;
}

interface PlayerMembership {
  seasonId: string;
  player: string;
  teamId: string;
  joinedAt: string;
  switchCount: number;
  contributedPoints: number;
}

interface PlayerRankingItem {
  player: string;
  teamId?: string;
  score: number;
  rank: number;
  checkpointCount: number;
  trailsCompleted: number;
  lastContributedAt: string;
}

export interface TeamLeaderboardSectionProps {
  player?: string;
  seasonId?: string;
  onRefreshEvidence?: () => void;
}

const cardStyle: CSSProperties = {
  width: "100%",
  border: "1px solid #334155",
  borderRadius: "16px",
  padding: "20px",
  background: "linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(19, 27, 46, 0.98))",
  boxShadow: "0 12px 36px rgba(0, 0, 0, 0.24)",
  color: "#F8FAFC",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export function TeamLeaderboardSection({
  player,
  seasonId = "season-1",
}: TeamLeaderboardSectionProps) {
  const playerId = player?.toLowerCase() ?? "0x000000000000000000000000000000000000dead";

  const [teams, setTeams] = useState<TeamItem[]>([]);
  const [membership, setMembership] = useState<PlayerMembership | null>(null);
  const [communityGoal, setCommunityGoal] = useState<CommunityGoal | null>(null);
  const [playerRankings, setPlayerRankings] = useState<PlayerRankingItem[]>([]);
  const [milestones, setMilestones] = useState<CommunityMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Join / Switch state
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [inviteCodeInput, setInviteCodeInput] = useState<string>("");
  const [actionPending, setActionPending] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ text: string; error?: boolean } | null>(null);

  // Tabs / Views
  const [viewMode, setViewMode] = useState<"teams" | "players" | "guide">("teams");
  const [isDemoView, setIsDemoView] = useState<boolean>(false);

  const inviteCodeInputId = useId();

  const fetchTeamData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch teams & player membership
      const teamsRes = await fetch(
        `/api/gameplay/teams?seasonId=${seasonId}&player=${playerId}`,
        { headers: { Accept: "application/json" } },
      );
      if (!teamsRes.ok) throw new Error("Không thể tải thông tin đội mùa giải.");
      const teamsJson = await teamsRes.json();

      setTeams(teamsJson.teams ?? []);
      setMembership(teamsJson.membership ?? null);
      setMilestones(teamsJson.milestones ?? []);

      // 2. Fetch active leaderboard
      const lbRes = await fetch(
        `/api/gameplay/leaderboard?seasonId=${seasonId}&includeDemo=${isDemoView}&limit=10`,
        { headers: { Accept: "application/json" } },
      );
      if (!lbRes.ok) throw new Error("Không thể tải bảng xếp hạng.");
      const lbJson = await lbRes.json();

      if (lbJson.leaderboard) {
        setCommunityGoal(lbJson.leaderboard.communityGoal);
        setPlayerRankings(lbJson.leaderboard.players?.items ?? []);

        // Merge team scores from leaderboard into team definitions
        if (lbJson.leaderboard.teams && teamsJson.teams) {
          const scoreMap = new Map(
            lbJson.leaderboard.teams.map((t: any) => [t.teamId, t]),
          );
          const merged = teamsJson.teams.map((t: any) => {
            const scoreItem = scoreMap.get(t.id) as any;
            return {
              ...t,
              score: scoreItem?.score ?? 0,
              rank: scoreItem?.rank ?? 1,
              memberCount: scoreItem?.memberCount ?? 0,
              contributorCount: scoreItem?.contributorCount ?? 0,
              checkpointCount: scoreItem?.checkpointCount ?? 0,
              trailsCompleted: scoreItem?.trailsCompleted ?? 0,
            };
          });
          // Sort by score descending
          merged.sort((a: any, b: any) => (b.score ?? 0) - (a.score ?? 0));
          setTeams(merged);
        }
      }
    } catch (err: any) {
      console.error("[TeamLeaderboard] fetch error:", err);
      setError(err.message || "Lỗi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, [seasonId, playerId, isDemoView]);

  useEffect(() => {
    fetchTeamData();
  }, [fetchTeamData]);

  const handleJoinOrSwitch = async () => {
    if (!selectedTeamId && !inviteCodeInput.trim()) {
      setActionMessage({ text: "Vui lòng chọn một đội hoặc nhập mã mời.", error: true });
      return;
    }

    try {
      setActionPending(true);
      setActionMessage(null);

      const res = await fetch("/api/gameplay/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seasonId,
          player: playerId,
          targetTeamId: selectedTeamId || undefined,
          inviteCode: inviteCodeInput.trim() || undefined,
        }),
      });

      const body = await res.json();
      if (!res.ok) {
        const errorMsg = body?.error?.message || "Không thể tham gia đội.";
        setActionMessage({ text: errorMsg, error: true });
        return;
      }

      setActionMessage({ text: body.message || "Thao tác thành công!", error: false });
      setInviteCodeInput("");
      await fetchTeamData();
    } catch (err: any) {
      setActionMessage({ text: err.message || "Lỗi kết nối.", error: true });
    } finally {
      setActionPending(false);
    }
  };

  const myTeam = teams.find((t) => t.id === membership?.teamId);

  return (
    <div style={cardStyle} aria-label="Team and Community Leaderboard">
      {/* Header & Mode Switcher */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          borderBottom: "1px solid #1E293B",
          paddingBottom: "16px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#38BDF8",
            }}
          >
            Mùa 1: Avalanche Campus Discovery • GE-09
          </div>
          <h2
            style={{
              fontSize: "1.375rem",
              fontWeight: 800,
              margin: "4px 0 0",
              color: "#F8FAFC",
            }}
          >
            🏆 Đội & Bảng Xếp Hạng Cộng Đồng
          </h2>
        </div>

        {/* View Mode Tabs */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setViewMode("teams")}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "0.8125rem",
              fontWeight: 700,
              cursor: "pointer",
              border: viewMode === "teams" ? "1px solid #38BDF8" : "1px solid #334155",
              backgroundColor: viewMode === "teams" ? "rgba(56, 189, 248, 0.2)" : "transparent",
              color: viewMode === "teams" ? "#38BDF8" : "#94A3B8",
            }}
          >
            🛡️ Bảng Xếp Hạng Đội
          </button>
          <button
            type="button"
            onClick={() => setViewMode("players")}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "0.8125rem",
              fontWeight: 700,
              cursor: "pointer",
              border: viewMode === "players" ? "1px solid #34D399" : "1px solid #334155",
              backgroundColor: viewMode === "players" ? "rgba(52, 211, 153, 0.2)" : "transparent",
              color: viewMode === "players" ? "#34D399" : "#94A3B8",
            }}
          >
            ⭐ Top Cá Nhân
          </button>
          <button
            type="button"
            onClick={() => setViewMode("guide")}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "0.8125rem",
              fontWeight: 700,
              cursor: "pointer",
              border: viewMode === "guide" ? "1px solid #F59E0B" : "1px solid #334155",
              backgroundColor: viewMode === "guide" ? "rgba(245, 158, 11, 0.2)" : "transparent",
              color: viewMode === "guide" ? "#F59E0B" : "#94A3B8",
            }}
          >
            ℹ️ Quy Tắc Tính Điểm
          </button>
          <button
            type="button"
            onClick={() => setIsDemoView(!isDemoView)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "1px dashed #64748B",
              backgroundColor: isDemoView ? "rgba(239, 68, 68, 0.2)" : "transparent",
              color: isDemoView ? "#F87171" : "#64748B",
            }}
            title="Lọc giữa BXH thi đấu chính thức và hoạt động Demo"
          >
            {isDemoView ? "🔴 Chế độ: Demo" : "🟢 Chế độ: Thi Đấu"}
          </button>
        </div>
      </div>

      {/* Community Goal Progress Bar */}
      {communityGoal && (
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: "rgba(30, 41, 59, 0.7)",
            border: "1px solid #334155",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "1.25rem" }}>🔥</span>
              <div>
                <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#F8FAFC" }}>
                  Mục Tiêu Toàn Campus: Avalanche Campus Awakening
                </div>
                <div style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
                  Đạt 10,000 điểm toàn cộng đồng để mở khóa Rương Bí Ẩn Kết Mùa
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#38BDF8" }}>
                {communityGoal.currentPoints.toLocaleString()}
              </span>
              <span style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
                {" "}
                / {communityGoal.targetPoints.toLocaleString()} pts
              </span>
              <div style={{ fontSize: "0.75rem", color: "#34D399", fontWeight: 700 }}>
                {communityGoal.percentage}% Hoàn thành
              </div>
            </div>
          </div>

          {/* Progress Bar with milestone ticks */}
          <div
            style={{
              width: "100%",
              height: "12px",
              backgroundColor: "#0F172A",
              borderRadius: "9999px",
              overflow: "hidden",
              position: "relative",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                width: `${communityGoal.percentage}%`,
                height: "100%",
                background: "linear-gradient(90deg, #38BDF8, #34D399, #F59E0B)",
                borderRadius: "9999px",
                transition: "width 0.5s ease-in-out",
              }}
            />
          </div>

          {/* Milestone Badges */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            {milestones.map((m) => {
              const unlocked = communityGoal.currentPoints >= m.points;
              return (
                <div
                  key={m.points}
                  style={{
                    padding: "6px 8px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    backgroundColor: unlocked
                      ? "rgba(52, 211, 153, 0.15)"
                      : "rgba(51, 65, 85, 0.4)",
                    border: unlocked ? "1px solid #10B981" : "1px solid #334155",
                    color: unlocked ? "#34D399" : "#64748B",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>
                    {unlocked ? "✅" : "🔒"} {m.label}
                  </div>
                  <div style={{ fontSize: "0.6875rem", opacity: 0.9 }}>
                    {m.unlockedDescription}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Player Membership Status / Join Team Banner */}
      <div
        style={{
          padding: "16px",
          borderRadius: "12px",
          backgroundColor: myTeam
            ? "rgba(15, 23, 42, 0.85)"
            : "rgba(56, 189, 248, 0.08)",
          border: myTeam
            ? `1px solid ${myTeam.colorKey || "#38BDF8"}`
            : "1px dashed rgba(56, 189, 248, 0.4)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {myTeam ? (
          <div>
            <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>
              ĐỘI CỦA BẠN (SEASON 1)
            </div>
            <div
              style={{
                fontSize: "1.125rem",
                fontWeight: 800,
                color: myTeam.colorKey,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: myTeam.colorKey,
                  display: "inline-block",
                }}
              />
              {myTeam.name}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#94A3B8", marginTop: "2px" }}>
              Điểm bạn đã đóng góp:{" "}
              <strong style={{ color: "#34D399" }}>
                {membership?.contributedPoints ?? 0} pts
              </strong>{" "}
              • Số lần đã đổi đội: {membership?.switchCount ?? 0}/1 (Tối đa 1 lần/mùa)
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#38BDF8" }}>
              ⚡ Bạn chưa gia nhập đội nào trong Mùa 1!
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#94A3B8", marginTop: "2px" }}>
              Chọn một trong 4 đội bên dưới hoặc nhập mã mời để cùng tích lũy điểm thưởng.
            </div>
          </div>
        )}

        {/* Join / Switch Controls */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <select
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            aria-label="Chọn đội thi đấu"
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #334155",
              backgroundColor: "#0F172A",
              color: "#F8FAFC",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            <option value="">-- Chọn Đội Thi Đấu --</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <input
            id={inviteCodeInputId}
            type="text"
            placeholder="Mã mời (e.g. AVAXRUSH)"
            value={inviteCodeInput}
            onChange={(e) => setInviteCodeInput(e.target.value)}
            aria-label="Mã mời tham gia đội"
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #334155",
              backgroundColor: "#0F172A",
              color: "#F8FAFC",
              fontSize: "0.8125rem",
              width: "160px",
            }}
          />

          <button
            type="button"
            onClick={handleJoinOrSwitch}
            disabled={actionPending}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "#0EA5E9",
              color: "#082F49",
              border: "none",
              fontSize: "0.8125rem",
              fontWeight: 800,
              cursor: actionPending ? "wait" : "pointer",
            }}
          >
            {actionPending
              ? "Đang xử lý..."
              : myTeam
                ? "Đổi Đội (Chuyển)"
                : "Gia Nhập Đội"}
          </button>
        </div>
      </div>

      {actionMessage && (
        <div
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "0.8125rem",
            backgroundColor: actionMessage.error
              ? "rgba(239, 68, 68, 0.15)"
              : "rgba(52, 211, 153, 0.15)",
            border: actionMessage.error ? "1px solid #EF4444" : "1px solid #10B981",
            color: actionMessage.error ? "#F87171" : "#34D399",
          }}
        >
          {actionMessage.text}
        </div>
      )}

      {/* Main Content Views */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#94A3B8" }}>
          Đang tải dữ liệu bảng xếp hạng...
        </div>
      ) : error ? (
        <div style={{ color: "#EF4444", textAlign: "center", padding: "20px" }}>
          {error}
        </div>
      ) : viewMode === "teams" ? (
        /* 1. Team Leaderboard Grid */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {teams.map((team, idx) => {
            const rankBadge = idx === 0 ? "🥇 1st" : idx === 1 ? "🥈 2nd" : idx === 2 ? "🥉 3rd" : "4th";
            const isUserTeam = membership?.teamId === team.id;

            return (
              <div
                key={team.id}
                style={{
                  border: isUserTeam
                    ? `2px solid ${team.colorKey}`
                    : "1px solid #334155",
                  borderRadius: "14px",
                  padding: "16px",
                  backgroundColor: "rgba(15, 23, 42, 0.75)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "6px",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        color: idx === 0 ? "#F59E0B" : "#E2E8F0",
                      }}
                    >
                      {rankBadge}
                    </span>
                    {isUserTeam && (
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 800,
                          color: team.colorKey,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        ĐỘI CỦA BẠN
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 800,
                      color: team.colorKey,
                      margin: "8px 0 2px",
                    }}
                  >
                    {team.name}
                  </h3>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    {team.motto || team.description}
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #1E293B",
                    paddingTop: "10px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    fontSize: "0.75rem",
                  }}
                >
                  <div>
                    <div style={{ color: "#64748B" }}>Tổng Điểm:</div>
                    <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "#38BDF8" }}>
                      {(team.score ?? 0).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "#64748B" }}>Thành Viên:</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "#F8FAFC" }}>
                      {team.memberCount ?? 0}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "#64748B" }}>Checkpoints:</div>
                    <div style={{ fontWeight: 700, color: "#34D399" }}>
                      {team.checkpointCount ?? 0}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "#64748B" }}>Đường Mòn Xong:</div>
                    <div style={{ fontWeight: 700, color: "#A78BFA" }}>
                      {team.trailsCompleted ?? 0}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === "players" ? (
        /* 2. Individual Top Contributors */
        <div
          style={{
            overflowX: "auto",
            borderRadius: "12px",
            border: "1px solid #334155",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.8125rem",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#1E293B", color: "#94A3B8" }}>
                <th style={{ padding: "10px 14px" }}>Hạng</th>
                <th style={{ padding: "10px 14px" }}>Người Chơi</th>
                <th style={{ padding: "10px 14px" }}>Đội</th>
                <th style={{ padding: "10px 14px" }}>Điểm Đóng Góp</th>
                <th style={{ padding: "10px 14px" }}>Checkpoints</th>
                <th style={{ padding: "10px 14px" }}>Đường Mòn</th>
              </tr>
            </thead>
            <tbody>
              {playerRankings.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "24px", textAlign: "center", color: "#64748B" }}>
                    Chưa có bằng chứng đóng góp điểm nào trong mùa này. Hãy hoàn thành checkpoint đầu tiên!
                  </td>
                </tr>
              ) : (
                playerRankings.map((p, idx) => {
                  const teamInfo = teams.find((t) => t.id === p.teamId);
                  const isSelf = p.player.toLowerCase() === playerId.toLowerCase();

                  return (
                    <tr
                      key={p.player}
                      style={{
                        backgroundColor: isSelf
                          ? "rgba(56, 189, 248, 0.1)"
                          : idx % 2 === 0
                            ? "rgba(15, 23, 42, 0.5)"
                            : "transparent",
                        borderBottom: "1px solid #1E293B",
                      }}
                    >
                      <td style={{ padding: "10px 14px", fontWeight: 700 }}>
                        {p.rank === 1 ? "🥇 1" : p.rank === 2 ? "🥈 2" : p.rank === 3 ? "🥉 3" : p.rank}
                      </td>
                      <td style={{ padding: "10px 14px", fontFamily: "monospace" }}>
                        {p.player.substring(0, 6)}...{p.player.substring(p.player.length - 4)}
                        {isSelf && (
                          <span
                            style={{
                              marginLeft: "6px",
                              fontSize: "0.6875rem",
                              color: "#38BDF8",
                              fontWeight: 700,
                            }}
                          >
                            (Bạn)
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ color: teamInfo?.colorKey || "#94A3B8", fontWeight: 600 }}>
                          {teamInfo?.name || "Chưa chọn đội"}
                        </span>
                      </td>
                      <td style={{ padding: "10px 14px", fontWeight: 800, color: "#34D399" }}>
                        {p.score.toLocaleString()} pts
                      </td>
                      <td style={{ padding: "10px 14px", color: "#94A3B8" }}>
                        {p.checkpointCount}
                      </td>
                      <td style={{ padding: "10px 14px", color: "#94A3B8" }}>
                        {p.trailsCompleted}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* 3. Scoring Rules & Non-Pay-to-Win Guide */
        <div
          style={{
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "1px solid #334155",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "#F8FAFC", margin: 0 }}>
              📜 Cách Thức Tích Lũy Điểm Bảng Xếp Hạng (PRD §5.4)
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "#94A3B8", margin: "4px 0 0" }}>
              Điểm số bảng xếp hạng là read model ngoài chuỗi, chỉ được sinh ra từ các bằng chứng (evidence) đã xác nhận:
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
            }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
              }}
            >
              <div style={{ color: "#38BDF8", fontWeight: 800, fontSize: "1.125rem" }}>+50 pts</div>
              <div style={{ fontWeight: 700, fontSize: "0.875rem", marginTop: "2px" }}>
                Xác Nhận Checkpoint
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Mở rương tại vị trí checkpoint và xác nhận bằng chứng on-chain.
              </div>
            </div>

            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
              }}
            >
              <div style={{ color: "#A78BFA", fontWeight: 800, fontSize: "1.125rem" }}>+200 pts</div>
              <div style={{ fontWeight: 700, fontSize: "0.875rem", marginTop: "2px" }}>
                Hoàn Thành Đường Mòn
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Khám phá đầy đủ các mốc checkpoint trong chặng đường mòn trong ngày.
              </div>
            </div>

            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
              }}
            >
              <div style={{ color: "#34D399", fontWeight: 800, fontSize: "1.125rem" }}>+150 pts</div>
              <div style={{ fontWeight: 700, fontSize: "0.875rem", marginTop: "2px" }}>
                Hoàn Thành Quest DeFi
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Gửi Mock USDC thử nghiệm vào QuestRouter và nhận xác nhận cross-chain.
              </div>
            </div>

            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
              }}
            >
              <div style={{ color: "#F59E0B", fontWeight: 800, fontSize: "1.125rem" }}>+100 pts</div>
              <div style={{ fontWeight: 700, fontSize: "0.875rem", marginTop: "2px" }}>
                Đổi Quyền Lợi Sponsor
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Xác thực voucher ưu đãi tại gian hàng hoặc quầy đối tác trong trường.
              </div>
            </div>
          </div>

          {/* Non Pay-to-Win Invariant Banner */}
          <div
            style={{
              padding: "14px",
              borderRadius: "8px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              fontSize: "0.8125rem",
              lineHeight: 1.5,
              color: "#A7F3D0",
            }}
          >
            <strong>🛡️ Cam Kết Công Bằng (Non-Pay-to-Win Boundary):</strong>
            <br />
            - Số dư tài sản nạp vào <code>YieldVault</code> hay <code>SponsorPool</code> chỉ tạo ra lãi suất DeFi thử nghiệm (Yield), <strong>tuyệt đối không</strong> được cộng dồn thành điểm số bảng xếp hạng.
            <br />
            - Điểm số chỉ phản ánh nỗ lực khám phá thực tế, hoàn thành nhiệm vụ và giải đố của sinh viên trên khuôn viên.
            <br />
            - Cơ chế đổi đội: Điểm số đã đóng góp sẽ ở lại với đội cũ, tránh hiện tượng thâu tóm điểm số vào phút chót.
          </div>
        </div>
      )}
    </div>
  );
}

