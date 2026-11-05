import { z } from "zod";

const httpUrlSchema = z
  .url()
  .refine((value) => ["http:", "https:"].includes(new URL(value).protocol), {
    message: "Must be an HTTP or HTTPS URL",
  });

const evmAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Must be a 20-byte EVM address");

const privateKeySchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{64}$/, "Must be a 32-byte hex private key");

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_GAME_L1_RPC_URL: httpUrlSchema,
  NEXT_PUBLIC_FUJI_C_RPC_URL: httpUrlSchema,
  NEXT_PUBLIC_GAME_L1_SUBNET_ID: z.string().min(1),
  NEXT_PUBLIC_FUJI_C_CHAIN_ID: z.coerce
    .number()
    .int()
    .refine((value) => value === 43113, {
      message: "Fuji C-Chain chain ID must be 43113",
    }),
  NEXT_PUBLIC_GAME_L1_TELEPORTER_MESSENGER_ADDRESS: evmAddressSchema,
  NEXT_PUBLIC_FUJI_C_TELEPORTER_MESSENGER_ADDRESS: evmAddressSchema,
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string().min(1),
});

export const serverEnvSchema = publicEnvSchema.extend({
  PROOF_SIGNER_PRIVATE_KEY: privateKeySchema,
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parsePublicEnv(
  environment: Record<string, string | undefined>,
): PublicEnv {
  return publicEnvSchema.parse(environment);
}

export function parseServerEnv(
  environment: Record<string, string | undefined>,
): ServerEnv {
  return serverEnvSchema.parse(environment);
}

