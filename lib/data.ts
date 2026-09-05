import "server-only";

/**
 * Fictional company dataset for the Acme Employee Portal.
 * All people, tickets, documents and figures are invented for the exercise.
 *
 * Runtime-mutable state (ticket comments, profile bios) lives in module
 * scope: restarting the server resets the exercise to its initial state.
 */

// ---------------------------------------------------------------- employees

export interface Employee {
  id: number;
  name: string;
  email: string;
  title: string;
  department: string;
  office: string;
  phone: string;
  bio: string;
  /** Visible to everybody. */
  publicNote: string;
  /** Should only be visible to HR/admins. Served anyway (see README). */
  internalNote: string;
}

export const EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: "Victoria Ashford",
    email: "v.ashford@acme-corp.com",
    title: "Chief Executive Officer",
    department: "Executive",
    office: "Madrid HQ · Floor 12",
    phone: "+34 910 204 881",
    bio: "Leading Acme Corporation since 2019. Focused on sustainable growth and operational excellence.",
    publicNote: "Town-hall every first Friday of the month.",
    internalNote:
      "Reminder from M. Chen: the quarterly archive was migrated off the shared drive to the internal shadow archive (/api/shadow/archive). " +
      "IT keeps the service token with the environment backups. First custodian fragment filed as custodian-1. " +
      "Second fragment held by L. Fernández in the analytics workspace.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    email: "m.chen@acme-corp.com",
    title: "Chief Technology Officer",
    department: "Executive",
    office: "Madrid HQ · Floor 11",
    phone: "+34 910 204 882",
    bio: "Owns platform engineering and corporate IT. Backup rotation is on my list, I promise.",
    publicNote: "Contact for infrastructure requests.",
    internalNote:
      "TODO before audit: rotate BETTER_AUTH_SECRET (still the dev value), restrict /backup, move shadow archive behind the VPC. " +
      "Temporary analyst provisioning via profile update is still enabled.",
  },
  {
    id: 3,
    name: "Lucía Fernández",
    email: "l.fernandez@acme-corp.com",
    title: "Security Analyst",
    department: "Security Operations",
    office: "Madrid HQ · Floor 4",
    phone: "+34 910 204 843",
    bio: "SOC analyst. I triage phishing reports and keep the analytics workspace tidy.",
    publicNote: "Report suspicious mail via the Tickets queue.",
    internalNote:
      "Second custodian fragment (custodian-2) stored in the analyst workspace panel. " +
      "Compliance vault (/vault) needs both fragments plus the service token.",
  },
  {
    id: 4,
    name: "Diego Ramírez",
    email: "d.ramirez@acme-corp.com",
    title: "IT Administrator",
    department: "Information Technology",
    office: "Madrid HQ · Floor 4",
    phone: "+34 910 204 844",
    bio: "I run backups, VPN and the link-checker service. If it has a URL field, it was probably mine.",
    publicNote: "VPN maintenance windows are announced on the dashboard.",
    internalNote:
      "Nightly backup publishes to /backup (index + env.backup). Network overview doc lists internal endpoints: /api/shadow/archive, /api/scanner, /api/config.",
  },
  {
    id: 5,
    name: "Amara Okafor",
    email: "a.okafor@acme-corp.com",
    title: "HR Manager",
    department: "Human Resources",
    office: "Madrid HQ · Floor 6",
    phone: "+34 910 204 861",
    bio: "People operations, onboarding and the 2026 handbook refresh.",
    publicNote: "Welcome Pack contains temporary accounts for interns.",
    internalNote: "Intern starter: intern@acme-corp.com. Password rotation pending for Q1 starters.",
  },
  {
    id: 6,
    name: "Tomás Herrera",
    email: "t.herrera@acme-corp.com",
    title: "Finance Lead",
    department: "Finance",
    office: "Austin · Floor 3",
    phone: "+1 512 555 0119",
    bio: "FP&A, quarterly reporting and the boring-but-important controls.",
    publicNote: "Q3 summary is published under Reports.",
    internalNote: "Q4 restructure draft is restricted until board sign-off. Filed under the compliance vault process.",
  },
  {
    id: 7,
    name: "Priya Nair",
    email: "p.nair@acme-corp.com",
    title: "Product Manager",
    department: "Product",
    office: "Austin · Floor 5",
    phone: "+1 512 555 0142",
    bio: "Portal roadmap owner. Currently: notifications v2 and the vault UX.",
    publicNote: "Feature requests go through Tickets.",
    internalNote: "Vault UX copy must say 'two-custodian authorization', never anything else.",
  },
  {
    id: 8,
    name: "Jonas Weber",
    email: "j.weber@acme-corp.com",
    title: "Sales Director",
    department: "Sales",
    office: "Austin · Floor 5",
    phone: "+1 512 555 0177",
    bio: "Enterprise sales, DACH + Iberia. Golf handicap: confidential.",
    publicNote: "Q3 beat quota by 8%.",
    internalNote: "Customer data stays in CRM; never attach exports to tickets.",
  },
  {
    id: 9,
    name: "Mei Lin",
    email: "m.lin@acme-corp.com",
    title: "Support Engineer",
    department: "Customer Support",
    office: "Remote · Lisbon",
    phone: "+351 210 555 093",
    bio: "Tier-2 support. I live in the tickets queue.",
    publicNote: "SLA: 4 business hours.",
    internalNote: "Ticket search supports advanced operators for the support team.",
  },
  {
    id: 10,
    name: "Carlos Méndez",
    email: "intern@acme-corp.com",
    title: "IT Intern",
    department: "Information Technology",
    office: "Madrid HQ · Floor 4",
    phone: "+34 910 204 800",
    bio: "Interning with IT. Learning the ropes (and the portal).",
    publicNote: "Started January 2026.",
    internalNote: "Temporary starter account. Ask Diego for the vault tour. Never share passwords in tickets.",
  },
  {
    id: 11,
    name: "Sofia Rossi",
    email: "s.rossi@acme-corp.com",
    title: "Legal Counsel",
    department: "Legal",
    office: "Madrid HQ · Floor 12",
    phone: "+34 910 204 890",
    bio: "Commercial contracts and the compliance calendar.",
    publicNote: "Contract reviews: 5-day turnaround.",
    internalNote: "Vault disclosures need dual authorization + service token. Procedure VAULT-2026-04.",
  },
  {
    id: 12,
    name: "James Carter",
    email: "j.carter@acme-corp.com",
    title: "Facilities Coordinator",
    department: "Operations",
    office: "Austin · Floor 1",
    phone: "+1 512 555 0101",
    bio: "Offices, badges and the good coffee machine.",
    publicNote: "Badge requests via Tickets.",
    internalNote: "Spare vault room key with reception. Codes are NOT with facilities.",
  },
];

