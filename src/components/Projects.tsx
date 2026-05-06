"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

export default function Projects() {
  return (
    <section
      className="py-20 px-4 md:px-0 w-full flex flex-col items-center bg-white"
      id="projects"
    >
      <div className="max-w-7xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-4xl md:text-[48px] mb-8 md:mb-12 font-semibold font-sans text-center md:text-left text-black"
        >
          Featured Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              // Changed to white bg, light gray border, slight shadow
              className="bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col h-full hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="relative w-full h-48 bg-gray-100">
                <Image
                  src={project.imgurl}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  {/* Changed text to black */}
                  <h3 className="text-2xl font-bold font-grotesk text-black">
                    {project.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "Finished"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-yellow-500/10 text-yellow-600"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Changed text to gray-600 */}
                <p className="text-gray-600 text-sm mb-4 flex-grow font-grotesk">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    // Light gray badges
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 border border-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-black text-gray-500 transition-colors"
                    >
                      <GithubIcon /> Code
                    </Link>
                  )}
                  {project.liveurl && (
                    <Link
                      href={project.liveurl}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-black text-gray-500 transition-colors"
                    >
                      <GlobeIcon /> Live
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Added requested content */}
      <motion.div
        className="flex mt-32 justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
      >
        <div className="mt-6 text-center px-6">
          <p className="text-lg md:text-[1.7vw] text-green-600 font-grotesk inline">
            Want to see more?&nbsp;
          </p>
          <a
            href="https://github.com/Taran1508"
            className="text-lg md:text-[1.7vw] text-blue-600 font-grotesk hover:underline"
            target="_blank"
          >
            Check out my GitHub Profile
          </a>
        </div>
      </motion.div>

      <motion.div
        className="flex mb-12 justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.2 }}
      >
        <p className="mt-6 text-center px-6 text-lg md:text-[1.7vw] text-green-600 font-grotesk">
          <span className="text-blue-600">Contact Me&nbsp;</span>, Let&apos;s
          build something amazing together!
        </p>
      </motion.div>
    </section>
  );
}
