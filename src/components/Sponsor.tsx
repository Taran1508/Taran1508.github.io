"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const PRESETS = [100, 500, 1000, 2500];
const OPEN_EVENT = "open-sponsor";

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  theme: { color: string };
  handler: (r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
  modal: { ondismiss: () => void };
};
declare global {
  interface Window {
    Razorpay?: new (o: RazorpayOptions) => { open: () => void };
  }
}

function loadCheckout() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export function SponsorButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {children}
    </button>
  );
}

export default function SponsorModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [choice, setChoice] = useState<number | "custom">(500);
  const [custom, setCustom] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    const show = () => {
      setOpen(true);
      setState("idle");
      setError("");
    };
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const amount = choice === "custom" ? Math.floor(Number(custom)) : choice;
  const valid = Number.isInteger(amount) && amount >= 10 && amount <= 100000;

  const pay = async () => {
    if (!valid) return setError("Enter an amount between ₹10 and ₹1,00,000.");
    setState("loading");
    setError("");
    try {
      const [ok, res] = await Promise.all([
        loadCheckout(),
        fetch("/api/sponsor/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }),
      ]);
      const order = await res.json().catch(() => ({}));
      if (!ok || !window.Razorpay) throw new Error("Could not load the payment window. Check your connection.");
      if (!res.ok) throw new Error(order.error ?? "Could not start the payment.");

      new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Taran Mesala",
        description: "Sponsor my work",
        order_id: order.orderId,
        theme: { color: "#047857" },
        handler: async (r) => {
          const v = await fetch("/api/sponsor/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(r),
          }).catch(() => null);
          if (v?.ok) setState("success");
          else {
            setState("idle");
            setError("Payment went through but could not be verified. Please contact me with your payment ID: " + r.razorpay_payment_id);
          }
        },
        modal: { ondismiss: () => setState((s) => (s === "loading" ? "idle" : s)) },
      }).open();
    } catch (e) {
      setState("idle");
      setError((e as Error).message);
    }
  };

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-fg/40 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Sponsor"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-t-3xl border border-fg/10 bg-bg p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-fg/15 bg-white hover:border-fg"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {state === "success" ? (
              <div className="py-6 text-center">
                <p className="text-5xl">🙏</p>
                <h3 className="mt-4 font-grotesk text-2xl font-bold">Thank you!</h3>
                <p className="mt-2 text-sm text-fg/65">Your sponsorship means a lot and helps me keep building.</p>
                <button onClick={() => setOpen(false)} className="btn-primary mt-6">Close</button>
              </div>
            ) : (
              <>
                <p className="eyebrow">Support my work</p>
                <h3 className="mt-3 font-grotesk text-2xl font-bold">Sponsor me</h3>
                <p className="mt-2 text-sm text-fg/65">Pick an amount. Payments are processed securely by Razorpay.</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={choice === p}
                      onClick={() => setChoice(p)}
                      className={`rounded-xl border px-4 py-3 font-grotesk text-lg font-bold transition-colors ${
                        choice === p ? "border-accent bg-accent/10 text-accent" : "border-fg/15 bg-white hover:border-fg/40"
                      }`}
                    >
                      ₹{p.toLocaleString("en-IN")}
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-pressed={choice === "custom"}
                    onClick={() => setChoice("custom")}
                    className={`col-span-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                      choice === "custom" ? "border-accent bg-accent/10 text-accent" : "border-fg/15 bg-white hover:border-fg/40"
                    }`}
                  >
                    Custom amount
                  </button>
                </div>

                {choice === "custom" && (
                  <div className="mt-3">
                    <label htmlFor="custom-amt" className="sr-only">Custom amount in rupees</label>
                    <div className="flex items-center rounded-xl border border-fg/15 bg-white px-4 focus-within:border-accent">
                      <span className="text-fg/50">₹</span>
                      <input
                        id="custom-amt"
                        type="number"
                        min={10}
                        max={100000}
                        inputMode="numeric"
                        autoFocus
                        placeholder="Enter amount"
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                        className="w-full bg-transparent px-2 py-3 text-base focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}

                <button
                  type="button"
                  onClick={pay}
                  disabled={state === "loading"}
                  className="btn-primary mt-6 w-full disabled:opacity-60"
                >
                  {state === "loading" ? "Opening payment…" : valid ? `Sponsor ₹${amount.toLocaleString("en-IN")}` : "Sponsor"}
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
