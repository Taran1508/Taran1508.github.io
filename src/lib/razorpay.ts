// Minimal Razorpay REST client (no SDK). Server-side only: uses the secret key.
const BASE = "https://api.razorpay.com/v1";

export class RazorpayError extends Error {
  constructor(
    message: string,
    public status = 502,
  ) {
    super(message);
  }
}

export function razorpayKeyId() {
  return process.env.RAZORPAY_KEY_ID;
}

export async function rzp<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!id || !secret) throw new RazorpayError("Razorpay keys are not configured on the server.", 503);

  const res = await fetch(BASE + path, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
      "Content-Type": "application/json",
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as { error?: { description?: string } })?.error?.description ?? "Razorpay request failed.";
    throw new RazorpayError(msg, res.status >= 400 && res.status < 500 ? 400 : 502);
  }
  return data as T;
}

// Razorpay rule: expire_by must be at least 15 minutes in the future and at most 6 months from creation.
// We add a 2-minute margin so a "15 minute" link is not rejected by the time the request reaches Razorpay.
export const MIN_EXPIRY_MINUTES = 15;
export const MAX_EXPIRY_MINUTES = 60 * 24 * 170;
const MARGIN_SECONDS = 120;

export function expireBy(minutes: number) {
  return Math.floor(Date.now() / 1000) + Math.round(minutes) * 60 + MARGIN_SECONDS;
}

export function toPaise(rupees: number) {
  return Math.round(rupees * 100);
}
