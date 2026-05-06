"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div
      id="intro"
      className="bg-[url('/output-onlinepngtools.png')] bg-cover bg-center h-full w-full pt-28 pb-20 md:pb-28"
    >
      <div className="w-full flex justify-center">
        <motion.div
          className="w-full px-6 md:px-0 md:w-5/6 flex flex-col text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <div className="mt-8 md:mt-16 mb-10 md:mb-14">
            <motion.h1
              variants={itemVariants}
              className="w-fit flex-col text-2xl md:text-[2.2vw] leading-none tracking-tighter font-grotesk text-black"
            >
              Hello,
            </motion.h1>
            <motion.h1
              variants={itemVariants}
              className="w-fit flex-col text-4xl md:text-[3.4vw] leading-none tracking-tighter font-grotesk text-black mt-2"
            >
              I&apos;m Taran Mesala ✨
            </motion.h1>
            <motion.h1
              variants={itemVariants}
              className="w-fit flex-col text-4xl md:text-[3.5vw] leading-tight md:leading-none tracking-tighter font-grotesk text-black mt-2"
            >
              Full-Stack Software Engineer building <br className="hidden md:block" />
              AI-driven applications & Backend systems.
            </motion.h1>
          </div>

          <div className="max-w-4xl">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-[68px] mb-8 md:mb-12 font-bold font-sans text-black leading-tight"
            >
              I{" "}
              <span className="gradient-text font-bold inline-block">
                Engineer
              </span>
              ,{" "}
              <span className="gradient-text-develop font-bold inline-block">
                Develop
              </span>
              , and{" "}
              <span className="gradient-text-deploy font-bold inline-block">
                Deploy
              </span>{" "}
              robust enterprise solutions.
            </motion.h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
