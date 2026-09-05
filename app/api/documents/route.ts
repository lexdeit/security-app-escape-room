import { NextResponse } from "next/server";
import { sessionFromCookieHeader } from "@/lib/auth";
import { DOCUMENTS } from "@/lib/data";

/** Company document library. */
export async function GET(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const elevated = session.role === "admin" || session.role === "analyst";
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const doc = DOCUMENTS.find((d) => d.id === id);
    if (!doc) {
      return NextResponse.json({ error: "No such document." }, { status: 404 });
    }
    if (doc.restricted && !elevated) {
      return NextResponse.json({ error: "Restricted circulation." }, { status: 403 });
    }
    return NextResponse.json({ document: doc });
  }
  return NextResponse.json({
    documents: DOCUMENTS.filter((d) => !d.restricted || elevated).map((d) => ({
      id: d.id,
      title: d.title,
      category: d.category,
      updated: d.updated,
      size: d.size,
      restricted: d.restricted,
      summary: d.summary,
    })),
  });
}
