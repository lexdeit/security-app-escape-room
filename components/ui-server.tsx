import type { ReactNode } from "react";
import { Alert, Card as HeroCard } from "@heroui/react";

/* ================================================================== */
/* Server-only brand primitives (zero client JavaScript).              */
/* Same fixed contrast pairs as the interactive set in ./ui:           */
/*   ink #27251F on cream/white .......... ~15:1                       */
/*   warm gray #6F665C on white ........... ~5.5:1 (secondary only)     */
/*   ink on McD yellow #FFC72C ............ ~12:1                       */
/* ================================================================== */

// ---------------------------------------------------------------- icons

function I({
  children,
  className = "h-5 w-5",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const IconHome = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M3 9.5 12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <path d="M9 22v-8h6v8" />
  </I>
);
export const IconUsers = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </I>
);
export const IconUser = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </I>
);
export const IconFile = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </I>
);
export const IconChart = ({ className }: { className?: string }) => (
  <I className={className}>
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </I>
);
export const IconTicket = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </I>
);
export const IconBell = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </I>
);
export const IconSearch = ({ className }: { className?: string }) => (
  <I className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </I>
);
export const IconGear = ({ className }: { className?: string }) => (
  <I className={className}>
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </I>
);
export const IconShield = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </I>
);
export const IconLock = ({ className }: { className?: string }) => (
  <I className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </I>
);
export const IconLogout = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </I>
);
export const IconPlus = ({ className }: { className?: string }) => (
  <I className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </I>
);
export const IconX = ({ className }: { className?: string }) => (
  <I className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </I>
);
export const IconCheck = ({ className }: { className?: string }) => (
  <I className={className}>
    <polyline points="20 6 9 17 4 12" />
  </I>
);
export const IconAlert = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </I>
);
export const IconClock = ({ className }: { className?: string }) => (
  <I className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </I>
);
export const IconChevron = ({ className }: { className?: string }) => (
  <I className={className}>
    <polyline points="6 9 12 15 18 9" />
  </I>
);
export const IconArrow = ({ className }: { className?: string }) => (
  <I className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </I>
);
export const IconEye = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
    <circle cx="12" cy="12" r="3" />
  </I>
);
export const IconHelp = ({ className }: { className?: string }) => (
  <I className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </I>
);

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
