import type { ReactNode } from "react";
import { Alert, Card as HeroCard } from "@heroui/react";
import { IconCheck, IconSearch } from "./icons";

/* ================================================================== */
/* Server-only brand primitives (zero client JavaScript).              */
/* Icons live in ./icons (one file per icon + barrel). Same fixed      */
/* contrast pairs as the interactive set in ./ui:                      */
/*   ink #27251F on cream/white .......... ~15:1                       */
/*   warm gray #6F665C on white ........... ~5.5:1 (secondary only)     */
/*   ink on McD yellow #FFC72C ............ ~12:1                       */
/* ================================================================== */

// ------------------------------------------------------------ typography

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B5241A]">
      <span className="inline-block h-1 w-6 rounded-full bg-[#FFC72C]" aria-hidden="true" />
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
      <div className="min-w-0">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#27251F] md:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#6F665C]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </div>
  );
}

export function Muted({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-[#6F665C]">{children}</p>;
}

export function BodyText({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-[#27251F]">{children}</p>;
}

// ------------------------------------------------------------------- misc

export function KV({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="text-[13px] font-medium text-[#6F665C]">{label}</dt>
      <dd className="mt-0.5 font-medium text-[#27251F]">{children}</dd>
    </div>
  );
}

/** Dark mono box for tokens / tool output. White on ink. */
export function MonoBox({ children }: { children: ReactNode }) {
  return (
    <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-xl bg-[#27251F] p-4 font-mono text-[13px] leading-relaxed text-white">
      {children}
    </pre>
  );
}

export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3D6] text-[#B5241A]">
        <IconSearch className="h-8 w-8" />
      </span>
      <p className="font-display mt-4 text-lg font-bold text-[#27251F]">{title}</p>
      {hint ? <p className="mt-1 max-w-sm text-sm text-[#6F665C]">{hint}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

/** Numbered step rail (static guide, e.g. vault, onboarding). */
export function Steps({
  steps,
  tone = "light",
}: {
  steps: { label: string; hint: string; state: "done" | "now" | "todo" }[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <ol className="space-y-0">
      {steps.map((s, i) => (
        <li key={s.label} className="relative flex gap-4 pb-6 last:pb-0">
          {i < steps.length - 1 ? (
            <span
              className={`absolute left-[15px] top-9 h-[calc(100%-2rem)] w-0.5 rounded ${
                dark ? "bg-white/15" : "bg-[#ECE2D0]"
              }`}
              aria-hidden="true"
            />
          ) : null}
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              s.state === "done"
                ? "bg-[#DA291C] text-white"
                : s.state === "now"
                  ? "bg-[#FFC72C] text-[#27251F]"
                  : dark
                    ? "bg-white/10 text-white/60"
                    : "bg-[#F5EFE3] text-[#6F665C]"
            }`}
            aria-hidden="true"
          >
            {s.state === "done" ? <IconCheck className="h-4 w-4" /> : i + 1}
          </span>
          <span className="pt-0.5">
            <span
              className={`block text-[15px] font-semibold ${
                dark ? "text-white" : "text-[#27251F]"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`mt-0.5 block text-sm ${dark ? "text-white/65" : "text-[#6F665C]"}`}
            >
              {s.hint}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Section card: white surface, warm ring, soft brand shadow.
 *  Server component wrapping the HeroUI card: only the card boundary ships
 *  client JS, the surrounding page stays on the server. */
export function Card({
  title,
  children,
  className,
  hoverable,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}) {
  return (
    <HeroCard
      className={`rounded-2xl bg-white shadow-[0_1px_2px_rgba(39,37,31,0.05),0_12px_32px_-16px_rgba(39,37,31,0.25)] ring-1 ring-[#ECE2D0] ${
        hoverable
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(39,37,31,0.06),0_20px_40px_-16px_rgba(39,37,31,0.3)]"
          : ""
      } ${className ?? ""}`}
    >
      {title ? (
        <HeroCard.Header className="border-b border-[#F3EBDD] pb-3">
          <HeroCard.Title className="font-display text-lg font-bold text-[#27251F]">
            {title}
          </HeroCard.Title>
        </HeroCard.Header>
      ) : null}
      <HeroCard.Content className="p-5 md:p-6">{children}</HeroCard.Content>
    </HeroCard>
  );
}

export function Denied({ what }: { what: string }) {
  return (
    <Alert status="danger">
      <Alert.Title>Access denied</Alert.Title>
      <Alert.Description>
        {what} You do not have permission to view this section. If you believe
        this is a mistake, please contact IT support. (Error 403 · Forbidden)
      </Alert.Description>
    </Alert>
  );
}
