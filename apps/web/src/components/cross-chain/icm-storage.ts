/**
 * LocalStorage Persistence and Hydration for ICM Transactions
 * Reference: DeFi-Trail-PRD.md §8.2, §9.3
 */

import type { StoredICMRequest, ICMUIState } from "./types";
import { RequestStatus } from "./types";

export const DEFAULT_ICM_STORAGE_KEY = "defi_trail_pending_request";

/**
 * Safely resolves localStorage across browser and SSR/test environments
 */
function getStorage(): Storage | null {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }
  if (typeof localStorage !== "undefined") {
    return localStorage;
  }
  return null;
}

/**
 * Checks if localStorage is available and writable
 */
function isStorageAvailable(): boolean {
  try {
    const storage = getStorage();
    if (!storage) return false;
    const testKey = "__icm_test__";
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Saves a pending cross-chain request to localStorage
 */
export function savePendingRequest(
  data: StoredICMRequest,
  storageKey: string = DEFAULT_ICM_STORAGE_KEY
): void {
  const storage = getStorage();
  if (!storage || !isStorageAvailable()) return;
  try {
    storage.setItem(storageKey, JSON.stringify(data));
  } catch (err) {
    console.warn("[ICMStorage] Failed to save pending request:", err);
  }
}

/**
 * Retrieves the currently saved pending request from localStorage
 */
export function getPendingRequest(
  storageKey: string = DEFAULT_ICM_STORAGE_KEY
): StoredICMRequest | null {
  const storage = getStorage();
  if (!storage || !isStorageAvailable()) return null;
  try {
    const raw = storage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredICMRequest;
    if (!parsed || !parsed.requestId) return null;
    return parsed;
  } catch (err) {
    console.warn("[ICMStorage] Failed to read pending request:", err);
    return null;
  }
}

/**
 * Updates properties of an existing pending request
 */
export function updatePendingRequest(
  updates: Partial<StoredICMRequest>,
  storageKey: string = DEFAULT_ICM_STORAGE_KEY
): StoredICMRequest | null {
  const current = getPendingRequest(storageKey);
  if (!current) return null;
  const merged: StoredICMRequest = {
    ...current,
    ...updates,
    lastCheckedAt: Date.now(),
  };
  savePendingRequest(merged, storageKey);
  return merged;
}

/**
 * Clears the stored request from localStorage
 */
export function clearPendingRequest(
  storageKey: string = DEFAULT_ICM_STORAGE_KEY
): void {
  const storage = getStorage();
  if (!storage || !isStorageAvailable()) return;
  try {
    storage.removeItem(storageKey);
  } catch (err) {
    console.warn("[ICMStorage] Failed to clear pending request:", err);
  }
}

/**
 * Maps an on-chain RequestStatus enum to corresponding ICMUIState
 */
export function mapOnChainStatusToUIState(status: RequestStatus): ICMUIState {
  switch (status) {
    case RequestStatus.NONE:
      return "idle";
    case RequestStatus.CREATED:
    case RequestStatus.SENT:
    case RequestStatus.REMOTE_EXECUTED:
    case RequestStatus.ACK_PENDING:
      return "icm_pending";
    case RequestStatus.CONFIRMED:
      return "confirmed";
    case RequestStatus.RETRYABLE_FAILED:
      return "retryable_error";
    case RequestStatus.FAILED_FINAL:
      return "final_error";
    default:
      return "icm_pending";
  }
}
