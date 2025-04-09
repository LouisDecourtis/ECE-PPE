import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Github, Code, Users, GitFork, GitMerge, GitPullRequest } from 'lucide-react';

export const OpenSource: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Animation pour les connexions dans le graphique de contribution
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  return (
    <section id="opensource" className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#121212] relative overflow-hidden">
      {/* Animated background code pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="code-background w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-space font-bold text-white mb-6"
          >
            Open Source
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Une valorisation en innovation ouverte pour un impact maximal
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="bg-[#1E1E1E]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mr-4">
                  <Code className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-space font-bold text-white">Un moteur générique à fort potentiel</h3>
              </div>
              <p className="text-gray-300">
                Notre moteur d'optimisation multi-agent est capable de résoudre des conflits d'accès à une ressource 
                partagée, sous contrainte dynamique. Il ne se limite pas à la régulation du trafic routier et peut être 
                transposé à de nombreux domaines : gestion industrielle, systèmes logistiques, transport ferroviaire, 
                mobilité douce ou systèmes informatiques distribués.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#1E1E1E]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mr-4">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-space font-bold text-white">Une communauté collaborative</h3>
              </div>
              <p className="text-gray-300">
                Notre choix d'une valorisation open source n'est pas un simple choix technique, mais un positionnement profond. 
                La plasticité de notre solution ne peut s'épanouir pleinement que dans un environnement où les contributeurs 
                sont multiples, les contextes d'application variés, et la logique de développement collaborative.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#1E1E1E]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-full mr-4">
                  <Github className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-space font-bold text-white">Licences et distribution</h3>
              </div>
              <p className="text-gray-300">
                Nous envisageons une distribution ouverte sous licence MIT pour le code source, et Creative Commons BY-SA 
                pour la documentation, les jeux de données de simulation, et les interfaces. Le projet sera documenté sur 
                GitHub avec un système d'issues, de pull requests et de revue de code, favorisant ainsi la transparence, 
                l'interopérabilité et la confiance.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-[#1E1E1E]/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 shadow-xl"
          >
            <h3 className="text-xl font-space font-bold text-white mb-6 flex items-center">
              <GitFork className="w-5 h-5 text-neon-green mr-2" />
              Écosystème de contribution
            </h3>
            
            <div className="relative h-80 w-full">
              {/* Représentation visuelle de l'écosystème open source */}
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Lignes de connexion */}
                <motion.path
                  d="M200,50 C240,80 260,120 240,160"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M200,50 C160,80 140,120 160,160"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M240,160 C250,200 230,240 200,250"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M160,160 C150,200 170,240 200,250"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M200,50 C220,100 240,150 280,140"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M200,50 C180,100 160,150 120,140"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M280,140 C300,180 280,220 240,230"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M120,140 C100,180 120,220 160,230"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M240,230 C220,250 180,250 160,230"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />

                {/* Nœuds */}
                <circle cx="200" cy="50" r="20" fill="#1E1E1E" stroke="#4ADE80" strokeWidth="2" />
                <text x="200" y="55" textAnchor="middle" fill="white" fontSize="12">Core</text>
                
                <circle cx="160" cy="160" r="15" fill="#1E1E1E" stroke="#3498db" strokeWidth="2" />
                <text x="160" y="165" textAnchor="middle" fill="white" fontSize="10">API</text>
                
                <circle cx="240" cy="160" r="15" fill="#1E1E1E" stroke="#e74c3c" strokeWidth="2" />
                <text x="240" y="165" textAnchor="middle" fill="white" fontSize="10">UI</text>
                
                <circle cx="120" cy="140" r="15" fill="#1E1E1E" stroke="#f39c12" strokeWidth="2" />
                <text x="120" y="145" textAnchor="middle" fill="white" fontSize="10">Data</text>
                
                <circle cx="280" cy="140" r="15" fill="#1E1E1E" stroke="#9b59b6" strokeWidth="2" />
                <text x="280" y="145" textAnchor="middle" fill="white" fontSize="10">Docs</text>
                
                <circle cx="160" cy="230" r="15" fill="#1E1E1E" stroke="#2ecc71" strokeWidth="2" />
                <text x="160" y="235" textAnchor="middle" fill="white" fontSize="10">Tests</text>
                
                <circle cx="240" cy="230" r="15" fill="#1E1E1E" stroke="#1abc9c" strokeWidth="2" />
                <text x="240" y="235" textAnchor="middle" fill="white" fontSize="10">Tools</text>
                
                <circle cx="200" cy="250" r="15" fill="#1E1E1E" stroke="#e67e22" strokeWidth="2" />
                <text x="200" y="255" textAnchor="middle" fill="white" fontSize="10">CI/CD</text>
              </svg>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-lg font-space font-bold text-white mb-3">Avantages de l'open source</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <GitPullRequest className="w-4 h-4 text-neon-green mr-2 mt-1 flex-shrink-0" />
                  <span>Transparence et auditabilité du code pour les municipalités</span>
                </li>
                <li className="flex items-start">
                  <GitMerge className="w-4 h-4 text-neon-green mr-2 mt-1 flex-shrink-0" />
                  <span>Adaptabilité aux contextes locaux et spécifiques</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-4 h-4 text-neon-green mr-2 mt-1 flex-shrink-0" />
                  <span>Communauté de développeurs et chercheurs pour enrichir le projet</span>
                </li>
                <li className="flex items-start">
                  <GitFork className="w-4 h-4 text-neon-green mr-2 mt-1 flex-shrink-0" />
                  <span>Possibilité de réutilisation dans d'autres domaines d'application</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="bg-gradient-to-r from-[#1E1E1E]/80 to-[#252525]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-space font-bold text-white mb-6"
          >
            Un positionnement unique
          </motion.h3>
          
          <motion.div variants={itemVariants} className="space-y-6 text-gray-300">
            <p>
              Le marché des solutions de gestion du trafic est aujourd'hui dominé par des approches traditionnelles 
              ou semi-propriétaires. Les grands acteurs comme Yunex Traffic, Orange Traffic, ou Transdev proposent 
              des systèmes souvent puissants, mais verrouillés, coûteux, et très dépendants de leur propre infrastructure.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
                <h4 className="text-neon-green font-space font-bold mb-3">Notre différenciation</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">✓</span>
                    <span>Solution légère, logiciel-first, pouvant être embarquée dans une armoire existante</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">✓</span>
                    <span>Système ouvert, adaptable, auditable et potentiellement co-développé</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">✓</span>
                    <span>Prise de décision contextuelle basée sur les données réelles du terrain</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">✓</span>
                    <span>Solution multi-usage permettant une mutualisation des développements</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
                <h4 className="text-neon-green font-space font-bold mb-3">Gouvernance future</h4>
                <p className="text-sm text-gray-400">
                  Après le projet, une gouvernance communautaire pourra être envisagée, par exemple via un collectif 
                  de développeurs et chercheurs engagés. L'objectif serait de pérenniser le projet comme une brique 
                  open source reconnue de l'écosystème smart city, avec des démonstrateurs (simulation en Python, 
                  modèles Arduino) fournis pour favoriser la prise en main.
                </p>
              </div>
            </div>
            
            <p className="mt-4 text-center font-space font-medium text-lg">
              Notre produit n'est pas un objet figé. C'est une base active, évolutive, et collective. 
              C'est cette vision qui fait sa force.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
