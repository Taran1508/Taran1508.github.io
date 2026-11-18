"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import BrowserFrame from "@/components/ui/BrowserFrame";
import SpotlightCard from "@/components/ui/SpotlightCard";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

function Links({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <>
      {project.github ? (
        <a href={project.github} {...external} className="transition-colors hover:text-accent">
          GitHub ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : featured ? (
        <span className="font-normal text-fg/40">Source not public yet</span>
      ) : null}
      {project.liveurl && (
        <a href={project.liveurl} {...external} className="transition-colors hover:text-accent">
          {project.liveLabel ?? "Live demo"} ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </>
  );
}

function CaseStudy({ project, featured, onClose }: { project: Project; featured?: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-fg/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} case study`}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-fg/10 bg-bg p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-fg/15 bg-white transition-colors hover:border-fg"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p className="eyebrow">Case study</p>
        <h3 className="mt-3 pr-10 font-grotesk text-3xl font-bold">{project.name}</h3>
        <p className="mt-1 text-sm text-fg/55">{project.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-fg/75">{project.description}</p>

        {project.pipeline && (
          <>
            <h4 className="mt-7 font-mono text-xs uppercase tracking-wider text-accent">How it works</h4>
            <ol className="mt-3 space-y-2.5">
              {project.pipeline.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-fg/75">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-[11px] text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </>
        )}

        {project.challenges.length > 0 && (
          <>
            <h4 className="mt-7 font-mono text-xs uppercase tracking-wider text-accent">Engineering decisions</h4>
            <ul className="mt-3 space-y-2">
              {project.challenges.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-fg/75">
                  <span aria-hidden="true" className="text-accent">▸</span>
                  {c}
                </li>
              ))}
            </ul>
          </>
        )}

        {project.statusNote && (
          <p className="mt-7 rounded-xl border border-fg/10 bg-white p-4 text-xs leading-relaxed text-fg/60">
            <span className="font-semibold text-fg">Status: </span>
            {project.statusNote}
          </p>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="chip">{t}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <Links project={project} featured={featured} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const hasDetails = !!project.pipeline || project.challenges.length > 0 || !!project.statusNote;
  const label = (project.liveurl ?? project.github ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      <SpotlightCard as="article" className="group flex h-full flex-col p-4 sm:p-5">
        {project.imgurl && <BrowserFrame src={project.imgurl} alt={project.imgAlt ?? ""} label={label} />}

        <div className="flex flex-1 flex-col pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-grotesk text-xl font-bold">{project.name}</h3>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
              {project.status}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-fg/50">{project.tagline}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg/70">{project.description}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tech.slice(0, 5).map((t) => (
              <li key={t} className="chip !px-2.5 !py-0.5 !text-[11px]">{t}</li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm font-semibold">
            {hasDetails && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-1.5 text-xs text-white transition-colors hover:bg-accent"
              >
                Case study
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            )}
            <Links project={project} featured={featured} />
          </div>
        </div>
      </SpotlightCard>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && <CaseStudy project={project} featured={featured} onClose={() => setOpen(false)} />}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
