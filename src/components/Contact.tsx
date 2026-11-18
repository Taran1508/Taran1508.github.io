"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

// Public Formspree form endpoint (not a secret). Kept from the previous site.
const FORM_ENDPOINT = "https://formspree.io/f/xpqbronq";

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!emailRe.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) e.message = "Please write at least a short sentence.";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("loading");
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _gotcha: form.website }),
      });
      if (res.ok) {
        const text = `Hi Taran, I just sent a message from your portfolio.

Name: ${payload.name}
Email: ${payload.email}

${payload.message}`;
        setStatus("success");
        setForm({ name: "", email: "", message: "", website: "" });
        window.location.href = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field =
    "mt-1.5 w-full rounded-xl border border-fg/10 bg-white px-4 py-3 text-base text-fg placeholder:text-fg/40 transition-colors focus:border-accent focus:bg-white focus:outline-none";

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="section-title">
            Have a project in mind? <span className="gradient-text">Let&apos;s build it.</span>
          </h2>
          <p className="mt-4 max-w-md text-fg/65">
            Tell me what you&apos;re building. I take on freelance projects and engineering roles across backend systems, APIs, and LLM-powered products.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-accent">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${profile.email}`} className="text-base font-semibold transition-colors hover:text-accent">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-accent">Location</dt>
              <dd className="mt-1 text-base font-semibold">{profile.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-accent">Profiles</dt>
              <dd className="mt-1 flex gap-5 text-base font-semibold">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="glass p-6 md:p-8"
          aria-label="Contact form"
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={field}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={field}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${field} resize-y`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          {/* Honeypot: hidden from people and assistive tech */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </button>

          <div aria-live="polite" role="status" className="mt-4 text-sm">
            {status === "success" && (
              <p className="text-accent">Thanks. Redirecting you to WhatsApp…</p>
            )}
            {status === "error" && (
              <p className="text-red-400">
                Something went wrong sending the message. Please email{" "}
                <a href={`mailto:${profile.email}`} className="font-semibold underline">
                  {profile.email}
                </a>{" "}
                directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
