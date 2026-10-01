import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendTransactionalEmail, donationThanksHtml } from "@/lib/brevo";

export async function POST(req: Request) {
  const body = await req.json();
  const id = String(body.id ?? "");
  const action = String(body.action ?? "");
  const notes = String(body.notes ?? "");
  if (!id || (action !== "confirm" && action !== "reject")) {
    return NextResponse.json({ error: "Invalid review." }, { status: 400 });
  }

  const db = supabaseAdmin();
  const status = action === "confirm" ? "paid" : "rejected";
  const { data, error } = await db
    .from("donations")
    .update({
      status,
      review_notes: notes || null,
      reviewed_at: new Date().toISOString(),
      paid_at: action === "confirm" ? new Date().toISOString() : null,
    })
    .eq("id", id)
    .select("display_name, email, amount, currency, reference")
    .single();

  if (error) return NextResponse.json({ error: "Could not update donation." }, { status: 500 });

  if (action === "confirm" && data.email) {
    void sendTransactionalEmail({
      to: data.email,
      toName: data.display_name,
      subject: "Thank you for your contribution",
      html: donationThanksHtml(
        data.display_name,
        data.reference,
        `${data.currency} ${Number(data.amount).toLocaleString()}`
      ),
    });
  }

  return NextResponse.json({ ok: true });
}
