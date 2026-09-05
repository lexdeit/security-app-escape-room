import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { currentSession } from "@/lib/portal";
import { NOTIFICATIONS } from "@/lib/data";

export default async function NotificationsPage() {
  const session = await currentSession();
  if (!session) redirect("/login");

  return (
    <AppShell user={session} active="/notifications">
      <h1 className="mb-1 text-2xl font-bold">Notifications</h1>
      <p className="mb-5 text-sm text-slate-500">Latest updates for you.</p>
      <Card>
        <ul className="space-y-4">
          {NOTIFICATIONS.map((n) => (
            <li key={n.id} className="border-b border-slate-100 pb-3 last:border-0">
              <p className="font-medium">
                {n.unread ? (
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-sky-600" />
                ) : null}
                {n.title}
              </p>
              <p className="text-sm text-slate-600">
                {n.id === 2 ? (
                  <>
                    Environment backup published to{" "}
                    <Link href="/backup" className="text-sky-700 hover:underline">
                      /backup
                    </Link>{" "}
                    (index + env.backup) at 03:00. On-call: D. Ramírez.
                  </>
                ) : (
                  n.body
                )}
              </p>
              <p className="mt-1 text-xs text-slate-400">{n.date}</p>
            </li>
          ))}
        </ul>
      </Card>
    </AppShell>
  );
}
