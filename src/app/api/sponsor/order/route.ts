import { NextResponse } from "next/server";
import { RazorpayError, razorpayKeyId, rzp, toPaise } from "@/lib/razorpay";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

// Public: creates a Razorpay order for a sponsorship amount (whole rupees).
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });

  const b = (await req.json().catch(() => ({}))) as { amount?: number };
  const amount = Number(b.amount);
  if (!Number.isInteger(amount) || amount < 10 || amount > 100_000)
    return NextResponse.json({ error: "Choose an amount between ₹10 and ₹1,00,000." }, { status: 400 });

  try {
    const order = await rzp<{ id: string; amount: number; currency: string }>("/orders", {
      method: "POST",
      body: {
        amount: toPaise(amount),
        currency: "INR",
        receipt: `sponsor_${Date.now()}`,
        notes: { purpose: "portfolio sponsorship" },
      },
    });
    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: razorpayKeyId() });
  } catch (e) {
    const err = e as RazorpayError;
    return NextResponse.json({ error: err.message }, { status: err.status ?? 502 });
  }
}