// --------------------------------------------------------------- bios (XSS)

const bioOverrides = new Map<string, string>();

export function getBio(email: string, fallback: string): string {
  return bioOverrides.get(email.toLowerCase()) ?? fallback;
}

export function setBio(email: string, bio: string): void {
  bioOverrides.set(email.toLowerCase(), bio);
}

// ------------------------------------------------- profile field overrides

export interface ProfileOverride {
  name?: string;
  title?: string;
  phone?: string;
}

const profileOverrides = new Map<string, ProfileOverride>();

export function getProfileOverride(email: string): ProfileOverride {
  return profileOverrides.get(email.toLowerCase()) ?? {};
}

export function setProfileOverride(email: string, patch: ProfileOverride): void {
  const key = email.toLowerCase();
  profileOverrides.set(key, { ...(profileOverrides.get(key) ?? {}), ...patch });
}

// -------------------------------------------------------------- documents

export interface PortalDocument {
  id: string;
  title: string;
  category: string;
  updated: string;
  size: string;
  restricted: boolean;
  summary: string;
  body: string;
}

export const DOCUMENTS: PortalDocument[] = [
  {
    id: "it-onboarding",
    title: "IT Onboarding Guide",
    category: "IT",
    updated: "2026-01-08",
    size: "184 KB",
    restricted: false,
    summary: "Accounts, VPN and where things live.",
    body: [
      "Welcome to Acme! Your starter account is provisioned by HR.",
      "Temporary starter account for interns: intern@acme-corp.com / Welcome2026! (change it after first login).",
      "VPN profiles are in Settings. Nightly environment backups are published to /backup for the on-call engineer.",
      "The link-checker (Documents > Preview by URL) can fetch internal resources for migration checks.",
    ].join("\n"),
  },
  {
    id: "handbook-2026",
    title: "Employee Handbook 2026",
    category: "HR",
    updated: "2026-01-02",
    size: "412 KB",
    restricted: false,
    summary: "Policies, holidays and code of conduct.",
    body: [
      "1. Be kind. 2. Lock your screen. 3. Never paste secrets in tickets or bios.",
      "Holidays: Madrid + Austin calendars apply. See HR.",
      "Security: report anything odd to the Security Operations queue.",
    ].join("\n"),
  },
  {
    id: "q3-summary",
    title: "Q3 Financial Summary",
    category: "Finance",
    updated: "2025-10-14",
    size: "96 KB",
    restricted: false,
    summary: "Public quarterly numbers.",
    body: [
      "Revenue +8% QoQ. Churn at an all-time low.",
      "Full breakdown under Reports.",
    ].join("\n"),
  },
  {
    id: "net-overview",
    title: "Network & Integrations Overview",
    category: "IT",
    updated: "2026-01-20",
    size: "141 KB",
    restricted: true,
    summary: "Internal endpoints and migration notes.",
    body: [
      "Migration window: the quarterly archive moved to the internal shadow archive:",
      "  GET /api/shadow/archive  (header x-service-token required; token stored with the environment backups)",
      "Link inspection service: POST /api/scanner  { url, serviceToken? } (custom headers forwarded for migration checks).",
      "App wiring: GET /api/config exposes the current internal map for the frontend.",
      "Analytics workspace: /analyst (role analyst or admin).",
      "Two-custodian procedure VAULT-2026-04: compliance vault (/vault) needs custodian-1 + custodian-2 + service token.",
    ].join("\n"),
  },
  {
    id: "q4-restructure",
    title: "Q4 Restructure (Draft)",
    category: "Executive",
    updated: "2026-02-02",
    size: "203 KB",
    restricted: true,
    summary: "Board draft. Restricted circulation.",
    body: [
      "DRAFT — do not distribute. The board signs off in March.",
      "Archive reference: shadow archive file q4-restructure.pdf (see V. Ashford's employee file for context).",
      "Disclosure of the final memo requires the compliance vault process.",
    ].join("\n"),
  },
  {
    id: "phishing-deck",
    title: "Phishing Awareness Deck",
    category: "Security",
    updated: "2026-01-15",
    size: "88 KB",
    restricted: false,
    summary: "How to spot and report phishing.",
    body: [
      "Verify senders, hover links, report via Tickets with the phishing tag.",
      "SOC triages in the analytics workspace.",
    ].join("\n"),
  },
];

