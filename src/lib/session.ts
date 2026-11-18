// Signed-cookie session for the owner-only admin area. Uses Web Crypto so it runs in
// middleware (edge) and in route handlers (node).
export const COOKIE = "admin_session";
const enc = new TextEncoder();

export async function hmac(secret: string, msg: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function createSession(secret: string, ttlMs: number) {
  const exp = Date.now() + ttlMs;
  return `${exp}.${await hmac(secret, String(exp))}`;
}

export async function verifySession(secret: string, token?: string) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(secret, exp));
}
