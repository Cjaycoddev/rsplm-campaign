import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/admin";
import { MEDIA_CATS, listMedia, uploadPublicFile } from "@/lib/cms";
import { revalidatePath } from "next/cache";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX = 8 * 1024 * 1024;

export async function GET() {
  if (!isSupabaseConfigured()) return NextResponse.json({ items: [] });
  const items = await listMedia();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
  const form = await req.formData();
  const title = String(form.get("title") ?? "").trim();
  const excerpt = String(form.get("excerpt") ?? "").trim();
  const category = String(form.get("category") ?? "Campaign").trim() || "Campaign";
  const kind = String(form.get("kind") ?? "press") === "blog" ? "blog" : "press";
  const url = String(form.get("url") ?? "").trim();
  const author = String(form.get("author") ?? "").trim();
  const date_label = String(form.get("date_label") ?? "").trim();
  const file = form.get("file");

  if (!title) return NextResponse.json({ error: "Add a title." }, { status: 400 });
  if (!excerpt) return NextResponse.json({ error: "Add a short excerpt." }, { status: 400 });
  if (!(MEDIA_CATS as readonly string[]).includes(category)) {
    return NextResponse.json({ error: "Pick a media category." }, { status: 400 });
  }
  if (url && !/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: "Link must start with http:// or https://." }, { status: 400 });
  }

  let cover_path: string | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX) return NextResponse.json({ error: "Image must be under 8 MB." }, { status: 400 });
    if (file.type && !ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Use JPG, PNG, WebP, or GIF." }, { status: 400 });
    }
    try {
      cover_path = await uploadPublicFile("media", file);
    } catch (e) {
      return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed." }, { status: 500 });
    }
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("media_posts")
    .insert({
      kind,
      title,
      excerpt,
      category,
      author: author || null,
      url: url || null,
      date_label: date_label || null,
      cover_path,
      published: true,
    })
    .select("*")
    .single();
  if (error) {
    console.error("media insert", error);
    return NextResponse.json({ error: "Could not save this post." }, { status: 500 });
  }
  revalidatePath("/media");
  return NextResponse.json({ ok: true, item: data });
}
