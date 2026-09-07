import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, Denied } from "@/components/ui-server";
import { MonoBox, Muted, PageHeader } from "@/components/ui-server";
import { PriorityChip, StatusChip, TagChip } from "@/components/ui";
import { currentSession } from "@/lib/portal";
import { ssoSessionFromHeaders } from "@/lib/auth";
import { TICKETS } from "@/lib/data";
import { VAULT_PART_2 } from "@/lib/secrets";
export const metadata = { title: "Analytics workspace" };

/**
 * Analytics workspace. Deliberately NOT linked from the sidebar: SOC staff
 * reach it from their bookmarks. The route itself only checks the role.
 */
export default async function AnalystPage() {
  const session = await currentSession();

  // SOC staff may arrive with their corporate SSO session instead.
  // The layout already guarantees legacy-or-SSO authentication; the role
  // check below decides what this workspace reveals.
  let role = session?.role;
  if (!session) {
    const sso = await ssoSessionFromHeaders(await headers());
    if (!sso) redirect("/login");
    role = sso.role;
  } else if (role !== "analyst" && role !== "admin") {
    const sso = await ssoSessionFromHeaders(await headers());
    if (sso && (sso.role === "analyst" || sso.role === "admin")) {
      role = sso.role;
    }
  }

  if (role !== "analyst" && role !== "admin") {
    if (!session) redirect("/login");
    return (
      <>
        <PageHeader eyebrow="Security" title="Analytics workspace" />
        <Denied what="This workspace is reserved for Security Operations analysts." />
      </>
    );
  }

  const queue = TICKETS.filter(
    (t) => t.tag === "phishing" || t.tag === "compliance" || t.tag === "access",
  );

  return (
    <>
      <PageHeader eyebrow="Security" title="Analytics workspace" subtitle="Security Operations · triage queue and custodian records." />
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <Card title={`Triage queue · ${queue.length}`}>
          <ul className="divide-y divide-[#F3EBDD]">
            {queue.map((t) => (
              <li key={t.id} className="py-3.5 first:pt-0 last:pb-0">
                <a
                  href={`/tickets?id=${t.id}`}
                  className="text-[15px] font-semibold text-[#27251F] underline-offset-2 hover:text-[#B5241A] hover:underline"
                >
                  #{t.id} {t.title}
                </a>
                <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <StatusChip status={t.status} />
                  <PriorityChip priority={t.priority} />
                  <TagChip>{t.tag}</TagChip>
                </span>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#6F665C]">
                  {t.description}
                </p>
              </li>
            ))}
          </ul>
        </Card>
        <div className="space-y-5">
          <div className="dot-grid relative overflow-hidden rounded-2xl bg-[#27251F] p-6 text-white shadow-[0_12px_32px_-16px_rgba(39,37,31,0.6)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#FFC72C]/20 blur-2xl"
            />
            <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-[#FFC72C]">
              Custodian record — second fragment
            </p>
            <p className="relative mt-2 text-sm leading-relaxed text-white/70">
              Procedure VAULT-2026-04 · held by L. Fernández, Security
              Operations. Present this fragment together with custodian-1 and
              the service token at the compliance vault.
            </p>
            <div className="relative mt-4">
              <MonoBox>custodian-2: {VAULT_PART_2}</MonoBox>
            </div>
          </div>
          <Card title="Phishing verification">
            <Muted>
              Verify reporter submissions from the queue via{" "}
              <code className="rounded bg-[#F5EFE3] px-1.5 py-0.5 font-mono text-[13px] text-[#27251F]">
                POST /api/phishing/verify
              </code>{" "}
              with{" "}
              <code className="rounded bg-[#F5EFE3] px-1.5 py-0.5 font-mono text-[13px] text-[#27251F]">
                {"{ reportId, verdict }"}
              </code>
              .
            </Muted>
          </Card>
        </div>
      </div>
    </>
  );
}
