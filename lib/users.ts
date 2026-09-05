import "server-only";
import type { PortalRole } from "./auth";

/**
 * Legacy credential directory used by the intranet login form.
 * Passwords are stored exactly as HR exported them from the old system
 * (another thing the audit flagged, but migration is still pending).
 */

export interface PortalUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: PortalRole;
  title: string;
  department: string;
}

export const PORTAL_USERS: PortalUser[] = [
  {
    id: "u-carlos",
    email: "intern@acme-corp.com",
    password: "Welcome2026!",
    name: "Carlos Méndez",
    role: "employee",
    title: "IT Intern",
    department: "Information Technology",
  },
  {
    id: "u-mei",
    email: "m.lin@acme-corp.com",
    password: "Support#4512",
    name: "Mei Lin",
    role: "employee",
    title: "Support Engineer",
    department: "Customer Support",
  },
  {
    id: "u-lucia",
    email: "l.fernandez@acme-corp.com",
    password: "S0c-Analyst-88!",
    name: "Lucía Fernández",
    role: "analyst",
    title: "Security Analyst",
    department: "Security Operations",
  },
  {
    id: "u-marcus",
    email: "m.chen@acme-corp.com",
    password: "CT0-Acme-2026!",
    name: "Marcus Chen",
    role: "admin",
    title: "Chief Technology Officer",
    department: "Executive",
  },
];

export function findUserByEmail(email: string): PortalUser | undefined {
  const normalized = email.trim().toLowerCase();
  return PORTAL_USERS.find((u) => u.email.toLowerCase() === normalized);
}
