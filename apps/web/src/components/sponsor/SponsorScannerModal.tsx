"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { parseSafeJSON } from "@/lib/json";

interface SponsorProofPayload {
  player: string;
  chestId: string;
  campaignId: string;
  epoch: number;
  nonce: string;
  expiresAt: number;
  signature: string;
}

export interface SponsorProofApiResult {
  proof?: SponsorProofPayload;
  perkClaimAuthorization?: string;
  error?: { message?: string };
}

export interface SponsorScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  chestId?: string;
  walletAddress?: string;
  playerCoords?: { lat: number; lng: number; accuracyMeters?: number };
  onProofReceived?: (proofData: SponsorProofApiResult) => void;
}

export function SponsorScannerModal({
  isOpen,
  onClose,
  chestId = "0x3333333333333333333333333333333333333333333333333333333333333333",
  walletAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  playerCoords = { lat: 10.80092, lng: 106.65362, accuracyMeters: 5 },
  onProofReceived,
}: SponsorScannerModalProps) {
  const [scanMode, setScanMode] = useState<"camera" | "manual">("camera");
  const [manualCode, setManualCode] = useState<string>("demo-coffee-v1");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successProof, setSuccessProof] = useState<SponsorProofPayload | null>(null);
  const [cameraError, setCameraError] = useState<string>("");

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrContainerId = "sponsor-qr-reader-container";

  // Stop scanner safely
  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
        await scannerRef.current.clear();
      } catch (err) {
        console.warn("[SponsorScanner] Error stopping scanner:", err);
      }
      scannerRef.current = null;
    }
  };

  // Submit QR Payload to /api/proofs/sponsor
  const handleVerifyPayload = async (payload: string) => {
    if (!payload.trim() || isVerifying) return;
    try {
      setIsVerifying(true);
      setErrorMessage("");

      const res = await fetch("/api/proofs/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: walletAddress,
          chestId: chestId,
          latitude: playerCoords.lat,
          longitude: playerCoords.lng,
          accuracyMeters: playerCoords.accuracyMeters || 5,
          capturedAt: Math.floor(Date.now() / 1000),
          mode: 1, // DEMO mode
          qrPayload: payload.trim(),
        }),
      });

      const rawText = await res.text();
      const data = parseSafeJSON<SponsorProofApiResult>(rawText);

      if (!data) {
        throw new Error(`Server returned non-JSON response (HTTP ${res.status})`);
      }

      if (!res.ok || data.error || !data.proof) {
        throw new Error(data?.error?.message || `HTTP ${res.status}: Verification failed`);
      }

      setSuccessProof(data.proof);
      await stopScanner();

      if (onProofReceived) {
        onProofReceived(data);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to verify sponsor QR code",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  // Initialize camera scanner when modal opens in camera mode
  useEffect(() => {
    if (!isOpen || scanMode !== "camera" || successProof) return;

    let isCancelled = false;

    async function initCamera() {
      try {
        setCameraError("");
        const html5Qr = new Html5Qrcode(qrContainerId);
        scannerRef.current = html5Qr;

        const config = { fps: 10, qrbox: { width: 220, height: 220 } };

        await html5Qr.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            if (!isCancelled) {
              handleVerifyPayload(decodedText);
            }
          },
          () => {
            // Ignore frame parse errors
          }
        );
      } catch (err: unknown) {
        if (!isCancelled) {
          console.warn("[SponsorScanner] Camera initialization failed:", err);
          setCameraError(
            err instanceof Error
              ? err.message
              : "Camera permission denied or not supported on this device.",
          );
          // Auto switch to manual fallback mode
          setScanMode("manual");
        }
      }
    }

    const timer = setTimeout(initCamera, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      stopScanner();
    };
  }, [isOpen, scanMode, successProof]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(3, 7, 18, 0.8)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#0B0F19",
          border: "1px solid #1E293B",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(16, 185, 129, 0.2)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #1E293B",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#34D399",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  textTransform: "uppercase",
                }}
              >
                Sponsor Chest • Proof check
              </span>
            </div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#F8FAFC", margin: 0 }}>
              Quét Mã QR Nhà Tài Trợ
            </h2>
          </div>

          <button
            type="button"
            onClick={async () => {
              await stopScanner();
              onClose();
            }}
            aria-label="Close scanner"
            style={{
              background: "none",
              border: "1px solid #334155",
              color: "#94A3B8",
              cursor: "pointer",
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: "0.875rem",
            }}
          >
            ✕
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #1E293B",
            backgroundColor: "rgba(15, 23, 42, 0.4)",
          }}
        >
          <button
            type="button"
            onClick={async () => {
              await stopScanner();
              setScanMode("camera");
            }}
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: scanMode === "camera" ? "#10B981" : "#94A3B8",
              borderBottom: scanMode === "camera" ? "2px solid #10B981" : "2px solid transparent",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              cursor: "pointer",
            }}
          >
            Quét Camera
          </button>
          <button
            type="button"
            onClick={async () => {
              await stopScanner();
              setScanMode("manual");
            }}
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: scanMode === "manual" ? "#10B981" : "#94A3B8",
              borderBottom: scanMode === "manual" ? "2px solid #10B981" : "2px solid transparent",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              cursor: "pointer",
            }}
          >
            Nhập Mã Thủ Công
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "8px",
            }}
            aria-label="Sponsor asset boundary"
          >
            <div style={{ border: "1px solid #334155", borderRadius: "8px", padding: "10px 12px" }}>
              <strong style={{ display: "block", color: "#E2E8F0", fontSize: "0.75rem" }}>
                Mock USDC
              </strong>
              <span style={{ display: "block", color: "#94A3B8", fontSize: "0.7rem", marginTop: "3px", lineHeight: 1.4 }}>
                Test-only C-Chain accounting. Not money or a redeemable voucher.
              </span>
            </div>
            <div style={{ border: "1px solid #334155", borderRadius: "8px", padding: "10px 12px" }}>
              <strong style={{ display: "block", color: "#E2E8F0", fontSize: "0.75rem" }}>
                Sponsor perk
              </strong>
              <span style={{ display: "block", color: "#94A3B8", fontSize: "0.7rem", marginTop: "3px", lineHeight: 1.4 }}>
                Separate promotional claim available only after ICM confirmation.
              </span>
            </div>
          </div>

          {cameraError && (
            <div
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "0.75rem",
                color: "#FBBF24",
              }}
            >
              {cameraError} (Đã chuyển sang chế độ nhập mã thủ công)
            </div>
          )}

          {scanMode === "camera" && !successProof ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                id={qrContainerId}
                style={{
                  width: "100%",
                  minHeight: "260px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#030712",
                  border: "2px dashed #334155",
                }}
              />
              <p style={{ marginTop: "10px", fontSize: "0.75rem", color: "#94A3B8", textAlign: "center" }}>
                Hướng camera về phía mã QR tại quầy nhà tài trợ (Student Center Coffee Spot).
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label htmlFor="manual-code-input" style={{ fontSize: "0.8125rem", color: "#94A3B8", fontWeight: 600 }}>
                Nhập payload hoặc voucher code từ nhà tài trợ:
              </label>

              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  id="manual-code-input"
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Ví dụ: demo-coffee-v1"
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "#F8FAFC",
                    fontSize: "0.875rem",
                    fontFamily: "monospace",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setManualCode("demo-coffee-v1")}
                  style={{
                    backgroundColor: "rgba(30, 41, 59, 0.8)",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    padding: "0 12px",
                    fontSize: "0.75rem",
                    color: "#38BDF8",
                    cursor: "pointer",
                  }}
                  title="Điền mã demo Coffee Spot"
                >
                  Mẫu Demo
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleVerifyPayload(manualCode)}
                disabled={isVerifying || !manualCode.trim()}
                style={{
                  backgroundColor: "#10B981",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  cursor: isVerifying || !manualCode.trim() ? "not-allowed" : "pointer",
                  minHeight: "44px",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)",
                }}
              >
                {isVerifying ? "Đang xác thực qua Proof API..." : "Xác Thực Mã Sponsor"}
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "0.8125rem",
                color: "#F87171",
              }}
            >
              {errorMessage}
            </div>
          )}

          {/* Success Proof Feedback */}
          {successProof && (
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.45)",
                borderRadius: "10px",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#34D399", fontWeight: 700 }}>SponsorProof hợp lệ</span>
              </div>
              <p style={{ margin: 0, fontSize: "0.8125rem", color: "#A7F3D0" }}>
                Chữ ký EIP-712 đã được cấp. Bước tiếp theo gửi Sponsor Chest qua ICM. Perk chỉ có thể claim sau trạng thái CONFIRMED và không phải là Mock USDC.
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "#10B981",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 14px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  cursor: "pointer",
                }}
              >
                Tiếp tục xác nhận ICM
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

