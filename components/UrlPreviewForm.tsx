"use client";

import { useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";

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
      <TextField fullWidth>
        <Label>Document URL</Label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://… or http://localhost:3000/api/…"
        />
      </TextField>
      <TextField fullWidth>
        <Label>
          Service token{" "}
          <span className="font-normal text-slate-400">(only for internal resources)</span>
        </Label>
        <Input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Optional"
        />
      </TextField>
      <Button type="submit" variant="secondary" isDisabled={busy || !url}>
        {busy ? "Fetching…" : "Fetch preview"}
      </Button>
      {result !== null ? (
        <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded bg-slate-900 p-3 text-xs text-slate-100">
          {result}
        </pre>
      ) : null}
    </form>
  );
}
