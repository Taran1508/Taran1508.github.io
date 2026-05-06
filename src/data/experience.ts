export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  tech?: string[];
  color?: string;
}

export const experiences: Experience[] = [
  {
    company: "SP Financial Services",
    role: "GenAI Full-Stack Technical Lead",
    period: "Feb 2026 - Present",
    location: "Remote",
    points: [
      "AI platform ownership: leading end-to-end architecture and development of an AI-driven system",
      "System design: defined backend architecture and scalable frontend structure from scratch",
      "RAG systems: building retrieval-based pipelines, embeddings workflows, and automation systems using n8n",
      "Technical leadership: driving implementation strategy and system design decisions",
    ],
    tech: ["GenAI", "LangChain", "n8n", "React", "Node.js"],
    color: "#8B5CF6", // Purple
  },
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "July 2025 - Present",
    location: "Remote",
    points: [
      "Delivered production-grade applications for diverse clients, including AHVC (Veterinary Clinic) and GPTech Academy (LMS Platform)",
      "Built and deployed end-to-end solutions using Next.js, React, Node.js, and Firebase",
      "Focused on creating responsive, high-performance web experiences with modern design aesthetics",
    ],
    tech: ["Next.js", "React", "Firebase", "Node.js", "TailwindCSS"],
    color: "#3B82F6", // Blue
  },
  {
    company: "Integrated Softtech",
    role: "Full-Stack Developer",
    period: "Sept 2025 - Present",
    location: "Hyderabad",
    points: [
      "Backend systems (ERP platform): engineered and stabilized APIs across 15+ modules",
      "API modernization: migrated 50+ legacy endpoints to structured REST services",
      "Production debugging: resolved multiple CI/CD and runtime failures using Grafana and Jenkins",
      "Database evolution: executed 10+ schema migrations using Flyway within CI/CD workflows",
    ],
    tech: ["ERP", "Node.js", "Jenkins", "Grafana", "Flyway"],
    color: "#10B981", // Green
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Programmer Analyst Trainee",
    period: "May 2025 - Sept 2025",
    location: "Remote / Hyderabad",
    points: [
      "Training in .NET full-stack development including C#, Web API, SQL, React",
      "Building a microblogging platform with authentication and secure REST APIs",
      "Exposure to enterprise coding standards, clean architecture, and DevOps fundamentals",
    ],
    tech: [".NET", "C#", "SQL", "React", "DevOps"],
    color: "#6366F1", // Indigo
  },
  {
    company: "Prakash Innovative Universe",
    role: "Software Development Engineer Intern",
    period: "Jan 2025 - March 2025",
    location: "Hybrid, Hyderabad",
    points: [
      "Developed 18+ RESTful APIs (Node.js + Express), optimized response time by 30%",
      "Integrated JWT + RBAC authentication and implemented secure middleware handling",
      "Dockerized the backend for consistent development-to-production flow",
      "Collaborated on GitHub using Agile practices and wrote API documentation",
    ],
    tech: ["Node.js", "Express", "Docker", "JWT", "REST APIs"],
    color: "#F59E0B", // Amber
  },
  {
    company: "Starups",
    role: "Technical Team Lead",
    period: "July 2024 - July 2025",
    location: "Remote, Hyderabad",
    points: [
      "Led a remote team to build a full-stack product ecosystem with React + TypeScript + Node.js",
      "Built real-time collaborative tools and scalable APIs, improving delivery efficiency by 30%",
      "Deployed apps using Vercel & Cordova, managed CI/CD pipelines and GitHub Actions",
      "Owned backend architecture and worked across frontend, backend, and DevOps",
    ],
    tech: ["React", "TypeScript", "Node.js", "GitHub Actions", "Vercel"],
    color: "#EF4444", // Red
  },
];
