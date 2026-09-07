/** Abstract brand mark: red tile, golden arches. Own identity, not a copy. */
export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#DA291C" />
      <path
        d="M9 29V17.5a5.5 5.5 0 0 1 11 0V29M20 29V17.5a5.5 5.5 0 0 1 11 0V29"
        fill="none"
        stroke="#FFC72C"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
