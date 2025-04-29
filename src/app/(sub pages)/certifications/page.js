"use client";
import React, { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import Image from "next/image";
import bg from "../../../../public/background/certifications-background.png";
import { motion, AnimatePresence } from "framer-motion";

const certifications = [
  {
    id: 1,
    title: "Foundations: Data, Data, Everywhere",
    issuer: "Google & Coursera",
    date: "April 2025",
    type: "Data Analytics",
    link: "https://www.coursera.org/account/accomplishments/verify/DBN4JU5G4NPG",
    imageUrl: "/certifications/Google Cert 1.jpeg"
  },
  {
    id: 2,
    title: "Django Essential Training",
    issuer: "LinkedIn Learning",
    date: "July 2024",
    type: "Frontend Development",
    link: "https://www.linkedin.com/learning/certificates/19ca54046d6aaafcbad8abd9eebe0ef29acaedb37950fc910dbfc6a6dcc0aaf8",
    imageUrl: "/certifications/django.png"
  },
  {
    id: 3,
    title: "ITIL Foundation",
    issuer: "LinkedIn Learning",
    date: "July 2024",
    type: "IT service management",
    link: "https://www.linkedin.com/learning/certificates/a90ec2bbc783cae56e1dffe2ca4458e002483de557c805acc90206f4a6518cff",
    imageUrl: "/certifications/ITIL.png"
  },
  {
    id: 1,
    title: "Foundations of User Experience",
    issuer: "Google & Coursera",
    date: "February 2023",
    type: "User Experience",
    link: "https://www.coursera.org/account/accomplishments/verify/SSXVN492ZFEX",
    imageUrl: "/certifications/ui.jpeg"
  },
 

];

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Enhanced animation variants
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

  return (
    <>
      <div className="relative z-50 pointer-events-auto">
        <Navigation />
      </div>
      
      <Image
        src={bg}
        priority
        sizes="100vw"
        alt="Certifications page background"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-50"
      />
      
      <main className="relative z-10 flex flex-col items-center md:items-start py-12 sm:py-16 px-0 w-full max-w-full mx-0">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-accent">My Certifications</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto md:mx-0">
            Professional credentials showcasing expertise across various technologies and disciplines.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-start justify-items-start"
        >
          {certifications.map((cert) => (
            <motion.button
              key={cert.id}
              variants={item}
              type="button"
              className="group relative overflow-hidden rounded-xl shadow-lg w-[23rem] h-36 sm:w-60 sm:h-56 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              onClick={() => openModal(cert)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 z-10"></div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-all duration-300 z-20"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 z-30 text-left pointer-events-none">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs sm:text-sm uppercase tracking-wide font-medium mb-1 text-accent/90">{cert.type}</p>
                    <h2 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-accent transition-colors line-clamp-2">{cert.title}</h2>
                    <p className="text-xs sm:text-sm text-white/90">{cert.issuer} • {cert.date}</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
            </motion.button>
          ))}
        </motion.div>
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="w-full flex justify-center mt-8"
        >
          <p className="bg-accent/20 text-accent backdrop-blur-sm px-6 py-2 rounded-full font-medium text-sm sm:text-base">
            Be on the lookout as I complete other certifications!
          </p>
        </motion.div>

        {/* Modal - Rearranged with image on right and buttons on left */}
        <AnimatePresence>
          {isModalOpen && selectedCert && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
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
                  {/* Close button - moved to the left top */}
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
                  
                  <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{selectedCert.title}</h3>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-4">
                    {selectedCert.type}
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                      <p className="text-sm sm:text-base text-gray-700">{selectedCert.issuer}</p>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <p className="text-sm sm:text-base text-gray-700">Issued: {selectedCert.date}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    This certification validates expertise in {selectedCert.type.toLowerCase()}  
                    and demonstrates proficiency with industry-standard tools and methodologies.
                  </p>
                  
                  <div className="mt-auto pt-4">
                    <a 
                      href={selectedCert.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full py-2 sm:py-3 px-4 bg-accent text-white text-center rounded-lg font-medium hover:bg-accent/90 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    >
                      Verify Certificate
                    </a>
                  </div>
                </div>
                
                {/* Right side - Image */}
                <div className="w-full md:w-2/3 bg-gray-100 relative h-64 sm:h-80 md:h-auto">
                  <Image
                    src={selectedCert.imageUrl}
                    alt={`${selectedCert.title} Certificate`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}