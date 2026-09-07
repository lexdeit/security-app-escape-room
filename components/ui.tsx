"use client";

import type { ReactNode } from "react";
import {
  Alert,
  Avatar,
  Button,
  Chip,
  Dropdown,
  Input,
  Label,
  Modal,
  Spinner,
  Tabs,
  TextArea,
  TextField,
  type ButtonRootProps,
  type InputRootProps,
  type TextAreaRootProps,
} from "@heroui/react";
import { IconChevron, IconLogout, IconSearch, IconUser, IconX } from "./icons";

/* Interactive brand primitives (client islands). Static primitives live in
   ./ui-server so Server Components never ship this module's JS for them. */

// --------------------------------------------------------------- buttons

type CommonButtonProps = Omit<ButtonRootProps, "variant"> & {
  children: ReactNode;
  isLoading?: boolean;
};

function ButtonContent({
  isLoading,
  children,
}: {
  isLoading?: boolean;
  children: ReactNode;
}) {
  if (!isLoading) return <>{children}</>;
  return (
    <span className="inline-flex items-center gap-2">
      <Spinner size="sm" color="current" aria-label="Loading" />
      {children}
    </span>
  );
}

const pressable =
  "min-h-11 rounded-xl px-5 text-[15px] font-semibold transition-all duration-150 active:scale-[0.98]";

/** Main action. White semibold text on McD red. */
export function PrimaryButton({
  children,
  isLoading,
  isDisabled,
  className,
  ...props
}: CommonButtonProps) {
  return (
    <Button
      variant="primary"
      className={`${pressable} shadow-[0_6px_16px_-8px_rgba(218,41,28,0.7)] hover:shadow-[0_10px_20px_-8px_rgba(218,41,28,0.7)] ${className ?? ""}`}
      isDisabled={isDisabled || isLoading}
      {...props}
    >
      <ButtonContent isLoading={isLoading}>{children}</ButtonContent>
    </Button>
  );
}

/** Highlight action. McD ink on McD yellow. */
export function GoldenButton({
  children,
  isLoading,
  isDisabled,
  className,
  ...props
}: CommonButtonProps) {
  return (
    <Button
      variant="primary"
      className={`${pressable} bg-[#FFC72C] text-[#27251F] shadow-[0_6px_16px_-8px_rgba(234,179,8,0.9)] hover:bg-[#F5B800] ${className ?? ""}`}
      isDisabled={isDisabled || isLoading}
      {...props}
    >
      <ButtonContent isLoading={isLoading}>{children}</ButtonContent>
    </Button>
  );
}

/** Secondary action on white surfaces. */
export function SecondaryButton({
  children,
  isLoading,
  isDisabled,
  className,
  ...props
}: CommonButtonProps) {
  return (
    <Button
      variant="secondary"
      className={`${pressable} ${className ?? ""}`}
      isDisabled={isDisabled || isLoading}
      {...props}
    >
      <ButtonContent isLoading={isLoading}>{children}</ButtonContent>
    </Button>
  );
}

// ---------------------------------------------------------------- fields

export function Field({
  label,
  isRequired,
  error,
  ...props
}: { label: ReactNode; isRequired?: boolean; error?: string } & InputRootProps) {
  return (
    <TextField fullWidth isRequired={isRequired} isInvalid={!!error}>
      <Label className="font-semibold text-[#27251F]">{label}</Label>
      <Input {...props} />
      {error ? (
        <p role="alert" className="text-sm font-medium text-[#B5241A]">
          {error}
        </p>
      ) : null}
    </TextField>
  );
}

