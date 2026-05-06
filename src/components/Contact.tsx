"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xpqbronq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="py-32 w-full bg-white relative" id="contact">
      <div className="w-full flex justify-center">
        <div className="w-full px-6 md:px-0 md:w-5/6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Info Side */}
            <div>
              <motion.span 
                className="text-purple-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                Get in Touch
              </motion.span>
              <motion.h1
                className="text-5xl md:text-7xl font-bold font-sans text-black leading-tight mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
              >
                Let&apos;s build <br /> something <br /> 
                <span className="gradient-text">exceptional</span>.
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl font-grotesk text-gray-500 max-w-md leading-relaxed mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                Have a project in mind or just want to say hi? Feel free to reach out. I&apos;m always open to discussing new projects and creative ideas.
              </motion.p>

              <motion.div 
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
              >
                <a 
                  href="mailto:meesalataran58@gmail.com"
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                    <svg className="w-6 h-6 text-black group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-grotesk uppercase tracking-widest mb-1">Email Me</p>
                    <p className="text-xl font-bold font-sans group-hover:text-purple-600 transition-colors">meesalataran58@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+918309985635"
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                    <svg className="w-6 h-6 text-black group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-grotesk uppercase tracking-widest mb-1">Call Me</p>
                    <p className="text-xl font-bold font-sans group-hover:text-green-600 transition-colors">+91 8309985635</p>
                  </div>
                </a>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <svg className="w-6 h-6 text-black group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-grotesk uppercase tracking-widest mb-1">Location</p>
                    <p className="text-xl font-bold font-sans">Hyderabad, India</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gray-50/50 p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-xl shadow-purple-500/5"
            >
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-grotesk focus:outline-none focus:border-purple-600 transition-colors placeholder-transparent"
                  />
                  <label 
                    htmlFor="name"
                    className="absolute left-0 top-4 text-xl text-gray-400 font-grotesk pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-purple-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-sm"
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-grotesk focus:outline-none focus:border-purple-600 transition-colors placeholder-transparent"
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-0 top-4 text-xl text-gray-400 font-grotesk pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-purple-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-sm"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-grotesk focus:outline-none focus:border-purple-600 transition-colors placeholder-transparent resize-none"
                  />
                  <label 
                    htmlFor="message"
                    className="absolute left-0 top-4 text-xl text-gray-400 font-grotesk pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-purple-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-sm"
                  >
                    Your Message
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full py-6 rounded-2xl text-xl font-bold font-sans transition-all duration-300 shadow-xl ${
                    status === "success" 
                      ? "bg-green-600 text-white" 
                      : status === "error"
                      ? "bg-red-600 text-white"
                      : "bg-black text-white hover:bg-purple-600 hover:scale-[1.02] active:scale-[0.98] shadow-purple-500/10"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Error! Try Again" : "Send Message"}
                </button>
                
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-green-50 border border-green-100 text-center"
                  >
                    <p className="text-green-800 font-bold font-grotesk text-lg">
                      Thank you! I&apos;ll get back to you soon.
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      Your message was sent successfully.
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
