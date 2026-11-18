"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences, otherExperience, type Experience as Exp } from "@/data/experience";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

function Entry({ exp, compact }: { exp: Exp; compact?: boolean }) {
  return (
    <li className="relative pl-8 md:pl-12">
      <span aria-hidden="true" className="absolute -left-[7px] top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-bg">
        <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_3px_rgba(4,120,87,0.45)]" />
      </span>
      <Reveal>
        <article>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-grotesk text-xl font-bold md:text-2xl">
              {exp.role} <span className="font-medium text-fg/50">· {exp.company}</span>
            </h3>
            <p className="rounded-full border border-fg/10 bg-white px-3 py-1 font-mono text-xs text-fg/60">
              {exp.period} · {exp.location}
            </p>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg/65">{exp.summary}</p>

          {exp.highlights.length > 0 && (
            <ul className={`mt-5 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
              {exp.highlights.map((h) => (
                <SpotlightCard key={h.label} as="li" className="p-4">
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">{h.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg/75">{h.text}</p>
                </SpotlightCard>
              ))}
            </ul>
          )}

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {exp.tech.map((t) => (
              <li key={t} className="chip">{t}</li>
            ))}
          </ul>
        </article>
      </Reveal>
    </li>
  );
}

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title" className="section-title max-w-3xl">
            Backend ownership, API modernization, production reliability
          </h2>
        </Reveal>

        <div className="relative ml-1.5 mt-14">
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-fg/10" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent"
          />
          <ol ref={ref} className="space-y-14">
            {experiences.map((e) => (
              <Entry key={e.company} exp={e} />
            ))}
          </ol>
        </div>

        <Reveal>
          <h3 className="mt-20 font-grotesk text-lg font-bold text-fg/80">Other engagements and earlier experience</h3>
        </Reveal>
        <ol className="ml-1.5 mt-8 space-y-10 border-l border-fg/10">
          {otherExperience.map((e) => (
            <Entry key={e.company} exp={e} compact />
          ))}
        </ol>
      </div>
    </section>
  );
}
