export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  description?: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "My Current Tech Stack",
    description: "The technologies I actively work with.",
    skills: [
      {
        name: "LangChain",
        icon: "https://cdn.simpleicons.org/langchain",
      },
      {
        name: "React",
        icon: "https://cdn.simpleicons.org/react",
      },
      {
        name: "Next.js",
        icon: "https://cdn.simpleicons.org/nextdotjs",
      },
      {
        name: "RAG",
        icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
      },
      {
        name: "Vector Stores",
        icon: "https://cdn-icons-png.flaticon.com/512/8039/8039147.png",
      },
      {
        name: "n8n",
        icon: "https://cdn.simpleicons.org/n8n",
      },
      {
        name: "Node.js",
        icon: "https://cdn.simpleicons.org/nodedotjs",
      },
      {
        name: "Python",
        icon: "https://cdn.simpleicons.org/python",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.simpleicons.org/postgresql",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.simpleicons.org/mongodb",
      },
      {
        name: "Docker",
        icon: "https://cdn.simpleicons.org/docker",
      },
      {
        name: "GitHub Actions",
        icon: "https://cdn.simpleicons.org/githubactions",
      },
    ],
  },
  {
    title: "AI & Automation",
    skills: [
      {
        name: "LangChain",
        icon: "https://cdn.simpleicons.org/langchain",
      },
      {
        name: "RAG",
        icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
      },
      {
        name: "Vector Stores",
        icon: "https://cdn-icons-png.flaticon.com/512/8039/8039147.png",
      },
      {
        name: "n8n",
        icon: "https://cdn.simpleicons.org/n8n",
      },
      {
        name: "OpenAI",
        icon: "https://static.cdnlogo.com/logos/o/38/openai.svg",
      },
      {
        name: "Claude",
        icon: "https://cdn.simpleicons.org/anthropic",
      },
    ],
  },
  {
    title: "Languages & Technologies",
    skills: [
      {
        name: "JavaScript",
        icon: "https://cdn.simpleicons.org/javascript",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.simpleicons.org/typescript",
      },
      {
        name: "Java",
        icon: "https://cdn.simpleicons.org/openjdk",
      },
      {
        name: "Python",
        icon: "https://cdn.simpleicons.org/python",
      },
      {
        name: "C#",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
      },
      {
        name: "SQL",
        icon: "https://cdn.simpleicons.org/sqlite",
      },
    ],
  },
  {
    title: "Frameworks & Backend",
    skills: [
      {
        name: "React",
        icon: "https://cdn.simpleicons.org/react",
      },
      {
        name: "Next.js",
        icon: "https://cdn.simpleicons.org/nextdotjs",
      },
      {
        name: "Node.js",
        icon: "https://cdn.simpleicons.org/nodedotjs",
      },
      {
        name: "Express.js",
        icon: "https://cdn.simpleicons.org/express",
      },
      {
        name: "Fastify",
        icon: "https://cdn.simpleicons.org/fastify",
      },
      {
        name: "TailwindCSS",
        icon: "https://cdn.simpleicons.org/tailwindcss",
      },
    ],
  },
  {
    title: "Databases & ORM",
    skills: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.simpleicons.org/postgresql",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.simpleicons.org/mongodb",
      },
      {
        name: "Prisma ORM",
        icon: "https://cdn.simpleicons.org/prisma",
      },
      {
        name: "Firebase",
        icon: "https://cdn.simpleicons.org/firebase",
      },
    ],
  },
  {
    title: "DevOps & Monitoring",
    skills: [
      {
        name: "Docker",
        icon: "https://cdn.simpleicons.org/docker",
      },
      {
        name: "Jenkins",
        icon: "https://cdn.simpleicons.org/jenkins",
      },
      {
        name: "GitHub Actions",
        icon: "https://cdn.simpleicons.org/githubactions",
      },
      {
        name: "AWS S3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      },
      {
        name: "Grafana",
        icon: "https://cdn.simpleicons.org/grafana",
      },
    ],
  },
];
