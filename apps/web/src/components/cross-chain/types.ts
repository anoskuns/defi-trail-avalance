/**
 * Cross-Chain Interchain Messaging (ICM) Types & State Machine Definitions
 * Reference: DeFi-Trail-PRD.md §8.2, §9.3, §10.1
 */

/**
 * UI State Machine statuses for cross-chain transactions (PRD §8.2)
 */
export type ICMUIState =
  | "idle"
  | "awaiting_signature"
  | "submitted"
  | "icm_pending"
  | "confirmed"
  | "retryable_error"
  | "final_error";

/**
 * Canonical on-chain RequestStatus (PRD §9.3, §10.1)
 */
export enum RequestStatus {
  NONE = 0,
  CREATED = 1,
  SENT = 2,
  REMOTE_EXECUTED = 3,
  ACK_PENDING = 4,
  CONFIRMED = 5,
  RETRYABLE_FAILED = 6,
  FAILED_FINAL = 7,
}

/**
 * Target blockchain representation for each timeline milestone
 */
export type ChainTarget = "GAME_L1" | "FUJI_C";

/**
 * Status of an individual timeline step
 */
export type StepStatus = "pending" | "in_progress" | "completed" | "failed";

/**
 * Definition of an ICM 2-Chain Timeline step
 */
export interface ICMTimelineStep {
  id: string;
  stepNumber: number;
  chain: ChainTarget;
  chainLabel: string;
  title: string;
  description: string;
  status: StepStatus;
  txHash?: string;
  completedAt?: number;
}

/**
 * Persisted ICM pending request in localStorage (PRD §8.2 Requirement 4)
 */
export interface StoredICMRequest {
  requestId: string;
  status: ICMUIState;
  onChainStatus?: RequestStatus;
  txHash?: string;
  chestId?: string;
  chestSlot?: number;
  chestType?: "YIELD" | "QUEST" | "SPONSOR" | string;
  player?: string;
  startedAt: number;
  lastCheckedAt?: number;
  currentStepIndex: number;
  error?: string;
}

/**
 * Props for ICMProgressModal component
 */
export interface ICMProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  // State machine state
  state?: ICMUIState;
  requestId?: string;
  txHash?: string;
  chestSlot?: number;
  chestType?: string;
  errorMessage?: string;
  // Callbacks
  onCheckStatus?: (requestId: string) => Promise<void> | void;
  onRetry?: (requestId: string) => Promise<void> | void;
  onSuccessDismiss?: () => void;
  // Configuration
  storageKey?: string;
  autoRestoreOnMount?: boolean;
}

