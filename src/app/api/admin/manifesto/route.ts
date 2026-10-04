import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/admin";
import { listManifestos, uploadPublicFile } from "@/lib/cms";
import { PILLARS } from "@/lib/manifesto";
import { revalidatePath } from "next/cache";

export async function GET() {
  if (!isSupabaseConfigured()) return NextResponse.json({ items: [] });
  const items = await listManifestos();
  return NextResponse.json({ items, builtin: { title: "Nine Pillars of Change", pillars: PILLARS } });
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
  const form = await req.formData();
  const title = String(form.get("title") ?? "").trim();
  const intro = String(form.get("intro") ?? "").trim();
  const pledge = String(form.get("pledge") ?? "").trim();
  const pillarsRaw = String(form.get("pillars") ?? "[]");
  let pillars: unknown[];
  try {
    pillars = JSON.parse(pillarsRaw);
    if (!Array.isArray(pillars)) throw new Error("bad");
  } catch {
    return NextResponse.json({ error: "Invalid pillars payload." }, { status: 400 });
  }
  if (!title) return NextResponse.json({ error: "Add a manifesto title." }, { status: 400 });

  const files = form.getAll("pillar_images");
  for (let i = 0; i < pillars.length; i++) {
    const f = files[i];
    if (f instanceof File && f.size > 0) {
      try {
        const path = await uploadPublicFile("manifesto", f);
        const p = pillars[i] as Record<string, unknown>;
        p.image = path;
      } catch (e) {
        return NextResponse.json({ error: e instanceof Error ? e.message : "Image upload failed." }, { status: 500 });
      }
    }
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("manifesto_versions")
    .insert({
      title,
      intro,
      pledge,
      pillars,
      status: "draft",
    })
    .select("*")
    .single();
  if (error) {
    console.error("manifesto insert", error);
    return NextResponse.json({ error: "Could not save draft." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, item: data });
}
