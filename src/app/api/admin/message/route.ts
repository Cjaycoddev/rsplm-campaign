import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { isBrevoConfigured, sendTransactionalEmail } from "@/lib/brevo";

type Audience = "all" | "donors" | "supporters" | "volunteers" | "agents" | "monthly";

export async function POST(req: Request) {
  if (!isBrevoConfigured()) {
    return NextResponse.json(
      { error: "Add BREVO_API_KEY and BREVO_SENDER_EMAIL to send email." },
      { status: 503 }
    );
  }

  const body = await req.json();
  const subject = String(body.subject ?? "").trim();
  const html = String(body.body ?? "").trim();
  const audience = String(body.audience ?? "all") as Audience;
  if (subject.length < 3 || html.length < 3) {
    return NextResponse.json({ error: "Subject and message are required." }, { status: 400 });
  }

  const db = supabaseAdmin();
  let query = db.from("supporters").select("display_name, email").not("email", "is", null).eq("email_opt_in", true);

  if (audience === "donors") query = query.eq("role", "DONOR");
  if (audience === "supporters") query = query.eq("role", "SUPPORTER");
  if (audience === "volunteers") query = query.eq("role", "VOLUNTEER");
  if (audience === "agents") query = query.eq("role", "CAMPAIGN_AGENT");

  const { data: supporters, error } = await query;
  if (error) return NextResponse.json({ error: "Could not load recipients." }, { status: 500 });

  let recipients = (supporters ?? []).filter((s) => s.email);

  if (audience === "monthly") {
    const { data: pledges } = await db
      .from("donations")
      .select("email, display_name")
      .eq("frequency", "MONTHLY")
      .in("status", ["paid", "needs_review", "stk_sent"]);
    const seen = new Set<string>();
    recipients = [];
    for (const p of pledges ?? []) {
      if (!p.email || seen.has(p.email)) continue;
      seen.add(p.email);
      recipients.push({ email: p.email, display_name: p.display_name });
    }
  }

  let sent = 0;
  for (const r of recipients) {
    if (!r.email) continue;
    const res = await sendTransactionalEmail({
      to: r.email,
      toName: r.display_name,
      subject,
      html: `<p>Dear ${r.display_name},</p>${html}`,
    });
    if (res.ok && !res.skipped) sent += 1;
  }

  await db.from("message_sends").insert({
    subject,
    body: html,
    audience,
    recipient_count: sent,
  });

  return NextResponse.json({ ok: true, sent, total: recipients.length });
}
