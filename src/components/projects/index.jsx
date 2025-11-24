"use client";
import { motion } from "framer-motion";
import ProjectLayout from "./ProjectLayout";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20
    }
  }
};

const ProjectList = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState("development");

  const filteredProjects = projects.filter(project => project.category === activeCategory);

  return (
    <div className="relative z-10 flex flex-col lg:flex-row lg:items-start py-12 sm:py-16 px-0 w-full max-w-full mx-0 gap-8 lg:gap-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center lg:text-left lg:w-1/2 lg:mb-0"
      >
        <h1 className="hidden lg:block text-3xl sm:text-4xl font-bold text-accent mb-6 lg:mb-4">
          My Projects
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-4xl mx-auto md:mx-0">
       I build practical, scalable, and visually polished software solutions across full-stack web development, automation, and modern UI engineering. My work ranges from AI-powered platforms to e-commerce systems, booking applications, barbershop locators, and MERN-based data scrapers. Each project reflects my focus on clean architecture, responsiveness, and real-world functionality. Below is a selection of the systems, tools, and experiments I’ve built using technologies like Next.js, Django, React, Vite, MongoDB, Node.js, Java (Jakarta EE), and AWS.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="lg:w-1/2"
      >
        {/* Category Toggle */}
        <div className="flex justify-center mb-8 lg:justify-start">
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-1 border border-accent/20 flex">
            <button
              onClick={() => setActiveCategory("development")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === "development"
                  ? "bg-accent text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Development
            </button>
            <button
              onClick={() => setActiveCategory("uxui")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === "uxui"
                  ? "bg-accent text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              UX/UI
            </button>
            <button
              onClick={() => setActiveCategory("graphic")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === "graphic"
                  ? "bg-accent text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Graphic
            </button>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:w-full gap-4 sm:gap-6 justify-start justify-items-center lg:justify-items-start"
        >
          {filteredProjects.map((project, index) => {
            return <ProjectLayout key={project.id} {...project} />;
          })}
        </motion.div>
      </motion.div>
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="w-full flex justify-center mt-8"
      >
        <p className="bg-accent/20 text-accent backdrop-blur-sm px-6 py-2 rounded-full font-medium text-sm sm:text-base">
          More projects coming soon!
        </p>
      </motion.div>
    </div>
  );
};

export default ProjectList;
