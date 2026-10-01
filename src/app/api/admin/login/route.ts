import { NextResponse } from "next/server";
import { checkAdminPassword, createAdminSession } from "@/lib/admin-session";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = String((body as { password?: string }).password ?? "");
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Set ADMIN_PASSWORD in .env.local." }, { status: 503 });
  }
  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
