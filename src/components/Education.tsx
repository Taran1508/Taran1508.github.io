import { education } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";

export default function Education() {
  return (
    <section id="education" className="section !py-16" aria-labelledby="education-title">
      <div className="container-page">
        <Reveal>
          <div className="glass flex flex-wrap items-center justify-between gap-4 p-7">
            <div>
              <p className="eyebrow">Education</p>
              <h2 id="education-title" className="mt-3 font-grotesk text-xl font-bold md:text-2xl">
                {education.school}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-fg/60">{education.degree}</p>
            </div>
            <p className="font-mono text-sm text-fg/55">
              {education.period} · {education.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
