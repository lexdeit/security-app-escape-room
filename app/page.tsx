import Link from "next/link";
import { redirect } from "next/navigation";
import { currentSession } from "@/lib/portal";

export default async function Home() {
  const session = await currentSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-white">
      <header className="flex items-center justify-between px-8 py-5">
        <p className="font-bold tracking-wide">ACME CORPORATION</p>
        <Link
          href="/login"
          className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200"
        >
          Employee Login
        </Link>
      </header>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Company Portal
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
          One place for everything at Acme.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Dashboards, employee directory, documents, reports, support tickets
          and compliance resources — for Madrid, Austin and remote teams.
        </p>
        <Link
          href="/login"
          className="mt-8 rounded-md bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-500"
        >
          Sign in with your employee account
        </Link>
        <p className="mt-4 text-xs text-slate-500">
          Internal system. Authorized personnel only. New hire?{" "}
          <Link href="/onboarding" className="underline hover:text-slate-300">
            Start with the onboarding guide
          </Link>
          .
        </p>
      </main>
      <footer className="px-8 py-4 text-center text-xs text-slate-500">
        © 2026 Acme Corporation · Madrid · Austin · Lisbon
      </footer>
    </div>
  );
}