// ---------------------------------------------------------------- tickets

export interface TicketComment {
  id: number;
  author: string;
  created: string;
  /** Rendered as HTML on purpose (legacy rich-text). */
  body: string;
}

export interface Ticket {
  id: number;
  title: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  requester: string;
  tag: string;
  created: string;
  restricted: boolean;
  description: string;
  comments: TicketComment[];
}

let commentSeq = 100;

export const TICKETS: Ticket[] = [
  {
    id: 1035,
    title: "VPN is slow from Lisbon",
    status: "in-progress",
    priority: "medium",
    requester: "m.lin@acme-corp.com",
    tag: "it",
    created: "2026-02-03",
    restricted: false,
    description: "Latency spikes after 16:00. Tried both endpoints.",
    comments: [
      {
        id: 1,
        author: "d.ramirez@acme-corp.com",
        created: "2026-02-04",
        body: "Looking into it — likely the backup window. Try endpoint B meanwhile.",
      },
    ],
  },
  {
    id: 1038,
    title: "Suspicious invoice email",
    status: "open",
    priority: "high",
    requester: "j.weber@acme-corp.com",
    tag: "phishing",
    created: "2026-02-05",
    restricted: false,
    description: "Got an 'urgent invoice' from an unknown domain. Headers attached in the SOC format.",
    comments: [
      {
        id: 2,
        author: "l.fernandez@acme-corp.com",
        created: "2026-02-05",
        body: "Thanks Jonas — queued for triage in the analytics workspace.",
      },
    ],
  },
  {
    id: 1041,
    title: "Printer on floor 4 keeps jamming",
    status: "closed",
    priority: "low",
    requester: "intern@acme-corp.com",
    tag: "facilities",
    created: "2026-02-06",
    restricted: false,
    description: "Third jam this week. It hates Mondays.",
    comments: [
      {
        id: 3,
        author: "j.carter@acme-corp.com",
        created: "2026-02-06",
        body: "Toner + rollers replaced. Closing.",
      },
    ],
  },
  {
    id: 1042,
    title: "Compliance vault — second custodian code",
    status: "open",
    priority: "high",
    requester: "s.rossi@acme-corp.com",
    tag: "compliance",
    created: "2026-02-09",
    restricted: true,
    description:
      "Legal needs the disclosure memo released under procedure VAULT-2026-04. " +
      "Custodian-1 is filed in the shadow archive; custodian-2 is with L. Fernández in the analytics workspace. " +
      "The vault (/vault) requires both fragments plus the service token kept with the environment backups.",
    comments: [
      {
        id: 4,
        author: "l.fernandez@acme-corp.com",
        created: "2026-02-09",
        body: "Acknowledged — second fragment stays in the analyst panel until both custodians are present.",
      },
    ],
  },
  {
    id: 1044,
    title: "Access to analytics workspace",
    status: "open",
    priority: "medium",
    requester: "m.lin@acme-corp.com",
    tag: "access",
    created: "2026-02-10",
    restricted: true,
    description:
      "Support needs read access to the analytics workspace for phishing triage. " +
      "M. Chen noted temporary provisioning via profile update is still enabled — IT, please confirm the proper process.",
    comments: [],
  },
];

