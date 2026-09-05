import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { EmptyState, PageHeader, SearchBar, UserAvatar } from "@/components/ui";
import { currentSession } from "@/lib/portal";
import { EMPLOYEES } from "@/lib/data";

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await currentSession();
  if (!session) redirect("/login");
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();

  const list = query
    ? EMPLOYEES.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.department.toLowerCase().includes(query) ||
          e.title.toLowerCase().includes(query),
      )
    : EMPLOYEES;

  return (
    <AppShell user={session} active="/employees">
      <PageHeader
        eyebrow="People"
        title="Employees"
        subtitle="Directory of Acme Corporation staff across every office."
      />
      <SearchBar
        defaultValue={q ?? ""}
        placeholder="Search by name, title or department…"
      />
      <Card>
        {list.length === 0 ? (
          <EmptyState
            title="No people found"
            hint="Try a different name, title or department."
          />
        ) : (
          <ul className="divide-y divide-[#F3EBDD]">
            {list.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/profile?id=${e.id}`}
                  className="group flex items-center gap-4 rounded-xl px-2 py-3.5 transition-colors hover:bg-[#FFF9F0]"
                >
                  <UserAvatar name={e.name} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-[#27251F] group-hover:text-[#B5241A]">
                      {e.name}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-[#6F665C]">
                      {e.title} · {e.department}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-xs text-[#6F665C] sm:block">
                    {e.office}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </AppShell>
  );
}
