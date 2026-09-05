import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { DashboardWidgets } from "@/components/DashboardWidgets";
import { currentSession } from "@/lib/portal";
import { NOTIFICATIONS, TICKETS } from "@/lib/data";

export default async function DashboardPage() {
  const session = await currentSession();
  if (!session) redirect("/login");

  const openTickets = TICKETS.filter((t) => t.status !== "closed" && !t.restricted);
  const notes = NOTIFICATIONS.slice(0, 3);

  return (
    <AppShell user={session} active="/dashboard">
      <h1 className="mb-1 text-2xl font-bold">
        Good day, {session.name.split(" ")[0]}.
      </h1>
      <p className="mb-5 text-sm text-slate-500">
        Here is what is happening at Acme today.
      </p>

      <DashboardWidgets />

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card title="Announcements">
          <ul className="space-y-3 text-sm">
            {notes.map((n) => (
              <li key={n.id} className="border-b border-slate-100 pb-2 last:border-0">
                <p className="font-medium">{n.title}</p>
                <p className="text-slate-500">{n.body}</p>
              </li>
            ))}
          </ul>
          <Link href="/notifications" className="mt-2 inline-block text-sm text-sky-700 hover:underline">
            View all notifications →
          </Link>
        </Card>
        <Card title="Support tickets needing attention">
          <ul className="space-y-3 text-sm">
            {openTickets.map((t) => (
              <li key={t.id} className="border-b border-slate-100 pb-2 last:border-0">
                <Link href={`/tickets?id=${t.id}`} className="font-medium text-sky-700 hover:underline">
                  #{t.id} {t.title}
                </Link>
                <p className="text-xs text-slate-500">
                  {t.status} · {t.priority} priority
                </p>
              </li>
            ))}
          </ul>
          <Link href="/tickets" className="mt-2 inline-block text-sm text-sky-700 hover:underline">
            Open ticket queue →
          </Link>
        </Card>
      </div>
    </AppShell>
  );
}
