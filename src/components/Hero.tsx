"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { metrics, profile } from "@/data/profile";
import Counter from "@/components/ui/Counter";
import Magnetic from "@/components/ui/Magnetic";

const words = ["Backend", "systems", "and", "AI", "products,"];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const card = useRef<HTMLDivElement>(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !card.current) return;
    const r = card.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="intro" className="relative overflow-hidden pt-32 md:pt-36" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -left-40 top-0 h-[460px] w-[460px] animate-aurora rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute right-0 top-24 h-[420px] w-[420px] animate-aurora rounded-full bg-accent/10 blur-[130px] [animation-delay:-8s]" />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.a
            href="#contact"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-fg/10 bg-white px-4 py-1.5 text-xs font-medium text-fg/80 transition-colors hover:border-accent/50"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to freelance projects
          </motion.a>

          <h1 id="hero-title" className="mt-6 font-grotesk text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            {words.map((w, i) => (
              <span key={w + i} className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className={`inline-block ${w === "AI" ? "text-accent" : ""}`}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <br />
            <span className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className="inline-block text-fg/45"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease }}
              >
                built to ship.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-fg/65 md:text-lg"
          >
            I&apos;m <span className="font-semibold text-fg">{profile.name}</span>, a full-stack engineer. I build
            reliable backend systems, enterprise applications, and AI-powered products for teams and clients.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a href="#contact" className="btn-primary">
                Start a project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#projects" className="btn-secondary">View my work</a>
            </Magnetic>
            <a href={profile.resume} download className="px-3 py-3 text-sm font-medium text-fg/60 underline-offset-4 hover:text-fg hover:underline">
              Resume
            </a>
          </motion.div>

          <div className="mt-7 flex gap-5 text-sm font-medium text-fg/55">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px]"
          style={{ perspective: 1000 }}
        >
          <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-accent/15 blur-3xl" />
          <motion.div
            ref={card}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="glass overflow-hidden p-2"
          >
            <Image
              src="/myanipic.jpg"
              alt="Illustrated portrait of Taran Mesala"
              width={928}
              height={1232}
              priority
              sizes="(max-width: 1024px) 320px, 360px"
              className="h-auto w-full rounded-xl"
            />
          </motion.div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-fg/10 bg-white px-4 py-1.5 font-mono text-[11px] text-fg/70 shadow-sm"
          >
            {profile.location}
          </motion.p>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="container-page mt-20 md:mt-24">
        <dl className="glass grid divide-y divide-fg/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="flex items-center gap-4 px-6 py-5"
            >
              <dt className="font-grotesk text-4xl font-bold text-accent">
                <Counter value={m.value} />
              </dt>
              <dd className="text-sm leading-snug text-fg/65">
                <span className="font-semibold text-fg">{m.label}</span>
                <br />
                {m.detail}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
