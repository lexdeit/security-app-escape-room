"use client";

import { useState } from "react";
import { Alert } from "@heroui/react";
import { ErrorNote, Field, MonoBox, PrimaryButton } from "@/components/ui";

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
        <Field
          label="First custodian fragment"
          value={part1}
          onChange={(e) => setPart1(e.target.value)}
          placeholder="ACME-…-…"
          className="font-mono"
        />
        <Field
          label="Second custodian fragment"
          value={part2}
          onChange={(e) => setPart2(e.target.value)}
          placeholder="ACME-…-…"
          className="font-mono"
        />
        <Field
          label="Service token"
          value={serviceToken}
          onChange={(e) => setServiceToken(e.target.value)}
          placeholder="Internal service token"
          className="font-mono"
        />
        <PrimaryButton type="submit" isDisabled={busy}>
          {busy ? "Authorizing…" : "Request dual authorization"}
        </PrimaryButton>
      </form>
      {result && !result.ok ? (
        <div className="mt-4">
          <ErrorNote>{result.error || "Authorization failed."}</ErrorNote>
        </div>
      ) : null}
      {result?.ok ? (
        <div className="mt-4">
          <Alert status="success">
            <Alert.Title>Disclosure authorized — memo released</Alert.Title>
            <Alert.Description>
              <MonoBox>{result.memo}</MonoBox>
              {result.reference ? (
                <p className="mt-3 rounded bg-white px-3 py-2 font-mono text-sm font-bold text-[#27251F]">
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
