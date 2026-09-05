import Link from "next/link";
import type { ReactNode } from "react";
import { Alert, Card as HeroCard } from "@heroui/react";
import type { SessionPayload } from "@/lib/auth";
import {
  BrandMark,
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
} from "./ui";
import { AccountMenu } from "./AccountMenu";

const SECTIONS: {
  label: string;
  items: { href: string; label: string; icon: (p: { className?: string }) => ReactNode }[];
}[] = [
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

const MOBILE_TABS = [
  { href: "/dashboard", label: "Home", icon: IconHome },
  { href: "/employees", label: "People", icon: IconUsers },
  { href: "/tickets", label: "Tickets", icon: IconTicket },
  { href: "/search", label: "Search", icon: IconSearch },
  { href: "/profile", label: "Profile", icon: IconUser },
];

function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: (p: { className?: string }) => ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-all duration-150 ${
        active
          ? "bg-[#FFC72C] font-semibold text-[#27251F] shadow-[0_6px_14px_-8px_rgba(255,199,44,0.9)]"
          : "font-medium text-white/80 hover:bg-white/10 hover:text-white active:bg-white/15"
      }`}
    >
      <Icon
        className={`h-5 w-5 shrink-0 transition-transform duration-150 group-active:scale-90 ${
          active ? "text-[#27251F]" : "text-[#FFC72C]/80 group-hover:text-[#FFC72C]"
        }`}
      />
      {label}
    </Link>
  );
}

export function AppShell({
  user,
  active,
  children,
}: {
  user: SessionPayload;
  active: string;
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
        <nav aria-label="Primary" className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavItem key={item.href} {...item} active={active === item.href} />
                ))}
              </div>
            </div>
          ))}
        </nav>
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
        <footer className="border-t border-[#ECE2D0] bg-white/70 px-6 py-4 text-center text-xs text-[#6F665C] md:mb-0">
          Acme Corporation · Internal use only · IT Support: helpdesk@acme-corp.com
        </footer>
        <nav
          aria-label="Mobile"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ECE2D0] bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
        >
          <div className="grid grid-cols-5">
            {MOBILE_TABS.map((item) => {
              const isActive = active === item.href;
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
      </div>
    </div>
  );
}

export function Card({
  title,
  children,
  className,
  hoverable,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}) {
  return (
    <HeroCard
      className={`rounded-2xl bg-white shadow-[0_1px_2px_rgba(39,37,31,0.05),0_12px_32px_-16px_rgba(39,37,31,0.25)] ring-1 ring-[#ECE2D0] ${
        hoverable
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(39,37,31,0.06),0_20px_40px_-16px_rgba(39,37,31,0.3)]"
          : ""
      } ${className ?? ""}`}
    >
      {title ? (
        <HeroCard.Header className="border-b border-[#F3EBDD] pb-3">
          <HeroCard.Title className="font-display text-lg font-bold text-[#27251F]">
            {title}
          </HeroCard.Title>
        </HeroCard.Header>
      ) : null}
      <HeroCard.Content className="p-5 md:p-6">{children}</HeroCard.Content>
    </HeroCard>
  );
}

export function Denied({ what }: { what: string }) {
  return (
    <Alert status="danger">
      <Alert.Title>Access denied</Alert.Title>
      <Alert.Description>
        {what} You do not have permission to view this section. If you believe
        this is a mistake, please contact IT support. (Error 403 · Forbidden)
      </Alert.Description>
    </Alert>
  );
}
