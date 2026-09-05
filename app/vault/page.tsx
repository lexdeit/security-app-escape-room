import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { VaultForm } from "@/components/VaultForm";
import { currentSession } from "@/lib/portal";

/**
 * Compliance Vault. Visible to every employee (procedure VAULT-2026-04 is
 * public knowledge), but disclosure requires two-custodian authorization.
 */
export default async function VaultPage() {
  const session = await currentSession();
  if (!session) redirect("/login");

  return (
    <AppShell user={session} active="/vault">
      <PageHeader title="Compliance Vault" subtitle="Restricted memo disclosure Â· procedure VAULT-2026-04." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Two-custodian authorization">
          <p className="mb-4 text-sm text-slate-600">
            Releasing a restricted memo requires both custodian fragments and
            the internal service token. All three must be presented together;
            partial submissions are not evaluated.
          </p>
          <VaultForm />
        </Card>
        <Card title="About this vault">
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Custodian-1 is filed with the quarterly archive by IT.</li>
            <li>Custodian-2 is held by Security Operations.</li>
            <li>The service token is kept with the environment backups.</li>
            <li>Disclosures are logged and reported to Legal.</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
