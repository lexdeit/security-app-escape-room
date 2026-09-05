import Link from "next/link";
import type { ReactNode } from "react";
import { Alert, Card as HeroCard } from "@heroui/react";
import type { SessionPayload } from "@/lib/auth";
import { RoleChip } from "./ui";
import { LogoutButton } from "./LogoutButton";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "My Profile" },
  { href: "/employees", label: "Employees" },
  { href: "/documents", label: "Documents" },
  { href: "/reports", label: "Reports" },
  { href: "/tickets", label: "Tickets" },
  { href: "/notifications", label: "Notifications" },
  { href: "/search", label: "Search" },
  { href: "/vault", label: "Compliance Vault" },
  { href: "/settings", label: "Settings" },
  { href: "/admin", label: "Administration" },
  { href: "/help", label: "Help" },
];

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
      <aside className="hidden w-64 shrink-0 flex-col bg-[#27251F] text-white md:flex">
        <div className="border-b-4 border-[#FFC72C] px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FFC72C]">
            Acme Corporation
          </p>
          <p className="mt-1 text-lg font-bold text-white">Employee Portal</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                active === item.href
                  ? "bg-[#FFC72C] font-semibold text-[#27251F]"
                  : "text-white hover:bg-white/10 hover:text-[#FFC72C]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/15 px-5 py-4 text-sm">
          <p className="truncate font-semibold text-white">{user.name}</p>
          <p className="truncate text-xs text-white/70">{user.email}</p>
          <p className="mt-2">
            <RoleChip role={user.role} />
          </p>
          <div className="mt-3">
            <LogoutButton />
          </div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b-4 border-[#FFC72C] bg-[#27251F] px-6 py-3 md:hidden">
          <p className="font-bold text-white">Acme Employee Portal</p>
          <Link href="/profile" className="text-sm font-medium text-[#FFC72C]">
            {user.name}
          </Link>
        </header>
        <nav className="flex gap-3 overflow-x-auto border-b border-[#E5DCCB] bg-white px-4 py-2 text-sm md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-medium text-[#6F665C] hover:text-[#B5241A]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:px-8">
          {children}
        </main>
        <footer className="border-t border-[#E5DCCB] bg-white px-6 py-3 text-center text-xs text-[#6F665C]">
          Acme Corporation · Internal use only · IT Support: helpdesk@acme-corp.com
        </footer>
      </div>
    </div>
  );
}

export function Card({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <HeroCard>
      {title ? (
        <HeroCard.Header>
          <HeroCard.Title className="text-[#27251F]">{title}</HeroCard.Title>
        </HeroCard.Header>
      ) : null}
      <HeroCard.Content>{children}</HeroCard.Content>
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
