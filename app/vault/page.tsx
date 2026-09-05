import { redirect } from "next/navigation";
import { Tooltip } from "@heroui/react";
import { AppShell, Card } from "@/components/AppShell";
import { IconLock, Muted, PageHeader, Steps } from "@/components/ui";
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
      <PageHeader
        eyebrow="Compliance"
        title="Compliance Vault"
        subtitle="Restricted memo disclosure · procedure VAULT-2026-04."
      />
      <div className="grid items-start gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card title="Two-custodian authorization">
            <Muted>
              Releasing a restricted memo requires both custodian fragments
              and the internal service token. All three must be presented
              together; partial submissions are not evaluated.
            </Muted>
            <div className="mt-5">
              <VaultForm />
            </div>
          </Card>
        </div>
        <div className="space-y-5 lg:col-span-2">
          <div className="dot-grid relative overflow-hidden rounded-2xl bg-[#27251F] p-6 text-white shadow-[0_12px_32px_-16px_rgba(39,37,31,0.6)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#DA291C]/40 blur-2xl"
            />
            <Tooltip>
              <Tooltip.Trigger>
                <span className="relative inline-flex cursor-help items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFC72C]">
                  <IconLock className="h-4 w-4" />
                  How disclosure works
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content className="max-w-[240px]">
                Both custodians must present their fragments together with the
                service token. Partial submissions are not evaluated.
              </Tooltip.Content>
            </Tooltip>
            <div className="relative mt-4">
              <Steps
                tone="dark"
                steps={[
                  {
                    label: "Custodian-1",
                    hint: "Filed with the quarterly archive by IT.",
                    state: "todo",
                  },
                  {
                    label: "Custodian-2",
                    hint: "Held by Security Operations.",
                    state: "todo",
                  },
                  {
                    label: "Service token",
                    hint: "Kept with the environment backups.",
                    state: "todo",
                  },
                ]}
              />
            </div>
            <p className="relative mt-4 border-t border-white/10 pt-4 text-[13px] text-white/60">
              Disclosures are logged and reported to Legal.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
