import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const sections = [
  { id: 'hero', label: 'Accueil' },
  { id: 'problematique', label: 'Problématique' },
  { id: 'solution', label: 'Solution' },
  { id: 'demo', label: 'Démonstration' },
  { id: 'impact', label: 'Impact' },
  { id: 'opensource', label: 'Open Source' },
  { id: 'team', label: 'Équipe' },
] as const;

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Fermer le menu mobile lors du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Amélioration de la fonction de défilement
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculer la position de défilement en tenant compte de la hauteur de la barre de navigation
      const navHeight = 64; // Hauteur de la barre de navigation (h-16 = 64px)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      // Défilement fluide vers la section
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Mettre à jour la section active
      setActiveSection(id);
      
      // Fermer le menu mobile
      setIsOpen(false);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-anthracite/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0 text-neon-green font-space font-bold"
          >
            SmartTraffic
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {sections.map((section) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleLinkClick(e, section.id)}
                  className={`px-3 py-2 rounded-md text-sm font-space transition-colors ${
                    activeSection === section.id 
                      ? 'text-neon-green' 
                      : 'text-gray-300 hover:text-neon-green'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              whileTap={{ scale: 0.95 }}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-anthracite/95 backdrop-blur-sm border-t border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {sections.map((section) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleLinkClick(e, section.id)}
                  className={`block px-3 py-2 rounded-md text-base font-space ${
                    activeSection === section.id 
                      ? 'text-neon-green bg-gray-800/50' 
                      : 'text-gray-300 hover:text-neon-green hover:bg-gray-800/30'
                  }`}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {section.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};