/**
 * Simulated legacy search: the query is interpolated into a SQL-like
 * filter. Anything resembling `' OR '1'='1` (or `OR 1=1`) disables the
 * restriction filter, returning restricted tickets as well.
 */
export function isSQLiBypass(input: string): boolean {
  const q = input.toLowerCase();
  return (
    q.includes("or '1'='1") ||
    q.includes('or "1"="1') ||
    q.includes("or 1=1") ||
    (q.includes("' or '") && q.includes("=")) ||
    (q.includes("' or \"") && q.includes("="))
  );
}

export function searchTickets(query: string): Ticket[] {
  const q = query.trim().toLowerCase();
  if (!q) return TICKETS.filter((t) => !t.restricted);
  if (isSQLiBypass(query)) return [...TICKETS];
  return TICKETS.filter(
    (t) =>
      !t.restricted &&
      (t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tag.toLowerCase().includes(q) ||
        String(t.id).includes(q)),
  );
}

export function getTicket(id: number): Ticket | undefined {
  return TICKETS.find((t) => t.id === id);
}

export function addTicketComment(id: number, author: string, body: string): TicketComment | null {
  const t = getTicket(id);
  if (!t) return null;
  const comment: TicketComment = {
    id: ++commentSeq,
    author,
    created: new Date().toISOString().slice(0, 10),
    body,
  };
  t.comments.push(comment);
  return comment;
}

let ticketSeq = 1050;

export function createTicket(input: {
  title: string;
  description: string;
  tag: string;
  requester: string;
}): Ticket {
  const t: Ticket = {
    id: ++ticketSeq,
    title: input.title,
    description: input.description,
    tag: input.tag || "general",
    status: "open",
    priority: "medium",
    requester: input.requester,
    created: new Date().toISOString().slice(0, 10),
    restricted: false,
    comments: [],
  };
  TICKETS.unshift(t);
  return t;
}

// ------------------------------------------------------------ notifications

export interface PortalNotification {
  id: number;
  title: string;
  body: string;
  date: string;
  unread: boolean;
}

export const NOTIFICATIONS: PortalNotification[] = [
  {
    id: 1,
    title: "Welcome to the new portal",
    body: "This is the new Acme Employee Portal. Update your profile and check the onboarding guide under Documents.",
    date: "2026-02-02",
    unread: true,
  },
  {
    id: 2,
    title: "Nightly backup completed",
    body: "Environment backup published to /backup (index + env.backup) at 03:00. On-call: D. Ramírez.",
    date: "2026-02-10",
    unread: true,
  },
  {
    id: 3,
    title: "Policy update: disclosure procedure VAULT-2026-04",
    body: "Releasing restricted memos now requires two-custodian authorization in the compliance vault. See Legal.",
    date: "2026-02-09",
    unread: false,
  },
  {
    id: 4,
    title: "Phishing drill next week",
    body: "SOC will run a drill. Report suspicious mail through Tickets with the phishing tag.",
    date: "2026-02-06",
    unread: false,
  },
];

// ----------------------------------------------------------------- reports

export interface PortalReport {
  id: string;
  title: string;
  period: string;
  owner: string;
  figures: { label: string; value: number }[];
  summary: string;
}

export const REPORTS: PortalReport[] = [
  {
    id: "sales-q3",
    title: "Sales Performance",
    period: "Q3 2025",
    owner: "J. Weber",
    figures: [
      { label: "Jul", value: 82 },
      { label: "Aug", value: 91 },
      { label: "Sep", value: 108 },
    ],
    summary: "Quota beaten by 8%. Enterprise segment drove growth.",
  },
  {
    id: "support-q1",
    title: "Support SLA",
    period: "Q1 2026",
    owner: "M. Lin",
    figures: [
      { label: "Jan", value: 96 },
      { label: "Feb", value: 94 },
    ],
    summary: "SLA compliance within target. VPN tickets trending up.",
  },
  {
    id: "headcount",
    title: "Headcount by Department",
    period: "Feb 2026",
    owner: "A. Okafor",
    figures: [
      { label: "Eng", value: 34 },
      { label: "Sales", value: 21 },
      { label: "Ops", value: 12 },
    ],
    summary: "Twelve roles open, mostly engineering and support.",
  },
];
