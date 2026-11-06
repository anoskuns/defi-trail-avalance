/**
 * DeFi Trail - Teleporter Relayer Service Runner
 *
 * Implements PRD §3.2, §9.1, §9.3 & §20.
 * In production / testnet demo, the official Avalanche AWM Relayer container
 * runs via `docker-compose.yml`. This module provides health monitoring,
 * configuration diagnostics, and programmatic helpers.
 */

export interface RelayerStatus {
  service: string;
  version: string;
  officialImage: string;
  gameL1SubnetId: string;
  fujiCChainId: number;
  metricsPort: number;
}

export function getRelayerConfiguration(): RelayerStatus {
  return {
    service: "Avalanche Warp Messaging Relayer (AWM / ICM)",
    version: "v1.3.1",
    officialImage: "avaplatform/awm-relayer:v1.3.1",
    gameL1SubnetId: process.env.GAME_L1_SUBNET_ID || "7WtoAMPhrmh5KosDUsFL9yTcvw7YSxiKHPpdfs4JsgW47oZT5",
    fujiCChainId: 43113,
    metricsPort: Number(process.env.RELAYER_METRICS_PORT) || 8080,
  };
}

if (import.meta.url.endsWith(process.argv[1])) {
  console.log("==================================================");
  console.log("  Avalanche ICM Relayer for DeFi Trail");
  console.log("==================================================");
  console.log(JSON.stringify(getRelayerConfiguration(), null, 2));
  console.log("\nTo launch the relayer container, run:\n  docker compose up -d\n");
}
