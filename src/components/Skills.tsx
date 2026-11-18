import {
  siTypescript, siJavascript, siPython, siOpenjdk, siReact, siNextdotjs, siTailwindcss, siNodedotjs,
  siFastify, siExpress, siGraphql, siPostgresql, siMongodb, siPrisma, siRedis, siSupabase, siDocker,
  siJenkins, siGithubactions, siGrafana, siGit, siVitest, siLangchain, siLanggraph, siOllama,
  siAnthropic, siGooglegemini, siJsonwebtokens, siOpenid, siWebauthn,
} from "simple-icons";
import {
  Database, Globe, Layers, Brain, BookOpenText, Binary, ScanSearch, Bot, ShieldCheck, Smartphone,
  LogIn, FileKey, GitBranch, FlaskConical, CheckCheck, Puzzle, Plug,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

// Brand logo (simple-icons path) or a line icon (Lucide) for skills without an official logo.
type Skill = { name: string; path?: string; icon?: LucideIcon };

const rename: Record<string, string> = {
  OpenJDK: "Java",
  "JSON Web Tokens": "JWT",
  OpenID: "OIDC",
  "Google Gemini": "Gemini",
  Express: "Express.js",
};
const brand = (i: { title: string; path: string }): Skill => ({ name: rename[i.title] ?? i.title, path: i.path });
const line = (name: string, icon: LucideIcon): Skill => ({ name, icon });

const groups: { title: string; hint: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    hint: "What I write",
    skills: [siTypescript, siJavascript, siPython, siOpenjdk].map(brand).concat(line("SQL", Database)),
  },
  {
    title: "Frontend",
    hint: "What users see",
    skills: [siReact, siNextdotjs, siTailwindcss].map(brand),
  },
  {
    title: "Backend",
    hint: "Services and APIs",
    skills: [siNodedotjs, siFastify, siExpress, siGraphql].map(brand).concat(line("REST APIs", Globe)),
  },
  {
    title: "Data",
    hint: "Where data lives",
    skills: [siPostgresql, siMongodb, siPrisma, siSupabase, siRedis].map(brand).concat(line("BullMQ", Layers)),
  },
  {
    title: "AI & GenAI",
    hint: "LLM products and agents",
    skills: [
      ...[siLangchain, siLanggraph, siOllama, siAnthropic, siGooglegemini].map(brand),
      line("LLM integration", Brain),
      line("RAG", BookOpenText),
      line("Embeddings", Binary),
      line("Vector search", ScanSearch),
      line("Multi-agent", Bot),
    ],
  },
  {
    title: "Security",
    hint: "Auth and access control",
    skills: [
      ...[siJsonwebtokens, siOpenid, siWebauthn].map(brand),
      line("RBAC", ShieldCheck),
      line("MFA", Smartphone),
      line("SSO", LogIn),
      line("SAML", FileKey),
    ],
  },
  {
    title: "DevOps & Testing",
    hint: "Shipping and confidence",
    skills: [
      ...[siDocker, siJenkins, siGithubactions, siGrafana, siGit, siVitest].map(brand),
      line("CI/CD", GitBranch),
      line("Supertest", FlaskConical),
      line("Unit testing", CheckCheck),
      line("Integration", Puzzle),
      line("API testing", Plug),
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Technical skills</p>
          <h2 id="skills-title" className="section-title max-w-3xl">
            The stack behind the work
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={(gi % 2) * 0.08} className={gi === groups.length - 1 ? "lg:col-span-2" : ""}>
              <div className="glass h-full p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-3 border-b border-fg/10 pb-3">
                  <h3 className="font-grotesk text-xl font-bold">{g.title}</h3>
                  <p className="text-xs text-fg/50">{g.hint}</p>
                </div>

                <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-1">
                  {g.skills.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li
                        key={s.name}
                        className="group flex flex-col items-center gap-2.5 rounded-xl px-1 py-3 text-fg/75 transition-all duration-300 hover:-translate-y-1 hover:bg-accent/10 hover:text-accent"
                      >
                        {Icon ? (
                          <Icon aria-hidden="true" className="h-9 w-9" strokeWidth={1.5} />
                        ) : (
                          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-9 w-9 fill-current">
                            <path d={s.path} />
                          </svg>
                        )}
                        <span className="text-center text-xs font-medium leading-tight text-fg/55 transition-colors group-hover:text-accent">
                          {s.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
