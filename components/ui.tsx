"use client";

import type { ReactNode } from "react";
import {
  Alert,
  Button,
  Chip,
  Input,
  Label,
  TextArea,
  TextField,
  type ButtonRootProps,
  type InputRootProps,
  type TextAreaRootProps,
} from "@heroui/react";

/**
 * Reusable brand primitives (McDonald's palette, checked contrast).
 *
 * USE THESE instead of styling elements ad hoc. Every pair below is fixed:
 * - ink (#27251F) on cream/white → ~15:1
 * - warm gray (#6F665C) on white → ~5.5:1 (secondary text only)
 * - white on McD red (#DA291C) → ~4.6:1 (semibold UI text)
 * - ink on McD yellow (#FFC72C) → ~12:1
 */

// ---------------------------------------------------------------- text

export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold text-[#27251F]">{title}</h1>
      {subtitle ? (
        <p className="mt-1 text-sm text-[#6F665C]">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function Muted({ children }: { children: ReactNode }) {
  return <p className="text-sm text-[#6F665C]">{children}</p>;
}

export function BodyText({ children }: { children: ReactNode }) {
  return <p className="text-sm text-[#27251F]">{children}</p>;
}

// -------------------------------------------------------------- buttons

type CommonButtonProps = Omit<ButtonRootProps, "variant"> & {
  children: ReactNode;
};

/** Main action. White semibold text on McD red. */
export function PrimaryButton({ children, ...props }: CommonButtonProps) {
  return (
    <Button variant="primary" className="font-semibold" {...props}>
      {children}
    </Button>
  );
}

/** Highlight action. McD ink on McD yellow. */
export function GoldenButton({ children, ...props }: CommonButtonProps) {
  return (
    <Button
      variant="primary"
      className="bg-[#FFC72C] font-semibold text-[#27251F] hover:bg-[#F5B800]"
      {...props}
    >
      {children}
    </Button>
  );
}

/** Secondary action (theme default surface). */
export function SecondaryButton({ children, ...props }: CommonButtonProps) {
  return (
    <Button variant="secondary" className="font-semibold" {...props}>
      {children}
    </Button>
  );
}

// --------------------------------------------------------------- fields

export function Field({
  label,
  isRequired,
  ...props
}: { label: ReactNode; isRequired?: boolean } & InputRootProps) {
  return (
    <TextField fullWidth isRequired={isRequired}>
      <Label className="font-medium text-[#27251F]">{label}</Label>
      <Input {...props} />
    </TextField>
  );
}

export function AreaField({
  label,
  isRequired,
  ...props
}: { label: ReactNode; isRequired?: boolean } & TextAreaRootProps) {
  return (
    <TextField fullWidth isRequired={isRequired}>
      <Label className="font-medium text-[#27251F]">{label}</Label>
      <TextArea {...props} />
    </TextField>
  );
}

/** GET search row used by every searchable page. */
export function SearchBar({
  name = "q",
  defaultValue,
  placeholder,
  buttonLabel = "Search",
}: {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  buttonLabel?: string;
}) {
  return (
    <form method="GET" className="mb-4 flex items-end gap-2">
      <Input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label={placeholder ?? "Search"}
        className="w-full max-w-md"
      />
      <PrimaryButton type="submit">{buttonLabel}</PrimaryButton>
    </form>
  );
}

// ---------------------------------------------------------------- chips

export function RoleChip({ role }: { role: string }) {
  return (
    <Chip
      size="sm"
      variant="soft"
      color={role === "admin" ? "danger" : role === "analyst" ? "warning" : "default"}
    >
      {role}
    </Chip>
  );
}

export function StatusChip({ status }: { status: string }) {
  return (
    <Chip
      size="sm"
      variant="soft"
      color={
        status === "open"
          ? "danger"
          : status === "in-progress"
            ? "warning"
            : "success"
      }
    >
      {status}
    </Chip>
  );
}

export function PriorityChip({ priority }: { priority: string }) {
  return (
    <Chip
      size="sm"
      variant="soft"
      color={priority === "high" ? "danger" : "default"}
    >
      {priority}
    </Chip>
  );
}

export function TagChip({
  children,
  color = "default",
}: {
  children: ReactNode;
  color?: "default" | "warning" | "danger" | "success" | "accent";
}) {
  return (
    <Chip size="sm" variant="soft" color={color}>
      {children}
    </Chip>
  );
}

// ---------------------------------------------------------------- alerts

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <Alert status="danger">
      <Alert.Description>{children}</Alert.Description>
    </Alert>
  );
}

export function InfoNote({ children }: { children: ReactNode }) {
  return (
    <Alert status="accent">
      <Alert.Description>{children}</Alert.Description>
    </Alert>
  );
}

// ----------------------------------------------------------------- misc

export function KV({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="font-medium text-[#6F665C]">{label}</dt>
      <dd className="font-medium text-[#27251F]">{children}</dd>
    </div>
  );
}

/** Dark mono box for tokens / tool output. White on near-black. */
export function MonoBox({ children }: { children: ReactNode }) {
  return (
    <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-[#27251F] p-3 font-mono text-xs text-white">
      {children}
    </pre>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="py-4 text-sm text-[#6F665C]">{children}</p>;
}
