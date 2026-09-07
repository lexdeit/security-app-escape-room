import { I } from "./IconBase";

export function IconChevron({ className }: { className?: string }) {
  return (
    <I className={className}>
      <polyline points="6 9 12 15 18 9" />
    </I>
  );
}
