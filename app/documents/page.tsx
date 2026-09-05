import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { UrlPreviewForm } from "@/components/UrlPreviewForm";
import { currentSession } from "@/lib/portal";
import { DOCUMENTS } from "@/lib/data";

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const session = await currentSession();
  if (!session) redirect("/login");
  const { id } = await searchParams;

  const elevated = session.role === "admin" || session.role === "analyst";
  const visible = DOCUMENTS.filter((d) => !d.restricted || elevated);
  const opened = id ? DOCUMENTS.find((d) => d.id === id) : undefined;
  const blocked = opened?.restricted && !elevated;

  return (
    <AppShell user={session} active="/documents">
      <h1 className="mb-1 text-2xl font-bold">Documents</h1>
      <p className="mb-5 text-sm text-slate-500">
        Company library. Some items have restricted circulation.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Library">
          <ul className="space-y-3 text-sm">
            {visible.map((d) => (
              <li key={d.id} className="border-b border-slate-100 pb-2 last:border-0">
                <a href={`/documents?id=${d.id}`} className="font-medium text-sky-700 hover:underline">
                  {d.title}
                </a>
                <p className="text-xs text-slate-500">
                  {d.category} · updated {d.updated} · {d.size}
                </p>
                <p className="text-slate-600">{d.summary}</p>
              </li>
            ))}
          </ul>
        </Card>
        <div className="space-y-4">
          <Card title={opened ? opened.title : "Document viewer"}>
            {!opened ? (
              <p className="text-sm text-slate-500">
                Select a document to read it here.
              </p>
            ) : blocked ? (
              <p className="text-sm text-slate-600">
                This document has restricted circulation. Please contact the
                owning department to request access. (Error 403)
              </p>
            ) : (
              <pre className="whitespace-pre-wrap text-sm text-slate-700">{opened.body}</pre>
            )}
          </Card>
          <Card title="Preview by URL">
            <p className="mb-3 text-sm text-slate-500">
              Migrating files from the old intranet? Paste a link to fetch a
              text preview before importing.
            </p>
            <UrlPreviewForm />
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
