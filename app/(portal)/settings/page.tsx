import { Card } from "@/components/ui-server";
import { WebhookTester } from "@/components/WebhookTester";
import { Muted, PageHeader } from "@/components/ui-server";
import { IconBell, IconClock, IconGear, IconTicket } from "@/components/icons";
import { requireUser } from "@/lib/portal";
export const metadata = { title: "Settings" };

const PREFS = [
  { icon: IconBell, label: "Weekly digest email", value: "On", on: true },
  { icon: IconTicket, label: "Ticket notifications", value: "On", on: true },
  { icon: IconClock, label: "Time zone", value: "Europe/Madrid", on: true },
];

export default async function SettingsPage() {
  await requireUser();

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        subtitle="Workspace preferences and integrations."
      />
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <Card title="Preferences">
          <ul className="divide-y divide-[#F3EBDD]">
            {PREFS.map((p) => (
              <li key={p.label} className="flex items-center gap-3.5 py-3.5 first:pt-0 last:pb-0">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EFE3] text-[#6F665C]">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="flex-1 text-[15px] font-medium text-[#27251F]">
                  {p.label}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    p.on
                      ? "bg-[#E7F6EC] text-[#1E7A34]"
                      : "bg-[#F5EFE3] text-[#6F665C]"
                  }`}
                >
                  {p.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3.5 rounded-xl bg-[#FFF9F0] px-3.5 py-3 ring-1 ring-[#F3EBDD]">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF3D6] text-[#B5241A]">
              <IconGear className="h-5 w-5" />
            </span>
            <Muted>Changes apply to your workspace immediately.</Muted>
          </div>
        </Card>
        <Card title="Outgoing webhook">
          <Muted>
            Forward portal events to an external system. Send a test ping to
            verify connectivity before saving.
          </Muted>
          <div className="mt-4">
            <WebhookTester />
          </div>
        </Card>
      </div>
    </>
  );
}
