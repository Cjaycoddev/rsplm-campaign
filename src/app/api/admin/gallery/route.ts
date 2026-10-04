import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { GALLERY_CATS, galleryRowToItem, listGallery, uploadPublicFile } from "@/lib/cms";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX = 8 * 1024 * 1024;

export async function GET() {
  if (!isSupabaseConfigured()) return NextResponse.json({ items: [] });
  const rows = await listGallery();
  return NextResponse.json({
    items: rows.map((r) => ({ ...r, src: galleryRowToItem(r).src })),
  });
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
  const form = await req.formData();
  const title = String(form.get("title") ?? "").trim();
  const caption = String(form.get("caption") ?? "").trim();
  const location = String(form.get("location") ?? "").trim();
  const category = String(form.get("category") ?? "People").trim() || "People";
  const spanRaw = String(form.get("span") ?? "normal");
  const span = spanRaw === "wide" || spanRaw === "tall" ? spanRaw : "normal";
  const file = form.get("file");
  if (!title) return NextResponse.json({ error: "Add a title." }, { status: 400 });
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose an image." }, { status: 400 });
  }
  if (file.size > MAX) return NextResponse.json({ error: "Image must be under 8 MB." }, { status: 400 });
  if (file.type && !ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Use JPG, PNG, WebP, or GIF." }, { status: 400 });
  }
  if (!(GALLERY_CATS as readonly string[]).includes(category)) {
    return NextResponse.json({ error: "Pick a gallery category." }, { status: 400 });
  }

  try {
    const storage_path = await uploadPublicFile("gallery", file);
    const db = supabaseAdmin();
    const { data, error } = await db
      .from("gallery_items")
      .insert({
        title,
        caption,
        location: location || null,
        category,
        span,
        storage_path,
        published: true,
      })
      .select("*")
      .single();
    if (error) throw error;
    revalidatePath("/gallery");
    return NextResponse.json({ ok: true, item: data });
  } catch (e) {
    console.error("gallery upload", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Could not save image." },
      { status: 500 }
    );
  }
}
