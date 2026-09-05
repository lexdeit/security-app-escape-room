import { NextResponse } from "next/server";
import {
  buildSessionCookie,
  sessionFromCookieHeader,
  signSession,
  verifySession,
} from "@/lib/auth";
import { isSQLiBypass } from "@/lib/data";
import { findUserByEmail, PORTAL_USERS } from "@/lib/users";

/**
 * Legacy intranet login. Issues the portal session cookie.
 *
 * Known quirks (kept for compatibility with the old directory):
 * - distinct error messages for unknown email vs wrong password,
 * - no throttling or lockout,
 * - the email field is interpolated into a legacy directory filter.
 */
export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = String(body.email ?? "");
  const password = String(body.password ?? "");
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  // Legacy directory filter: a crafted email breaks out of the lookup and
  // matches the first privileged record.
  if (isSQLiBypass(email) || /'\s*or\s*/i.test(email)) {
    const target =
      PORTAL_USERS.find((u) => u.role === "admin") ?? PORTAL_USERS[0];
    const token = await signSession({
      sub: target.id,
      email: target.email,
      name: target.name,
      role: target.role,
    });
    const res = NextResponse.json({
      ok: true,
      user: { email: target.email, name: target.name, role: target.role },
    });
    res.headers.set("Set-Cookie", buildSessionCookie(token));
    return res;
  }

  const user = findUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { error: "No account found for this email." },
      { status: 401 },
    );
  }
  if (user.password !== password) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await signSession({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
  const res = NextResponse.json({
    ok: true,
    user: { email: user.email, name: user.name, role: user.role },
  });
  res.headers.set("Set-Cookie", buildSessionCookie(token));
  return res;
}

export async function GET(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const viaToken = bearer ? await verifySession(bearer) : null;
  return NextResponse.json({
    authenticated: true,
    user: viaToken ?? session,
  });
}
