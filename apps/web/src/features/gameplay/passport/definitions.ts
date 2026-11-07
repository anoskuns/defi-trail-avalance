import type { BadgeRule, PassportStampCategory } from "@defi-trail/shared";

export type PassportBadgeKey =
  | "FIRST_CHEST"
  | "THREE_CHEST_TYPES"
  | "TRAIL_COMPLETE"
  | "FIVE_UNIQUE_H3"
  | "QUEST_LEARNER";

export type BadgeIdentityDimension = "EVENT" | "CHEST_TYPE" | "H3_CELL";

export interface PassportBadgeDefinition {
  key: PassportBadgeKey;
  title: string;
  description: string;
  unlockHint: string;
  rule: BadgeRule;
  identity: BadgeIdentityDimension;
  category: PassportStampCategory;
  artworkKey: string;
  theme: {
    accent: string;
    surface: string;
  };
}

export const PASSPORT_BADGES: readonly PassportBadgeDefinition[] = [
  {
    key: "FIRST_CHEST",
    title: "First Signal",
    description: "Your first confirmed campus chest.",
    unlockHint: "Confirm any chest on the trail.",
    rule: {
      badgeId: "FIRST_CHEST",
      ruleVersion: 1,
      eventType: "CHEST_CONFIRMED",
      threshold: 1,
      window: "LIFETIME",
    },
    identity: "EVENT",
    category: "LOCATION",
    artworkKey: "passport-first-signal",
    theme: { accent: "#38bdf8", surface: "#0c4a6e" },
  },
  {
    key: "THREE_CHEST_TYPES",
    title: "Triple Explorer",
    description: "Discover Yield, Quest, and Sponsor chest types.",
    unlockHint: "Confirm all 3 different chest types.",
    rule: {
      badgeId: "THREE_CHEST_TYPES",
      ruleVersion: 1,
      eventType: "CHEST_CONFIRMED",
      threshold: 3,
      window: "SEASON",
    },
    identity: "CHEST_TYPE",
    category: "SEASON",
    artworkKey: "passport-triple-explorer",
    theme: { accent: "#a78bfa", surface: "#4c1d95" },
  },
  {
    key: "TRAIL_COMPLETE",
    title: "Trail Complete",
    description: "A full trail confirmed from start to finish.",
    unlockHint: "Confirm every checkpoint in Today’s Trail.",
    rule: {
      badgeId: "TRAIL_COMPLETE",
      ruleVersion: 1,
      eventType: "TRAIL_COMPLETED",
      threshold: 1,
      window: "SEASON",
    },
    identity: "EVENT",
    category: "TRAIL",
    artworkKey: "passport-trail-complete",
    theme: { accent: "#34d399", surface: "#064e3b" },
  },
  {
    key: "FIVE_UNIQUE_H3",
    title: "Campus Cartographer",
    description: "Explore five distinct approved campus cells.",
    unlockHint: "Confirm chests in 5 unique H3 cells.",
    rule: {
      badgeId: "FIVE_UNIQUE_H3",
      ruleVersion: 1,
      eventType: "CHEST_CONFIRMED",
      threshold: 5,
      window: "SEASON",
    },
    identity: "H3_CELL",
    category: "LOCATION",
    artworkKey: "passport-campus-cartographer",
    theme: { accent: "#fbbf24", surface: "#78350f" },
  },
  {
    key: "QUEST_LEARNER",
    title: "Quest Learner",
    description: "Complete a verified learning quest.",
    unlockHint: "Finish and confirm one Quest lesson.",
    rule: {
      badgeId: "QUEST_LEARNER",
      ruleVersion: 1,
      eventType: "QUEST_COMPLETED",
      threshold: 1,
      window: "SEASON",
    },
    identity: "EVENT",
    category: "LEARNING",
    artworkKey: "passport-quest-learner",
    theme: { accent: "#fb7185", surface: "#881337" },
  },
] as const;

