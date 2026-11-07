import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { GET as getMapConfig } from "../src/app/api/map-config/route";
import { POST as postLocationProof } from "../src/app/api/proofs/location/route";
import { POST as postSponsorProof } from "../src/app/api/proofs/sponsor/route";
import { POST as postFaucetGas } from "../src/app/api/faucet/gas/route";
import { DEMO_CAMPUS_SLOTS, getDemoCampusConfig } from "../src/lib/campus";
import { createSignedSponsorQrPayload } from "../src/lib/proof-signer";
import { resetRateLimits } from "../src/lib/rate-limiter";
import { computeH3Cell } from "../src/lib/geo";

describe("API Endpoints", () => {
  const testWallet = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

  beforeEach(() => {
    resetRateLimits();
  });

  // =========================================================================
  // 1. GET /api/map-config
  // =========================================================================
  describe("GET /api/map-config", () => {
    it("returns 200 with valid campus config and 5 slots (PRD §10.3, §11.2)", async () => {
      const res = await getMapConfig();
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.campusId).toBe("demo-campus-v1");
      expect(data.epochSeconds).toBe(86400);
      expect(data.h3Resolution).toBe(10);
      expect(data.center).toEqual({ lat: 10.8012, lng: 106.6531 });
      expect(data.demoLocationEnabled).toBe(true);
      expect(data.chains).toBeDefined();
      expect(data.chains.gameL1).toBeDefined();
      expect(data.chains.fujiC).toBeDefined();
      expect(data.chains.fujiC.chainId).toBe(43113);

      expect(data.slots).toHaveLength(5);

      // Verify each slot uses dynamically computed H3 resolution 10
      for (let i = 0; i < 5; i++) {
        const slot = data.slots[i];
        const seed = DEMO_CAMPUS_SLOTS[i];
        expect(slot.slot).toBe(seed.slot);
        expect(slot.type).toBe(seed.type);
        expect(slot.lat).toBe(seed.lat);
        expect(slot.lng).toBe(seed.lng);
        expect(slot.h3Cell).toBe(computeH3Cell(seed.lat, seed.lng, 10));
        expect(slot.chestId).toMatch(/^0x[a-fA-F0-9]{64}$/);
      }

      // Slot 2 must be SPONSOR with demo-coffee-v1
      expect(data.slots[2].type).toBe("SPONSOR");
      expect(data.slots[2].sponsorCampaign).toBe("demo-coffee-v1");
      expect(data.slots[2].campaignIdHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
    });
  });

  // =========================================================================
  // 2. POST /api/proofs/location
  // =========================================================================
  describe("POST /api/proofs/location", () => {
    it("successfully issues LocationProof when within radius (PRD §5.2)", async () => {
      const mapConfig = getDemoCampusConfig();
      const slot0 = mapConfig.slots[0];
      const nowSec = Math.floor(Date.now() / 1000);

      const req = new NextRequest("http://localhost:3000/api/proofs/location", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chestId: slot0.chestId,
          latitude: slot0.lat,
          longitude: slot0.lng,
          accuracyMeters: 10,
          capturedAt: nowSec,
          mode: 0,
        }),
      });

      const res = await postLocationProof(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.proof).toBeDefined();
      expect(data.proof.player).toBe(testWallet.toLowerCase());
      expect(data.proof.chestId).toBe(slot0.chestId);
      expect(data.proof.radiusMeters).toBe(30);
      expect(data.proof.mode).toBe(0);
      expect(data.proof.signature).toMatch(/^0x[a-fA-F0-9]{130}$/);
      // Raw GPS must NOT be in the response
      expect(data.latitude).toBeUndefined();
      expect(data.longitude).toBeUndefined();
    });

    it("rejects low accuracy (> 50m) with LOW_ACCURACY code (PRD §5.2)", async () => {
      const mapConfig = getDemoCampusConfig();
      const slot0 = mapConfig.slots[0];
      const nowSec = Math.floor(Date.now() / 1000);

      const req = new NextRequest("http://localhost:3000/api/proofs/location", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chestId: slot0.chestId,
          latitude: slot0.lat,
          longitude: slot0.lng,
          accuracyMeters: 55, // > 50m
          capturedAt: nowSec,
        }),
      });

      const res = await postLocationProof(req);
      expect(res.status).toBe(400);

      const body = await res.json();
      expect(body.error).toBeDefined();
      expect(body.error.code).toBe("LOW_ACCURACY");
      expect(body.error.retryable).toBe(true);
    });

    it("rejects stale timestamp (> 30s) with STALE_LOCATION code (PRD §5.2)", async () => {
      const mapConfig = getDemoCampusConfig();
      const slot0 = mapConfig.slots[0];
      const staleTime = Math.floor(Date.now() / 1000) - 45; // 45s ago

      const req = new NextRequest("http://localhost:3000/api/proofs/location", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chestId: slot0.chestId,
          latitude: slot0.lat,
          longitude: slot0.lng,
          accuracyMeters: 10,
          capturedAt: staleTime,
        }),
      });

      const res = await postLocationProof(req);
      expect(res.status).toBe(400);

      const body = await res.json();
      expect(body.error).toBeDefined();
      expect(body.error.code).toBe("STALE_LOCATION");
      expect(body.error.retryable).toBe(true);
    });

    it("rejects position outside radius with OUTSIDE_RADIUS code (PRD §5.2)", async () => {
      const mapConfig = getDemoCampusConfig();
      const slot0 = mapConfig.slots[0];
      const nowSec = Math.floor(Date.now() / 1000);

      // Lat/lng 1000m away
      const req = new NextRequest("http://localhost:3000/api/proofs/location", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chestId: slot0.chestId,
          latitude: slot0.lat + 0.01,
          longitude: slot0.lng + 0.01,
          accuracyMeters: 5,
          capturedAt: nowSec,
        }),
      });

      const res = await postLocationProof(req);
      expect(res.status).toBe(400);

      const body = await res.json();
      expect(body.error).toBeDefined();
      expect(body.error.code).toBe("OUTSIDE_RADIUS");
      expect(body.error.retryable).toBe(true);
    });

    it("rejects non-existent chestId with CHEST_INACTIVE code", async () => {
      const nowSec = Math.floor(Date.now() / 1000);

      const req = new NextRequest("http://localhost:3000/api/proofs/location", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chestId: "0x0000000000000000000000000000000000000000000000000000000000000099",
          latitude: 10.8012,
          longitude: 106.6531,
          accuracyMeters: 10,
          capturedAt: nowSec,
        }),
      });

      const res = await postLocationProof(req);
      expect(res.status).toBe(404);

      const body = await res.json();
      expect(body.error.code).toBe("CHEST_INACTIVE");
    });
  });

  // =========================================================================
  // 3. POST /api/proofs/sponsor
  // =========================================================================
  describe("POST /api/proofs/sponsor", () => {
    it("successfully issues SponsorProof when QR and location are valid (PRD §4.4, §10.3)", async () => {
      const mapConfig = getDemoCampusConfig();
      const sponsorSlot = mapConfig.slots[2]; // Slot 2 is SPONSOR
      const nowSec = Math.floor(Date.now() / 1000);

      const qrPayload = createSignedSponsorQrPayload({
        campaignId: "demo-coffee-v1",
        chestId: sponsorSlot.chestId,
        expiresAt: nowSec + 3600,
      });

      const req = new NextRequest("http://localhost:3000/api/proofs/sponsor", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chestId: sponsorSlot.chestId,
          latitude: sponsorSlot.lat,
          longitude: sponsorSlot.lng,
          accuracyMeters: 10,
          capturedAt: nowSec,
          qrPayload,
        }),
      });

      const res = await postSponsorProof(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.proof).toBeDefined();
      expect(data.proof.player).toBe(testWallet.toLowerCase());
      expect(data.proof.chestId).toBe(sponsorSlot.chestId);
      expect(data.proof.campaignId).toBe(sponsorSlot.campaignIdHash);
      expect(data.proof.signature).toMatch(/^0x[a-fA-F0-9]{130}$/);
      expect(data.perkClaimAuthorization).toMatch(/^spka_[A-Za-z0-9_-]{43}$/);
      expect(data.perkClaimAuthorization).not.toContain(testWallet.toLowerCase());
      expect(data.perkClaimAuthorization).not.toContain("demo-coffee-v1");
    });

    it("rejects expired QR payload with INVALID_QR", async () => {
      const mapConfig = getDemoCampusConfig();
      const sponsorSlot = mapConfig.slots[2];
      const nowSec = Math.floor(Date.now() / 1000);

      const qrPayload = JSON.stringify({
        campaignId: "demo-coffee-v1",
        chestId: sponsorSlot.chestId,
        expiresAt: nowSec - 100, // Expired
      });

      const req = new NextRequest("http://localhost:3000/api/proofs/sponsor", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chestId: sponsorSlot.chestId,
          latitude: sponsorSlot.lat,
          longitude: sponsorSlot.lng,
          accuracyMeters: 10,
          capturedAt: nowSec,
          qrPayload,
        }),
      });

      const res = await postSponsorProof(req);
      expect(res.status).toBe(400);

      const body = await res.json();
      expect(body.error.code).toBe("INVALID_QR");
    });

    it("rejects sponsor proof request for non-sponsor chest", async () => {
      const mapConfig = getDemoCampusConfig();
      const yieldSlot = mapConfig.slots[0]; // Slot 0 is YIELD
      const nowSec = Math.floor(Date.now() / 1000);

      const req = new NextRequest("http://localhost:3000/api/proofs/sponsor", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chestId: yieldSlot.chestId,
          latitude: yieldSlot.lat,
          longitude: yieldSlot.lng,
          accuracyMeters: 10,
          capturedAt: nowSec,
          qrPayload: JSON.stringify({ campaignId: "demo-coffee-v1" }),
        }),
      });

      const res = await postSponsorProof(req);
      expect(res.status).toBe(400);

      const body = await res.json();
      expect(body.error.code).toBe("INVALID_CHEST_TYPE");
    });
  });

  // =========================================================================
  // 4. POST /api/faucet/gas
  // =========================================================================
  describe("POST /api/faucet/gas", () => {
    it("successfully dispenses gas and enforces 1 claim per epoch (PRD §4.1, §10.3, §12.1)", async () => {
      // 1. First claim succeeds
      const req1 = new NextRequest("http://localhost:3000/api/faucet/gas", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chainKey: "fujiC",
        }),
      });

      const res1 = await postFaucetGas(req1);
      expect(res1.status).toBe(200);

      const data1 = await res1.json();
      expect(data1.success).toBe(true);
      expect(data1.amount).toBe("0.05 AVAX");
      expect(data1.chainKey).toBe("fujiC");
      expect(data1.txHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
      expect(data1.nextEligibleTime).toBeGreaterThan(Math.floor(Date.now() / 1000));

      // 2. Second claim in same epoch is rejected with RATE_LIMITED
      const req2 = new NextRequest("http://localhost:3000/api/faucet/gas", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chainKey: "fujiC",
        }),
      });

      const res2 = await postFaucetGas(req2);
      expect(res2.status).toBe(429);

      const body2 = await res2.json();
      expect(body2.error).toBeDefined();
      expect(body2.error.code).toBe("RATE_LIMITED");
      expect(body2.error.retryable).toBe(false);

      // 3. Different chain (gameL1) is still allowed in the same epoch
      const req3 = new NextRequest("http://localhost:3000/api/faucet/gas", {
        method: "POST",
        body: JSON.stringify({
          wallet: testWallet,
          chainKey: "gameL1",
        }),
      });

      const res3 = await postFaucetGas(req3);
      expect(res3.status).toBe(200);
      const data3 = await res3.json();
      expect(data3.amount).toBe("0.10 GAS");
    });

    it("rejects invalid wallet or chainKey", async () => {
      const req = new NextRequest("http://localhost:3000/api/faucet/gas", {
        method: "POST",
        body: JSON.stringify({
          wallet: "invalid-address",
          chainKey: "unknownChain",
        }),
      });

      const res = await postFaucetGas(req);
      expect(res.status).toBe(400);

      const body = await res.json();
      expect(body.error.code).toBe("INVALID_PAYLOAD");
    });
  });

  // =========================================================================
  // 5. Error Envelope Conformance (PRD §10.4)
  // =========================================================================
  describe("Error Envelope schema compliance", () => {
    it("conforms to { error: { code, message, retryable } } structure", async () => {
      const req = new NextRequest("http://localhost:3000/api/proofs/location", {
        method: "POST",
        body: "invalid-json",
      });

      const res = await postLocationProof(req);
      expect(res.status).toBe(400);

      const body = await res.json();
      expect(body).toHaveProperty("error");
      expect(typeof body.error.code).toBe("string");
      expect(typeof body.error.message).toBe("string");
      expect(typeof body.error.retryable).toBe("boolean");
    });
  });
});

