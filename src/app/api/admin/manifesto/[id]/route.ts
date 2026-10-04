import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json();
  const action = String(body.action ?? "");
  const db = supabaseAdmin();

  if (action === "publish") {
    await db.from("manifesto_versions").update({ status: "archived" }).eq("status", "live");
    const { error } = await db
      .from("manifesto_versions")
      .update({ status: "live", published_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return NextResponse.json({ error: "Could not publish." }, { status: 500 });
    revalidatePath("/manifesto");
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  }

  if (action === "unpublish") {
    const { error } = await db
      .from("manifesto_versions")
      .update({ status: "archived", updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return NextResponse.json({ error: "Could not pull down." }, { status: 500 });
    revalidatePath("/manifesto");
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  }

  if (action === "save") {
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (typeof body.title === "string") patch.title = body.title;
    if (typeof body.intro === "string") patch.intro = body.intro;
    if (typeof body.pledge === "string") patch.pledge = body.pledge;
    if (Array.isArray(body.pillars)) patch.pillars = body.pillars;
    const { error } = await db.from("manifesto_versions").update(patch).eq("id", id);
    if (error) return NextResponse.json({ error: "Could not save." }, { status: 500 });
    revalidatePath("/manifesto");
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
