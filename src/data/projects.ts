export interface Project {
  name: string;
  tagline: string;
  imgurl?: string;
  imgAlt?: string;
  description: string;
  // Ordered steps/features that explain how it works.
  pipeline?: string[];
  challenges: string[];
  status: string;
  // What the status means, so the card never over-claims.
  statusNote?: string;
  github?: string;
  liveurl?: string;
  liveLabel?: string;
  tech: string[];
}

// Evidence-backed engineering projects. GitAI and Cera were checked against the local source.
export const featuredProjects: Project[] = [
  {
    name: "GitAI",
    tagline: "Context-aware developer assistant",
    imgurl: "/Gitai.png",
    imgAlt:
      "GitAI running in a terminal: ingesting a repository, building a vector store from 55 chunks, and answering a question with file references",
    description:
      "A repository-aware assistant that uses retrieval-augmented generation and file-level grounding to answer questions about a codebase, for developer onboarding and debugging.",
    pipeline: [
      "Ingest the repository recursively through the GitHub API and filter files",
      "Chunk files with file-path metadata",
      "Generate embeddings with nomic-embed-text via Ollama",
      "Retrieve similar chunks, capped per file for diversity",
      "Answer with Llama 3 under prompts that restrict it to the retrieved context",
    ],
    challenges: [
      "Grounding: prompt constraints keep answers tied to retrieved files, cited by path.",
      "Retrieval diversity: at most two chunks per file so one file cannot dominate the context.",
    ],
    status: "Working CLI prototype",
    statusNote:
      "Runs locally against Ollama. The vector store is in-memory and rebuilt each session; no persistent storage, chat memory, or formal evaluation.",
    github: "https://github.com/Taran1508/GitAI",
    tech: ["Node.js", "LangChain", "Ollama", "Llama 3", "nomic-embed-text"],
  },
  {
    name: "Cera",
    tagline: "Personal knowledge OS",
    imgurl: "/cera.png",
    imgAlt:
      "Cera dashboard with a daily digest panel, extracted key concepts, and recent ingested knowledge entries",
    description:
      "A personal knowledge system that turns unstructured content (articles, YouTube transcripts) into structured, queryable knowledge using local models.",
    pipeline: [
      "Ingestion and structuring agents turn raw content into notes",
      "Insight, synthesis, query, and action agents work over stored entries",
      "Vector retrieval with Ollama embeddings and cosine similarity",
      "A typed knowledge graph links related entries",
      "Ranking blends importance, recency, and user feedback",
    ],
    challenges: [
      "Modular agents: each stage (ingest, insight, synthesis, query, action) is a separate unit with its own prompts.",
      "Ranking: weighted scoring over importance, recency decay, and thumbs-up/down feedback.",
    ],
    status: "Working prototype, in progress",
    statusNote:
      "Local-first: Ollama models and JSON-file storage, with a web UI, API, and CLI. Not deployed, and the source is not public yet.",
    tech: ["Node.js", "React", "Fastify", "Ollama", "Vector retrieval"],
  },
];

export const lifeOsProject: Project = {
  name: "Life OS",
  tagline: "Autonomous personal operations platform",
  description:
    "A multi-agent system that manages personal workflows across email, calendar, jobs and documents. The first use case is job-search automation: analysing job descriptions, matching them to a resume, and preparing interviews.",
  pipeline: [
    "An event is routed into a LangGraph workflow",
    "Specialised agents choose tools and draft actions",
    "A policy and verification layer checks every action",
    "External actions wait for human approval; everything is audit-logged",
  ],
  challenges: [
    "Safety: only an approved action can reach the email tool.",
    "Grounding: resume and project documents are uploaded as PDF or text, then retrieved with embeddings.",
  ],
  status: "In progress",
  statusNote:
    "The agent loop, approval gate and document retrieval are real, on Gemini and Postgres with pgvector. Gmail, Calendar, Drive and job integrations are still mocked. Source is private.",
  tech: ["LangGraph", "Gemini", "Next.js", "TypeScript", "Supabase", "pgvector"],
};

export const convergeProject: Project = {
  name: "Converge",
  tagline: "Meeting intelligence platform",
  description:
    "An AI platform that turns meeting transcripts into decisions, commitments and tracked progress, with every extracted item tied back to evidence in the transcript.",
  pipeline: [
    "Ingest a transcript",
    "Extract decisions and action items with grounding to the source lines",
    "Run background jobs that survive provider quota limits and resume",
    "Evaluate extraction quality with a repeatable harness",
  ],
  challenges: [
    "Grounded extraction: each decision and action must point to supporting transcript text.",
    "Reliability: durable jobs and a provider abstraction handle rate limits and quota exhaustion.",
  ],
  status: "In progress",
  statusNote:
    "Early stage: the extraction pipeline, data layer and evaluation harness are built (225 automated tests). Live quality validation is still open. Source is private.",
  tech: ["TypeScript", "Node.js", "PostgreSQL", "LLM APIs", "pnpm monorepo"],
};

