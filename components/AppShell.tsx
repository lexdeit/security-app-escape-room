import Link from "next/link";
import type { ReactNode } from "react";
import { Alert, Card as HeroCard, Chip } from "@heroui/react";
import type { SessionPayload } from "@/lib/auth";
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
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <aside className="hidden w-64 shrink-0 flex-col bg-slate-900 text-slate-200 md:flex">
        <div className="border-b border-slate-700 px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Acme Corporation
          </p>
          <p className="mt-1 text-lg font-bold text-white">Employee Portal</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm ${
                active === item.href
                  ? "bg-slate-700 font-semibold text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-700 px-5 py-4 text-sm">
          <p className="truncate font-semibold text-white">{user.name}</p>
          <p className="truncate text-xs text-slate-400">{user.email}</p>
          <p className="mt-1">
            <Chip size="sm" variant="secondary">
              {user.role}
            </Chip>
          </p>
          <div className="mt-3">
            <LogoutButton />
          </div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 md:hidden">
          <p className="font-bold">Acme Employee Portal</p>
          <Link href="/profile" className="text-sm text-slate-600">
            {user.name}
          </Link>
        </header>
        <nav className="flex gap-3 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 text-sm md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-slate-600 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:px-8">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white px-6 py-3 text-center text-xs text-slate-500">
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
          <HeroCard.Title>{title}</HeroCard.Title>
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
