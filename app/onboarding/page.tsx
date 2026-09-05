import { Card } from "@heroui/react";
import { OnboardingCtas } from "@/components/OnboardingCtas";
import { DOCUMENTS } from "@/lib/data";

/**
 * Public onboarding guide for new hires. Intentionally reachable without a
 * session: HR sends this link before the first login so starters can pick up
 * their temporary account.
 */
export default function OnboardingPage() {
  const guide = DOCUMENTS.find((d) => d.id === "it-onboarding");

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="border-b border-slate-200 bg-white px-8 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Acme Corporation
        </p>
        <p className="font-bold text-slate-900">New hire onboarding</p>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-4 py-8">
        <Card>
          <Card.Header>
            <Card.Title>{guide?.title ?? "IT Onboarding Guide"}</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="mb-3 text-sm text-slate-500">
              {guide?.summary} Last updated {guide?.updated}.
            </p>
            <pre className="whitespace-pre-wrap rounded bg-slate-50 p-4 text-sm text-slate-700">
              {guide?.body}
            </pre>
            <OnboardingCtas />
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>What&apos;s next?</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-slate-600">
              After your first login, explore the dashboard, complete your
              profile and browse the employee directory. If anything looks
              odd, file a ticket — Security Operations reads every report.
            </p>
          </Card.Content>
        </Card>
      </main>
      <footer className="px-8 py-4 text-center text-xs text-slate-500">
        © 2026 Acme Corporation · Internal use only
      </footer>
    </div>
  );
}
