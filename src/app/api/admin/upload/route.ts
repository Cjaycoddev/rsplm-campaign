import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { publicObjectUrl, uploadPublicFile } from "@/lib/cms";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX = 8 * 1024 * 1024;

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
  const form = await req.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") ?? "uploads").replace(/[^a-z0-9-]/gi, "") || "uploads";
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose an image." }, { status: 400 });
  }
  if (file.size > MAX) return NextResponse.json({ error: "Image must be under 8 MB." }, { status: 400 });
  if (file.type && !ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Use JPG, PNG, WebP, or GIF." }, { status: 400 });
  }
  try {
    const path = await uploadPublicFile(folder, file);
    return NextResponse.json({ ok: true, path, url: publicObjectUrl(path) });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed." }, { status: 500 });
  }
}
