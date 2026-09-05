import { NextResponse } from "next/server";
import { sessionFromCookieHeader } from "@/lib/auth";
import { EMPLOYEES, getBio, getProfileOverride, isSQLiBypass } from "@/lib/data";

/**
 * Employee directory API.
 */
export async function GET(request: Request) {
  const session = await sessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const record = EMPLOYEES.find((e) => e.id === Number(id));
    if (!record) {
      return NextResponse.json({ error: "No such employee." }, { status: 404 });
    }
    return NextResponse.json({
      ...record,
      bio: getBio(record.email, record.bio),
      ...getProfileOverride(record.email),
    });
  }
  const search = (searchParams.get("search") ?? "").trim();
  let list = EMPLOYEES;
  if (search) {
    if (!isSQLiBypass(search)) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q) ||
          e.title.toLowerCase().includes(q),
      );
    }
  }
  return NextResponse.json({
    employees: list.map((e) => ({
      id: e.id,
      name: e.name,
      email: e.email,
      title: e.title,
      department: e.department,
      office: e.office,
    })),
  });
}
