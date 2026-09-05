import { auth } from "@/lib/auth";

/**
 * Corporate single sign-on (Better Auth). Mounted here for the new SSO
 * rollout while the intranet still uses the legacy session cookie.
 */
export async function GET(request: Request) {
  return auth.handler(request);
}

export async function POST(request: Request) {
  return auth.handler(request);
}
