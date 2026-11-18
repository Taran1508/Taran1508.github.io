import { NextResponse } from "next/server";
import { RazorpayError, rzp } from "@/lib/razorpay";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as { kind?: string; id?: string };
  const id = String(b.id ?? "");
  if (!/^[A-Za-z0-9_]+$/.test(id) || (b.kind !== "invoice" && b.kind !== "link"))
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  try {
    await rzp(`/${b.kind === "invoice" ? "invoices" : "payment_links"}/${id}/cancel`, { method: "POST" });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const err = e as RazorpayError;
    return NextResponse.json({ error: err.message }, { status: err.status ?? 502 });
  }
}
