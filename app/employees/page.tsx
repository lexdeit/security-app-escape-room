import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { AppShell, Card } from "@/components/AppShell";
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
      <h1 className="mb-1 text-2xl font-bold">Employees</h1>
      <p className="mb-5 text-sm text-slate-500">
        Directory of Acme Corporation staff.
      </p>
      <form method="GET" className="mb-4 flex items-end gap-2">
        <Input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search by name, title or department…"
          className="w-full max-w-md"
        />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>
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
                  {e.title} · {e.department}
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
