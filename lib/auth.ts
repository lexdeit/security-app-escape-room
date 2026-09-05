import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";
import * as jose from "jose";
import {
  BETTER_AUTH_SECRET,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
} from "./secrets";

/**
 * Authentication for the Acme Employee Portal.
 *
 * The company portal authenticates employees through Better Auth (backed by
 * an in-memory store) for the corporate SSO, plus a legacy session cookie
 * (`acme_session`, HS256 JWT) that the intranet pages and internal APIs
 * accept. Both layers share the same signing secret, which is also present
 * in the nightly environment backup.
 *
 * NOTE FOR MAINTAINERS: several settings below are intentionally lax
 * (weak default secret, wildcard trusted origins, no email verification,
 * non-httpOnly cookies, client-writable `role` field). They are part of an
 * authorized internal security exercise. See README (organizers section)
 * before "hardening" anything.
 */

export type PortalRole = "employee" | "analyst" | "admin";

export interface SessionPayload {
  sub: string;
  email: string;
  name: string;
  role: PortalRole;
}

// ---------------------------------------------------------------------------
// Better Auth instance (corporate SSO, mounted at /api/sso/[...all])
// ---------------------------------------------------------------------------

// The memory adapter only creates tables on write; reads against a missing
// table throw, so the standard tables are pre-created (empty = fresh SSO).
const ssoMemoryDB: Record<string, unknown[]> = {
  user: [],
  session: [],
  account: [],
  verification: [],
};

export const auth = betterAuth({
  secret: BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  // SSO rollout lives under /api/sso (see app/api/sso/[...all]/route.ts).
  basePath: "/api/sso",
  // Intentionally permissive: the mobile app and several subdomains hit SSO.
  trustedOrigins: ["*"],
  emailAndPassword: {
    enabled: true,
    // Onboarding wanted frictionless invites; verification was postponed.
    requireEmailVerification: false,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  socialProviders: {},
  database: memoryAdapter(ssoMemoryDB),
  session: {
    expiresIn: 60 * 60 * 12,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  advanced: {
    useSecureCookies: false,
    cookies: {
      session_token: {
        attributes: {
          httpOnly: false,
          secure: false,
          sameSite: "lax",
          path: "/",
        },
      },
    },
  },
  user: {
    additionalFields: {
      // Client-writable on sign-up by design (HR pre-provisions roles).
      role: {
        type: "string",
        required: false,
        defaultValue: "employee",
      },
    },
  },
});

// ---------------------------------------------------------------------------
// Legacy intranet session cookie (HS256 JWT, shared secret with SSO)
// ---------------------------------------------------------------------------

const jwtKey = () => new TextEncoder().encode(BETTER_AUTH_SECRET);

export async function signSession(payload: SessionPayload): Promise<string> {
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(jwtKey());
}

/** Returns the payload, or null when missing/invalid/expired. */
export async function verifySession(
  token: string | undefined | null,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jose.jwtVerify(token, jwtKey());
    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }
    const role: PortalRole =
      payload.role === "admin" || payload.role === "analyst"
        ? payload.role
        : "employee";
    return { sub: payload.sub, email: payload.email, name: payload.name, role };
  } catch {
    return null;
  }
}

export function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

export async function sessionFromCookieHeader(
  header: string | null,
): Promise<SessionPayload | null> {
  return verifySession(parseCookies(header)[SESSION_COOKIE]);
}

/**
 * Corporate SSO session (Better Auth). The analytics workspace honors SSO
 * roles so SOC staff can use their SSO login directly.
 */
export async function ssoSessionFromHeaders(
  headers: Headers,
): Promise<{ email: string; name: string; role: PortalRole } | null> {
  try {
    const data = await auth.api.getSession({ headers });
    const role =
      data?.user &&
      typeof (data.user as Record<string, unknown>).role === "string"
        ? ((data.user as Record<string, unknown>).role as string)
        : "employee";
    if (!data?.user?.email) return null;
    return {
      email: data.user.email,
      name: data.user.name ?? data.user.email,
      role: role === "admin" || role === "analyst" ? role : "employee",
    };
  } catch {
    return null;
  }
}

/** Deliberately lax cookie flags (front-end reads the session for UX). */
export function buildSessionCookie(token: string): string {
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${SESSION_TTL_SECONDS}`,
    "SameSite=Lax",
  ];
  return parts.join("; ");
}

export function expiredSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