export const securityProject: Project = {
  name: "express-brute-guard",
  tagline: "Node.js security middleware",
  imgurl: "/express-brute-guard.png",
  imgAlt: "express-brute-guard project preview",
  description:
    "Configurable Express.js middleware that rate-limits requests to protect login and API endpoints from brute-force attacks. Published to npm.",
  pipeline: [
    "Tracks request counts per client IP in a time window",
    "Blocks offenders for a configurable duration",
    "Resets the counter after a successful login",
  ],
  challenges: [
    "Security relevance: slows credential-stuffing and password-guessing against authentication routes.",
    "Pluggable store design with an in-memory default; it is not shared across multiple server instances.",
  ],
  status: "Published (npm v1.0.0)",
  github: "https://github.com/Taran1508/express-brute-guard",
  liveurl: "https://www.npmjs.com/package/express-brute-guard",
  liveLabel: "npm",
  tech: ["TypeScript", "Node.js", "Express", "Jest"],
};

export interface ClientProject {
  name: string;
  imgurl: string;
  imgAlt: string;
  problem: string;
  role: string;
  solution: string;
  liveurl: string;
  tech: string[];
}

// Freelance work. Problem/role wording is derived from the previous site copy;
// confirm with the author before relying on specifics (see REVIEW_NOTES.md).
export const clientProjects: ClientProject[] = [
  {
    name: "GPTech Academy",
    imgurl: "/gptech.png",
    imgAlt: "GPTech Academy learning platform home page",
    problem: "A training business needed an online platform to manage courses and learners.",
    role: "Freelance full-stack developer.",
    solution:
      "A learning management system with course management, progress tracking, and interactive learning modules.",
    liveurl: "https://gptech.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "Firebase", "Node.js"],
  },
  {
    name: "AHVC",
    imgurl: "/ahvc.png",
    imgAlt: "AHVC veterinary clinic website home page",
    problem: "A veterinary clinic needed a web presence that presents its services and takes bookings.",
    role: "Freelance full-stack developer.",
    solution: "A responsive site with a service showcase and booking integration.",
    liveurl: "https://www.ahvc.in/",
    tech: ["Next.js", "Tailwind CSS", "Node.js"],
  },
  {
    name: "Cinematic TFI",
    imgurl: "/cinematic.jpg",
    imgAlt: "Cinematic TFI event ticketing platform",
    problem:
      "An events business needed to sell seated tickets online and run entry on the day, without a spreadsheet and WhatsApp workflow.",
    role: "Freelance full-stack developer.",
    solution:
      "An event ticketing platform: public event pages and section-wise seat selection, ticket designs per section with seat numbers and QR codes, an admin console to create events, and a QR scanner for entry. Sold-out events are blocked from booking.",
    liveurl: "https://cinematic-tfi.vercel.app/",
    tech: ["React", "Vite", "TypeScript", "Node.js", "Express", "MongoDB"],
  },
];

export const cipherProject: Project = {
  name: "Cipher",
  tagline: "Real-time chat application",
  imgurl: "/cipher.png",
  imgAlt: "Cipher secure chat app landing page",
  description:
    "A secure real-time chat application with encrypted messaging, file sharing, and live updates.",
  challenges: [],
  status: "In progress",
  tech: ["MongoDB", "Express", "Angular", "Node.js", "Socket.io"],
};

// Private client engagements, shown without links or screenshots.
export interface PrivateProject {
  name: string;
  summary: string;
  status: string;
  tech: string[];
}

export const privateProjects: PrivateProject[] = [
  {
    name: "365 Jobs",
    summary:
      "A job platform I extended with a paid resume module: a resume editor with curated templates, available only to subscribers.",
    status: "In progress · NDA",
    tech: ["Next.js", "React", "TypeScript", "Prisma", "Supabase", "Razorpay"],
  },
  {
    name: "GoldnSilver.shop",
    summary:
      "A web platform for buying and selling a curated set of Indian gold and silver ETFs through Zerodha Kite Connect, with investor education content and an admin console.",
    status: "In progress · NDA",
    tech: ["NestJS", "React", "Vite", "MongoDB", "Redis", "TypeScript"],
  },
  {
    name: "Chit fund management platform",
    summary:
      "Customer mobile app (Android first), admin web app, and a backend API for a chit fund company. Built and demoed on synthetic data with online payments disabled.",
    status: "In progress · NDA",
    tech: ["Expo", "Next.js", "NestJS", "PostgreSQL", "TypeScript"],
  },
];
