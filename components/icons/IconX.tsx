import { I } from "./IconBase";

export function IconX({ className }: { className?: string }) {
  return (
    <I className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </I>
  );
}
