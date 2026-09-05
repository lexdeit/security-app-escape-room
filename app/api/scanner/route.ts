import { NextResponse } from "next/server";
import { sessionFromCookieHeader } from "@/lib/auth";
import { fetchUrl, requestBase, resolveTarget } from "@/lib/ssrf";

/**
 * Link inspection service (used by Settings > Outgoing webhook and the
 * document migration tooling). Fetches a URL server-side and summarizes
 * the response. An optional service token is forwarded for internal hosts.
 */
export async function POST(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { url?: unknown; serviceToken?: unknown };
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
  try {
    const result = await fetchUrl(target, extra);
    return NextResponse.json({
      url: result.url,
      status: result.status,
      contentType: result.contentType,
      summary: result.content.slice(0, 1500),
    });
  } catch {
    return NextResponse.json(
      { error: "No response from that URL (timeout or connection refused)." },
      { status: 502 },
    );
  }
}
