"use client";

import { useState } from "react";
import Link from "next/link";
import { ErrorNote, Field, PrimaryButton } from "@/components/ui";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Sign-in failed. Please try again.");
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field
        label="Corporate email"
        type="email"
        isRequired
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@acme-corp.com"
      />
      <Field
        label="Password"
        type="password"
        isRequired
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      {error ? <ErrorNote>{error}</ErrorNote> : null}
      <PrimaryButton type="submit" fullWidth isDisabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </PrimaryButton>
      <p className="text-center text-xs text-[#6F665C]">
        New here? Read the{" "}
        <Link href="/onboarding" className="font-medium text-[#B5241A] hover:underline">
          onboarding guide
        </Link>{" "}
        for your starter account, or contact helpdesk@acme-corp.com.
      </p>
    </form>
  );
}
