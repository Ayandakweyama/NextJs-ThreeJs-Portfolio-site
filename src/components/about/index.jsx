"use client";

import MotionHeading from "@/components/MotionHeading";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import ItemLayout from "./ItemLayout";
import Link from "next/link";
import { 
  Briefcase, 
  Clock, 
  Award, 
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
  const [activeStack, setActiveStack] = useState("frontend");

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

  // Technology stack data - Removed "popular" and added Django to frontend
  const techStacks = useMemo(() => ({
    frontend: {
      title: "Frontend",
      description: "Beautiful, responsive interfaces",
      icon: <Palette size={18} className="text-accent" />,
      items: [
        { name: "React.js", icon: "react", level: "Expert", color: "#61DAFB", docs: "https://react.dev" },
        { name: "Next.js", icon: "nextjs", level: "Expert", color: "#000000", docs: "https://nextjs.org" },
        { name: "JavaScript", icon: "js", level: "Expert", color: "#F7DF1E", docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "Tailwind CSS", icon: "tailwind", level: "Expert", color: "#06B6D4", docs: "https://tailwindcss.com" },
        { name: "Django", icon: "django", level: "Advanced", color: "#092E20", docs: "https://www.djangoproject.com" }
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
      case 'Advanced': return 'bg-blue-100 text-blue-800 dark:bg-white/10 dark:text-blue-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <section aria-label="Experience and skills" className="w-full">
      <div className="grid gap-5 sm:gap-6">
        {/* Stats Cards - Stacked on mobile, side-by-side on larger screens */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          <ItemLayout className="text-[#dbc2ac]">
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

          <ItemLayout className="text-[#dbc2ac]">
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
        <ItemLayout>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Award size={18} className="text-accent" />
            <MotionHeading as="h2" className="text-xl font-semibold sm:text-2xl">Expertise levels</MotionHeading>
          </div>
          
          <div className="grid grid-cols-1 items-start sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {skills.map((skill, index) => (
              <motion.div 
                key={index} 
                className={`transition-all duration-300 p-3 sm:p-4 rounded-xl border border-white/15 shadow-xs hover:shadow-sm ${activeSkill === index ? 'bg-accent/5 border-accent' : ''}`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                      {skill.icon}
                    </div>
                    <MotionHeading as="h3" className="font-medium text-sm sm:text-base md:text-lg lg:text-xl">{skill.name}</MotionHeading>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-accent font-bold text-sm sm:text-base">{skill.level}%</span>
                  </div>
                </div>
                
                <div className="w-full bg-white/10 rounded-full h-2 sm:h-3 mb-2 sm:mb-3">

                  <div 
                    className="bg-accent hover:bg-accent-dark transition-all duration-500 h-2 sm:h-3 rounded-full relative"
                    style={{ width: `${skill.level}%` }}
                  >
                    <div className="absolute right-0 top-0 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-white/10 border-2 border-accent"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 flex-wrap">
                    {skill.tools.slice(0, 3).map((tool, i) => (
                      <motion.span 
                        key={i} 
                        className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 bg-white/10 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                    {skill.tools.length > 3 && activeSkill !== index && (
                      <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 bg-accent text-white rounded-full">+{skill.tools.length - 3}</span>
                    )}
                  </div>
                  <button type="button" aria-label={`Toggle ${skill.name} tools`} aria-expanded={activeSkill === index} onClick={() => handleSkillTap(index)} className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-[#dbc2ac] hover:bg-white/10">
                    {activeSkill === index ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
                
                <AnimatePresence>
                  {activeSkill === index && (
                    <motion.div 
                      className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/15"
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
                            className="text-[10px] sm:text-xs flex items-center gap-1 px-2 py-0.5 sm:py-1 bg-white/10 rounded-full"
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
        <ItemLayout >
          <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Hash size={18} className="text-accent" />
              <MotionHeading as="h2" className="text-xl font-semibold sm:text-2xl">Technology stack</MotionHeading>
            </div>
            
            {/* Scrollable filter buttons for mobile */}
            <div className="relative">
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
                <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 justify-center">
                  {Object.keys(techStacks).map((stackKey) => (
                    <motion.button
                      key={stackKey}
                      type="button"
                      aria-pressed={activeStack === stackKey}
                      onClick={() => handleStackChange(stackKey)}
                      className={`min-h-11 px-3 text-sm rounded-md transition-all duration-300 flex items-center gap-1 sm:whitespace-nowrap ${
                        activeStack === stackKey
                          ? 'bg-accent text-white shadow-sm'
                          : 'bg-white/10 hover:bg-white/20'
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
                <MotionHeading as="h3" className="font-medium text-sm sm:text-base md:text-lg">{techStacks[activeStack].title}</MotionHeading>
                <p className="text-xs sm:text-sm text-white/65">
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
                    <Image
                      src={`https://skillicons.dev/icons?i=${tech.icon}`}
                      alt=""
                      width={28}
                      height={28}
                      unoptimized
                      className="size-6 object-contain sm:size-7"
                      onError={(event) => { event.currentTarget.hidden = true; }}
                    />
                  </div>
                  
                  {/* Tech Name */}
                  <MotionHeading as="h3" lines={2} tone="light" className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 text-center">
                    {tech.name}
                  </MotionHeading>
                  
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
