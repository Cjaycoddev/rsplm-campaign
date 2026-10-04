import { after } from "next/server";

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

export function isBrevoConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
}

function wrapHtml(inner: string): string {
  return `<!DOCTYPE html><html><body style="font-family:Georgia,serif;color:#111418;line-height:1.5">${inner}</body></html>`;
}

export async function sendTransactionalEmail(opts: {
  to: string;
  toName?: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!isBrevoConfigured()) {
    console.warn("brevo skipped: missing BREVO_API_KEY or BREVO_SENDER_EMAIL");
    return { ok: true, skipped: true };
  }

  const res = await fetch(BREVO_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY as string,
    },
    body: JSON.stringify({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME || "R-SPLM People First",
      },
      to: [{ email: opts.to, name: opts.toName }],
      subject: opts.subject,
      htmlContent: wrapHtml(opts.html),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("brevo send failed", res.status, text.slice(0, 500));
    return { ok: false, error: text.slice(0, 500) };
  }
  return { ok: true };
}

/** Keeps the send alive on Vercel after the HTTP response is sent. */
export function queueTransactionalEmail(opts: {
  to: string;
  toName?: string;
  subject: string;
  html: string;
}) {
  after(() => sendTransactionalEmail(opts));
}

export function welcomeHtml(name: string): string {
  return `
    <p>Dear ${escapeHtml(name)},</p>
    <p>Thank you for standing with Hon. Nathaniel Garang Aduot and the People First movement.</p>
    <p>We have recorded your registration. Our local coordination team will be in touch with updates.</p>
    <p>People First.</p>
  `;
}

export function donationThanksHtml(name: string, reference: string, amountLabel: string): string {
  return `
    <p>Dear ${escapeHtml(name)},</p>
    <p>Thank you for your contribution of <strong>${escapeHtml(amountLabel)}</strong>.</p>
    <p>We have confirmed your payment. Reference: <strong>${escapeHtml(reference)}</strong></p>
    <p>Your support fuels grassroots mobilization across South Sudan.</p>
    <p>People First.</p>
  `;
}

export function proofReceivedHtml(name: string, reference: string, amountLabel: string): string {
  return `
    <p>Dear ${escapeHtml(name)},</p>
    <p>We received your bank transfer proof for <strong>${escapeHtml(amountLabel)}</strong>.</p>
    <p>Reference: <strong>${escapeHtml(reference)}</strong></p>
    <p>Our finance team will review it and confirm. You will get another email once it is verified.</p>
    <p>People First.</p>
  `;
}

export function monthlyReminderHtml(name: string, donateUrl: string): string {
  return `
    <p>Dear ${escapeHtml(name)},</p>
    <p>This is a gentle reminder of your monthly contribution pledge.</p>
    <p><a href="${escapeHtml(donateUrl)}">Donate now</a></p>
    <p>Thank you for staying with the movement.</p>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
