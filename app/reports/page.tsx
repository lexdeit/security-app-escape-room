import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { currentSession } from "@/lib/portal";
import { REPORTS } from "@/lib/data";

export default async function ReportsPage() {
  const session = await currentSession();
  if (!session) redirect("/login");

  return (
    <AppShell user={session} active="/reports">
      <PageHeader title="Reports" subtitle="Published performance reports." />
      <div className="grid gap-4 md:grid-cols-2">
        {REPORTS.map((r) => (
          <Card key={r.id} title={`${r.title} Â· ${r.period}`}>
            <p className="mb-3 text-xs text-slate-500">Owner: {r.owner}</p>
            <div className="space-y-2">
              {r.figures.map((f) => (
                <div key={f.label} className="flex items-center gap-3 text-sm">
                  <span className="w-16 text-slate-500">{f.label}</span>
                  <div className="h-3 flex-1 overflow-hidden rounded bg-slate-100">
                    <div
                      className="h-full rounded bg-sky-600"
                      style={{ width: `${Math.min(100, f.value)}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-medium">{f.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-600">{r.summary}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
