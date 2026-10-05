import { after } from "next/server";

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

export function isBrevoConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
}

function wrapHtml(inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>R-SPLM People First</title>
</head>
<body style="margin:0;padding:0;background:#062617;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#062617;">
    <tr>
      <td align="center" style="padding:28px 16px 40px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border-collapse:separate;">
          <tr>
            <td style="height:6px;background:linear-gradient(90deg,#0F47AF 0%,#FCDD09 25%,#078930 50%,#DA121A 75%,#C9A227 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="background:#0B5D2A;padding:28px 32px 24px;text-align:center;">
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.28em;font-weight:700;color:#C9A227;text-transform:uppercase;">R-SPLM/F · People First</p>
              <h1 style="margin:0;font-size:26px;line-height:1.25;color:#FFFFFF;font-weight:700;">Hon. Nathaniel Garang&apos; Aduot</h1>
              <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#E8C968;">Serving with Honor. Leading with Heart.</p>
            </td>
          </tr>
          <tr>
            <td style="height:4px;background:#C9A227;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="background:#F7F4ED;padding:32px 32px 28px;color:#111418;font-size:16px;line-height:1.65;">
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="background:#0E6B2F;padding:22px 32px;text-align:center;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.22em;font-weight:700;color:#C9A227;text-transform:uppercase;">The People First Movement</p>
              <p style="margin:0;font-size:13px;color:#FFFFFF;">A covenant with the people of South Sudan.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 8px 0;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:#8FB89A;">
              This message was sent by the official campaign of Hon. Nathaniel Garang&apos; Aduot.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
    <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.2em;font-weight:700;color:#C9A227;text-transform:uppercase;">Welcome</p>
    <p style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0E6B2F;font-weight:700;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 14px;">Thank you for standing with Hon. Nathaniel Garang&apos; Aduot and the People First movement.</p>
    <p style="margin:0 0 14px;">We have recorded your registration. Our local coordination team will be in touch with updates.</p>
    <p style="margin:18px 0 0;padding:14px 16px;background:#E8F3EC;border-left:4px solid #C9A227;color:#0B5D2A;font-weight:700;">People First.</p>
  `;
}

export function donationThanksHtml(name: string, reference: string, amountLabel: string): string {
  return `
    <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.2em;font-weight:700;color:#C9A227;text-transform:uppercase;">Thank you</p>
    <p style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0E6B2F;font-weight:700;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 14px;">Thank you for your contribution of <strong style="color:#0E6B2F;">${escapeHtml(amountLabel)}</strong>.</p>
    <p style="margin:0 0 18px;">We have confirmed your payment. Your support fuels grassroots mobilization across South Sudan.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0B5D2A;border-radius:12px;">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.18em;color:#C9A227;text-transform:uppercase;">Reference</p>
          <p style="margin:0;font-size:18px;color:#FFFFFF;font-weight:700;">${escapeHtml(reference)}</p>
        </td>
      </tr>
    </table>
    <p style="margin:18px 0 0;padding:14px 16px;background:#E8F3EC;border-left:4px solid #C9A227;color:#0B5D2A;font-weight:700;">People First.</p>
  `;
}

export function proofReceivedHtml(name: string, reference: string, amountLabel: string): string {
  return `
    <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.2em;font-weight:700;color:#C9A227;text-transform:uppercase;">Proof received</p>
    <p style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0E6B2F;font-weight:700;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 14px;">We received your bank transfer proof for <strong style="color:#0E6B2F;">${escapeHtml(amountLabel)}</strong>.</p>
    <p style="margin:0 0 18px;">Our finance team will review it and confirm. You will get another email once it is verified.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0B5D2A;border-radius:12px;">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.18em;color:#C9A227;text-transform:uppercase;">Reference</p>
          <p style="margin:0;font-size:18px;color:#FFFFFF;font-weight:700;">${escapeHtml(reference)}</p>
        </td>
      </tr>
    </table>
    <p style="margin:18px 0 0;padding:14px 16px;background:#E8F3EC;border-left:4px solid #C9A227;color:#0B5D2A;font-weight:700;">People First.</p>
  `;
}

export function monthlyReminderHtml(name: string, donateUrl: string): string {
  return `
    <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.2em;font-weight:700;color:#C9A227;text-transform:uppercase;">Monthly pledge</p>
    <p style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0E6B2F;font-weight:700;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 18px;">This is a gentle reminder of your monthly contribution pledge.</p>
    <p style="margin:0 0 18px;text-align:center;">
      <a href="${escapeHtml(donateUrl)}" style="display:inline-block;background:#C9A227;color:#111418;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:14px;padding:12px 28px;border-radius:999px;">Donate now</a>
    </p>
    <p style="margin:18px 0 0;padding:14px 16px;background:#E8F3EC;border-left:4px solid #C9A227;color:#0B5D2A;font-weight:700;">Thank you for staying with the movement.</p>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
