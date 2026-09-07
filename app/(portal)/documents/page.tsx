import { Card } from "@/components/ui-server";
import { UrlPreviewForm } from "@/components/UrlPreviewForm";
import { Muted, PageHeader } from "@/components/ui-server";
import { IconEye, IconFile, IconLock } from "@/components/icons";
import { requireUser } from "@/lib/portal";
import { DOCUMENTS } from "@/lib/data";
export const metadata = { title: "Documents" };

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const user = await requireUser();
  const { id } = await searchParams;

  const elevated = user.role === "admin" || user.role === "analyst";
  const visible = DOCUMENTS.filter((d) => !d.restricted || elevated);
  const opened = id ? DOCUMENTS.find((d) => d.id === id) : undefined;
  const blocked = opened?.restricted && !elevated;

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Documents"
        subtitle="Company library. Some items have restricted circulation."
      />
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <Card title={`Library · ${visible.length} items`}>
          <ul className="divide-y divide-[#F3EBDD]">
            {visible.map((d) => (
              <li key={d.id}>
                <a
                  href={`/documents?id=${d.id}`}
                  className={`group flex items-start gap-3.5 rounded-xl px-2 py-3.5 transition-colors hover:bg-[#FFF9F0] ${
                    opened?.id === d.id ? "bg-[#FFF9F0]" : ""
                  }`}
                  aria-current={opened?.id === d.id ? "true" : undefined}
                >
                  <span
                    className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-150 group-active:scale-90 ${
                      d.restricted
                        ? "bg-[#27251F] text-[#FFC72C]"
                        : "bg-[#FDECEA] text-[#B5241A]"
                    }`}
                  >
                    {d.restricted ? (
                      <IconLock className="h-5 w-5" />
                    ) : (
                      <IconFile className="h-5 w-5" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-semibold text-[#27251F] group-hover:text-[#B5241A]">
                      {d.title}
                      {d.restricted ? (
                        <span className="ml-2 rounded-full bg-[#FFF3D6] px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-[#8A6D00]">
                          Restricted
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-xs text-[#6F665C]">
                      {d.category} · updated {d.updated} · {d.size}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-[#6F665C]">
                      {d.summary}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Card>
        <div className="space-y-5">
          <Card title={opened ? opened.title : "Document viewer"}>
            {!opened ? (
              <div className="flex flex-col items-center px-4 py-10 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFE3] text-[#6F665C]">
                  <IconEye className="h-7 w-7" />
                </span>
                <Muted>Select a document to read it here.</Muted>
              </div>
            ) : blocked ? (
              <div className="flex flex-col items-center px-4 py-10 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#27251F] text-[#FFC72C]">
                  <IconLock className="h-7 w-7" />
                </span>
                <p className="font-display mt-4 text-lg font-bold text-[#27251F]">
                  Restricted circulation
                </p>
                <Muted>
                  Please contact the owning department to request access.
                  (Error 403)
                </Muted>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap rounded-xl bg-[#FFF9F0] p-4 text-sm leading-relaxed text-[#27251F] ring-1 ring-[#ECE2D0]">
                {opened.body}
              </pre>
            )}
          </Card>
          <Card title="Preview by URL">
            <Muted>
              Migrating files from the old intranet? Paste a link to fetch a
              text preview before importing.
            </Muted>
            <div className="mt-4">
              <UrlPreviewForm />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
