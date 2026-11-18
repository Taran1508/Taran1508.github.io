export interface Highlight {
  label: string;
  text: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: Highlight[];
  tech: string[];
  // true = stated in the latest resume / user-provided source of truth.
  // false = carried over from the previous site, not independently confirmed.
  confirmed: boolean;
  note?: string;
}

// Main, confirmed timeline (most recent first).
export const experiences: Experience[] = [
  {
    company: "HR Footprints Management Services Pvt. Ltd.",
    role: "Full Stack Engineer",
    period: "May 2026 – Sep 2026",
    location: "Hyderabad",
    summary:
      "Owned the backend for two SaaS products, HRToffy (HRMS) and 9th Box (PMS), and moved a production frontend off direct database access.",
    highlights: [
      {
        label: "Product ownership",
        text: "Independently built backend systems from scratch for HRToffy and 9th Box: multi-tenant architecture, authentication, authorization, and core business modules.",
      },
      {
        label: "Backend scale",
        text: "Designed and implemented 100+ backend modules covering organization management, recruitment, payroll, attendance, and performance workflows.",
      },
      {
        label: "API migration",
        text: "Migrated 150+ direct Supabase/RLS integrations from a production React frontend to a centralized, authenticated backend API architecture.",
      },
      {
        label: "AI workflows",
        text: "Built four AI-powered workflows (resume parsing, receipt OCR, policy generation, AI-driven dashboard generation) on a multi-provider LLM layer supporting OpenAI, Anthropic, and Gemini.",
      },
      {
        label: "Security & reliability",
        text: "Implemented or contributed to multi-tenant RBAC, JWT authentication, SSO federation, API-key security, Docker hardening, automated testing, and production security remediation.",
      },
    ],
    tech: ["TypeScript", "Node.js", "Fastify", "Prisma", "PostgreSQL", "Docker", "LLM APIs"],
    confirmed: true,
  },
  {
    company: "Integrated Softtech",
    role: "Full-Stack Developer",
    period: "Sep 2025 – May 2026",
    location: "Hyderabad",
    summary:
      "Backend reliability and API modernization on an ERP platform, including production debugging and database releases.",
    highlights: [
      {
        label: "ERP backend",
        text: "Engineered and stabilized APIs across 15+ ERP modules.",
      },
      {
        label: "API modernization",
        text: "Migrated 50+ legacy endpoints to structured REST services.",
      },
      {
        label: "Production debugging",
        text: "Resolved CI/CD and runtime failures using Grafana and Jenkins.",
      },
      {
        label: "Database evolution",
        text: "Executed 10+ schema migrations with Flyway inside CI/CD workflows.",
      },
    ],
    tech: ["REST APIs", "Jenkins", "Grafana", "Flyway", "CI/CD"],
    confirmed: true,
  },
];

// Other entries from the previous site. Rendered under a separate heading.
export const otherExperience: Experience[] = [
  {
    company: "SP Financial Services",
    role: "GenAI Full-Stack Technical Lead",
    period: "From Feb 2026",
    location: "Remote",
    summary:
      "Technical lead for an AI platform: architecture, RAG workflows, and implementation strategy.",
    highlights: [
      {
        label: "Architecture",
        text: "Defined the backend architecture and scalable frontend structure from scratch.",
      },
      {
        label: "RAG",
        text: "Building retrieval-based pipelines, embeddings workflows, and automation with n8n.",
      },
    ],
    tech: ["GenAI", "LangChain", "n8n", "React", "Node.js"],
    confirmed: false,
    note: "REVIEW: not on the latest resume; status, hours, and end date unconfirmed.",
  },
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "From Jul 2025",
    location: "Remote",
    summary:
      "Client websites and platforms, including GPTech Academy (LMS) and AHVC (veterinary clinic).",
    highlights: [],
    tech: ["Next.js", "React", "Node.js", "Firebase", "Tailwind CSS"],
    confirmed: false,
    note: "REVIEW: not on the latest resume; confirm whether still active.",
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Programmer Analyst Trainee (training phase)",
    period: "May 2025 – Sep 2025",
    location: "Remote, Hyderabad",
    summary:
      ".NET full-stack training: C#, Web API, SQL, React, and a microblogging platform with authentication and secure REST APIs.",
    highlights: [],
    tech: [".NET", "C#", "SQL", "React"],
    confirmed: true,
    note: "Listed on the Nov 2025 resume, absent from the Sep 2026 resume.",
  },
  {
    company: "Prakash Innovative Universe",
    role: "Software Development Engineer Intern",
    period: "Jan 2025 – Mar 2025",
    location: "Hybrid, Hyderabad",
    summary:
      "Built 18+ RESTful APIs with Node.js and Express, added JWT + RBAC authentication, and Dockerized the backend.",
    highlights: [],
    tech: ["Node.js", "Express", "JWT", "RBAC", "Docker"],
    confirmed: true,
    note: "Listed on the Nov 2025 resume, absent from the Sep 2026 resume.",
  },
];

// "Starups" (Technical Team Lead, Jul 2024 – Jul 2025) is intentionally NOT rendered:
// it is on no resume, its dates overlap other roles, and its "30% delivery efficiency"
// claim is unverified. See REVIEW_NOTES.md.
