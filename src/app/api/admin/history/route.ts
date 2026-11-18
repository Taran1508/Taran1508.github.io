import { NextResponse } from "next/server";
import { rzp } from "@/lib/razorpay";

export const runtime = "nodejs";

type Row = {
  kind: "invoice" | "link";
  id: string;
  status: string;
  amount: number;
  shortUrl?: string;
  who?: string;
  createdAt?: number;
  expireBy?: number;
};
type RawInvoice = {
  id: string;
  status: string;
  amount: number;
  short_url?: string;
  created_at?: number;
  expire_by?: number;
  customer_details?: { name?: string };
};
type RawLink = {
  id: string;
  status: string;
  amount: number;
  short_url?: string;
  created_at?: number;
  expire_by?: number;
  customer?: { name?: string };
  description?: string;
};

export async function GET() {
  const [inv, links] = await Promise.allSettled([
    rzp<{ items?: RawInvoice[] }>("/invoices?count=20"),
    rzp<{ payment_links?: RawLink[] }>("/payment_links"),
  ]);

  const rows: Row[] = [];
  if (inv.status === "fulfilled") {
    for (const i of inv.value.items ?? [])
      rows.push({
        kind: "invoice",
        id: i.id,
        status: i.status,
        amount: i.amount,
        shortUrl: i.short_url,
        who: i.customer_details?.name,
        createdAt: i.created_at,
        expireBy: i.expire_by,
      });
  }
  if (links.status === "fulfilled") {
    for (const l of (links.value.payment_links ?? []).slice(0, 20))
      rows.push({
        kind: "link",
        id: l.id,
        status: l.status,
        amount: l.amount,
        shortUrl: l.short_url,
        who: l.customer?.name || l.description,
        createdAt: l.created_at,
        expireBy: l.expire_by,
      });
  }
  rows.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

  const errors = [inv, links]
    .filter((r): r is PromiseRejectedResult => r.status === "rejected")
    .map((r) => (r.reason as Error).message);
  return NextResponse.json({ rows, errors });
}
