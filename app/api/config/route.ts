import { NextResponse } from "next/server";

/**
 * Runtime wiring consumed by the portal frontend (feature flags and the
 * internal endpoint map used during the intranet migration).
 */
export async function GET() {
  return NextResponse.json({
    app: "Acme Employee Portal",
    version: "2.4.1",
    supportEmail: "helpdesk@acme-corp.com",
    features: {
      complianceVault: true,
      analystWorkspace: true,
      linkChecker: true,
      outgoingWebhooks: true,
    },
    internal: {
      archive: "/api/shadow/archive",
      linkChecker: "/api/scanner",
      analystWorkspace: "/analyst",
      vault: "/vault",
    },
  });
}
