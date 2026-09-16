import { NextResponse } from "next/server";
import { HealthCheckResponse } from "@crmadv/contracts";

const startTime = Date.now();

export async function GET() {
  const payload: HealthCheckResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "0.1.0",
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
  };

  return NextResponse.json(payload, { status: 200 });
}
