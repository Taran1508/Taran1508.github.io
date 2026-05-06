"use client";

import { experiences } from "@/data/experience";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="py-24 w-full bg-[#fafafa] relative overflow-hidden" id="experience">
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{
          backgroundColor: experiences[activeIdx].color,
          opacity: 0.05
        }}
        className="absolute inset-0 transition-colors duration-1000 -z-10"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0),rgba(250,250,250,1))] -z-10" />

      <div className="w-full flex justify-center">
        <div className="w-full px-6 md:px-0 md:w-5/6">
          {/* Header - Kept as per user request */}
          <div className="mb-16">
            <motion.span 
              className="text-purple-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Career Path
            </motion.span>
            <motion.h1
              className="text-5xl md:text-7xl font-black font-sans text-black tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Experience<span className="text-purple-600">.</span>
            </motion.h1>
          </div>

          {/* Interactive Glass Dashboard */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/20 rounded-[3rem] p-4 md:p-8 shadow-2xl shadow-gray-200/50 flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar p-2">
              {experiences.map((exp, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative p-4 md:p-6 rounded-[2rem] text-left transition-all duration-500 min-w-[200px] lg:min-w-0 ${
                    activeIdx === idx 
                      ? "bg-white shadow-xl shadow-gray-100 ring-1 ring-gray-100" 
                      : "hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black transition-all duration-500 shadow-sm"
                      style={{ 
                        backgroundColor: activeIdx === idx ? exp.color : "#f3f4f6",
                        color: activeIdx === idx ? "#fff" : "#9ca3af"
                      }}
                    >
                      {exp.company[0]}
                    </div>
                    <div>
                      <h3 className={`text-sm md:text-base font-bold font-sans transition-colors ${
                        activeIdx === idx ? "text-black" : "text-gray-400 group-hover:text-gray-600"
                      }`}>
                        {exp.company}
                      </h3>
                      <p className="text-[9px] font-bold font-grotesk tracking-widest uppercase text-gray-400">
                        {exp.period}
                      </p>
                    </div>
                  </div>
                  
                  {activeIdx === idx && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute right-4 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: exp.color }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Display Area */}
            <div className="w-full lg:w-3/4 bg-white/60 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
               {/* Background Decorative Graphic */}
               <motion.div 
                  key={`bg-${activeIdx}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.03, scale: 1 }}
                  className="absolute -right-10 -bottom-10 text-[300px] font-black pointer-events-none italic"
                  style={{ color: experiences[activeIdx].color }}
               >
                  {experiences[activeIdx].company[0]}
               </motion.div>

               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeIdx}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                   className="relative z-10"
                 >
                   <div className="mb-10">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "60px" }}
                        className="h-1 mb-6 rounded-full"
                        style={{ backgroundColor: experiences[activeIdx].color }}
                     />
                     <h2 className="text-4xl md:text-6xl font-black font-sans text-black leading-tight mb-4 tracking-tighter">
                       {experiences[activeIdx].role}
                     </h2>
                     <div className="flex flex-wrap items-center gap-4 text-gray-400 font-grotesk font-bold text-xs uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                           {experiences[activeIdx].location}
                        </span>
                        <span>/</span>
                        <span className="flex items-center gap-2">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                           {experiences[activeIdx].period}
                        </span>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 gap-4 mb-10">
                     {experiences[activeIdx].points.map((point, pIdx) => (
                       <motion.div
                         key={pIdx}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.2 + pIdx * 0.1 }}
                         className="flex items-start gap-5 group/item"
                       >
                         <div 
                           className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover/item:scale-150"
                           style={{ backgroundColor: experiences[activeIdx].color }}
                         />
                         <p className="text-base md:text-lg font-grotesk text-gray-600 leading-relaxed">
                           {point}
                         </p>
                       </motion.div>
                     ))}
                   </div>

                   {experiences[activeIdx].tech && (
                     <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
                       {experiences[activeIdx].tech.map((t, tIdx) => (
                         <motion.span 
                           key={tIdx}
                           whileHover={{ y: -5, scale: 1.05 }}
                           className="px-4 py-2 rounded-xl text-[10px] font-black font-grotesk tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-lg border"
                           style={{ 
                             backgroundColor: "#fff",
                             borderColor: "#f3f4f6",
                             color: experiences[activeIdx].color
                           }}
                         >
                           {t}
                         </motion.span>
                       ))}
                     </div>
                   )}
                 </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
