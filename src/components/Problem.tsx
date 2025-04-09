import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export const Problem: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
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

  const statVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="problematique" className="py-24 bg-gradient-to-b from-anthracite to-[#121212] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-neon-green rounded-full"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3,
                filter: 'blur(60px)',
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
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
            La Problématique
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Comment optimiser la circulation routière dans un contexte urbain de plus en plus congestionné ?
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            variants={statVariants}
            initial="hidden"
            animate={controls}
            className="bg-[#1E1E1E] rounded-xl p-8 transform hover:scale-105 transition-transform duration-300 border border-gray-800"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6 mx-auto">
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-space font-bold text-white text-center mb-4">8,8 milliards €</h3>
            <p className="text-gray-400 text-center">Coût annuel des embouteillages en France en perte de temps et de carburant</p>
          </motion.div>

          <motion.div 
            variants={statVariants}
            initial="hidden"
            animate={controls}
            className="bg-[#1E1E1E] rounded-xl p-8 transform hover:scale-105 transition-transform duration-300 border border-gray-800"
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mb-6 mx-auto">
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-space font-bold text-white text-center mb-4">25%</h3>
            <p className="text-gray-400 text-center">Des émissions de gaz à effet de serre dans les grandes villes sont dues aux embouteillages</p>
          </motion.div>

          <motion.div 
            variants={statVariants}
            initial="hidden"
            animate={controls}
            className="bg-[#1E1E1E] rounded-xl p-8 transform hover:scale-105 transition-transform duration-300 border border-gray-800"
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6 mx-auto">
              <AlertTriangle className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-space font-bold text-white text-center mb-4">1% du PIB</h3>
            <p className="text-gray-400 text-center">Le coût des embouteillages représente environ 1% du PIB de l'Union Européenne</p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="bg-[#1E1E1E]/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-space font-bold text-white mb-6"
          >
            Le problème des feux de circulation traditionnels
          </motion.h3>
          
          <motion.div variants={itemVariants} className="space-y-4 text-gray-300">
            <p>
              Les feux de signalisation traditionnels sont programmés de manière fixe, sans tenir compte des variations du trafic en temps réel. 
              Cette approche rigide entraîne des conséquences négatives multiples :
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Temps d'attente inutiles aux intersections peu fréquentées</li>
              <li>Incapacité à s'adapter aux pics de trafic imprévus</li>
              <li>Augmentation des émissions de CO₂ due aux arrêts et redémarrages fréquents</li>
              <li>Stress accru pour les conducteurs et détérioration de la qualité de vie urbaine</li>
              <li>Inefficacité énergétique et gaspillage de ressources</li>
            </ul>
            
            <p className="mt-4">
              Dans un contexte où les flux de circulation deviennent de plus en plus complexes et imprévisibles, 
              cette logique fixe ou semi-adaptative ne parvient plus à répondre aux dynamiques non linéaires de la circulation moderne.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
