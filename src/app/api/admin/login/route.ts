import { NextResponse } from "next/server";
import { COOKIE, createSession, hmac, safeEqual } from "@/lib/session";

export const runtime = "nodejs";

const attempts = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < 15 * 60_000);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 6;
}

export async function POST(req: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) {
    return NextResponse.json({ error: "Admin is not configured on the server." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });

  const body = (await req.json().catch(() => ({}))) as { password?: string };
  const given = String(body.password ?? "");
  await new Promise((r) => setTimeout(r, 400)); // slow down guessing

  const ok = safeEqual(await hmac("pw", given), await hmac("pw", password));
  if (!ok) return NextResponse.json({ error: "Wrong password." }, { status: 401 });

  const ttl = 8 * 60 * 60 * 1000;
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await createSession(secret, ttl), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ttl / 1000,
  });
  return res;
}
