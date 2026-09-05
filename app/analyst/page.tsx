import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell, Card, Denied } from "@/components/AppShell";
import { MonoBox, PageHeader } from "@/components/ui";
import { currentSession } from "@/lib/portal";
import { ssoSessionFromHeaders } from "@/lib/auth";
import { TICKETS } from "@/lib/data";
import { VAULT_PART_2 } from "@/lib/secrets";

/**
 * Analytics workspace. Deliberately NOT linked from the sidebar: SOC staff
 * reach it from their bookmarks. The route itself only checks the role.
 */
export default async function AnalystPage() {
  const session = await currentSession();

  // SOC staff may arrive with their corporate SSO session instead.
  let role = session?.role;
  let displayName = session?.name ?? "Analyst";
  let displayEmail = session?.email ?? "";
  if (!session) {
    const sso = await ssoSessionFromHeaders(await headers());
    if (!sso) redirect("/login");
    role = sso.role;
    displayName = sso.name;
    displayEmail = sso.email;
  } else if (role !== "analyst" && role !== "admin") {
    const sso = await ssoSessionFromHeaders(await headers());
    if (sso && (sso.role === "analyst" || sso.role === "admin")) {
      role = sso.role;
      displayName = sso.name;
      displayEmail = sso.email;
    }
  }

  if (role !== "analyst" && role !== "admin") {
    if (!session) redirect("/login");
    return (
      <AppShell user={session} active="/analyst">
        <PageHeader title="Analytics workspace" />
        <Denied what="This workspace is reserved for Security Operations analysts." />
      </AppShell>
    );
  }

  const queue = TICKETS.filter(
    (t) => t.tag === "phishing" || t.tag === "compliance" || t.tag === "access",
  );

  const shellUser = session ?? {
    sub: displayEmail,
    email: displayEmail,
    name: displayName,
    role: role as "analyst" | "admin",
  };

  return (
    <AppShell user={shellUser} active="/analyst">
      <PageHeader title="Analytics workspace" subtitle="Security Operations · triage queue and custodian records." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Triage queue">
          <ul className="space-y-3 text-sm">
            {queue.map((t) => (
              <li key={t.id} className="border-b border-slate-100 pb-2 last:border-0">
                <a href={`/tickets?id=${t.id}`} className="font-medium text-sky-700 hover:underline">
                  #{t.id} {t.title}
                </a>
                <p className="text-xs text-slate-500">
                  {t.status} · {t.priority} · {t.tag}
                </p>
                <p className="mt-1 text-slate-600">{t.description}</p>
              </li>
            ))}
          </ul>
        </Card>
        <div className="space-y-4">
          <Card title="Custodian record — second fragment">
            <p className="text-sm text-slate-600">
              Procedure VAULT-2026-04 · held by L. Fernández, Security
              Operations. Present this fragment together with custodian-1 and
              the service token at the compliance vault.
            </p>
            <MonoBox>custodian-2: {VAULT_PART_2}</MonoBox>
          </Card>
          <Card title="Phishing verification">
            <p className="text-sm text-slate-600">
              Verify reporter submissions from the queue via{" "}
              <code className="rounded bg-slate-100 px-1">POST /api/phishing/verify</code>{" "}
              with <code className="rounded bg-slate-100 px-1">{"{ reportId, verdict }"}</code>.
            </p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
