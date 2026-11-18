import { NextResponse } from "next/server";
import { MAX_EXPIRY_MINUTES, MIN_EXPIRY_MINUTES, RazorpayError, expireBy, rzp, toPaise } from "@/lib/razorpay";

export const runtime = "nodejs";

type Body = {
  amount?: number;
  description?: string;
  customer?: { name?: string; email?: string; contact?: string };
  expiresInMinutes?: number;
  notify?: boolean;
};
type Link = { id: string; short_url: string; status: string; amount: number; expire_by?: number };

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Body;
  const amount = Number(b.amount);
  const minutes = Number(b.expiresInMinutes);
  const description = String(b.description ?? "").trim().slice(0, 250);
  const name = String(b.customer?.name ?? "").trim();
  const email = String(b.customer?.email ?? "").trim();
  const contact = String(b.customer?.contact ?? "").replace(/[^\d+]/g, "");

  if (!(amount >= 1) || amount > 1_000_000)
    return NextResponse.json({ error: "Amount must be at least ₹1." }, { status: 400 });
  if (!description) return NextResponse.json({ error: "Add a short description." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Customer email looks invalid." }, { status: 400 });
  if (!Number.isFinite(minutes) || minutes < MIN_EXPIRY_MINUTES || minutes > MAX_EXPIRY_MINUTES)
    return NextResponse.json({ error: `Expiry must be at least ${MIN_EXPIRY_MINUTES} minutes.` }, { status: 400 });

  const hasCustomer = name || email || contact;
  const notify = !!b.notify;
  try {
    const link = await rzp<Link>("/payment_links", {
      method: "POST",
      body: {
        amount: toPaise(amount),
        currency: "INR",
        description,
        expire_by: expireBy(minutes),
        customer: hasCustomer
          ? { name: name || undefined, email: email || undefined, contact: contact || undefined }
          : undefined,
        notify: { sms: notify && !!contact, email: notify && !!email },
        reminder_enable: false,
      },
    });
    return NextResponse.json({
      id: link.id,
      shortUrl: link.short_url,
      status: link.status,
      amount: link.amount,
      expireBy: link.expire_by,
    });
  } catch (e) {
    const err = e as RazorpayError;
    return NextResponse.json({ error: err.message }, { status: err.status ?? 502 });
  }
}
