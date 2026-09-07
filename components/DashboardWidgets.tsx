"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { IconChart, IconTicket, IconUsers } from "@/components/icons";

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
    {
      label: "Open tickets",
      value: "4",
      hint: "2 high priority",
      icon: IconTicket,
      tile: "bg-[#FDECEA] text-[#B5241A]",
    },
    {
      label: "Employees",
      value: "12",
      hint: "3 offices",
      icon: IconUsers,
      tile: "bg-[#FFF3D6] text-[#8A6D00]",
    },
    {
      label: "Portal version",
      value: config ? config.version : "…",
      hint: config ? config.app : "loading configuration…",
      icon: IconChart,
      tile: "bg-[#F5EFE3] text-[#27251F]",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((s) => (
        <Card
          key={s.label}
          className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(39,37,31,0.05),0_12px_32px_-16px_rgba(39,37,31,0.25)] ring-1 ring-[#ECE2D0] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(39,37,31,0.06),0_20px_40px_-16px_rgba(39,37,31,0.3)]"
        >
          <Card.Content className="flex items-center gap-4 p-0">
            <span
              className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.tile}`}
            >
              <s.icon className="h-6 w-6" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-medium text-[#6F665C]">
                {s.label}
              </span>
              <span className="font-display block text-3xl font-extrabold tracking-tight text-[#27251F]">
                {s.value}
              </span>
              <span className="block truncate text-xs text-[#6F665C]">{s.hint}</span>
            </span>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
