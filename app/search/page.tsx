import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { PageHeader, SearchBar } from "@/components/ui";
import { currentSession } from "@/lib/portal";
import { DOCUMENTS, EMPLOYEES, searchTickets } from "@/lib/data";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await currentSession();
  if (!session) redirect("/login");
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const elevated = session.role === "admin" || session.role === "analyst";
  const employees = query
    ? EMPLOYEES.filter((e) =>
        `${e.name} ${e.title} ${e.department}`.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 5)
    : [];
  const documents = query
    ? DOCUMENTS.filter(
        (d) =>
          (!d.restricted || elevated) &&
          `${d.title} ${d.summary}`.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 5)
    : [];
  const tickets = query ? searchTickets(query).slice(0, 5) : [];

  return (
    <AppShell user={session} active="/search">
      <PageHeader title="Search" subtitle="Search employees, documents and tickets." />
      <SearchBar defaultValue={query} placeholder="Type to search…" />
      {query ? (
        <div className="space-y-4">
          <Card>
            <h2 className="mb-2 text-sm font-semibold">
              Results for â€œ{query}â€
            </h2>
            {/* The query is reflected back into the page as-is (legacy behavior). */}
            <p
              className="text-sm text-slate-500"
              dangerouslySetInnerHTML={{
                __html: `Showing matches for: ${query}`,
              }}
            />
          </Card>
          <Card title={`Employees (${employees.length})`}>
            {employees.length === 0 ? (
              <p className="text-sm text-slate-500">No matches.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {employees.map((e) => (
                  <li key={e.id}>
                    <a href={`/profile?id=${e.id}`} className="text-sky-700 hover:underline">
                      {e.name}
                    </a>{" "}
                    <span className="text-slate-500">Â· {e.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card title={`Documents (${documents.length})`}>
            {documents.length === 0 ? (
              <p className="text-sm text-slate-500">No matches.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {documents.map((d) => (
                  <li key={d.id}>
                    <a href={`/documents?id=${d.id}`} className="text-sky-700 hover:underline">
                      {d.title}
                    </a>{" "}
                    <span className="text-slate-500">Â· {d.category}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card title={`Tickets (${tickets.length})`}>
            {tickets.length === 0 ? (
              <p className="text-sm text-slate-500">No matches.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {tickets.map((t) => (
                  <li key={t.id}>
                    <a href={`/tickets?id=${t.id}`} className="text-sky-700 hover:underline">
                      #{t.id} {t.title}
                    </a>{" "}
                    <span className="text-slate-500">Â· {t.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      ) : (
        <Card title="Tips">
          <p className="text-sm text-slate-600">
            The ticket index understands advanced operators used by the support
            team. Try filtering by tag, id or status words.
          </p>
        </Card>
      )}
    </AppShell>
  );
}
