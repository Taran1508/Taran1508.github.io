"use client";

import { skillCategories } from "@/data/skills";
import { motion } from "framer-motion";

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="pt-8 pb-24 w-full" id="skills">
      <div className="w-full flex justify-center">
        <div className="w-full px-6 md:px-0 md:w-5/6 overflow-visible">
          <motion.h1
            className="text-4xl md:text-[48px] mb-12 font-semibold font-sans text-black"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
          >
            Skill Set
          </motion.h1>

          <motion.div
            className="mb-12 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={containerVariants}
          >
            <h2 className="text-lg mb-6 font-grotesk text-black">
              <b>My Current Tech Stack:</b> The technologies I actively work
              with.
            </h2>
            <div className="flex flex-row flex-wrap gap-6 items-center w-full min-h-[50px]">
              {skillCategories[0].skills.map((skill, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 group">
                  <motion.img
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    src={skill.icon}
                    className="w-12 h-12 cursor-pointer object-contain"
                    alt={skill.name}
                    title={skill.name}
                    onError={(e) => {
                      // Fallback for broken images
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${skill.name}&background=random&color=fff`;
                    }}
                  />
                  <span className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity font-grotesk text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.h2
            className="text-lg mt-16 md:mt-28 mb-8 font-grotesk text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            <b>Previously Used:</b> Tech I’ve worked with before but don’t use
            as often.
          </motion.h2>

          <div className="text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {skillCategories.slice(1).map((category, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
                variants={containerVariants}
              >
                <h3 className="text-2xl md:text-[28px] mb-6 font-semibold font-sans text-black min-h-[3.5rem] flex items-center">
                  {category.title}
                </h3>
                <motion.div
                  className="flex flex-row gap-5 flex-wrap"
                  variants={containerVariants}
                >
                  {category.skills.map((skill, sIdx) => (
                    <motion.img
                      key={sIdx}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      src={skill.icon}
                      className="w-10 h-10 md:w-12 md:h-12 cursor-pointer object-contain"
                      title={skill.name}
                      alt={skill.name}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
