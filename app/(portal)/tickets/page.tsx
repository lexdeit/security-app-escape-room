import { Card } from "@/components/ui-server";
import { CommentForm } from "@/components/TicketForms";
import { NewTicketModal } from "@/components/NewTicketModal";
import { EmptyState, Muted, PageHeader } from "@/components/ui-server";
import { IconClock } from "@/components/icons";
import {
  PriorityChip,
  SearchBar,
  StatusChip,
  TagChip,
  UserAvatar,
} from "@/components/ui";
import { requireUser } from "@/lib/portal";
import { getTicket, searchTickets } from "@/lib/data";
export const metadata = { title: "Tickets" };

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; id?: string }>;
}) {
  await requireUser();
  const { q, id } = await searchParams;

  const query = (q ?? "").trim();
  const results = searchTickets(query);
  const opened = id ? getTicket(Number(id)) : undefined;
  // The queue view filters restricted tickets, but the direct-link view
  // serves whatever id is requested (legacy deep-link behavior).
  const visibleList = results;

  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Tickets"
        subtitle="IT, facilities and compliance requests."
        actions={<NewTicketModal />}
      />
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <Card title={`Queue · ${visibleList.length}`}>
          <SearchBar
            defaultValue={query}
            placeholder="Try 'vpn', 'phishing', or an id…"
            buttonLabel="Go"
          />
          {visibleList.length === 0 ? (
            <EmptyState
              title="No tickets found"
              hint="Try different words, a tag, or a ticket id."
            />
          ) : (
            <ul className="divide-y divide-[#F3EBDD]">
              {visibleList.map((t) => (
                <li key={t.id}>
                  <a
                    href={`/tickets?id=${t.id}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                    className={`block rounded-xl px-2 py-3 transition-colors hover:bg-[#FFF9F0] ${
                      opened?.id === t.id ? "bg-[#FFF9F0]" : ""
                    }`}
                    aria-current={opened?.id === t.id ? "true" : undefined}
                  >
                    <span className="block text-[15px] font-semibold text-[#27251F] hover:text-[#B5241A]">
                      #{t.id} {t.title}
                    </span>
                    <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <StatusChip status={t.status} />
                      <PriorityChip priority={t.priority} />
                      <TagChip>{t.tag}</TagChip>
                      {t.restricted ? (
                        <TagChip color="warning">restricted</TagChip>
                      ) : null}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card title={opened ? `#${opened.id} ${opened.title}` : "Ticket detail"}>
          {!opened ? (
            <EmptyState
              title="Nothing selected"
              hint="Select a ticket to read it and reply."
            />
          ) : (
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <StatusChip status={opened.status} />
                <PriorityChip priority={opened.priority} />
                <TagChip>{opened.tag}</TagChip>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-[#6F665C]">
                <IconClock className="h-3.5 w-3.5" />
                Opened by {opened.requester} · {opened.created}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#27251F]">
                {opened.description}
              </p>
              <h3 className="font-display mb-3 mt-6 text-base font-bold text-[#27251F]">
                Replies ({opened.comments.length})
              </h3>
              {opened.comments.length === 0 ? (
                <Muted>No replies yet — be the first.</Muted>
              ) : (
                <ul className="space-y-3">
                  {opened.comments.map((c) => (
                    <li
                      key={c.id}
                      className="flex gap-3 rounded-xl bg-[#FFF9F0] px-3.5 py-3 ring-1 ring-[#F3EBDD]"
                    >
                      <UserAvatar name={c.author} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-[#6F665C]">
                          {c.author} · {c.created}
                        </p>
                        {/* Legacy rich-text replies render as HTML. */}
                        <div
                          className="mt-1 text-sm leading-relaxed text-[#27251F]"
                          dangerouslySetInnerHTML={{ __html: c.body }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 border-t border-[#F3EBDD] pt-4">
                <CommentForm ticketId={opened.id} />
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
