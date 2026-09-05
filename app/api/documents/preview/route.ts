import { NextResponse } from "next/server";
import { sessionFromCookieHeader } from "@/lib/auth";
import { fetchUrl, requestBase, resolveTarget } from "@/lib/ssrf";

/**
 * Document preview service: fetches a URL and returns a text preview.
 * Accepts an optional service token for internal resources.
 */
export async function POST(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { url?: unknown; serviceToken?: unknown; headers?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof body.url !== "string" || !body.url.trim()) {
    return NextResponse.json({ error: "A URL is required." }, { status: 400 });
  }
  const target = resolveTarget(body.url, requestBase(request));
  if (!target) {
    return NextResponse.json(
      { error: "Only http(s) URLs are supported." },
      { status: 400 },
    );
  }
  const extra: Record<string, string> = {};
  if (typeof body.serviceToken === "string" && body.serviceToken.trim()) {
    extra["x-service-token"] = body.serviceToken.trim();
  }
  if (body.headers && typeof body.headers === "object") {
    for (const [k, v] of Object.entries(body.headers as Record<string, unknown>)) {
      if (typeof v === "string" && /^[a-z0-9-]+$/i.test(k)) {
        extra[k.toLowerCase()] = v.slice(0, 500);
      }
    }
  }
  try {
    const result = await fetchUrl(target, extra);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Could not fetch that URL (timeout or connection refused)." },
      { status: 502 },
    );
  }
}
