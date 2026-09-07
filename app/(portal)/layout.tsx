import type { ReactNode } from "react";
import { requireUser } from "@/lib/portal";
import { PortalShell } from "@/components/portal-shell";

/**
 * Authenticated portal section. The user is resolved once here (shared per
 * request via React `cache()`) — pages no longer repeat the auth boilerplate
 * and the sidebar persists across navigations instead of remounting.
 */
export default async function PortalLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();
  return <PortalShell user={user}>{children}</PortalShell>;
}
