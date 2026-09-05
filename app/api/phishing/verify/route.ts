import { NextResponse } from "next/server";
import { sessionFromCookieHeader } from "@/lib/auth";
import { addTicketComment, getTicket } from "@/lib/data";

const VERDICTS = ["malicious", "benign", "spam"] as const;

/**
 * Phishing triage verdicts, recorded on the original report ticket.
 */
export async function POST(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  if (session.role !== "analyst" && session.role !== "admin") {
    return NextResponse.json(
      { error: "Reserved for Security Operations analysts." },
      { status: 403 },
    );
  }
  let body: { reportId?: unknown; verdict?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const reportId = Number(body.reportId);
  const verdict = typeof body.verdict === "string" ? body.verdict.toLowerCase() : "";
  const ticket = getTicket(reportId);
  if (!ticket) {
    return NextResponse.json({ error: "No such report." }, { status: 404 });
  }
  if (!VERDICTS.includes(verdict as (typeof VERDICTS)[number])) {
    return NextResponse.json(
      { error: "Verdict must be one of: malicious, benign, spam." },
      { status: 400 },
    );
  }
  addTicketComment(ticket.id, session.email, `SOC verdict: ${verdict}.`);
  return NextResponse.json({ ok: true, reportId: ticket.id, verdict });
}
