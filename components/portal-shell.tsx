import type { ReactNode } from "react";
import type { SessionPayload } from "@/lib/auth";
import { BrandMark } from "./icons";
import { AccountMenu } from "./AccountMenu";
import { MobileNav, SideNav } from "./portal-nav";

/**
 * Server-rendered portal chrome. The session is resolved once in the
 * `(portal)` layout; navigation active states live in tiny client islands
 * (`SideNav` / `MobileNav`) so this shell never ships page-level JS.
 */
export function PortalShell({
  user,
  children,
}: {
  user: SessionPayload;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#FFF9F0] text-[#27251F]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#FFC72C] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#27251F]"
      >
        Skip to content
      </a>
      <aside className="hidden w-[270px] shrink-0 flex-col bg-[#27251F] md:flex">
        <div className="flex items-center gap-3 px-5 pb-5 pt-6">
          <BrandMark className="h-11 w-11 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFC72C]">
              Acme Corporation
            </p>
            <p className="font-display text-lg font-extrabold leading-tight text-white">
              Employee Portal
            </p>
          </div>
        </div>
        <SideNav />
        <div className="border-t border-white/10 px-3 py-4">
          <div className="mb-2 px-2">
            <span className="inline-block rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#FFC72C] ring-1 ring-white/15">
              {user.role}
            </span>
          </div>
          <AccountMenu name={user.name} email={user.email} />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-[#ECE2D0] bg-[#27251F] px-4 py-3 md:hidden">
          <span className="flex items-center gap-2.5">
            <BrandMark className="h-9 w-9" />
            <span className="font-display text-base font-extrabold text-white">
              Employee Portal
            </span>
          </span>
          <AccountMenu name={user.name} email={user.email} />
        </header>
        <main
          id="main-content"
          className="animate-enter mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 md:pb-10 md:pt-10 lg:px-10"
        >
          {children}
        </main>
        <footer className="border-t border-[#ECE2D0] bg-white/70 px-6 py-4 text-center text-xs text-[#6F665C]">
          Acme Corporation · Internal use only · IT Support: helpdesk@acme-corp.com
        </footer>
        <MobileNav />
      </div>
    </div>
  );
}
