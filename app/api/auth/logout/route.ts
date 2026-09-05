import { NextResponse } from "next/server";
import { expiredSessionCookie } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", expiredSessionCookie());
  return res;
}

export async function GET() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", expiredSessionCookie());
  return res;
}
