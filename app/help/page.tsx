import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { currentSession } from "@/lib/portal";

export default async function HelpPage() {
  const session = await currentSession();
  if (!session) redirect("/login");

  return (
    <AppShell user={session} active="/help">
      <PageHeader title="Help" subtitle="Frequently asked questions about the portal." />
      <div className="space-y-4">
        <Card title="I forgot my password">
          <p className="text-sm text-slate-600">
            Contact helpdesk@acme-corp.com from your corporate mailbox. For
            your first login, check the IT Onboarding Guide under Documents â€”
            it contains the starter account details.
          </p>
        </Card>
        <Card title="Where are the nightly backups?">
          <p className="text-sm text-slate-600">
            The on-call engineer publishes environment backups to /backup after
            the 03:00 run. If you need a service token for an internal
            resource, that is the first place to look.
          </p>
        </Card>
        <Card title="How do I request restricted access?">
          <p className="text-sm text-slate-600">
            File a ticket with the access tag. Workspace provisioning for the
            analytics area is handled by Security Operations.
          </p>
        </Card>
        <Card title="How are restricted memos released?">
          <p className="text-sm text-slate-600">
            Under procedure VAULT-2026-04, Legal releases disclosure memos
            through the Compliance Vault with two-custodian authorization. The
            released memo explains how to confirm receipt with the auditors.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
