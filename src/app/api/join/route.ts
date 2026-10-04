import { NextResponse } from "next/server";
import { isValidLocation, ROLES, type Role } from "@/lib/states";
import {
  normalizeDisplayName,
  normalizeJoinPhone,
  validateCounty,
  validateEmail,
  validateJoinPhone,
  validateName,
  validateRole,
  validateState,
  type PhoneCountry,
} from "@/lib/validation";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/admin";
import { sendTransactionalEmail, welcomeHtml } from "@/lib/brevo";

const COUNTRIES: PhoneCountry[] = ["KE", "SS"];
const ROLE_IDS = new Set(ROLES.map((r) => r.id));

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured yet. Add Supabase keys to .env.local." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "");
  const phone = String(body.phone ?? "");
  const phoneCountry = String(body.phoneCountry ?? "") as PhoneCountry;
  const emailRaw = String(body.email ?? "").trim().toLowerCase();
  const emailOptIn = Boolean(body.emailOptIn);
  const state = String(body.state ?? "");
  const county = String(body.county ?? "");
  const role = String(body.role ?? "") as Role;

  if (body.hp) return NextResponse.json({ ok: true });

  if (!COUNTRIES.includes(phoneCountry)) {
    return NextResponse.json({ error: "Choose Kenya or South Sudan for your number." }, { status: 400 });
  }

  const errors = {
    name: validateName(name),
    phone: validateJoinPhone(phone, phoneCountry),
    email: validateEmail(emailRaw),
    state: validateState(state),
    county: validateCounty(county),
    role: validateRole(role),
  };
  const first = Object.values(errors).find(Boolean);
  if (first) return NextResponse.json({ error: first, errors }, { status: 400 });

  if (!isValidLocation(phoneCountry, state, county)) {
    return NextResponse.json({ error: "County does not match the selected region." }, { status: 400 });
  }
  if (!ROLE_IDS.has(role)) {
    return NextResponse.json({ error: "Please choose your role in the movement." }, { status: 400 });
  }

  const displayName = normalizeDisplayName(name);
  const phoneE164 = normalizeJoinPhone(phone, phoneCountry);
  if (!phoneE164) {
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  }

  const email = emailRaw || null;
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("supporters")
    .insert({
      display_name: displayName,
      phone_e164: phoneE164,
      phone_country: phoneCountry,
      email,
      email_opt_in: Boolean(email && emailOptIn),
      state,
      county,
      role,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This phone number or email is already registered. Thank you for standing with us." },
        { status: 409 }
      );
    }
    console.error("join insert", error);
    return NextResponse.json({ error: "Could not save registration. Please try again." }, { status: 500 });
  }

  if (email) {
    await sendTransactionalEmail({
      to: email,
      toName: displayName,
      subject: "Thank you for joining People First",
      html: welcomeHtml(displayName),
    });
  }

  return NextResponse.json({ ok: true, id: data.id, displayName, phone: phoneE164 });
}
