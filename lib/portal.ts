import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./secrets";
import { verifySession } from "./auth";
import type { SessionPayload } from "./auth";

/** Session of the current request (null when logged out/invalid). */
export async function currentSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}
