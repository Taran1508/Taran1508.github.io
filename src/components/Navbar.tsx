"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <header className="bg-transparent text-black shadow-sm w-full z-50 fixed top-0 backdrop-blur-md bg-white/70">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="#"
          className="text-2xl font-bold font-grotesk tracking-tighter hover:text-green-600 transition-colors"
        >
          Taran.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-grotesk text-lg">
          <Link
            href="#about"
            className="hover:text-green-600 transition-colors relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="#experience"
            className="hover:text-green-600 transition-colors relative group"
          >
            Experience
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="#projects"
            className="hover:text-green-600 transition-colors relative group"
          >
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="#contact"
            className="hover:text-green-600 transition-colors relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="https://drive.google.com/file/d/1ias0_CZXJiTSaLjAo_0P98pJFZzgPAO9/view"
            target="_blank"
            className="hover:text-green-600 transition-colors relative group"
          >
            Resume
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-black transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-black transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-black transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="bg-white border-t border-gray-100 md:hidden overflow-hidden"
          >
            <div className="flex flex-col py-4">
              <Link
                href="#about"
                className="py-3 px-8 text-lg font-grotesk hover:bg-gray-50 hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="#experience"
                className="py-3 px-8 text-lg font-grotesk hover:bg-gray-50 hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Experience
              </Link>
              <Link
                href="#projects"
                className="py-3 px-8 text-lg font-grotesk hover:bg-gray-50 hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="py-3 px-8 text-lg font-grotesk hover:bg-gray-50 hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="https://drive.google.com/file/d/1ias0_CZXJiTSaLjAo_0P98pJFZzgPAO9/view"
                target="_blank"
                className="py-3 px-8 text-lg font-grotesk hover:bg-gray-50 hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Resume
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
