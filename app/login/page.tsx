import { redirect } from "next/navigation";
import { Card } from "@heroui/react";
import { currentSession } from "@/lib/portal";
import { LoginForm } from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await currentSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md overflow-hidden p-0">
        <div className="h-2 bg-[#FFC72C]" />
        <div className="bg-[#27251F] px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FFC72C]">
            Acme Corporation
          </p>
          <p className="mt-1 text-2xl font-bold text-white">Employee Login</p>
          <p className="mt-1 text-sm text-white/70">
            Sign in to access the company portal.
          </p>
        </div>
        <Card.Content className="p-6">
          <LoginForm />
        </Card.Content>
      </Card>
    </div>
  );
}
