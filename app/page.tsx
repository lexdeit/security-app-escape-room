import Link from "next/link";
import { redirect } from "next/navigation";
import { currentSession } from "@/lib/portal";

export default async function Home() {
  const session = await currentSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-[#27251F] text-white">
      <div className="h-2 bg-[#FFC72C]" />
      <header className="flex items-center justify-between px-8 py-5">
        <p className="font-bold tracking-wide">
          ACME <span className="text-[#FFC72C]">CORPORATION</span>
        </p>
        <Link
          href="/login"
          className="rounded-lg bg-[#DA291C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B5241A]"
        >
          Employee Login
        </Link>
      </header>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFC72C]">
          Company Portal
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
          One place for everything at Acme.
        </h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Dashboards, employee directory, documents, reports, support tickets
          and compliance resources — for Madrid, Austin and remote teams.
        </p>
        <Link
          href="/login"
          className="mt-8 rounded-lg bg-[#FFC72C] px-6 py-3 font-semibold text-[#27251F] hover:bg-[#F5B800]"
        >
          Sign in with your employee account
        </Link>
        <p className="mt-4 text-xs text-white/70">
          Internal system. Authorized personnel only. New hire?{" "}
          <Link href="/onboarding" className="font-semibold text-[#FFC72C] underline hover:text-white">
            Start with the onboarding guide
          </Link>
          .
        </p>
      </main>
      <footer className="px-8 py-4 text-center text-xs text-white/60">
        © 2026 Acme Corporation · Madrid · Austin · Lisbon
      </footer>
    </div>
  );
}
