import "server-only";

/**
 * Centralized secrets for the Acme Employee Portal.
 *
 * PRODUCTION NOTE (organizers): every value below has a weak, publicly
 * guessable default ON PURPOSE for the exercise. In a real deployment all
 * of these MUST be provided via environment variables. The nightly backup
 * job (`/backup`) snapshots this file's values, which is part of the
 * intended exercise chain (see README, organizers section).
 *
 * This module is server-only (`server-only` import above makes the build
 * fail if it is ever bundled into client JavaScript).
 */

export const BETTER_AUTH_SECRET =
  process.env.BETTER_AUTH_SECRET || "acme-dev-secret-2024";

export const INTERNAL_API_TOKEN =
  process.env.INTERNAL_API_TOKEN || "acme-int-7f3a9c2e-token";

/** First custodian fragment (kept in the internal shadow archive). */
export const VAULT_PART_1 = process.env.VAULT_PART_1 || "ACME-7F3A-91KD";

/** Second custodian fragment (kept in the analyst workspace). */
export const VAULT_PART_2 = process.env.VAULT_PART_2 || "ACME-9C2E-44ZX";

/**
 * Final objective. Served ONLY by POST /api/vault/unlock after all three
 * authorization values check out. Never imported by client components.
 */
export const FLAG_FINAL =
  process.env.FLAG_FINAL || "GCS{GLOBAL_CYBER_SECURITY_2026}";

/** Where the winning team must report the flag (shown on vault success). */
export const NOTIFY_CONTACT =
  process.env.NOTIFY_CONTACT || "soc@gcs-2026.example";

export const SESSION_COOKIE = "acme_session";
export const SESSION_TTL_SECONDS = 12 * 60 * 60;
