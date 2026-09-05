import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { PageHeader, SearchBar } from "@/components/ui";
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
      <PageHeader title="Employees" subtitle="Directory of Acme Corporation staff." />
      <SearchBar
        defaultValue={q ?? ""}
        placeholder="Search by name, title or department…"
      />
      <Card>
        <ul className="divide-y divide-slate-100">
          {list.map((e) => (
            <li key={e.id} className="flex items-center justify-between py-3">
              <div>
                <Link
                  href={`/profile?id=${e.id}`}
                  className="font-medium text-sky-700 hover:underline"
                >
                  {e.name}
                </Link>
                <p className="text-sm text-slate-500">
                  {e.title} Â· {e.department}
                </p>
              </div>
              <span className="text-xs text-slate-400">{e.office}</span>
            </li>
          ))}
        </ul>
        {list.length === 0 ? (
          <p className="py-4 text-sm text-slate-500">No matches found.</p>
        ) : null}
      </Card>
    </AppShell>
  );
}
