import { redirect } from "next/navigation";
import { Card } from "@heroui/react";
import { currentSession } from "@/lib/portal";
import { BrandMark } from "@/components/ui";
import { LoginForm } from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await currentSession();
  if (session) redirect("/dashboard");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#27251F] px-4 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#DA291C]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-[#FFC72C]/15 blur-3xl"
      />
      <div className="animate-enter relative w-full max-w-md">
        <div className="mb-5 flex items-center justify-center gap-3">
          <BrandMark className="h-12 w-12" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC72C]">
              Acme Corporation
            </p>
            <p className="font-display text-xl font-extrabold text-white">
              Employee Portal
            </p>
          </div>
        </div>
        <Card className="overflow-hidden rounded-3xl">
          <div className="h-1.5 bg-[#FFC72C]" />
          <Card.Header className="pb-1 pt-6">
            <Card.Title className="font-display text-2xl font-extrabold text-[#27251F]">
              Employee Login
            </Card.Title>
            <Card.Description className="text-[#6F665C]">
              Sign in to access the company portal.
            </Card.Description>
          </Card.Header>
          <Card.Content className="p-6 pt-2">
            <LoginForm />
          </Card.Content>
        </Card>
        <p className="mt-5 text-center text-xs text-white/50">
          Protected by corporate SSO · Internal use only
        </p>
      </div>
    </div>
  );
}
