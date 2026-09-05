import { redirect } from "next/navigation";
import { AppShell, Card } from "@/components/AppShell";
import { ProfileEditor } from "@/components/ProfileEditor";
import { currentSession } from "@/lib/portal";
import { EMPLOYEES, getBio } from "@/lib/data";
import { PORTAL_USERS } from "@/lib/users";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const session = await currentSession();
  if (!session) redirect("/login");
  const params = await searchParams;

  // Employee file lookup shares the directory backend: any logged-in
  // employee can pull up anyone's file by id.
  const viewed: (typeof EMPLOYEES)[number] | undefined = params.id
    ? EMPLOYEES.find((e) => e.id === Number(params.id))
    : EMPLOYEES.find((e) => e.email.toLowerCase() === session.email.toLowerCase());

  const isSelf =
    !params.id ||
    viewed?.email.toLowerCase() === session.email.toLowerCase();

  const stored = PORTAL_USERS.find(
    (u) => u.email.toLowerCase() === session.email.toLowerCase(),
  );

  return (
    <AppShell user={session} active="/profile">
      <h1 className="mb-5 text-2xl font-bold">
        {isSelf ? "My Profile" : "Employee file"}
      </h1>
      {!viewed ? (
        <Card title="Not found">
          <p className="text-sm text-slate-600">
            No employee file matches that id.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card title={viewed.name}>
            <dl className="space-y-2 text-sm">
              <div><dt className="text-slate-500">Title</dt><dd className="font-medium">{viewed.title}</dd></div>
              <div><dt className="text-slate-500">Department</dt><dd className="font-medium">{viewed.department}</dd></div>
              <div><dt className="text-slate-500">Office</dt><dd className="font-medium">{viewed.office}</dd></div>
              <div><dt className="text-slate-500">Email</dt><dd className="font-medium">{viewed.email}</dd></div>
              <div><dt className="text-slate-500">Phone</dt><dd className="font-medium">{viewed.phone}</dd></div>
              <div>
                <dt className="text-slate-500">Bio</dt>
                {/* Legacy rich-text bios render as HTML. */}
                <dd
                  className="mt-1 rounded bg-slate-50 px-3 py-2"
                  dangerouslySetInnerHTML={{
                    __html: getBio(viewed.email, viewed.bio),
                  }}
                />
              </div>
              <div>
                <dt className="text-slate-500">Directory note</dt>
                <dd className="font-medium">{viewed.publicNote}</dd>
              </div>
              <div className="rounded border border-amber-200 bg-amber-50 px-3 py-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-amber-700">Internal HR note</dt>
                <dd className="mt-1 text-slate-700">{viewed.internalNote}</dd>
              </div>
            </dl>
          </Card>
          {isSelf ? (
            <Card title="Edit profile">
              <ProfileEditor
                initial={{
                  name: session.name,
                  title: stored?.title ?? "",
                  phone: viewed.phone,
                  bio: getBio(viewed.email, viewed.bio),
                }}
              />
            </Card>
          ) : (
            <Card title="About this file">
              <p className="text-sm text-slate-600">
                This file is shared by the directory backend. Use the employee
                list to browse other colleagues.
              </p>
            </Card>
          )}
        </div>
      )}
    </AppShell>
  );
}
