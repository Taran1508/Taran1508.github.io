import { clientProjects, privateProjects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BrowserFrame from "@/components/ui/BrowserFrame";

export default function ClientWork() {
  return (
    <section id="client-work" className="section border-y border-fg/10 bg-white/50" aria-labelledby="client-title">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Client work</p>
          <h2 id="client-title" className="section-title max-w-3xl">
            Shipped for <span className="text-accent">real clients</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {clientProjects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <SpotlightCard as="article" className="group flex h-full flex-col p-4 sm:p-5">
                <BrowserFrame src={p.imgurl} alt={p.imgAlt} label={p.liveurl.replace(/^https?:\/\//, "").replace(/\/$/, "")} />
                <div className="flex flex-1 flex-col pt-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-grotesk text-xl font-bold">{p.name}</h3>
                    <span className="font-mono text-[11px] text-fg/45">{p.role.replace(/\.$/, "")}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fg/70">
                    <span className="font-semibold text-fg">The need: </span>
                    {p.problem}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg/70">
                    <span className="font-semibold text-fg">What I built: </span>
                    {p.solution}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {p.tech.map((t) => (
                      <li key={t} className="chip !px-2.5 !py-0.5 !text-[11px]">{t}</li>
                    ))}
                  </ul>
                  <a
                    href={p.liveurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-5 text-sm font-semibold transition-colors hover:text-accent"
                  >
                    Visit live site ↗<span className="sr-only"> for {p.name} (opens in a new tab)</span>
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mt-20 font-grotesk text-2xl font-bold">Private client projects</h3>
          <p className="mt-2 max-w-2xl text-sm text-fg/55">
            Ongoing engagements under NDA, so there are no screenshots or links.
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {privateProjects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <SpotlightCard as="article" className="flex h-full flex-col border-dashed p-6">
                <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
                  {p.status}
                </span>
                <h4 className="mt-4 font-grotesk text-xl font-bold">{p.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-fg/70">{p.summary}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Technologies">
                  {p.tech.map((t) => (
                    <li key={t} className="chip !px-2.5 !py-0.5 !text-[11px]">{t}</li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
