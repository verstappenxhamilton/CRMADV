import { z } from "zod";

const BooleanString = z
  .union([z.boolean(), z.enum(["true", "false", "1", "0"])])
  .transform((val) => {
    if (typeof val === "boolean") return val;
    return val === "true" || val === "1";
  });

export const EnvSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().max(65535).default(3000),
    MOCK_PROVIDERS: BooleanString.default(false),
  })
  .refine(
    (data) => !(data.NODE_ENV === "production" && data.MOCK_PROVIDERS === true),
    {
      message: "CRÍTICO: MOCK_PROVIDERS não pode ser 'true' em ambiente de produção.",
      path: ["MOCK_PROVIDERS"],
    }
  );

export type AppEnv = z.infer<typeof EnvSchema>;

export function validateEnv(env: Record<string, unknown>): AppEnv {
  return EnvSchema.parse(env);
}
