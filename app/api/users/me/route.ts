import { NextResponse } from "next/server";
import {
  buildSessionCookie,
  sessionFromCookieHeader,
  signSession,
  type PortalRole,
} from "@/lib/auth";
import {
  EMPLOYEES,
  getBio,
  getProfileOverride,
  setBio,
  setProfileOverride,
} from "@/lib/data";
import { PORTAL_USERS } from "@/lib/users";

/**
 * Self-service profile API. Backed by the same store as the employee
 * directory, so record lookups behave identically to /profile?id=.
 */
export async function GET(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const record = EMPLOYEES.find((e) => e.id === Number(id));
    if (!record) {
      return NextResponse.json({ error: "No such employee." }, { status: 404 });
    }
    return NextResponse.json({
      ...record,
      bio: getBio(record.email, record.bio),
      ...getProfileOverride(record.email),
    });
  }
  const record = EMPLOYEES.find(
    (e) => e.email.toLowerCase() === session.email.toLowerCase(),
  );
  const account = PORTAL_USERS.find(
    (u) => u.email.toLowerCase() === session.email.toLowerCase(),
  );
  return NextResponse.json({
    email: session.email,
    name: getProfileOverride(session.email).name ?? session.name,
    title: getProfileOverride(session.email).title ?? account?.title ?? record?.title ?? "",
    phone: getProfileOverride(session.email).phone ?? record?.phone ?? "",
    bio: record ? getBio(record.email, record.bio) : "",
    role: session.role,
  });
}

const VALID_ROLES: PortalRole[] = ["employee", "analyst", "admin"];

export async function PATCH(request: Request) {
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

  // Self-service fields. Extra fields sent by HR tooling are applied too.
  if (typeof body.name === "string" && body.name.trim()) {
    setProfileOverride(session.email, { name: body.name.trim().slice(0, 80) });
  }
  if (typeof body.title === "string") {
    setProfileOverride(session.email, { title: body.title.slice(0, 80) });
  }
  if (typeof body.phone === "string") {
    setProfileOverride(session.email, { phone: body.phone.slice(0, 40) });
  }
  if (typeof body.bio === "string") {
    setBio(session.email, body.bio.slice(0, 2000));
  }

  let role = session.role;
  if (typeof body.role === "string" && VALID_ROLES.includes(body.role as PortalRole)) {
    role = body.role as PortalRole;
  }

  const token = await signSession({
    sub: session.sub,
    email: session.email,
    name:
      typeof body.name === "string" && body.name.trim()
        ? body.name.trim().slice(0, 80)
        : session.name,
    role,
  });
  const res = NextResponse.json({ ok: true, role });
  res.headers.set("Set-Cookie", buildSessionCookie(token));
  return res;
}
