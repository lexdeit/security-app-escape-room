"use client";

import { useState } from "react";
import { Button, Input, Label, TextArea, TextField } from "@heroui/react";

export function CommentForm({ ticketId }: { ticketId: number }) {
  const [body, setBody] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ticketId, comment: body }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.error || "Could not post the reply.");
        return;
      }
      window.location.reload();
    } catch {
      setMessage("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-3 space-y-2">
      <TextField fullWidth>
        <Label className="sr-only">Reply</Label>
        <TextArea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Write a reply… (rich text allowed)"
        />
      </TextField>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      <Button
        type="submit"
        variant="primary"
        isDisabled={busy || !body.trim()}
      >
        {busy ? "Posting…" : "Post reply"}
      </Button>
    </form>
  );
}

export function NewTicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, tag: "general" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.error || "Could not create the ticket.");
        return;
      }
      window.location.href = `/tickets?id=${data.ticket.id}`;
    } catch {
      setMessage("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <TextField fullWidth>
        <Label className="sr-only">Summary</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Short summary"
        />
      </TextField>
      <TextField fullWidth>
        <Label className="sr-only">Description</Label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Describe the issue…"
        />
      </TextField>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      <Button
        type="submit"
        variant="secondary"
        isDisabled={busy || !title.trim() || !description.trim()}
      >
        {busy ? "Creating…" : "Create ticket"}
      </Button>
    </form>
  );
}
