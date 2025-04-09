import React, { useState } from 'react';
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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
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
            SmartTraffic
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {sections.map((section) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleScroll(e, section.id)}
                  className="text-gray-300 hover:text-neon-green px-3 py-2 rounded-md text-sm font-space"
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
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {sections.map((section) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleScroll(e, section.id)}
                  className="text-gray-300 hover:text-neon-green block px-3 py-2 rounded-md text-base font-space"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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