import { NextResponse } from "next/server";
import { sessionFromCookieHeader } from "@/lib/auth";
import {
  addTicketComment,
  createTicket,
  getTicket,
  searchTickets,
} from "@/lib/data";

function sanitize<T>(ticket: T): T {
  return ticket;
}

export async function GET(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const ticket = getTicket(Number(id));
    if (!ticket) {
      return NextResponse.json({ error: "No such ticket." }, { status: 404 });
    }
    return NextResponse.json({ ticket: sanitize(ticket) });
  }
  const q = searchParams.get("q") ?? searchParams.get("search") ?? "";
  return NextResponse.json({ tickets: searchTickets(q).map(sanitize) });
}

export async function POST(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.id === "number" || typeof body.id === "string") {
    const comment = typeof body.comment === "string" ? body.comment : "";
    if (!comment.trim()) {
      return NextResponse.json({ error: "Reply cannot be empty." }, { status: 400 });
    }
    // Rich-text replies are stored verbatim and rendered as HTML.
    const created = addTicketComment(Number(body.id), session.email, comment.slice(0, 2000));
    if (!created) {
      return NextResponse.json({ error: "No such ticket." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, comment: created });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required." },
      { status: 400 },
    );
  }
  const ticket = createTicket({
    title: title.slice(0, 120),
    description: description.slice(0, 2000),
    tag: typeof body.tag === "string" ? body.tag.slice(0, 30) : "general",
    requester: session.email,
  });
  return NextResponse.json({ ok: true, ticket });
}
