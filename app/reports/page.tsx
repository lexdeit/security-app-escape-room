import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { IconChart, Muted, PageHeader, TabStrip } from "@/components/ui";
import { currentSession } from "@/lib/portal";
import { REPORTS } from "@/lib/data";

export default async function ReportsPage() {
  const session = await currentSession();
  if (!session) redirect("/login");

  const maxAll = Math.max(...REPORTS.flatMap((r) => r.figures.map((f) => f.value)));

  return (
    <AppShell user={session} active="/reports">
      <PageHeader
        eyebrow="Insights"
        title="Reports"
        subtitle="Published performance reports, refreshed every quarter."
      />
      <Card>
        <TabStrip
          tabs={REPORTS.map((r) => ({
            id: r.id,
            label: `${r.title} · ${r.period}`,
            icon: <IconChart className="h-4 w-4" />,
            content: (
              <div className="pt-2">
                <p className="text-xs font-medium text-[#6F665C]">
                  Owner: {r.owner} · {r.period}
                </p>
                <div className="mt-4 space-y-3">
                  {r.figures.map((f) => (
                    <div key={f.label} className="flex items-center gap-3 text-sm">
                      <span className="w-16 shrink-0 font-medium text-[#6F665C]">
                        {f.label}
                      </span>
                      <div
                        className="h-4 min-w-0 flex-1 overflow-hidden rounded-full bg-[#F5EFE3]"
                        role="img"
                        aria-label={`${f.label}: ${f.value}`}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#DA291C] to-[#FFC72C] transition-all duration-500"
                          style={{ width: `${Math.max(4, Math.round((f.value / maxAll) * 100))}%` }}
                        />
                      </div>
                      <span className="font-display w-12 shrink-0 text-right text-base font-extrabold text-[#27251F]">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 border-t border-[#F3EBDD] pt-4 text-[15px] leading-relaxed text-[#27251F]">
                  {r.summary}
                </p>
              </div>
            ),
          }))}
        />
        <Muted>Figures are illustrative Q3 snapshots from Finance.</Muted>
      </Card>
    </AppShell>
  );
}
