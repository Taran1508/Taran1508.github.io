export interface Project {
  name: string;
  imgurl: string;
  description: string;
  status: string;
  github: string;
  liveurl: string;
  tech: string[];
}

export const projects: Project[] = [
  
  {
    name: "GitAI",
    imgurl: "/Gitai.png",
    description:
      "A repository-aware AI assistant using RAG pipelines with strict file-level grounding to eliminate hallucinations. Features embeddings-based retrieval and a CLI tool for developer onboarding.",
    status: "Finished",
    github: "https://github.com/Taran1508/GitAI",
    liveurl: "",
    tech: ["Node.js", "React", "LangChain", "Ollama", "Vector DB"],
  },
  {
    name: "Cera",
    imgurl: "/cera.png",
    description:
      "A Personal Knowledge OS built with a multi-agent system to convert unstructured content into structured, queryable knowledge. Implements modular agents and vector retrieval.",
    status: "In Progress",
    github: "",
    liveurl: "",
    tech: ["Node.js", "React", "Fastify", "LangChain", "Ollama", "Vector Search"],
  },
  {
    name: "Express-brute-guard",
    imgurl: "/express-brute-guard.png",
    description:
      "A customizable and production-ready rate-limiting middleware for Node.js to prevent brute-force attacks.",
    status: "Finished",
    github: "https://github.com/Taran1508/express-brute-guard",
    liveurl: "https://www.npmjs.com/package/express-brute-guard",
    tech: ["Express", "Node.js", "TypeScript", "NPM"],
  },
  /*
  {
    name: "Fresk",
    imgurl: "/fresk.png",
    description:
      "A sustainable food and grocery management app designed to reduce waste and promote efficient food usage.",
    status: "In Progress",
    github: "https://github.com/Taran1508/Fresk",
    liveurl: "",
    tech: ["React", "Node.js", "Express", "MongoDB", "Firebase", "TailwindCSS"],
  },
  */
  {
    name: "GPTech Academy",
    imgurl: "/gptech.png",
    description:
      "A comprehensive Learning Management System (LMS) built for a freelance client, featuring course management, progress tracking, and interactive learning modules.",
    status: "Finished",
    github: "",
    liveurl: "https://gptech.vercel.app/",
    tech: ["Next.js", "TailwindCSS", "Firebase", "Node.js"],
  },
  {
    name: "AHVC",
    imgurl: "/ahvc.png",
    description:
      "A freelance client project for a veterinary clinic, featuring a comprehensive service showcase and booking integration.",
    status: "Finished",
    github: "",
    liveurl: "https://www.ahvc.in/",
    tech: ["Next.js", "TailwindCSS", "Node.js"],
  },
  {
    name: "Cipher",
    imgurl: "/cipher.png",
    description:
      "A secure real-time chat application featuring encrypted messaging, file sharing, and real-time updates.",
    status: "In Progress",
    github: "",
    liveurl: "",
    tech: ["MongoDB", "Express", "Angular", "Node.js", "Socket.io"],
  },
  /*
  {
    name: "UrlShortener",
    imgurl: "/urlshort.png",
    description:
      "A simple URL shortener application that allows users to shorten long URLs and manage them.",
    status: "Finished",
    github: "https://github.com/Taran1508/UrlShortener",
    liveurl: "https://theous.vercel.app/",
    tech: ["Node", "Express", "JS"],
  },
  */
];
