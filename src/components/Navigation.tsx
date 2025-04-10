import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Correction des identifiants pour qu'ils correspondent exactement aux identifiants des sections
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

  // Fonction de défilement simplifiée et robuste
  const scrollToSection = (id: string) => {
    console.log(`Tentative de défilement vers: #${id}`);
    const element = document.getElementById(id);
    
    if (element) {
      console.log(`Élément trouvé: #${id}`);
      // Calculer la position de défilement
      const navHeight = 64; // Hauteur de la barre de navigation
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      // Défilement fluide vers la section
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Mettre à jour la section active et fermer le menu
      setActiveSection(id);
      setIsOpen(false);
    } else {
      console.error(`Élément non trouvé: #${id}`);
    }
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
            OptiFlow
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-2 rounded-md text-sm font-space transition-colors ${
                    activeSection === section.id 
                      ? 'text-neon-green' 
                      : 'text-gray-300 hover:text-neon-green'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Utilisation de liens HTML standards pour une compatibilité maximale */}
      {isOpen && (
        <div className="md:hidden bg-anthracite/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block px-3 py-2 rounded-md text-base font-space ${
                  activeSection === section.id 
                    ? 'text-neon-green bg-gray-800/50' 
                    : 'text-gray-300 hover:text-neon-green hover:bg-gray-800/30'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};