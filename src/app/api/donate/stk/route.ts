import { NextResponse } from "next/server";
import { isDarajaConfigured, stkPush } from "@/lib/daraja";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/admin";
import {
  generateReference,
  normalizeDisplayName,
  normalizeKenyanPhone,
  toMpesaApiFormat,
  validateAmount,
  validateCause,
  validateEmail,
  validateMpesaPhone,
  validateName,
} from "@/lib/validation";
import type { Cause, Frequency } from "@/app/donate/page";

const CAUSES: Cause[] = [
  "CAMPAIGN_OPS",
  "COMMUNITY_OUTREACH",
  "VOTER_EDUCATION",
  "YOUTH_EMPOWERMENT",
  "GENERAL_SUPPORT",
];

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured yet. Add Supabase keys to .env.local." },
      { status: 503 }
    );
  }
  if (!isDarajaConfigured()) {
    return NextResponse.json(
      {
        error:
          "M-Pesa STK is not live yet. Use bank transfer this weekend, or add Daraja keys to .env.local.",
      },
      { status: 503 }
    );
  }

  const body = await req.json();
  const name = String(body.name ?? "");
  const phone = String(body.phone ?? "");
  const emailRaw = String(body.email ?? "").trim().toLowerCase();
  const cause = String(body.cause ?? "") as Cause;
  const frequency = (String(body.frequency ?? "ONCE") as Frequency) === "MONTHLY" ? "MONTHLY" : "ONCE";
  const amount = Number(body.amount);
  const currency = String(body.currency ?? "KES") as "KES" | "USD";

  if (currency !== "KES") {
    return NextResponse.json({ error: "M-Pesa accepts KES only. Switch currency or use bank transfer." }, { status: 400 });
  }

  const err =
    validateName(name) ||
    validateMpesaPhone(phone) ||
    validateEmail(emailRaw) ||
    validateCause(cause) ||
    validateAmount(amount, "KES");
  if (err) return NextResponse.json({ error: err }, { status: 400 });
  if (!CAUSES.includes(cause)) return NextResponse.json({ error: "Please choose what you are supporting." }, { status: 400 });

  const phone254 = toMpesaApiFormat(phone);
  const e164 = normalizeKenyanPhone(phone);
  if (!phone254 || !e164) return NextResponse.json({ error: "Enter a valid M-Pesa number." }, { status: 400 });

  const displayName = normalizeDisplayName(name);
  const reference = generateReference();
  const db = supabaseAdmin();

  const { data: donation, error } = await db
    .from("donations")
    .insert({
      display_name: displayName,
      phone_e164: e164,
      email: emailRaw || null,
      amount,
      currency: "KES",
      frequency,
      cause,
      method: "MPESA",
      status: "pending",
      reference,
      till_number: process.env.DARAJA_SHORTCODE,
    })
    .select("id, reference")
    .single();

  if (error || !donation) {
    console.error("stk insert", error);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 500 });
  }

  try {
    const stk = await stkPush({
      phone254,
      amount,
      accountRef: donation.reference,
      description: "RSPLM donate",
    });
    await db
      .from("donations")
      .update({
        status: "stk_sent",
        checkout_request_id: stk.CheckoutRequestID,
        merchant_request_id: stk.MerchantRequestID,
        mpesa_payload: stk as object,
      })
      .eq("id", donation.id);

    return NextResponse.json({
      ok: true,
      reference: donation.reference,
      message: stk.CustomerMessage || "Check your phone for the M-Pesa prompt.",
    });
  } catch (e) {
    await db.from("donations").update({ status: "failed" }).eq("id", donation.id);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Could not send M-Pesa prompt." },
      { status: 502 }
    );
  }
}
