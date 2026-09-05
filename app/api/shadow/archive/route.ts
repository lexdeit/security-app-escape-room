import { NextResponse } from "next/server";
import { INTERNAL_API_TOKEN, VAULT_PART_1 } from "@/lib/secrets";

/**
 * Internal quarterly archive. Meant to be reachable only from the office
 * network; the service token doubles as authorization.
 */
export async function GET(request: Request) {
  const token = request.headers.get("x-service-token") ?? "";
  if (token !== INTERNAL_API_TOKEN) {
    return NextResponse.json(
      { error: "Missing or invalid service token." },
      { status: 403 },
    );
  }
  return NextResponse.json({
    archive: "quarterly-archive",
    "custodian-1": VAULT_PART_1,
    memo: "First custodian fragment filed by IT. The second fragment is held by L. Fernández in the analytics workspace (/analyst, role analyst or admin). Disclosure requires both fragments plus this service token at the compliance vault (/vault).",
    migrated: "2026-01-20",
    files: [
      { name: "q3-summary.pdf", size: "96 KB" },
      { name: "q4-restructure.pdf", size: "203 KB", circulation: "restricted" },
      { name: "custodian-1.txt", size: "1 KB", circulation: "procedure VAULT-2026-04" },
    ],
  });
}
