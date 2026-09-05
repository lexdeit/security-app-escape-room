import { NextResponse } from "next/server";
import { sessionFromCookieHeader } from "@/lib/auth";
import { EMPLOYEES, getBio, getProfileOverride } from "@/lib/data";

/**
 * Session + delegation endpoint. Analysts can pull up another employee's
 * file "on their behalf" via ?as= (used by SOC tooling).
 */
export async function GET(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const as = searchParams.get("as");
  if (as && (session.role === "analyst" || session.role === "admin")) {
    const target = EMPLOYEES.find(
      (e) => e.email.toLowerCase() === as.trim().toLowerCase(),
    );
    if (!target) {
      return NextResponse.json({ error: "Unknown employee." }, { status: 404 });
    }
    return NextResponse.json({
      authenticated: true,
      user: session,
      onBehalfOf: {
        ...target,
        bio: getBio(target.email, target.bio),
        ...getProfileOverride(target.email),
      },
    });
  }
  return NextResponse.json({ authenticated: true, user: session });
}
