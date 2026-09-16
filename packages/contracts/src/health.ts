import { z } from "zod";

export const HealthCheckResponseSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.string().datetime(),
  version: z.string(),
  uptimeSeconds: z.number().nonnegative(),
});

export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;
