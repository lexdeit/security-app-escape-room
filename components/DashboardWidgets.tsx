"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";

interface AppConfig {
  app: string;
  version: string;
  supportEmail: string;
  features: Record<string, boolean>;
  internal: {
    archive: string;
    linkChecker: string;
    analystWorkspace: string;
    vault: string;
  };
}

/**
 * Loads remote feature flags for the dashboard widgets.
 * (This is why /api/config shows up in the browser network tab.)
 */
export function DashboardWidgets() {
  const [config, setConfig] = useState<AppConfig | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/config")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data) setConfig(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = [
    { label: "Open tickets", value: "4", hint: "2 high priority" },
    { label: "Employees", value: "12", hint: "3 offices" },
    {
      label: "Portal version",
      value: config ? config.version : "…",
      hint: config ? config.app : "loading configuration…",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((s) => (
        <Card key={s.label}>
          <Card.Content>
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-1 text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-slate-400">{s.hint}</p>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
