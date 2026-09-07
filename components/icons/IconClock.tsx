import { I } from "./IconBase";

export function IconClock({ className }: { className?: string }) {
  return (
    <I className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </I>
  );
}
