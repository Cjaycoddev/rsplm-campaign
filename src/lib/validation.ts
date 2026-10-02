// Shared validation for all campaign forms.

const NAME_ALLOWED = /^[\p{L}\p{M}\s'.-]+$/u;

export type PhoneCountry = "KE" | "SS";

export function validateName(raw: string): string | null {
  const v = raw.trim().replace(/\s+/g, " ");
  if (!v) return "Please enter your full legal name.";
  if (v.length < 3) return "Name must be at least 3 characters.";
  if (v.length > 100) return "Name is too long (max 100 characters).";
  if (/\d/.test(v)) return "Names can't contain numbers.";
  if (!NAME_ALLOWED.test(v)) return "Only letters, spaces, hyphens, and apostrophes are allowed.";
  if (!/\p{L}/u.test(v)) return "Name must contain at least one letter.";
  return null;
}

/** Title Case for storage: JOHN MAE / john mae → John Mae. Keeps hyphens and apostrophes. */
export function normalizeDisplayName(raw: string): string {
  const v = raw.trim().replace(/\s+/g, " ");
  const word = (w: string) =>
    w
      .split("'")
      .map((p) => (p ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p))
      .join("'");
  return v
    .split(" ")
    .map((part) => part.split("-").map(word).join("-"))
    .join(" ");
}

function digitsOnly(raw: string): string {
  let n = raw.trim().replace(/[^\d+]/g, "");
  if (n.startsWith("00")) n = n.slice(2);
  if (n.startsWith("+")) n = n.slice(1);
  return n.replace(/\D/g, "");
}

export function normalizeJoinPhone(raw: string, country: PhoneCountry): string | null {
  const d = digitsOnly(raw);
  if (!d) return null;

  if (country === "KE") {
    if (d.length === 10 && /^0[17]\d{8}$/.test(d)) return "+254" + d.slice(1);
    if (d.length === 12 && /^254[17]\d{8}$/.test(d)) return "+" + d;
    if (d.length === 9 && /^[17]\d{8}$/.test(d)) return "+254" + d;
    return null;
  }

  // South Sudan: +211 + 9-digit national number starting with 9
  if (d.length === 10 && /^09\d{8}$/.test(d)) return "+211" + d.slice(1);
  if (d.length === 12 && /^2119\d{8}$/.test(d)) return "+" + d;
  if (d.length === 9 && /^9\d{8}$/.test(d)) return "+211" + d;
  return null;
}

export function validateJoinPhone(raw: string, country: PhoneCountry): string | null {
  const v = raw.trim();
  if (!v) return "Please enter your phone number.";
  if (/[a-zA-Z]/.test(v)) return "Phone numbers can't contain letters.";
  if (!normalizeJoinPhone(v, country)) {
    return country === "KE"
      ? "Enter a Kenyan number (e.g. 0712345678 or +254712345678)."
      : "Enter a South Sudan number (e.g. 0912345678 or +211912345678).";
  }
  return null;
}

/** @deprecated Use normalizeJoinPhone with an explicit country. */
export function normalizePhone(raw: string): string | null {
  return normalizeJoinPhone(raw, "SS") ?? normalizeJoinPhone(raw, "KE");
}

export function validatePhone(raw: string): string | null {
  return validateJoinPhone(raw, "SS");
}

export function validateEmail(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null; // optional
  if (v.length > 254) return "Email is too long.";
  if (v.includes("..")) return "Enter a valid email (e.g., you@example.com).";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!re.test(v)) return "Enter a valid email (e.g., you@example.com).";
  return null;
}

export function validateState(v: string): string | null {
  if (!v) return "Please select your region or state.";
  return null;
}

export function validateCounty(v: string): string | null {
  if (!v) return "Please select your county.";
  return null;
}

export function validateRole(v: string): string | null {
  if (!v) return "Please choose your role in the movement.";
  return null;
}

export function validateCause(v: string): string | null {
  if (!v) return "Please choose what you are supporting.";
  return null;
}

