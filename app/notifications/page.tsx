import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { currentSession } from "@/lib/portal";
import { NOTIFICATIONS } from "@/lib/data";

export default async function NotificationsPage() {
  const session = await currentSession();
  if (!session) redirect("/login");

  const unread = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <AppShell user={session} active="/notifications">
      <PageHeader
        eyebrow="Updates"
        title="Notifications"
        subtitle={`${unread} unread · latest updates for you.`}
      />
      <Card>
        <ol className="relative space-y-0 border-l-2 border-[#F3EBDD]">
          {NOTIFICATIONS.map((n) => (
            <li key={n.id} className="relative pb-7 pl-7 last:pb-0">
              <span
                className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full ring-4 ring-white ${
                  n.unread ? "bg-[#DA291C]" : "bg-[#D8CDB6]"
                }`}
                aria-hidden="true"
              />
              <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-[#27251F]">
                {n.title}
                {n.unread ? (
                  <span className="rounded-full bg-[#FDECEA] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#B5241A]">
                    New
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#6F665C]">
                {n.id === 2 ? (
                  <>
                    Environment backup published to{" "}
                    <Link href="/backup" className="font-medium text-[#B5241A] hover:underline">
                      /backup
                    </Link>{" "}
                    (index + env.backup) at 03:00. On-call: D. Ramírez.
                  </>
                ) : (
                  n.body
                )}
              </p>
              <p className="mt-1.5 text-xs text-[#6F665C]">{n.date}</p>
            </li>
          ))}
        </ol>
      </Card>
    </AppShell>
  );
}
