"use client";

import { useState } from "react";
import { Field, MonoBox, SecondaryButton } from "@/components/ui";

export function UrlPreviewForm() {
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/documents/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, serviceToken: token || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      setResult(
        res.ok
          ? (data.content ?? data.summary ?? "No content returned.")
          : (data.error ?? "Preview failed."),
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
        label="Document URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://… or http://localhost:3000/api/…"
      />
      <Field
        label="Service token (only for internal resources)"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Optional"
      />
      <SecondaryButton type="submit" isDisabled={busy || !url}>
        {busy ? "Fetching…" : "Fetch preview"}
      </SecondaryButton>
      {result !== null ? <MonoBox>{result}</MonoBox> : null}
    </form>
  );
}
