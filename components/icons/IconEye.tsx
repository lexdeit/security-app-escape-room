import { I } from "./IconBase";

export function IconEye({ className }: { className?: string }) {
  return (
    <I className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </I>
  );
}
