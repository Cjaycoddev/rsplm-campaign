import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/admin";
import {
  generateReference,
  normalizeDisplayName,
  validateAmount,
  validateCause,
  validateEmail,
  validateName,
} from "@/lib/validation";
import { sendTransactionalEmail, proofReceivedHtml } from "@/lib/brevo";
import type { Cause, Frequency, Method } from "@/app/donate/page";

const CAUSES: Cause[] = [
  "CAMPAIGN_OPS",
  "COMMUNITY_OUTREACH",
  "VOTER_EDUCATION",
  "YOUTH_EMPOWERMENT",
  "GENERAL_SUPPORT",
];
const FREQ: Frequency[] = ["ONCE", "MONTHLY"];
const METHODS: Method[] = ["KCB", "COOP"];
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 3;

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured yet. Add Supabase keys to .env.local." },
      { status: 503 }
    );
  }

  const form = await req.formData();
  const name = String(form.get("name") ?? "");
  const emailRaw = String(form.get("email") ?? "").trim().toLowerCase();
  const cause = String(form.get("cause") ?? "") as Cause;
  const frequency = String(form.get("frequency") ?? "ONCE") as Frequency;
  const method = String(form.get("method") ?? "KCB") as Method;
  const amount = Number(form.get("amount"));
  const reference = String(form.get("reference") ?? generateReference());

  const nameErr = validateName(name);
  const emailErr = validateEmail(emailRaw);
  const causeErr = validateCause(cause);
  const amountErr = validateAmount(amount, "KES");
  if (nameErr || emailErr || causeErr || amountErr) {
    return NextResponse.json({ error: nameErr || emailErr || causeErr || amountErr }, { status: 400 });
  }
  if (!CAUSES.includes(cause) || !FREQ.includes(frequency) || !METHODS.includes(method)) {
    return NextResponse.json({ error: "Invalid donation details." }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (!files.length) return NextResponse.json({ error: "Upload a screenshot or PDF of the transfer." }, { status: 400 });
  if (files.length > MAX_FILES) return NextResponse.json({ error: "Maximum 3 files." }, { status: 400 });
  for (const f of files) {
    if (f.size > MAX_SIZE) return NextResponse.json({ error: `${f.name} must be under 5 MB.` }, { status: 400 });
    if (f.type && !ALLOWED_TYPES.includes(f.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, or PDF files are accepted." }, { status: 400 });
    }
  }

  const displayName = normalizeDisplayName(name);
  const email = emailRaw || null;
  const db = supabaseAdmin();

  const { data: donation, error } = await db
    .from("donations")
    .insert({
      display_name: displayName,
      email,
      amount,
      currency: "KES",
      frequency,
      cause,
      method,
      status: "needs_review",
      reference,
    })
    .select("id, reference")
    .single();

  if (error) {
    console.error("bank donation", error);
    return NextResponse.json({ error: "Could not save this donation. Please try again." }, { status: 500 });
  }

  for (const f of files) {
    const ext = (f.name.split(".").pop() || "bin").toLowerCase();
    const path = `${donation.id}/${crypto.randomUUID()}.${ext}`;
    const buf = Buffer.from(await f.arrayBuffer());
    const { error: upErr } = await db.storage.from("payment-proofs").upload(path, buf, {
      contentType: f.type || "application/octet-stream",
      upsert: false,
    });
    if (upErr) {
      console.error("proof upload", upErr);
      return NextResponse.json({ error: "Could not upload proof. Please try again." }, { status: 500 });
    }
    await db.from("payment_proofs").insert({
      donation_id: donation.id,
      storage_path: path,
      file_name: f.name,
      mime_type: f.type || "application/octet-stream",
      size_bytes: f.size,
    });
  }

  if (email) {
    void sendTransactionalEmail({
      to: email,
      toName: displayName,
      subject: "We received your payment proof",
      html: proofReceivedHtml(displayName, donation.reference, `KES ${amount.toLocaleString()}`),
    });
  }

  return NextResponse.json({ ok: true, id: donation.id, reference: donation.reference });
}
