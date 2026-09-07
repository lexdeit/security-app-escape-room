import Link from "next/link";
import { redirect } from "next/navigation";
import { currentSession } from "@/lib/portal";
import { BrandMark, IconArrow, IconFile, IconShield, IconUsers } from "@/components/icons";

const FEATURES = [
  {
    icon: IconUsers,
    title: "People directory",
    text: "Find colleagues across Madrid, Austin and Lisbon in seconds.",
  },
  {
    icon: IconFile,
    title: "Documents & reports",
    text: "One library for handbooks, numbers and board-ready reports.",
  },
  {
    icon: IconShield,
    title: "Compliance built in",
    text: "Tickets, vault disclosures and audit trails in a single flow.",
  },
];

export default async function Home() {
  const session = await currentSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-[#27251F] text-white">
      <div className="h-2 bg-[#FFC72C]" />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <span className="flex items-center gap-3">
          <BrandMark className="h-11 w-11" />
          <span>
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC72C]">
              Acme Corporation
            </span>
            <span className="font-display block text-lg font-extrabold leading-tight">
              Company Portal
            </span>
          </span>
        </span>
        <Link
          href="/login"
          className="min-h-11 rounded-xl bg-[#DA291C] px-5 py-2.5 text-[15px] font-semibold text-white transition-all duration-150 hover:bg-[#B5241A] active:scale-[0.98]"
        >
          Employee Login
        </Link>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pb-16 pt-8 sm:px-6 md:pt-14">
        <div className="dot-grid relative overflow-hidden rounded-3xl bg-[#332F26] px-6 py-12 sm:px-12 md:px-16 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#DA291C]/40 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#FFC72C]/20 blur-2xl"
          />
          <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-[#FFC72C]">
            Internal system
          </p>
          <h1 className="font-display relative mt-4 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            One place for everything at Acme.
          </h1>
          <p className="relative mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Dashboards, employee directory, documents, reports, support tickets
            and compliance resources — for Madrid, Austin and remote teams.
          </p>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FFC72C] px-7 text-base font-bold text-[#27251F] transition-all duration-150 hover:bg-[#F5B800] active:scale-[0.98]"
            >
              Sign in with your employee account
              <IconArrow className="h-5 w-5" />
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex min-h-12 items-center justify-center rounded-xl px-7 text-base font-semibold text-white ring-1 ring-white/25 transition-all duration-150 hover:bg-white/10 active:scale-[0.98]"
            >
              New hire? Start here
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white p-6 text-[#27251F] shadow-[0_12px_32px_-16px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3D6] text-[#B5241A]">
                <f.icon className="h-6 w-6" />
              </span>
              <p className="font-display mt-4 text-lg font-bold">{f.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#6F665C]">{f.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-white/50">
          Authorized personnel only.
        </p>
      </main>
      <footer className="px-8 py-4 text-center text-xs text-white/50">
        © 2026 Acme Corporation · Madrid · Austin · Lisbon
      </footer>
    </div>
  );
}
