"use client";

import { useState } from "react";
import { AreaField, Field, PrimaryButton } from "@/components/ui";

export function ProfileEditor({
  initial,
}: {
  initial: { name: string; title: string; phone: string; bio: string };
}) {
  const [name, setName] = useState(initial.name);
  const [title, setTitle] = useState(initial.title);
  const [phone, setPhone] = useState(initial.phone);
  const [bio, setBio] = useState(initial.bio);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title, phone, bio }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.error || "Could not save changes.");
        return;
      }
      setMessage("Profile updated.");
      window.location.reload();
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <Field
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Field
          label="Job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Field
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <AreaField
        label="Bio (rich text allowed)"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={4}
      />
      {message ? <p className="text-sm text-[#27251F]">{message}</p> : null}
      <PrimaryButton type="submit" isDisabled={busy}>
        {busy ? "Saving…" : "Save changes"}
      </PrimaryButton>
    </form>
  );
}
