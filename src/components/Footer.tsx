"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      id="footer"
      className="bg-black text-white px-4 md:px-8 py-8 md:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-12 gap-10 text-center md:text-left">
        {/* Copyright */}
        <div className="font-grotesk text-xl md:text-2xl font-bold tracking-tighter">
          &copy; Taran Mesala {new Date().getFullYear()}
        </div>

        {/* Social Links */}
        <nav>
          <ul className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 font-grotesk text-lg md:text-xl">
            <li>
              <Link
                href="https://github.com/Taran1508"
                target="_blank"
                className="hover:text-purple-400 transition-colors"
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/taran-mesala"
                target="_blank"
                className="hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/__im.john.__/"
                target="_blank"
                className="hover:text-pink-400 transition-colors"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://www.snapchat.com/add/roxtar_john?share_id=rYFrymadGAk&locale=en-US"
                target="_blank"
                className="hover:text-yellow-400 transition-colors"
              >
                Snapchat
              </Link>
            </li>
            <li>
              <Link
                href="mailto:meesalataran58@gmail.com"
                className="hover:text-red-400 transition-colors"
              >
                Email
              </Link>
            </li>
          </ul>
        </nav>

        {/* Back to Top */}
        <Link
          href="#"
          className="font-grotesk text-lg md:text-xl font-bold hover:text-purple-400 transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-purple-400 pb-1"
        >
          Back to Top
        </Link>
      </div>

      {/* Quote */}
      <div className="flex justify-center mt-8 border-t border-gray-800 pt-8">
        <div className="font-grotesk text-center md:text-xl italic text-gray-400">
          &quot;Power is not will, it is the phenomenon of physically making
          things happen.&quot; — Madara Uchiha
        </div>
      </div>
    </motion.footer>
  );
}
