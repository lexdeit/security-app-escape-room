import { NextResponse } from "next/server";
import { sessionFromCookieHeader } from "@/lib/auth";

/**
 * On-call backup index. Published nightly for the infrastructure team.
 */
export async function GET(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  const user = session ? session.email : "anonymous";
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Index of /backup</title></head>
<body>
<h1>Index of /backup</h1>
<p>Nightly environment snapshots. Generated 2026-02-10 03:00 CET by backup-job-04.</p>
<ul>
<li><a href="/backup/env.backup">env.backup</a> — portal environment snapshot</li>
</ul>
<hr>
<address>Acme IT · requested by ${user}</address>
</body>
</html>`;
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
