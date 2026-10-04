import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json();
  const published = Boolean(body.published);
  const db = supabaseAdmin();
  const { error } = await db.from("gallery_items").update({ published }).eq("id", id);
  if (error) return NextResponse.json({ error: "Could not update." }, { status: 500 });
  revalidatePath("/gallery");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const db = supabaseAdmin();
  const { data } = await db.from("gallery_items").select("storage_path").eq("id", id).maybeSingle();
  if (data?.storage_path) {
    await db.storage.from("campaign-public").remove([data.storage_path]);
  }
  const { error } = await db.from("gallery_items").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Could not remove." }, { status: 500 });
  revalidatePath("/gallery");
  return NextResponse.json({ ok: true });
}
