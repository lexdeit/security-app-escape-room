"use client";

import { useState } from "react";
import { Field, SecondaryButton } from "@/components/ui";
import { MonoBox } from "@/components/ui-server";

export function WebhookTester() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json().catch(() => ({}));
      setResult(
        res.ok
          ? (data.summary ?? JSON.stringify(data).slice(0, 2000))
          : (data.error ?? "Check failed."),
      );
    } catch {
      setResult("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Field
        label="Webhook URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://your-system.example/hook"
      />
      <SecondaryButton type="submit" isDisabled={busy || !url}>
        {busy ? "Sending test ping…" : "Send test ping"}
      </SecondaryButton>
      {result !== null ? <MonoBox>{result}</MonoBox> : null}
    </form>
  );
}
