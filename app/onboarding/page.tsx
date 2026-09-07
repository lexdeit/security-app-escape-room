import { Card } from "@heroui/react";
import { OnboardingCtas } from "@/components/OnboardingCtas";
import { BrandMark } from "@/components/icons";
import { Eyebrow, Steps } from "@/components/ui-server";
import { DOCUMENTS } from "@/lib/data";
export const metadata = { title: "Onboarding" };

/**
 * Public onboarding guide for new hires. Intentionally reachable without a
 * session: HR sends this link before the first login so starters can pick up
 * their temporary account.
 */
export default function OnboardingPage() {
  const guide = DOCUMENTS.find((d) => d.id === "it-onboarding");

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F0]">
      <div className="h-2 bg-[#FFC72C]" />
      <header className="bg-[#27251F]">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-3 px-4 py-5 sm:px-6">
          <BrandMark className="h-10 w-10" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC72C]">
              Acme Corporation
            </p>
            <p className="font-display text-lg font-extrabold text-white">
              New hire onboarding
            </p>
          </div>
        </div>
      </header>
      <main className="animate-enter mx-auto w-full max-w-4xl flex-1 space-y-5 px-4 py-8 sm:px-6 md:py-10">
        <div>
          <Eyebrow>Start here</Eyebrow>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#27251F] md:text-4xl">
            Welcome to Acme. Let&apos;s get you set up.
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] text-[#6F665C]">
            Three steps stand between you and your first day inside the portal.
          </p>
        </div>
        <Card className="rounded-2xl">
          <Card.Content className="p-5 md:p-6">
            <Steps
              steps={[
                {
                  label: "Read the IT guide below",
                  hint: "It contains your temporary starter account.",
                  state: "now",
                },
                {
                  label: "Sign in to the portal",
                  hint: "Use the Employee Login button when ready.",
                  state: "todo",
                },
                {
                  label: "Explore and say hi",
                  hint: "Complete your profile and browse the directory.",
                  state: "todo",
                },
              ]}
            />
          </Card.Content>
        </Card>
        <Card className="rounded-2xl">
          <Card.Header>
            <Card.Title className="font-display text-xl font-bold text-[#27251F]">
              {guide?.title ?? "IT Onboarding Guide"}
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="mb-3 text-sm text-[#6F665C]">
              {guide?.summary} Last updated {guide?.updated}.
            </p>
            <pre className="whitespace-pre-wrap rounded-xl bg-[#FFF3D6] p-4 text-sm leading-relaxed text-[#27251F] ring-1 ring-[#ECE2D0]">
              {guide?.body}
            </pre>
            <OnboardingCtas />
          </Card.Content>
        </Card>
      </main>
      <footer className="px-8 py-4 text-center text-xs text-[#6F665C]">
        © 2026 Acme Corporation · Internal use only
      </footer>
    </div>
  );
}
