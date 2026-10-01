export function isDarajaConfigured(): boolean {
  return Boolean(
    process.env.DARAJA_CONSUMER_KEY &&
      process.env.DARAJA_CONSUMER_SECRET &&
      process.env.DARAJA_PASSKEY &&
      process.env.DARAJA_SHORTCODE &&
      process.env.DARAJA_CALLBACK_URL
  );
}

function baseUrl(): string {
  return process.env.DARAJA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

async function accessToken(): Promise<string> {
  const key = process.env.DARAJA_CONSUMER_KEY as string;
  const secret = process.env.DARAJA_CONSUMER_SECRET as string;
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  const res = await fetch(`${baseUrl()}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  if (!res.ok) throw new Error("Daraja token request failed");
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

function timestamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

export async function stkPush(opts: {
  phone254: string;
  amount: number;
  accountRef: string;
  description: string;
}): Promise<{
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  CustomerMessage?: string;
}> {
  const shortcode = process.env.DARAJA_SHORTCODE as string;
  const passkey = process.env.DARAJA_PASSKEY as string;
  const ts = timestamp();
  const password = Buffer.from(`${shortcode}${passkey}${ts}`).toString("base64");
  const token = await accessToken();

  const res = await fetch(`${baseUrl()}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: ts,
      TransactionType: "CustomerBuyGoodsOnline",
      Amount: Math.round(opts.amount),
      PartyA: opts.phone254,
      PartyB: shortcode,
      PhoneNumber: opts.phone254,
      CallBackURL: process.env.DARAJA_CALLBACK_URL,
      AccountReference: opts.accountRef.slice(0, 12),
      TransactionDesc: opts.description.slice(0, 13),
    }),
  });

  const data = await res.json();
  if (!res.ok || data.ResponseCode !== "0") {
    throw new Error(data.errorMessage || data.CustomerMessage || "STK push failed");
  }
  return data;
}
