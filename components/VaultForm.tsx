"use client";

import { useState } from "react";
import { Alert, Button, Input, Label, TextField } from "@heroui/react";

export function VaultForm() {
  const [part1, setPart1] = useState("");
  const [part2, setPart2] = useState("");
  const [serviceToken, setServiceToken] = useState("");
  const [result, setResult] = useState<null | {
    ok: boolean;
    memo?: string;
    reference?: string;
    notify?: string;
    error?: string;
  }>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/vault/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ part1, part2, serviceToken }),
      });
      const data = await res.json().catch(() => ({}));
      setResult(res.ok ? { ok: true, ...data } : { ok: false, error: data.error });
    } catch {
      setResult({ ok: false, error: "Network error." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <form onSubmit={submit} className="space-y-3">
        <TextField fullWidth>
          <Label>First custodian fragment</Label>
          <Input
            value={part1}
            onChange={(e) => setPart1(e.target.value)}
            placeholder="ACME-…-…"
            className="font-mono"
          />
        </TextField>
        <TextField fullWidth>
          <Label>Second custodian fragment</Label>
          <Input
            value={part2}
            onChange={(e) => setPart2(e.target.value)}
            placeholder="ACME-…-…"
            className="font-mono"
          />
        </TextField>
        <TextField fullWidth>
          <Label>Service token</Label>
          <Input
            value={serviceToken}
            onChange={(e) => setServiceToken(e.target.value)}
            placeholder="Internal service token"
            className="font-mono"
          />
        </TextField>
        <Button type="submit" variant="primary" isDisabled={busy}>
          {busy ? "Authorizing…" : "Request dual authorization"}
        </Button>
      </form>
      {result && !result.ok ? (
        <div className="mt-4">
          <Alert status="danger">
            <Alert.Description>
              {result.error || "Authorization failed."}
            </Alert.Description>
          </Alert>
        </div>
      ) : null}
      {result?.ok ? (
        <div className="mt-4">
          <Alert status="success">
            <Alert.Title>Disclosure authorized — memo released</Alert.Title>
            <Alert.Description>
              <pre className="mt-2 whitespace-pre-wrap font-mono text-sm">
                {result.memo}
              </pre>
              {result.reference ? (
                <p className="mt-3 rounded bg-white px-3 py-2 font-mono text-sm font-bold text-slate-900">
                  {result.reference}
                </p>
              ) : null}
              {result.notify ? <p className="mt-3">{result.notify}</p> : null}
            </Alert.Description>
          </Alert>
        </div>
      ) : null}
    </div>
  );
}
