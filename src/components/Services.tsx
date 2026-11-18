import { services } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

const icons = [
  <path key="a" d="M4 6h16M4 12h16M4 18h10" />, // api / server
  <path key="b" d="M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3L12 3zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15z" />, // sparkle / ai
  <path key="c" d="M3 5h18v11H3zM8 20h8M12 16v4" />, // screen
  <path key="d" d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM9 12l2 2 4-4" />, // shield
];

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">What I do</p>
          <h2 id="services-title" className="section-title max-w-3xl">
            Hire me to build the part that has to <span className="text-accent">actually work</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <SpotlightCard className="h-full p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icons[i]}
                  </svg>
                </span>
                <h3 className="mt-4 font-grotesk text-lg font-bold leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/65">{s.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
