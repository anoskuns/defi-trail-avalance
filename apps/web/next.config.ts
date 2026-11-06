import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@x402/core/client": "./src/lib/empty-module.ts",
      "@x402/evm/exact/client": "./src/lib/empty-module.ts",
      "@x402/evm/upto/client": "./src/lib/empty-module.ts",
      "@x402/svm/exact/client": "./src/lib/empty-module.ts",
      "@x402/evm": "./src/lib/empty-module.ts",
    },
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@x402/core/client": false,
      "@x402/evm/exact/client": false,
      "@x402/evm/upto/client": false,
      "@x402/svm/exact/client": false,
      "@x402/evm": false,
    };
    return config;
  },
};

export default nextConfig;
