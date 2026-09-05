import { redirect } from "next/navigation";
import { Card } from "@heroui/react";
import { currentSession } from "@/lib/portal";
import { LoginForm } from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await currentSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md p-2">
        <Card.Header>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              Acme Corporation
            </p>
            <Card.Title className="text-2xl">Employee Login</Card.Title>
            <Card.Description>
              Sign in to access the company portal.
            </Card.Description>
          </div>
        </Card.Header>
        <Card.Content>
          <LoginForm />
        </Card.Content>
      </Card>
    </div>
  );
}
