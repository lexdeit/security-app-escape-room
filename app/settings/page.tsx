import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { WebhookTester } from "@/components/WebhookTester";
import { currentSession } from "@/lib/portal";

export default async function SettingsPage() {
  const session = await currentSession();
  if (!session) redirect("/login");

  return (
    <AppShell user={session} active="/settings">
      <PageHeader title="Settings" subtitle="Workspace preferences and integrations." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Preferences">
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center justify-between">
              Weekly digest email
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">On</span>
            </li>
            <li className="flex items-center justify-between">
              Ticket notifications
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">On</span>
            </li>
            <li className="flex items-center justify-between">
              Time zone
              <span className="text-slate-800">Europe/Madrid</span>
            </li>
          </ul>
        </Card>
        <Card title="Outgoing webhook">
          <p className="mb-3 text-sm text-slate-500">
            Forward portal events to an external system. Send a test ping to
            verify connectivity before saving.
          </p>
          <WebhookTester />
        </Card>
      </div>
    </AppShell>
  );
}
