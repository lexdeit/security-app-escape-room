import { NextResponse } from "next/server";
import { sessionFromCookieHeader } from "@/lib/auth";
import {
  FLAG_FINAL,
  INTERNAL_API_TOKEN,
  NOTIFY_CONTACT,
  VAULT_PART_1,
  VAULT_PART_2,
} from "@/lib/secrets";

/**
 * Compliance vault disclosure (procedure VAULT-2026-04). All three
 * authorization values must be presented together; partial submissions are
 * rejected without indicating which value was wrong.
 */
export async function POST(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { part1?: unknown; part2?: unknown; serviceToken?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const part1 = typeof body.part1 === "string" ? body.part1.trim() : "";
  const part2 = typeof body.part2 === "string" ? body.part2.trim() : "";
  const serviceToken =
    typeof body.serviceToken === "string" ? body.serviceToken.trim() : "";

  if (
    !part1 ||
    !part2 ||
    !serviceToken ||
    part1 !== VAULT_PART_1 ||
    part2 !== VAULT_PART_2 ||
    serviceToken !== INTERNAL_API_TOKEN
  ) {
    return NextResponse.json(
      { error: "Authorization failed. The three values must be presented together." },
      { status: 403 },
    );
  }

  return NextResponse.json({
    ok: true,
    memo: [
      "ACME CORPORATION — DECLASSIFIED DISCLOSURE (VAULT-2026-04)",
      "",
      "From: V. Ashford, Chief Executive Officer",
      "Subject: Q4 review and external audit sign-off",
      "",
      "The board has completed its review. As part of the 2026 external",
      "audit run with Global Cyber Security, this portal was scoped as the",
      "assessment target. Full compromise of this system demonstrates",
      "complete control of our internal processes.",
      "",
      "The team that first extracts this memo's disclosure reference has",
      "fully compromised the portal. Report it as instructed below.",
    ].join("\n"),
    reference: FLAG_FINAL,
    notify: `To confirm the assessment, send this disclosure reference to ${NOTIFY_CONTACT} from your team channel, including your team name. The first valid report wins.`,
  });
}
