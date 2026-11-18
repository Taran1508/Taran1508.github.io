import { NextResponse } from "next/server";
import { MAX_EXPIRY_MINUTES, MIN_EXPIRY_MINUTES, RazorpayError, expireBy, rzp, toPaise } from "@/lib/razorpay";

export const runtime = "nodejs";

type Item = { name?: string; description?: string; quantity?: number; amount?: number };
type Body = {
  customer?: { name?: string; email?: string; contact?: string };
  items?: Item[];
  description?: string;
  expiresInMinutes?: number;
  notify?: boolean;
};
type Invoice = { id: string; short_url: string; status: string; amount: number; expire_by?: number };

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Body;
  const name = String(b.customer?.name ?? "").trim();
  const email = String(b.customer?.email ?? "").trim();
  const contact = String(b.customer?.contact ?? "").replace(/[^\d+]/g, "");
  const minutes = Number(b.expiresInMinutes);

  if (name.length < 2) return NextResponse.json({ error: "Customer name is required." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Customer email looks invalid." }, { status: 400 });
  if (!Number.isFinite(minutes) || minutes < MIN_EXPIRY_MINUTES || minutes > MAX_EXPIRY_MINUTES)
    return NextResponse.json({ error: `Expiry must be at least ${MIN_EXPIRY_MINUTES} minutes.` }, { status: 400 });

  const items = (b.items ?? []).slice(0, 20);
  if (items.length === 0) return NextResponse.json({ error: "Add at least one item." }, { status: 400 });
  const lineItems = [];
  for (const it of items) {
    const itemName = String(it.name ?? "").trim().slice(0, 120);
    const qty = Number(it.quantity ?? 1);
    const amount = Number(it.amount);
    if (!itemName || !Number.isInteger(qty) || qty < 1 || !(amount >= 1) || amount > 1_000_000)
      return NextResponse.json({ error: "Each item needs a name, quantity and an amount of at least ₹1." }, { status: 400 });
    lineItems.push({
      name: itemName,
      description: String(it.description ?? "").trim().slice(0, 250) || undefined,
      amount: toPaise(amount),
      currency: "INR",
      quantity: qty,
    });
  }

  const notify = !!b.notify;
  try {
    const inv = await rzp<Invoice>("/invoices", {
      method: "POST",
      body: {
        type: "invoice",
        description: String(b.description ?? "").trim().slice(0, 250) || undefined,
        currency: "INR",
        customer: { name, email: email || undefined, contact: contact || undefined },
        line_items: lineItems,
        email_notify: notify && email ? 1 : 0,
        sms_notify: notify && contact ? 1 : 0,
        expire_by: expireBy(minutes),
      },
    });
    return NextResponse.json({
      id: inv.id,
      shortUrl: inv.short_url,
      status: inv.status,
      amount: inv.amount,
      expireBy: inv.expire_by,
    });
  } catch (e) {
    const err = e as RazorpayError;
    return NextResponse.json({ error: err.message }, { status: err.status ?? 502 });
  }
}
