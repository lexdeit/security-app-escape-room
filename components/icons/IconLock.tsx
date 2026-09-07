import { I } from "./IconBase";

export function IconLock({ className }: { className?: string }) {
  return (
    <I className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </I>
  );
}
