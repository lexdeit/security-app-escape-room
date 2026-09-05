import { NextResponse } from "next/server";
import { sessionFromCookieHeader } from "@/lib/auth";
import { FLAG_FINAL } from "@/lib/secrets";

/**
 * Asset tag verification (used by Facilities + audit tooling to confirm a
 * disclosure reference without opening the vault).
 */
export async function POST(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { flag?: unknown; tag?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const value =
    typeof body.flag === "string"
      ? body.flag.trim()
      : typeof body.tag === "string"
        ? body.tag.trim()
        : "";
  if (!value) {
    return NextResponse.json({ error: "A tag is required." }, { status: 400 });
  }
  if (value === FLAG_FINAL) {
    return NextResponse.json({ valid: true, message: "Asset tag validated." });
  }
  return NextResponse.json({ valid: false, message: "Unknown asset tag." });
}
