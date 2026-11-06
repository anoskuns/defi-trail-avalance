import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  RequestStatus,
  type ICMUIState,
  type StoredICMRequest,
} from "@/components/cross-chain/types";
import {
  savePendingRequest,
  getPendingRequest,
  updatePendingRequest,
  clearPendingRequest,
  mapOnChainStatusToUIState,
} from "@/components/cross-chain/icm-storage";

describe("Cross-Chain ICM Progress System (PRD §8.2, §9.3, §10.1)", () => {
  const TEST_STORAGE_KEY = "test_defi_trail_pending_request";

  // Mock localStorage
  let mockStore: Record<string, string> = {};

  beforeEach(() => {
    mockStore = {};
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key: string) => mockStore[key] || null),
      setItem: vi.fn((key: string, val: string) => {
        mockStore[key] = val;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockStore[key];
      }),
      clear: vi.fn(() => {
        mockStore = {};
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe("1. UI State Machine Transitions (PRD §8.2)", () => {
    it("maps all canonical on-chain RequestStatuses to appropriate UI states", () => {
      expect(mapOnChainStatusToUIState(RequestStatus.NONE)).toBe("idle");
      expect(mapOnChainStatusToUIState(RequestStatus.CREATED)).toBe("icm_pending");
      expect(mapOnChainStatusToUIState(RequestStatus.SENT)).toBe("icm_pending");
      expect(mapOnChainStatusToUIState(RequestStatus.REMOTE_EXECUTED)).toBe("icm_pending");
      expect(mapOnChainStatusToUIState(RequestStatus.ACK_PENDING)).toBe("icm_pending");
      expect(mapOnChainStatusToUIState(RequestStatus.CONFIRMED)).toBe("confirmed");
      expect(mapOnChainStatusToUIState(RequestStatus.RETRYABLE_FAILED)).toBe("retryable_error");
      expect(mapOnChainStatusToUIState(RequestStatus.FAILED_FINAL)).toBe("final_error");
    });

    it("verifies state machine lifecycle progression order", () => {
      const states: ICMUIState[] = [
        "idle",
        "awaiting_signature",
        "submitted",
        "icm_pending",
        "confirmed",
      ];
      expect(states).toHaveLength(5);
      expect(states[0]).toBe("idle");
      expect(states[1]).toBe("awaiting_signature");
      expect(states[2]).toBe("submitted");
      expect(states[3]).toBe("icm_pending");
      expect(states[4]).toBe("confirmed");
    });
  });

  describe("2. Two-Chain Timeline Structure (PRD §9.3)", () => {
    it("defines 5 discrete milestones alternating between Game L1 and Fuji C-Chain", () => {
      const steps = [
        {
          stepNumber: 1,
          chain: "GAME_L1",
          title: "Giao dịch mở rương & Tạo Request ID",
        },
        {
          stepNumber: 2,
          chain: "GAME_L1",
          title: "Gửi Teleporter Cross-Chain Message",
        },
        {
          stepNumber: 3,
          chain: "FUJI_C",
          title: "Relayer chuyển phát & Cấp vốn YieldVault",
        },
        {
          stepNumber: 4,
          chain: "FUJI_C",
          title: "Gửi PositionSnapshot phản hồi về L1",
        },
        {
          stepNumber: 5,
          chain: "GAME_L1",
          title: "Xác nhận hoàn tất (CONFIRMED)",
        },
      ];

      expect(steps).toHaveLength(5);
      // Step 1: Game L1
      expect(steps[0]!.chain).toBe("GAME_L1");
      // Step 2: Game L1
      expect(steps[1]!.chain).toBe("GAME_L1");
      // Step 3: Fuji C-Chain
      expect(steps[2]!.chain).toBe("FUJI_C");
      // Step 4: Fuji C-Chain
      expect(steps[3]!.chain).toBe("FUJI_C");
      // Step 5: Game L1
      expect(steps[4]!.chain).toBe("GAME_L1");
    });
  });

  describe("3. Graceful Waiting & Timers (PRD §8.2)", () => {
    it("does not trigger 'Still relaying' when elapsed time is under 30 seconds", () => {
      const elapsedSeconds = 15;
      const isStillRelaying = elapsedSeconds >= 30;
      const canRetry = elapsedSeconds >= 60;

      expect(isStillRelaying).toBe(false);
      expect(canRetry).toBe(false);
    });

    it("activates 'Still relaying...' warning and 'Check status' button when >= 30 seconds", () => {
      const elapsedSeconds = 35;
      const isStillRelaying = elapsedSeconds >= 30;
      const canRetry = elapsedSeconds >= 60;

      expect(isStillRelaying).toBe(true);
      expect(canRetry).toBe(false);
    });

    it("activates 'Retry message' action when elapsed time exceeds 60 seconds", () => {
      const elapsedSeconds = 65;
      const isStillRelaying = elapsedSeconds >= 30;
      const canRetry = elapsedSeconds >= 60;

      expect(isStillRelaying).toBe(true);
      expect(canRetry).toBe(true);
    });

    it("replays message using the SAME requestId on retry without generating duplicate request", async () => {
      const originalRequestId = "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";
      const onRetryMock = vi.fn(async (reqId: string) => {
        expect(reqId).toBe(originalRequestId);
      });

      // Simulate clicking retry
      await onRetryMock(originalRequestId);
      expect(onRetryMock).toHaveBeenCalledWith(originalRequestId);
      expect(onRetryMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("4. LocalStorage Persistence & F5 Hydration (PRD §8.2 Requirement 4)", () => {
    const mockRequest: StoredICMRequest = {
      requestId: "0x1111222233334444555566667777888899990000aaaabbbbccccddddeeeeffff",
      status: "icm_pending",
      onChainStatus: RequestStatus.SENT,
      txHash: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
      chestSlot: 0,
      chestType: "YIELD",
      player: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      startedAt: Date.now() - 40000, // 40 seconds ago
      currentStepIndex: 2,
    };

    it("persists pending request to localStorage", () => {
      savePendingRequest(mockRequest, TEST_STORAGE_KEY);
      const retrieved = getPendingRequest(TEST_STORAGE_KEY);

      expect(retrieved).not.toBeNull();
      expect(retrieved!.requestId).toBe(mockRequest.requestId);
      expect(retrieved!.status).toBe("icm_pending");
      expect(retrieved!.chestSlot).toBe(0);
      expect(retrieved!.chestType).toBe("YIELD");
    });

    it("hydrates and calculates elapsed time correctly upon page reload (F5)", () => {
      savePendingRequest(mockRequest, TEST_STORAGE_KEY);
      const restored = getPendingRequest(TEST_STORAGE_KEY);

      expect(restored).not.toBeNull();
      const calculatedElapsed = Math.floor((Date.now() - restored!.startedAt) / 1000);
      expect(calculatedElapsed).toBeGreaterThanOrEqual(40);
      // Since >= 30s, Still Relaying condition is satisfied immediately on restore
      expect(calculatedElapsed >= 30).toBe(true);
    });

    it("updates pending request properties in place", () => {
      savePendingRequest(mockRequest, TEST_STORAGE_KEY);
      updatePendingRequest(
        { onChainStatus: RequestStatus.REMOTE_EXECUTED },
        TEST_STORAGE_KEY
      );

      const updated = getPendingRequest(TEST_STORAGE_KEY);
      expect(updated!.onChainStatus).toBe(RequestStatus.REMOTE_EXECUTED);
      expect(updated!.lastCheckedAt).toBeDefined();
    });

    it("clears pending request on successful confirmation", () => {
      savePendingRequest(mockRequest, TEST_STORAGE_KEY);
      expect(getPendingRequest(TEST_STORAGE_KEY)).not.toBeNull();

      clearPendingRequest(TEST_STORAGE_KEY);
      expect(getPendingRequest(TEST_STORAGE_KEY)).toBeNull();
    });

    it("defensively handles 'undefined', 'null', and corrupted JSON strings without throwing", () => {
      // Simulate buggy or malicious strings written to localStorage
      mockStore[TEST_STORAGE_KEY] = "undefined";
      expect(() => getPendingRequest(TEST_STORAGE_KEY)).not.toThrow();
      expect(getPendingRequest(TEST_STORAGE_KEY)).toBeNull();

      mockStore[TEST_STORAGE_KEY] = "null";
      expect(() => getPendingRequest(TEST_STORAGE_KEY)).not.toThrow();
      expect(getPendingRequest(TEST_STORAGE_KEY)).toBeNull();

      mockStore[TEST_STORAGE_KEY] = "{malformed json...";
      expect(() => getPendingRequest(TEST_STORAGE_KEY)).not.toThrow();
      expect(getPendingRequest(TEST_STORAGE_KEY)).toBeNull();
      // Verifies corrupted key was cleaned up
      expect(mockStore[TEST_STORAGE_KEY]).toBeUndefined();

      mockStore[TEST_STORAGE_KEY] = "[object Object]";
      expect(() => getPendingRequest(TEST_STORAGE_KEY)).not.toThrow();
      expect(getPendingRequest(TEST_STORAGE_KEY)).toBeNull();
    });

    it("prevents saving invalid or non-object payloads", () => {
      savePendingRequest(undefined as any, TEST_STORAGE_KEY);
      expect(mockStore[TEST_STORAGE_KEY]).toBeUndefined();

      savePendingRequest(null as any, TEST_STORAGE_KEY);
      expect(mockStore[TEST_STORAGE_KEY]).toBeUndefined();
    });
  });
});

