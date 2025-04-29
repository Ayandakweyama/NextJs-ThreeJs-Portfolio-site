"use client";

import React, { useState, useMemo } from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";
import { 
  Code, 
  Briefcase, 
  Clock, 
  Award, 
  ChevronRight, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Star,
  CheckCircle,
  Hash,
  ExternalLink,
  Palette,
  Server,
  Smartphone,
  Cloud
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AboutDetails = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeStack, setActiveStack] = useState("popular");

  // Memoized skills data
  const skills = useMemo(() => [
    { 
      name: "Frontend", 
      level: 85, 
      tools: ["React.js", "Next.js", "HTML/CSS", "JavaScript", "TypeScript"],
      icon: <Palette size={20} className="text-accent" />
    },
    { 
      name: "Mobile Dev", 
      level: 70, 
      tools: ["Kotlin", "Jetpack Compose", "Java", "React Native"],
      icon: <Smartphone size={20} className="text-accent" />
    },
    { 
      name: "Backend", 
      level: 45, 
      tools: ["Node.js", "Django", "Java EE", "Express", "PostgreSQL"],
      icon: <Server size={20} className="text-accent" />
    },
    { 
      name: "UI/UX Design", 
      level: 92, 
      tools: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
      icon: <Palette size={20} className="text-accent" />
    },
    { 
      name: "Cloud & DevOps", 
      level: 65, 
      tools: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      icon: <Cloud size={20} className="text-accent" />
    }
  ], []);

  // Technology stack data
  const techStacks = useMemo(() => ({
    popular: {
      title: "Most Used",
      description: "Technologies I use daily",
      icon: <Star size={18} className="text-accent" />,
      items: [
        { name: "React.js", icon: "react", level: "Expert", color: "#61DAFB", docs: "https://react.dev" },
        { name: "Next.js", icon: "nextjs", level: "Expert", color: "#000000", docs: "https://nextjs.org" },
        { name: "Tailwind CSS", icon: "tailwind", level: "Expert", color: "#06B6D4", docs: "https://tailwindcss.com" },
        { name: "TypeScript", icon: "typescript", level: "Advanced", color: "#3178C6", docs: "https://www.typescriptlang.org" },
        { name: "Node.js", icon: "nodejs", level: "Advanced", color: "#339933", docs: "https://nodejs.org" }
      ]
    },
    frontend: {
      title: "Frontend",
      description: "Beautiful, responsive interfaces",
      icon: <Palette size={18} className="text-accent" />,
      items: [
        { name: "React.js", icon: "react", level: "Expert", color: "#61DAFB", docs: "https://react.dev" },
        { name: "Next.js", icon: "nextjs", level: "Expert", color: "#000000", docs: "https://nextjs.org" },
        { name: "JavaScript", icon: "js", level: "Expert", color: "#F7DF1E", docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "Tailwind CSS", icon: "tailwind", level: "Expert", color: "#06B6D4", docs: "https://tailwindcss.com" }
      ]
    },
    backend: {
      title: "Backend",
      description: "Robust server-side applications",
      icon: <Server size={18} className="text-accent" />,
      items: [
        { name: "Node.js", icon: "nodejs", level: "Advanced", color: "#339933", docs: "https://nodejs.org" },
        { name: "Express", icon: "express", level: "Advanced", color: "#000000", docs: "https://expressjs.com" },
        { name: "PostgreSQL", icon: "postgres", level: "Advanced", color: "#336791", docs: "https://www.postgresql.org" }
      ]
    },
    mobile: {
      title: "Mobile",
      description: "Native and cross-platform apps",
      icon: <Smartphone size={18} className="text-accent" />,
      items: [
        { name: "Kotlin", icon: "kotlin", level: "Advanced", color: "#7F52FF", docs: "https://kotlinlang.org" },
        { name: "React Native", icon: "react", level: "Intermediate", color: "#61DAFB", docs: "https://reactnative.dev" }
      ]
    }
  }), []);

  const stackIcons = {
    popular: <Star size={16} className="text-accent" />,
    frontend: <Palette size={16} className="text-accent" />,
    backend: <Server size={16} className="text-accent" />,
    mobile: <Smartphone size={16} className="text-accent" />,
    devops: <Cloud size={16} className="text-accent" />,
    design: <Palette size={16} className="text-accent" />
  };

  const handleSkillTap = (index) => {
    setActiveSkill(activeSkill === index ? null : index);
  };

  const handleStackChange = (stack) => {
    setActiveStack(stack);
  };

  const getLevelBadgeClass = (level) => {
    switch(level) {
      case 'Expert': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Advanced': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <section className="py-4 sm:py-6 md:py-8 w-full px-3 sm:px-4 md:px-6">
      <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 w-full max-w-6xl mx-auto">
        {/* Introduction Card - Full width on mobile */}
        <ItemLayout
          className="col-span-full lg:col-span-12 row-span-2 flex-col items-start bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-5 md:p-6"
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Code size={18} className="text-accent" />
            <h2 className="text-lg sm:text-xl md:text-2xl text-left w-full capitalize font-bold">
              Architect of Enchantment
            </h2>
          </div>
          
          <p className="font-light text-xs sm:text-sm md:text-base mb-2 sm:mb-3">
            I&apos;m <span className="font-medium">Ayanda Kweyama</span> —  a passionate software developer, UI/UX designer, and creative thinker who blends technology and design to craft meaningful digital experiences. I&apos;m currently completing my Diploma in ICT at the University of Mpumalanga, with just one final exam left in June 2025.
          </p>
          
          <p className="font-light text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
            I build dynamic applications using <span className="text-accent">React.js</span>, <span className="text-accent">Next.js</span>, <span className="text-accent">Kotlin</span>, and modern architectures with strong design principles.With a strong background in graphic design and mobile development, I strive to create solutions that are not only functional and secure, but visually captivating. Every project is an opportunity to innovate, inspire, and push boundaries ulimately shaping the future of digital experiences, one line of code at a time.
          </p>
          
          <p className="font-light text-xs sm:text-sm md:text-base italic mb-3 sm:mb-4">
            Every project is an opportunity to innovate and push boundaries.
          </p>
          
          <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row gap-2 sm:gap-3 w-full">
            <Link 
              href="/contact" 
              className="flex items-center justify-center gap-1 sm:gap-2 bg-accent hover:bg-accent-dark text-white px-3 sm:px-4 py-2 rounded-md transition-all duration-300 active:scale-95 text-xs sm:text-sm md:text-base"
            >
              Get in touch <ChevronRight size={14} />
            </Link>
            <Link 
              href="/resume.pdf" 
              className="flex items-center justify-center gap-1 sm:gap-2 border border-accent text-accent hover:bg-accent hover:text-white hover:border-accent-dark px-3 sm:px-4 py-2 rounded-md transition-all duration-300 active:scale-95 text-xs sm:text-sm md:text-base"
            >
              <Download size={14} /> Resume
            </Link>
          </div>
        </ItemLayout>

        {/* Stats Cards - Stacked on mobile, side-by-side on larger screens */}
        <div className="col-span-full flex flex-col xs:flex-row gap-2 sm:gap-3">
          <ItemLayout className="flex-1 text-accent hover:bg-accent/10 transition-all duration-300 active:scale-95 p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Briefcase size={18} className="flex-shrink-0" />
              <div>
                <p className="font-semibold text-xl sm:text-2xl md:text-3xl">
                  6+
                </p>
                <p className="font-medium text-xs sm:text-sm">clients</p>
              </div>
            </div>
          </ItemLayout>

          <ItemLayout className="flex-1 text-accent hover:bg-accent/10 transition-all duration-300 active:scale-95 p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Clock size={18} className="flex-shrink-0" />
              <div>
                <p className="font-semibold text-xl sm:text-2xl md:text-3xl">
                  3+
                </p>
                <p className="font-medium text-xs sm:text-sm">years experience</p>
              </div>
            </div>
          </ItemLayout>
        </div>

        {/* Expertise Cards Section - Enhanced Responsiveness */}
        <ItemLayout className="col-span-full p-2 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Award size={18} className="text-accent" />
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">Expertise Levels</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {skills.map((skill, index) => (
              <motion.div 
                key={index} 
                className={`transition-all duration-300 p-2 sm:p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs hover:shadow-sm ${activeSkill === index ? 'bg-accent/5 border-accent' : ''}`}
                onClick={() => handleSkillTap(index)}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full flex items-center justify-center bg-accent text-white">
                      {skill.icon}
                    </div>
                    <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl">{skill.name}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-accent font-bold text-sm sm:text-base">{skill.level}%</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mb-2 sm:mb-3">
                  <div 
                    className="bg-accent hover:bg-accent-dark transition-all duration-500 h-2 sm:h-3 rounded-full relative"
                    style={{ width: `${skill.level}%` }}
                  >
                    <div className="absolute right-0 top-0 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-white border-2 border-accent"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 flex-wrap">
                    {skill.tools.slice(0, 3).map((tool, i) => (
                      <motion.span 
                        key={i} 
                        className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 bg-slate-200 dark:bg-gray-800 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                    {skill.tools.length > 3 && activeSkill !== index && (
                      <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 bg-accent text-white rounded-full">+{skill.tools.length - 3}</span>
                    )}
                  </div>
                  <button className="text-accent hover:text-accent-dark">
                    {activeSkill === index ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
                
                <AnimatePresence>
                  {activeSkill === index && (
                    <motion.div 
                      className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-xs sm:text-sm mb-1 sm:mb-2">Key tools:</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {skill.tools.map((tool, i) => (
                          <motion.span 
                            key={i} 
                            className="text-[10px] sm:text-xs flex items-center gap-1 px-2 py-0.5 sm:py-1 bg-slate-200 dark:bg-gray-800 rounded-full"
                            whileHover={{ scale: 1.05 }}
                          >
                            <CheckCircle size={10} className="text-accent" />
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </ItemLayout>

        {/* Technology Stack Section */}
        <ItemLayout className="custom-bg col-span-full p-4 sm:p-6 md:p-8 rounded-xl flex flex-col space-y-6 sm:space-y-8">
          <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Hash size={18} className="text-accent" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold">Technology Stack</h3>
            </div>
            
            {/* Scrollable filter buttons for mobile */}
            <div className="relative">
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
                <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 justify-center">
                  {Object.keys(techStacks).map((stackKey) => (
                    <motion.button
                      key={stackKey}
                      onClick={() => handleStackChange(stackKey)}
                      className={`px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm rounded-md transition-all duration-300 flex items-center gap-1 sm:whitespace-nowrap ${
                        activeStack === stackKey
                          ? 'bg-accent text-white shadow-sm'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {stackIcons[stackKey]}
                      {techStacks[stackKey].title}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              {techStacks[activeStack].icon}
              <div>
                <h4 className="font-medium text-sm sm:text-base md:text-lg">{techStacks[activeStack].title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {techStacks[activeStack].description}
                </p>
              </div>
            </div>
            
            {/* Responsive tech cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {techStacks[activeStack].items.map((tech, index) => (
                <motion.div
                  key={`${activeStack}-${index}`}
                  className="group relative flex flex-col items-center p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xs hover:shadow-sm border border-gray-100 dark:border-gray-700 hover:border-accent/30 transition-all duration-300"
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  {/* Tech Logo */}
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 mb-2 sm:mb-3 p-2 rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 group-hover:bg-accent/5 transition-all duration-300"
                    style={{ 
                      backgroundColor: `${tech.color}08`,
                      boxShadow: `0 2px 8px ${tech.color}08`
                    }}
                  >
                    <img
                      src={`https://skillicons.dev/icons?i=${tech.icon}`}
                      alt={tech.name}
                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/28/333/fff?text=${tech.name.substring(0,2)}`;
                      }}
                    />
                  </div>
                  
                  {/* Tech Name */}
                  <h4 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 text-center text-gray-800 dark:text-gray-200 line-clamp-2">
                    {tech.name}
                  </h4>
                  
                  {/* Skill Level */}
                  <span className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:py-1 rounded-full ${getLevelBadgeClass(tech.level)}`}>
                    {tech.level}
                  </span>
                  
                  {/* Documentation Link */}
                  <Link 
                    href={tech.docs} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-b from-white/80 dark:from-gray-800/80 via-transparent to-transparent flex items-start justify-end p-2 sm:p-3 transition-opacity duration-300"
                    aria-label={`${tech.name} documentation`}
                  >
                    <span className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-dark cursor-pointer transition-colors shadow-xs">
                      <ExternalLink size={12} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </ItemLayout>
      </div>
    </section>
  );
};

export default AboutDetails;