import { I } from "./IconBase";

export function IconHome({ className }: { className?: string }) {
  return (
    <I className={className}>
      <path d="M3 9.5 12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M9 22v-8h6v8" />
    </I>
  );
}
