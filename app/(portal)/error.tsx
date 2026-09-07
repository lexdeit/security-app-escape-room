"use client";

import Link from "next/link";
import { Alert } from "@heroui/react";
import { PrimaryButton } from "@/components/ui";

/**
 * Portal error boundary. Shows a branded message with a retry action —
 * never stack traces or internals.
 */
export default function PortalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl py-10">
      <Alert status="danger">
        <Alert.Title>Something went wrong</Alert.Title>
        <Alert.Description>
          This section failed to load. Your session is intact — try again, or
          head back to the dashboard.
        </Alert.Description>
      </Alert>
      <div className="mt-5 flex flex-wrap gap-3">
        <PrimaryButton onPress={() => reset()}>Try again</PrimaryButton>
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center rounded-xl px-5 text-[15px] font-semibold text-[#B5241A] ring-1 ring-[#ECE2D0] transition-colors hover:bg-white"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
