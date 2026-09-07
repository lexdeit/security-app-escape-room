import Link from "next/link";
import { BrandMark } from "@/components/ui-server";

/** Branded 404 for unknown routes. Server-rendered, no client JS. */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#27251F] px-4 text-center text-white">
      <div className="h-2 w-full max-w-md rounded-full bg-[#FFC72C]" aria-hidden="true" />
      <div className="mt-8 flex flex-col items-center">
        <BrandMark className="h-16 w-16" />
        <p className="font-display mt-6 text-7xl font-extrabold tracking-tight">
          404
        </p>
        <p className="font-display mt-2 text-2xl font-bold">
          This page doesn&apos;t exist
        </p>
        <p className="mt-2 max-w-sm text-[15px] text-white/65">
          The link may be mistyped, or the section was moved by IT.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#FFC72C] px-6 text-[15px] font-bold text-[#27251F] transition-all duration-150 hover:bg-[#F5B800] active:scale-[0.98]"
          >
            Go to dashboard
          </Link>
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center justify-center rounded-xl px-6 text-[15px] font-semibold text-white ring-1 ring-white/25 transition-all duration-150 hover:bg-white/10 active:scale-[0.98]"
          >
            Employee login
          </Link>
        </div>
      </div>
    </div>
  );
}
