import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/admin";
import { MEDIA_CATS, formatMediaDate, listMedia, uploadPublicFile } from "@/lib/cms";
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
  const body = String(form.get("body") ?? "").trim();
  const category = String(form.get("category") ?? "Campaign").trim() || "Campaign";
  const kind = String(form.get("kind") ?? "press") === "blog" ? "blog" : "press";
  const url = String(form.get("url") ?? "").trim();
  const author = String(form.get("author") ?? "").trim();
  const date_label = formatMediaDate(String(form.get("date_label") ?? "").trim()) || null;
  const file = form.get("file");
  let excerpt = String(form.get("excerpt") ?? "").trim();
  if (!excerpt && body) excerpt = body.replace(/\s+/g, " ").slice(0, 180) + (body.length > 180 ? "…" : "");

  if (!title) return NextResponse.json({ error: "Add a title." }, { status: 400 });
  if (kind === "blog" && !body && !excerpt) {
    return NextResponse.json({ error: "Write the blog post or a short excerpt." }, { status: 400 });
  }
  if (kind === "press" && !excerpt) return NextResponse.json({ error: "Add a short excerpt." }, { status: 400 });
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
  const row = {
    kind,
    title,
    excerpt,
    category,
    author: author || null,
    url: url || null,
    date_label: date_label || null,
    cover_path,
    body: body || null,
    published: true,
  };
  let { data, error } = await db.from("media_posts").insert(row).select("*").single();
  if (error && /body/i.test(error.message || "")) {
    const withoutBody = {
      kind,
      title,
      excerpt: body || excerpt,
      category,
      author: author || null,
      url: url || null,
      date_label: date_label || null,
      cover_path,
      published: true,
    };
    ({ data, error } = await db.from("media_posts").insert(withoutBody).select("*").single());
  }
  if (error) {
    console.error("media insert", error);
    return NextResponse.json({ error: "Could not save this post." }, { status: 500 });
  }
  revalidatePath("/media");
  if (data?.id) revalidatePath(`/media/${data.id}`);
  return NextResponse.json({ ok: true, item: data });
}
