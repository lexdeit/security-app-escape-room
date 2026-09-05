import { redirect } from "next/navigation";
import { AppShell, Card, Denied } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { AccountsTable } from "@/components/AccountsTable";
import { currentSession } from "@/lib/portal";
import { PORTAL_USERS } from "@/lib/users";

export default async function AdminPage() {
  const session = await currentSession();
  if (!session) redirect("/login");

  if (session.role !== "admin") {
    return (
      <AppShell user={session} active="/admin">
        <PageHeader title="Administration" />
        <Denied what="The administration console is restricted to IT administrators." />
      </AppShell>
    );
  }

  return (
    <AppShell user={session} active="/admin">
      <PageHeader title="Administration" subtitle="User accounts and portal roles." />
      <Card title="Accounts">
        <AccountsTable users={PORTAL_USERS} />
      </Card>
      <div className="mt-4">
        <Card title="SSO status">
          <p className="text-sm text-slate-600">
            Corporate single sign-on is served at{" "}
            <code className="rounded bg-slate-100 px-1">/api/sso</code> and
            shares the portal session secret. Rotation is scheduled before the
            next audit.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
