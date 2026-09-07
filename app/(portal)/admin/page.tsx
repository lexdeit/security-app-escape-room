import { Card as HeroCard } from "@heroui/react";
import { Card, Denied } from "@/components/ui-server";
import { Muted, PageHeader } from "@/components/ui-server";
import { IconShield, IconUsers } from "@/components/icons";
import { AccountsTable } from "@/components/AccountsTable";
import { requireUser } from "@/lib/portal";
import { PORTAL_USERS } from "@/lib/users";
export const metadata = { title: "Administration" };

export default async function AdminPage() {
  const user = await requireUser();

  if (user.role !== "admin") {
    return (
      <>
        <PageHeader eyebrow="System" title="Administration" />
        <Denied what="The administration console is restricted to IT administrators." />
      </>
    );
  }

  const admins = PORTAL_USERS.filter((u) => u.role === "admin").length;
  const analysts = PORTAL_USERS.filter((u) => u.role === "analyst").length;

  return (
    <>
      <PageHeader
        eyebrow="System"
        title="Administration"
        subtitle="User accounts and portal roles."
      />
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total accounts", value: String(PORTAL_USERS.length), icon: IconUsers, tile: "bg-[#F5EFE3] text-[#27251F]" },
          { label: "Administrators", value: String(admins), icon: IconShield, tile: "bg-[#FDECEA] text-[#B5241A]" },
          { label: "Analysts", value: String(analysts), icon: IconShield, tile: "bg-[#FFF3D6] text-[#8A6D00]" },
        ].map((s) => (
          <HeroCard key={s.label} className="rounded-2xl bg-white p-5 ring-1 ring-[#ECE2D0]">
            <HeroCard.Content className="flex items-center gap-4 p-0">
              <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.tile}`}>
                <s.icon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-[13px] font-medium text-[#6F665C]">
                  {s.label}
                </span>
                <span className="font-display block text-3xl font-extrabold text-[#27251F]">
                  {s.value}
                </span>
              </span>
            </HeroCard.Content>
          </HeroCard>
        ))}
      </div>
      <Card title={`Accounts · ${PORTAL_USERS.length}`}>
        <AccountsTable users={PORTAL_USERS} />
      </Card>
      <div className="mt-5">
        <Card title="SSO status">
          <Muted>
            Corporate single sign-on is served at{" "}
            <code className="rounded bg-[#F5EFE3] px-1.5 py-0.5 font-mono text-[13px] text-[#27251F]">
              /api/sso
            </code>{" "}
            and shares the portal session secret. Rotation is scheduled before
            the next audit.
          </Muted>
        </Card>
      </div>
    </>
  );
}
