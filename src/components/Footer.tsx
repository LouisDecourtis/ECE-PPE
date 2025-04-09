import React from 'react';
import { Github, Mail, Linkedin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0A0A0A] border-t border-gray-800 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-green-900/5 via-transparent to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-space font-bold text-white mb-4">Traffic Optimizer</h3>
            <p className="text-gray-400 mb-6">
              Optimisation des feux de circulation par théorie des jeux et intelligence artificielle.
              Une solution open source pour des villes plus intelligentes et durables.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1E1E1E] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1E1E1E] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@traffic-optimizer.org" 
                className="w-10 h-10 rounded-full bg-[#1E1E1E] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-space font-bold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#problem" className="text-gray-400 hover:text-neon-green transition-colors">Le Problème</a>
              </li>
              <li>
                <a href="#solution" className="text-gray-400 hover:text-neon-green transition-colors">Notre Solution</a>
              </li>
              <li>
                <a href="#demo" className="text-gray-400 hover:text-neon-green transition-colors">Démonstration</a>
              </li>
              <li>
                <a href="#impact" className="text-gray-400 hover:text-neon-green transition-colors">Impact</a>
              </li>
              <li>
                <a href="#opensource" className="text-gray-400 hover:text-neon-green transition-colors">Open Source</a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-neon-green transition-colors">Notre Équipe</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-space font-bold text-white mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-neon-green transition-colors flex items-center"
                >
                  <span>Documentation</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-neon-green transition-colors flex items-center"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-neon-green transition-colors flex items-center"
                >
                  <span>Publications Scientifiques</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-neon-green transition-colors flex items-center"
                >
                  <span>Données de Simulation</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Traffic Optimizer. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Mentions Légales</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Politique de Confidentialité</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Licences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
