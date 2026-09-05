import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { DashboardWidgets } from "@/components/DashboardWidgets";
import {
  IconArrow,
  IconClock,
  IconTicket,
  PageHeader,
  PrimaryButton,
  StatusChip,
  TagChip,
} from "@/components/ui";
import { currentSession } from "@/lib/portal";
import { NOTIFICATIONS, TICKETS } from "@/lib/data";

export default async function DashboardPage() {
  const session = await currentSession();
  if (!session) redirect("/login");

  const openTickets = TICKETS.filter((t) => t.status !== "closed" && !t.restricted);
  const notes = NOTIFICATIONS.slice(0, 3);

  return (
    <AppShell user={session} active="/dashboard">
      <PageHeader
        eyebrow="Overview"
        title={`Good day, ${session.name.split(" ")[0]}.`}
        subtitle="Here is what is happening at Acme today."
        actions={
          <Link href="/tickets">
            <PrimaryButton>
              <span className="inline-flex items-center gap-2">
                <IconTicket className="h-4 w-4" />
                Open ticket queue
              </span>
            </PrimaryButton>
          </Link>
        }
      />

      <section className="animate-enter-1 dot-grid relative mb-6 overflow-hidden rounded-3xl bg-[#27251F] px-6 py-8 sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#DA291C]/40 blur-2xl"
        />
        <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-[#FFC72C]">
          February 2026 · Madrid HQ
        </p>
        <p className="font-display relative mt-2 max-w-xl text-2xl font-extrabold leading-tight text-white md:text-3xl">
          Q1 is moving. Tickets are flowing. Nothing is on fire.
        </p>
        <p className="relative mt-2 max-w-xl text-[15px] text-white/70">
          4 tickets need attention, 2 of them high priority. The nightly backup
          ran clean and the SOC queue is triaged.
        </p>
        <div className="relative mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/tickets"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#FFC72C] px-5 text-[15px] font-bold text-[#27251F] transition-all duration-150 hover:bg-[#F5B800] active:scale-[0.98]"
          >
            Review open tickets
            <IconArrow className="h-4 w-4" />
          </Link>
          <Link
            href="/reports"
            className="inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-[15px] font-semibold text-white ring-1 ring-white/25 transition-all duration-150 hover:bg-white/10 active:scale-[0.98]"
          >
            View reports
          </Link>
        </div>
      </section>

      <div className="animate-enter-2">
        <DashboardWidgets />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card title="Announcements">
          <ul className="divide-y divide-[#F3EBDD]">
            {notes.map((n) => (
              <li key={n.id} className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
                <span
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${n.unread ? "bg-[#DA291C]" : "bg-[#ECE2D0]"}`}
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-[15px] font-semibold text-[#27251F]">
                    {n.title}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-[#6F665C]">
                    {n.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/notifications"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B5241A] hover:underline"
          >
            View all notifications <IconArrow className="h-4 w-4" />
          </Link>
        </Card>
        <Card title="Support tickets needing attention">
          <ul className="divide-y divide-[#F3EBDD]">
            {openTickets.map((t) => (
              <li key={t.id} className="py-3.5 first:pt-0 last:pb-0">
                <Link
                  href={`/tickets?id=${t.id}`}
                  className="text-[15px] font-semibold text-[#27251F] underline-offset-2 hover:text-[#B5241A] hover:underline"
                >
                  #{t.id} {t.title}
                </Link>
                <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <StatusChip status={t.status} />
                  <TagChip>{t.priority} priority</TagChip>
                  <span className="inline-flex items-center gap-1 text-xs text-[#6F665C]">
                    <IconClock className="h-3.5 w-3.5" />
                    SLA 4h
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/tickets"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B5241A] hover:underline"
          >
            Open ticket queue <IconArrow className="h-4 w-4" />
          </Link>
        </Card>
      </div>
    </AppShell>
  );
}
