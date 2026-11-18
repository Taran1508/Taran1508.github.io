export const profile = {
  name: "Taran Mesala",
  title: "Full-Stack Software Engineer | Backend Systems & Applied AI",
  headline:
    "Full-Stack Software Engineer building backend systems and AI-powered products.",
  intro:
    "I build reliable backend systems, enterprise applications, and AI-powered products. My work spans multi-tenant SaaS architecture, API modernization, production security, and LLM-powered workflows—from building backend systems from scratch to developing retrieval-based AI applications.",
  email: "meesalataran58@gmail.com",
  location: "Hyderabad, India",
  github: "https://github.com/Taran1508",
  linkedin: "https://linkedin.com/in/taran-mesala",
  snapchat: "https://www.snapchat.com/add/roxtar_john?share_id=rYFrymadGAk&locale=en-US",
  resume: "/Taran_Mesala_Resume.pdf",
};

// Figures come from the September 2026 resume. Do not round up.
export const metrics = [
  { value: "100+", label: "backend modules", detail: "TypeScript, Fastify, Prisma, PostgreSQL" },
  {
    value: "150+",
    label: "direct Supabase/RLS integrations migrated",
    detail: "to a centralized authenticated backend API",
  },
  { value: "4", label: "AI-powered workflows built", detail: "multi-provider LLM layer" },
];

// What clients can hire me for. Each item maps to work on the experience and project sections.
export const services = [
  {
    title: "Backend & API development",
    text: "Fast, secure REST APIs and multi-tenant backends in TypeScript, Node.js, Fastify and PostgreSQL, built to scale past the prototype.",
    points: ["Auth, RBAC, SSO", "Prisma + PostgreSQL", "Legacy API migration"],
  },
  {
    title: "AI & LLM products",
    text: "Retrieval-augmented assistants and AI workflows on OpenAI, Anthropic or Gemini: resume parsing, OCR, document generation, and codebase Q&A.",
    points: ["RAG & embeddings", "Multi-provider LLM layer", "Agents & automation"],
  },
  {
    title: "Full-stack web apps",
    text: "Polished Next.js and React front ends wired to real backends: dashboards, learning platforms, booking sites, and internal tools.",
    points: ["Next.js + Tailwind", "Responsive, accessible", "Deployed on Vercel"],
  },
  {
    title: "Production hardening",
    text: "Take an existing product and make it reliable: security fixes, testing, Docker, CI/CD, and monitoring.",
    points: ["Security remediation", "Automated tests", "CI/CD & observability"],
  },
];

export const marqueeItems = [
  "TypeScript", "Node.js", "Fastify", "PostgreSQL", "Prisma", "Next.js", "React", "Docker",
  "LangChain", "RAG", "OpenAI", "Anthropic", "Gemini", "Redis", "JWT & SSO", "CI/CD",
];

export const education = {
  school: "CMR College of Engineering and Technology",
  degree:
    "Bachelor of Technology in Computer Science with Artificial Intelligence and Machine Learning",
  period: "2022–2025",
  location: "Hyderabad, Telangana",
};
