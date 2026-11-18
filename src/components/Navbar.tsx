"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";

const links = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const ids = [...links.map((l) => l.href.slice(1)), "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4">
      <div
        className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border px-5 transition-all duration-500 ${
          scrolled
            ? "border-fg/10 bg-bg/70 shadow-[0_8px_40px_-12px_rgba(11,18,32,0.18)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#" className="font-grotesk text-xl font-bold tracking-tight">
          Taran<span className="gradient-text">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const on = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  on ? "text-fg" : "text-fg/60 hover:text-fg"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-fg/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            );
          })}
          <a href="#contact" className="btn-primary ml-3 !px-5 !py-2">
            Hire me
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="rounded-full p-2 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass mx-auto mt-2 max-w-5xl bg-bg/90 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-fg/5">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3 text-base font-semibold text-accent hover:bg-fg/5">
              Hire me
            </a>
            <a href={profile.resume} download onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-fg/5">
              Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