export function validateAmount(amount: number, currency: "KES" | "USD"): string | null {
  if (!amount || Number.isNaN(amount)) return "Please enter an amount.";
  if (amount <= 0) return "Amount must be greater than zero.";
  const min = currency === "KES" ? 50 : 1;
  const max = currency === "KES" ? 1_000_000 : 10_000;
  if (amount < min) return currency === "KES" ? "Minimum donation is KES 50." : "Minimum donation is $1.";
  if (amount > max) {
    return currency === "KES"
      ? "For donations above KES 1,000,000, email finance@rsplm-peoplefirst.org."
      : "For donations above $10,000, email finance@rsplm-peoplefirst.org.";
  }
  if (currency === "KES" && !Number.isInteger(amount)) return "KES amounts must be whole shillings.";
  return null;
}

export function generateReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusing chars
  let s = "";
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `RSPLM-2026-${s}`;
}

// -------- Strict Kenya M-Pesa validator --------
// Kenyan mobile format:
//   Local:         07XXXXXXXX  or  01XXXXXXXX  (10 digits total)
//   International: +254 7XXXXXXXX / +254 1XXXXXXXX
//   API format:    2547XXXXXXXX / 2541XXXXXXXX

export function normalizeKenyanPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  // Local 10-digit  +254XXXXXXXXX
  if (digits.length === 10 && /^0[17]/.test(digits)) {
    return "+254" + digits.slice(1);
  }

  // International 12-digit  +254XXXXXXXXX
  if (digits.length === 12 && /^254[17]/.test(digits)) {
    return "+" + digits;
  }

  return null;
}
export function validateMpesaPhone(raw: string): string | null {
  const v = raw.trim();
  if (!v) return "Please enter your M-Pesa phone number.";

  // No spaces, dashes, or parentheses  digits and optional leading + only
  if (/\s/.test(raw)) return "Phone number cannot contain spaces.";
  if (/[a-zA-Z]/.test(v)) return "Phone numbers can't contain letters.";
  if (/[^\d+]/.test(v)) return "Only digits are allowed.";
  if ((v.match(/\+/g) || []).length > 1) return "Only one + is allowed.";
  if (v.includes("+") && !v.startsWith("+")) return "The + must come first.";

  const digits = v.replace(/\D/g, "");

  // Format A: Local 10-digit  starts 01 or 07
  if (digits.length === 10) {
    if (!/^0[17]/.test(digits)) return "Number must start with 01 or 07.";
    return null;
  }

  // Format B / C: International 12-digit  starts 2541 or 2547
  if (digits.length === 12) {
    if (!/^254[17]/.test(digits)) return "International format must start with 2547 or 2541.";
    return null;
  }

  // Anything else
  if (digits.length < 10) return "Too short. Use 0712345678 or +254712345678.";
  if (digits.length > 12) return "Too long. Kenyan numbers are 10 digits (local) or 12 (with 254).";
  return "Enter a valid M-Pesa number (e.g., 0712345678, 0112345678, or +254712345678).";
}
// Returns Safaricom API format: 2547XXXXXXXX or 2541XXXXXXXX
export function toMpesaApiFormat(raw: string): string | null {
  const normalized = normalizeKenyanPhone(raw);
  if (!normalized) return null;
  return normalized.replace("+", "");
}

// Dynamic input cap for the M-Pesa phone field.
// Returns the max characters allowed based on what the user is typing.
export function mpesaPhoneMaxLength(raw: string): number {
  const v = raw.replace(/[\s\-()]/g, "");

  // Local Kenyan: 0...  cap at 10 (covers 07... and 01...)
  if (v.startsWith("0")) return 10;

  // International with +  cap at 13 (+254 + 9 digits)
  if (v.startsWith("+")) return 13;

  // International without +  254 + 9 digits = 12
  if (v.startsWith("254")) return 12;

  // Still typing toward + or 254 (e.g. "2", "25")  grace cap
  return 13;
}
// Truncate input to the maximum allowed length for its prefix.
export function capMpesaPhone(raw: string): string {
  const v = raw.replace(/[\s\-()]/g, "");
  const max = mpesaPhoneMaxLength(v);
  return v.slice(0, max);
}