import { I } from "./IconBase";

export function IconHelp({ className }: { className?: string }) {
  return (
    <I className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </I>
  );
}
