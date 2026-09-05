import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import {
  PageHeader,
  PriorityChip,
  SearchBar,
  StatusChip,
  TagChip,
} from "@/components/ui";
import { CommentForm, NewTicketForm } from "@/components/TicketForms";
import { currentSession } from "@/lib/portal";
import { getTicket, searchTickets } from "@/lib/data";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; id?: string }>;
}) {
  const session = await currentSession();
  if (!session) redirect("/login");
  const { q, id } = await searchParams;

  const query = (q ?? "").trim();
  const results = searchTickets(query);
  const opened = id ? getTicket(Number(id)) : undefined;
  // The queue view filters restricted tickets, but the direct-link view
  // serves whatever id is requested (legacy deep-link behavior).
  const visibleList = results;

  return (
    <AppShell user={session} active="/tickets">
      <PageHeader title="Tickets" subtitle="IT, facilities and compliance requests." />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Card title="Search the queue">
            <SearchBar
              defaultValue={query}
              placeholder="Try 'vpn', 'phishing', or an id…"
              buttonLabel="Go"
            />
            <ul className="mt-3 space-y-2 text-sm">
              {visibleList.map((t) => (
                <li key={t.id} className="border-b border-slate-100 pb-2 last:border-0">
                  <a href={`/tickets?id=${t.id}${query ? `&q=${encodeURIComponent(query)}` : ""}`} className="font-medium text-sky-700 hover:underline">
                    #{t.id} {t.title}
                  </a>
                  <p className="mt-1 flex flex-wrap gap-1 text-xs text-slate-500">
                    <StatusChip status={t.status} />
                    <PriorityChip priority={t.priority} />
                    <TagChip>{t.tag}</TagChip>
                    {t.restricted ? (
                      <TagChip color="warning">restricted</TagChip>
                    ) : null}
                  </p>
                </li>
              ))}
              {visibleList.length === 0 ? (
                <li className="text-sm text-slate-500">No tickets found.</li>
              ) : null}
            </ul>
          </Card>
          <Card title="New ticket">
            <NewTicketForm />
          </Card>
        </div>
        <Card title={opened ? `#${opened.id} ${opened.title}` : "Ticket detail"}>
          {!opened ? (
            <p className="text-sm text-slate-500">
              Select a ticket to read it and reply.
            </p>
          ) : (
            <div className="text-sm">
              <p className="text-xs text-slate-500">
                {opened.status} Â· {opened.priority} priority Â· {opened.tag} Â·
                opened by {opened.requester}
              </p>
              <p className="mt-2 text-slate-700">{opened.description}</p>
              <h3 className="mb-2 mt-4 font-semibold">
                Replies ({opened.comments.length})
              </h3>
              <ul className="space-y-3">
                {opened.comments.map((c) => (
                  <li key={c.id} className="rounded bg-slate-50 px-3 py-2">
                    <p className="text-xs text-slate-500">
                      {c.author} Â· {c.created}
                    </p>
                    {/* Legacy rich-text replies render as HTML. */}
                    <div
                      className="mt-1 text-slate-700"
                      dangerouslySetInnerHTML={{ __html: c.body }}
                    />
                  </li>
                ))}
              </ul>
              <CommentForm ticketId={opened.id} />
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
