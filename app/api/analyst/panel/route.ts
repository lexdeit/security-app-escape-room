import { NextResponse } from "next/server";
import {
  sessionFromCookieHeader,
  ssoSessionFromHeaders,
  verifySession,
} from "@/lib/auth";
import { TICKETS } from "@/lib/data";
import { VAULT_PART_2 } from "@/lib/secrets";

/**
 * Analytics workspace data feed for Security Operations.
 */
export async function GET(request: Request) {
  let session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    session = await verifySession(bearer);
  }
  // SOC staff signing in through corporate SSO carry their role there.
  let role = session?.role;
  if (!session) {
    const sso = await ssoSessionFromHeaders(request.headers);
    if (sso) role = sso.role;
  }
  if (!session && !role) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  if (role !== "analyst" && role !== "admin") {
    return NextResponse.json(
      { error: "Reserved for Security Operations analysts." },
      { status: 403 },
    );
  }
  return NextResponse.json({
    workspace: "analytics",
    queue: TICKETS.filter(
      (t) => t.tag === "phishing" || t.tag === "compliance" || t.tag === "access",
    ),
    "custodian-2": VAULT_PART_2,
    note: "Second custodian fragment (procedure VAULT-2026-04). The compliance vault (/vault) requires custodian-1 + custodian-2 + the internal service token.",
  });
}
