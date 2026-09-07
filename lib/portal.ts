import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "./secrets";
import { ssoSessionFromHeaders, verifySession } from "./auth";
import type { SessionPayload } from "./auth";

/**
 * Session of the current request (null when logged out/invalid).
 *
 * Wrapped in `cache()` so the layout and the page share a single session
 * verification per request instead of verifying the JWT twice.
 */
export const currentSession: () => Promise<SessionPayload | null> = cache(
  async () => {
    const store = await cookies();
    return verifySession(store.get(SESSION_COOKIE)?.value);
  },
);

/**
 * Effective portal user: legacy session first, corporate SSO as fallback.
 * Cached per request. Portal pages use this instead of repeating auth logic.
 */
export const portalUser: () => Promise<SessionPayload | null> = cache(
  async () => {
    const session = await currentSession();
    if (session) return session;
    const sso = await ssoSessionFromHeaders(await headers());
    if (!sso) return null;
    return { sub: sso.email, email: sso.email, name: sso.name, role: sso.role };
  },
);

/** Portal gate for pages that need the user value (the layout already gates). */
export async function requireUser(): Promise<SessionPayload> {
  const user = await portalUser();
  if (!user) redirect("/login");
  return user;
}
