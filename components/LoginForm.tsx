"use client";

import { useState } from "react";
import Link from "next/link";
import { Alert, Button, Input, Label, TextField } from "@heroui/react";

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
      <TextField fullWidth isRequired>
        <Label>Corporate email</Label>
        <Input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@acme-corp.com"
        />
      </TextField>
      <TextField fullWidth isRequired>
        <Label>Password</Label>
        <Input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </TextField>
      {error ? (
        <Alert status="danger">
          <Alert.Description>{error}</Alert.Description>
        </Alert>
      ) : null}
      <Button type="submit" variant="primary" fullWidth isDisabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-xs text-slate-500">
        New here? Read the{" "}
        <Link href="/onboarding" className="text-sky-700 hover:underline">
          onboarding guide
        </Link>{" "}
        for your starter account, or contact helpdesk@acme-corp.com.
      </p>
    </form>
  );
}
