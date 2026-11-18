import type { Metadata } from "next";
import { Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const title = "Taran Mesala | Full-Stack Software Engineer, Backend Systems & Applied AI";
const description =
  "Full-stack software engineer building multi-tenant SaaS backends, API modernization, security, and LLM-powered products with TypeScript, Node.js, Fastify, PostgreSQL, and RAG.";

export const metadata: Metadata = {
  metadataBase: new URL("https://taranmesala.vercel.app"),
  title,
  description,
  authors: [{ name: "Taran Mesala", url: "https://github.com/Taran1508" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Taran Mesala",
    title,
    description,
    images: [{ url: "/myanipic.jpg", width: 928, height: 1232, alt: "Illustrated portrait of Taran Mesala" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/myanipic.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