export function AreaField({
  label,
  isRequired,
  error,
  ...props
}: { label: ReactNode; isRequired?: boolean; error?: string } & TextAreaRootProps) {
  return (
    <TextField fullWidth isRequired={isRequired} isInvalid={!!error}>
      <Label className="font-semibold text-[#27251F]">{label}</Label>
      <TextArea {...props} />
      {error ? (
        <p role="alert" className="text-sm font-medium text-[#B5241A]">
          {error}
        </p>
      ) : null}
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
    <form method="GET" className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end">
      <Input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label={placeholder ?? "Search"}
        className="w-full sm:max-w-md"
      />
      <PrimaryButton type="submit" className="w-full sm:w-auto">
        <span className="inline-flex items-center gap-2">
          <IconSearch className="h-4 w-4" />
          {buttonLabel}
        </span>
      </PrimaryButton>
    </form>
  );
}

// ------------------------------------------------------------------ chips

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

// ----------------------------------------------------------------- alerts

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

// ------------------------------------------------------------------ misc

/** Initials avatar on brand red. White semibold initials. */
export function UserAvatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <Avatar color="accent" size={size} aria-label={name}>
      <Avatar.Fallback className="font-bold">{initials}</Avatar.Fallback>
    </Avatar>
  );
}

/** Tab strip backed by HeroUI Tabs (client-side switching, same content). */
export function TabStrip({
  tabs,
}: {
  tabs: { id: string; label: string; icon?: ReactNode; content: ReactNode }[];
}) {
  return (
    <Tabs>
      <Tabs.List aria-label="Sections" className="mb-4">
        {tabs.map((t) => (
          <Tabs.Tab key={t.id} id={t.id}>
            <span className="inline-flex items-center gap-2">
              {t.icon}
              {t.label}
            </span>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((t) => (
        <Tabs.Panel key={t.id} id={t.id}>
          {t.content}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

/** Account dropdown for the sidebar / mobile topbar. */
export function UserMenu({
  name,
  email,
  onProfile,
  onSignOut,
}: {
  name: string;
  email: string;
  onProfile: () => void;
  onSignOut: () => void;
}) {
  return (
    <Dropdown>
      <Dropdown.Trigger aria-label={`Account menu for ${name}`}>
        <span className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-white/10">
          <UserAvatar name={name} size="sm" />
          <span className="min-w-0 text-left">
            <span className="block truncate text-sm font-semibold text-white">
              {name}
            </span>
            <span className="block truncate text-xs text-white/65">{email}</span>
          </span>
          <IconChevron className="h-4 w-4 shrink-0 text-white/60" />
        </span>
      </Dropdown.Trigger>
      <Dropdown.Popover placement="top start">
        <Dropdown.Menu
          aria-label="Account actions"
          onAction={(key) => {
            if (key === "profile") onProfile();
            if (key === "signout") onSignOut();
          }}
        >
          <Dropdown.Item id="profile" textValue="My profile">
            <span className="inline-flex items-center gap-2">
              <IconUser className="h-4 w-4" /> My profile
            </span>
          </Dropdown.Item>
          <Dropdown.Item id="signout" textValue="Sign out">
            <span className="inline-flex items-center gap-2 text-[#B5241A]">
              <IconLogout className="h-4 w-4" /> Sign out
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

/** Section card lives in ./ui-server (server component). */

/** Modal shell (uncontrolled) with brand header. */
export function BrandModal({
  trigger,
  title,
  subtitle,
  children,
}: {
  trigger: ReactNode;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <Modal>
      <Modal.Trigger>{trigger}</Modal.Trigger>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center" size="lg">
          <Modal.Dialog aria-label={title} className="overflow-hidden">
            <div className="h-1.5 bg-[#FFC72C]" />
            <Modal.Header className="flex items-start justify-between gap-4">
              <span>
                <Modal.Heading className="font-display text-xl font-bold text-[#27251F]">
                  {title}
                </Modal.Heading>
                {subtitle ? (
                  <span className="mt-1 block text-sm text-[#6F665C]">{subtitle}</span>
                ) : null}
              </span>
              <Modal.CloseTrigger aria-label="Close dialog">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#6F665C] transition-colors hover:bg-[#F5EFE3] hover:text-[#27251F]">
                  <IconX className="h-5 w-5" />
                </span>
              </Modal.CloseTrigger>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
