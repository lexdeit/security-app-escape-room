import Link from "next/link";
import { Card } from "@/components/ui-server";
import {
  EmptyState,
  IconArrow,
  KV,
  Muted,
  PageHeader,
} from "@/components/ui-server";
import { UserAvatar } from "@/components/ui";
import { ProfileEditor } from "@/components/ProfileEditor";
import { requireUser } from "@/lib/portal";
import { EMPLOYEES, getBio } from "@/lib/data";
import { PORTAL_USERS } from "@/lib/users";
export const metadata = { title: "My Profile" };

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;

  // Employee file lookup shares the directory backend: any logged-in
  // employee can pull up anyone's file by id.
  const viewed: (typeof EMPLOYEES)[number] | undefined = params.id
    ? EMPLOYEES.find((e) => e.id === Number(params.id))
    : EMPLOYEES.find((e) => e.email.toLowerCase() === user.email.toLowerCase());

  const isSelf =
    !params.id ||
    viewed?.email.toLowerCase() === user.email.toLowerCase();

  const stored = PORTAL_USERS.find(
    (u) => u.email.toLowerCase() === user.email.toLowerCase(),
  );

  return (
    <>
      <PageHeader
        eyebrow="People"
        title={isSelf ? "My Profile" : "Employee file"}
        subtitle={
          isSelf
            ? "Your directory presence — keep it fresh."
            : "Shared by the directory backend."
        }
      />
      {!viewed ? (
        <Card title="Not found">
          <EmptyState
            title="No file matches that id"
            hint="Check the employee list for a valid file."
            action={
              <Link
                href="/employees"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B5241A] hover:underline"
              >
                Browse employees <IconArrow className="h-4 w-4" />
              </Link>
            }
          />
        </Card>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Card>
              <div className="flex items-center gap-4 border-b border-[#F3EBDD] pb-5">
                <UserAvatar name={viewed.name} size="lg" />
                <div className="min-w-0">
                  <p className="font-display truncate text-2xl font-extrabold tracking-tight text-[#27251F]">
                    {viewed.name}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-[#6F665C]">
                    {viewed.title} · {viewed.department}
                  </p>
                </div>
              </div>
              <dl className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2">
                <KV label="Office">{viewed.office}</KV>
                <KV label="Email">{viewed.email}</KV>
                <KV label="Phone">{viewed.phone}</KV>
                <KV label="Directory note">{viewed.publicNote}</KV>
              </dl>
              <div className="mt-5">
                <p className="mb-1.5 text-[13px] font-medium text-[#6F665C]">Bio</p>
                {/* Legacy rich-text bios render as HTML. */}
                <div
                  className="rounded-xl bg-[#FFF9F0] px-4 py-3 text-[15px] leading-relaxed text-[#27251F] ring-1 ring-[#ECE2D0]"
                  dangerouslySetInnerHTML={{
                    __html: getBio(viewed.email, viewed.bio),
                  }}
                />
              </div>
              <div className="mt-4 rounded-xl border border-[#F0D489] bg-[#FFF8E1] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8A6D00]">
                  Internal HR note
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#27251F]">
                  {viewed.internalNote}
                </p>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-2">
            {isSelf ? (
              <Card title="Edit profile">
              <ProfileEditor
                initial={{
                  name: user.name,
                  title: stored?.title ?? "",
                  phone: viewed.phone,
                  bio: getBio(viewed.email, viewed.bio),
                }}
              />
              </Card>
            ) : (
              <Card title="About this file">
                <Muted>
                  This file is shared by the directory backend. Use the
                  employee list to browse other colleagues.
                </Muted>
              </Card>
            )}
          </div>
        </div>
      )}
    </>
  );
}
