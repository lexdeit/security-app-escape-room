"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  IconBell,
  IconChart,
  IconFile,
  IconGear,
  IconHelp,
  IconHome,
  IconLock,
  IconSearch,
  IconShield,
  IconTicket,
  IconUser,
  IconUsers,
} from "./ui-server";

export interface NavItem {
  href: string;
  label: string;
  icon: (p: { className?: string }) => ReactNode;
}

export const NAV_SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: IconHome },
      { href: "/profile", label: "My Profile", icon: IconUser },
      { href: "/employees", label: "Employees", icon: IconUsers },
      { href: "/documents", label: "Documents", icon: IconFile },
      { href: "/reports", label: "Reports", icon: IconChart },
      { href: "/tickets", label: "Tickets", icon: IconTicket },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/notifications", label: "Notifications", icon: IconBell },
      { href: "/search", label: "Search", icon: IconSearch },
      { href: "/vault", label: "Compliance Vault", icon: IconLock },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/settings", label: "Settings", icon: IconGear },
      { href: "/admin", label: "Administration", icon: IconShield },
      { href: "/help", label: "Help", icon: IconHelp },
    ],
  },
];

const MOBILE_TABS: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: IconHome },
  { href: "/employees", label: "People", icon: IconUsers },
  { href: "/tickets", label: "Tickets", icon: IconTicket },
  { href: "/search", label: "Search", icon: IconSearch },
  { href: "/profile", label: "Profile", icon: IconUser },
];

/** Sidebar navigation. Active item derives from the current pathname, so the
 *  layout never needs to know which page is rendered. */
export function SideNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
      {NAV_SECTIONS.map((section) => (
        <div key={section.label}>
          <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
            {section.label}
          </p>
          <div className="space-y-1">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-all duration-150 ${
                    active
                      ? "bg-[#FFC72C] font-semibold text-[#27251F] shadow-[0_6px_14px_-8px_rgba(255,199,44,0.9)]"
                      : "font-medium text-white/80 hover:bg-white/10 hover:text-white active:bg-white/15"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 shrink-0 transition-transform duration-150 group-active:scale-90 ${
                      active ? "text-[#27251F]" : "text-[#FFC72C]/80 group-hover:text-[#FFC72C]"
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

/** Bottom tab bar for small screens. */
export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ECE2D0] bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-5">
        {MOBILE_TABS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex flex-col items-center gap-1 py-2.5 text-[11px] transition-colors ${
                isActive ? "font-bold text-[#B5241A]" : "font-medium text-[#6F665C]"
              }`}
            >
              {isActive ? (
                <span className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-[#FFC72C]" aria-hidden="true" />
              ) : null}
              <item.icon className="h-[22px] w-[22px]" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
