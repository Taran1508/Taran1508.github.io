"use client";

import { motion } from "framer-motion";

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="pt-8 pb-24 h-full w-full" id="about">
      <div className="w-full flex justify-center">
        <div className="w-full px-6 md:px-0 md:w-5/6 flex flex-col md:flex-row mt-20 md:mt-56 justify-center gap-12">
          <motion.div
            className="flex text-left w-full md:w-3/5 flex-col text-2xl md:text-[2.3vw] leading-relaxed font-grotesk text-black"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={fadeInUp}
          >
            I am a Full-Stack Software Engineer with experience across backend
            systems, enterprise ERP platforms, and AI-driven applications using
            MERN, GenAI, and PostgreSQL. I currently lead development of
            AI-driven platforms, designing RAG-based workflows and multi-agent
            systems. I&apos;m actively on the lookout for full-time gigs and
            high-impact projects.
          </motion.div>

          <motion.div
            className="flex flex-col p-4 rounded-2xl w-full md:w-2/5 bg-black backdrop-blur-md self-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col items-center mb-4">
              <span className="text-sm py-2 text-white font-grotesk text-center">
                Full-Stack Developer | Tech Enthusiast | Freelancer
              </span>
            </div>

            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden">
              <img
                src="/myanipic.jpg"
                className="object-cover w-full h-full"
                alt="Taran"
              />
            </div>

            <div className="flex flex-row gap-6 px-2 mt-6 justify-center items-center">
              <a
                href="https://github.com/Taran1508"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                  className="w-8 h-8 invert"
                  alt="GitHub"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/taran-mesala"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg"
                  className="w-8 h-8"
                  alt="LinkedIn"
                />
              </a>
              <a
                href="https://www.instagram.com/__im.john.__/"
                target="_blank"
                className="text-white hover:text-pink-500 hover:scale-110 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.snapchat.com/add/roxtar_john?share_id=rYFrymadGAk&locale=en-US"
                target="_blank"
                className="text-white hover:text-yellow-300 hover:scale-110 transition-all"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2.5c-3.14 0-6.15 2.1-7.26 5.56C4.1 9.68 3.5 11.23 3.5 13c0 1.35.56 2.55 1.5 3.5.76.76 1.76 1.25 2.85 1.5.6.14 1.15.24 1.65.3.3.04.5.25.5.55v.4c0 .3-.2.55-.5.6-1.05.15-2 .55-2 1.15 0 .9 2.15 1.5 4.5 1.5s4.5-.6 4.5-1.5c0-.6-.95-1-2-1.15-.3-.05-.5-.3-.5-.6v-.4c0-.3.2-.51.5-.55.5-.06 1.05-.16 1.65-.3 1.09-.25 2.09-.74 2.85-1.5.94-.95 1.5-2.15 1.5-3.5 0-1.77-.6-3.32-1.24-4.94C18.15 4.6 15.14 2.5 12 2.5z"></path>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-16">
        <motion.div
          className="flex text-left w-full px-6 md:px-0 md:w-5/6 flex-col text-2xl md:text-[2.3vw] leading-relaxed font-grotesk text-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          When I&apos;m not working, you&apos;ll catch me playing games, watching
          anime, or messing with some fun side projects.
        </motion.div>
      </div>
    </div>
  );
}
