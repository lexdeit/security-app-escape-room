"use client";

import { useState } from "react";
import { SecondaryButton } from "@/components/ui";

export function LogoutButton() {
  const [busy, setBusy] = useState(false);
  return (
    <SecondaryButton
      size="sm"
      fullWidth
      isDisabled={busy}
      onPress={async () => {
        setBusy(true);
        try {
          await fetch("/api/auth/logout", { method: "POST" });
        } finally {
          window.location.href = "/login";
        }
      }}
    >
      {busy ? "Signing out…" : "Sign out"}
    </SecondaryButton>
  );
}
