import { NextResponse } from "next/server";
import { APP_VERSION, HealthCheckResponse } from "@crmadv/contracts";

export async function GET() {
  const payload: HealthCheckResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: APP_VERSION,
    uptimeSeconds: Math.floor(process.uptime()),
  };

  return NextResponse.json(payload, { status: 200 });
}
