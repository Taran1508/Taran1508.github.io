export interface SkillGroup {
  title: string;
  skills: string[];
}

// Source: September 2026 resume. Text only; no proficiency scores.
export const skillGroups: SkillGroup[] = [
  { title: "Languages", skills: ["TypeScript", "JavaScript", "Python", "Java", "SQL"] },
  { title: "Frontend", skills: ["React", "Next.js", "Tailwind CSS"] },
  { title: "Backend", skills: ["Node.js", "Fastify", "Express.js", "REST APIs", "GraphQL"] },
  { title: "Databases & ORM", skills: ["PostgreSQL", "MongoDB", "Prisma ORM"] },
  {
    title: "AI & GenAI",
    skills: [
      "LLM integration",
      "RAG",
      "Embeddings",
      "Vector search",
      "LangChain",
      "LangGraph",
      "Multi-agent systems",
      "Ollama",
    ],
  },
  { title: "Security", skills: ["JWT", "RBAC", "MFA", "SSO", "SAML", "OIDC", "WebAuthn"] },
  {
    title: "DevOps & Reliability",
    skills: ["Docker", "Jenkins", "GitHub Actions", "CI/CD", "Redis", "BullMQ", "Grafana", "Git"],
  },
  {
    title: "Testing",
    skills: ["Vitest", "Supertest", "Unit testing", "Integration testing", "API testing"],
  },
];
