"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ProjectLayout = ({ id, name, description, date, demoLink, imageUrls }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSlide(0);
    document.body.style.overflow = 'auto';
  };

  // Auto-advance slideshow for projects with multiple images
  useEffect(() => {
    if (isModalOpen && selectedProject && selectedProject.imageUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % selectedProject.imageUrls.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isModalOpen, selectedProject]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (selectedProject) {
      setCurrentSlide((prev) => (prev + 1) % selectedProject.imageUrls.length);
    }
  };

  const prevSlide = () => {
    if (selectedProject) {
      setCurrentSlide((prev) => (prev - 1 + selectedProject.imageUrls.length) % selectedProject.imageUrls.length);
    }
  };

  const project = { id, name, description, date, demoLink, imageUrls };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 20
        }}
        type="button"
        className="group relative overflow-hidden rounded-xl w-[23rem] max-w-[90vw] h-36 sm:w-80 sm:h-64 lg:w-[40rem] lg:h-52 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 z-[60]"
        onClick={() => openModal(project)}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrls[0]} // Use first image for card background
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 23rem, 15rem"
          />
        </div>

        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/80 z-10"></div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-all duration-300 z-20"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 z-30 text-left pointer-events-none">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-wide font-medium mb-1 text-accent/90">Project</p>
              <h2 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-accent transition-colors line-clamp-2">{name}</h2>
              <p className="text-xs sm:text-sm text-white/90">{new Date(date).getFullYear()}</p>
            </div>
            <div className="rounded-full bg-white/20 p-1.5 sm:p-2 backdrop-blur-sm group-hover:bg-accent/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-sm p-1.5 z-30 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
      </motion.button>

      {/* Modal - Similar to certifications modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Left side - Info and buttons */}
              <div className="w-full md:w-1/3 p-4 sm:p-6 flex flex-col">
                {/* Close button */}
                <button
                  type="button"
                  className="self-start mb-4 bg-black/60 rounded-full p-1.5 text-white hover:bg-black/80 transition-all focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{selectedProject.name}</h3>
                {selectedProject.name !== "Logo Designs" && (
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-4">
                    Web Application
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <p className="text-sm sm:text-base text-gray-700">Completed: {new Date(selectedProject.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-600 mb-6">
                  {selectedProject.description}
                </p>

                <div className="mt-auto pt-4">
                  {selectedProject.name !== "UMP Identity Package" && selectedProject.name !== "Logo Designs" && (
                    <a
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-2 sm:py-3 px-4 bg-accent text-white text-center rounded-lg font-medium hover:bg-accent/90 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    >
                      {selectedProject.category === "uxui" ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                          View Figma
                        </>
                      ) : selectedProject.name === "Sebenza-AI" ? (
                        "Go to site"
                      ) : (
                        "View Project"
                      )}
                    </a>
                  )}
                </div>
              </div>

              {/* Right side - Slideshow or Image */}
              <div className="w-full md:w-2/3 bg-gray-100 relative h-64 sm:h-80 md:h-auto overflow-hidden">
                {selectedProject.imageUrls.length > 1 ? (
                  <div className="relative w-full h-full">
                    {/* Slideshow Images */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={selectedProject.imageUrls[currentSlide]}
                          alt={`${selectedProject.name} Screenshot ${currentSlide + 1}`}
                          fill
                          className="object-contain p-4"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
                      aria-label="Previous image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
                      aria-label="Next image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                      {selectedProject.imageUrls.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToSlide(index);
                          }}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentSlide ? 'bg-accent' : 'bg-white/50 hover:bg-white/70'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <Image
                    src={selectedProject.imageUrls[0]}
                    alt={`${selectedProject.name} Project`}
                    fill
                    className="object-contain p-4"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectLayout;
