"use client";

import { useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";

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
      <TextField fullWidth>
        <Label className="sr-only">Webhook URL</Label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-system.example/hook"
        />
      </TextField>
      <Button type="submit" variant="secondary" isDisabled={busy || !url}>
        {busy ? "Sending test ping…" : "Send test ping"}
      </Button>
      {result !== null ? (
        <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded bg-slate-900 p-3 text-xs text-slate-100">
          {result}
        </pre>
      ) : null}
    </form>
  );
}
