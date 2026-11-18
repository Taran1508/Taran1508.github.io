import { featuredProjects, securityProject, cipherProject, lifeOsProject, convergeProject } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  const all = [
    ...featuredProjects.map((p) => ({ p, featured: true })),
    { p: securityProject, featured: false },
    { p: cipherProject, featured: false },
    { p: lifeOsProject, featured: true },
    { p: convergeProject, featured: true },
  ];
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Selected projects</p>
          <h2 id="projects-title" className="section-title max-w-3xl">
            Systems I&apos;ve designed and built
          </h2>
          <p className="mt-4 max-w-2xl text-fg/60">
            Each card states what is implemented and what is not. Open &ldquo;How it works&rdquo; for the details.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {all.map(({ p, featured }, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.1}>
              <ProjectCard project={p} featured={featured} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
