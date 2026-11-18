import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export const runtime = "nodejs";

// Public: confirms a Checkout payment by verifying Razorpay's signature with the secret key.
export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return NextResponse.json({ ok: false }, { status: 503 });

  const b = (await req.json().catch(() => ({}))) as {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: sig } = b;
  if (!orderId || !paymentId || !sig) return NextResponse.json({ ok: false }, { status: 400 });

  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const c = Buffer.from(sig);
  const ok = a.length === c.length && timingSafeEqual(a, c);
  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}
