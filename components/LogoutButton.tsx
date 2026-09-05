"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

export function LogoutButton() {
  const [busy, setBusy] = useState(false);
  return (
    <Button
      variant="secondary"
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
    </Button>
  );
}
