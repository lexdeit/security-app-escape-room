/**
 * Instant navigation feedback for the portal section. Purely presentational
 * skeleton — no client JavaScript, streamed by the App Router while the
 * page payload is prepared.
 */
export default function PortalLoading() {
  return (
    <div role="status" aria-label="Loading section">
      <div className="mb-6 md:mb-8" aria-hidden="true">
        <div className="mb-2 h-4 w-28 animate-pulse rounded-full bg-[#F0D489]" />
        <div className="h-9 w-64 max-w-full animate-pulse rounded-lg bg-[#ECE2D0]" />
        <div className="mt-2 h-4 w-96 max-w-full animate-pulse rounded bg-[#F3EBDD]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl bg-white ring-1 ring-[#ECE2D0]"
          />
        ))}
      </div>
      <div
        className="mt-5 animate-pulse rounded-2xl bg-white p-6 ring-1 ring-[#ECE2D0]"
        aria-hidden="true"
      >
        <div className="h-5 w-48 rounded bg-[#ECE2D0]" />
        <div className="mt-4 space-y-3">
          <div className="h-4 rounded bg-[#F5EFE3]" />
          <div className="h-4 w-5/6 rounded bg-[#F5EFE3]" />
          <div className="h-4 w-4/6 rounded bg-[#F5EFE3]" />
        </div>
      </div>
    </div>
  );
}
