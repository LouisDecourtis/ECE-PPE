import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Composant pour la démonstration interactive
const TrafficSimulation = () => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800 max-w-[1400px] mx-auto">
      <div className="h-[700px]">
        <iframe 
          src="https://controleur-intelligent-traffic.lovable.app/" 
          title="Simulation de trafic intelligent" 
          className="w-full h-full border-0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export const Demo: React.FC = () => {
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

  return (
    <section id="demo" className="py-24 bg-[#121212] relative overflow-hidden">
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
            Démonstration
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Visualisez notre algorithme en action et explorez son fonctionnement en temps réel
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <TrafficSimulation />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants} className="bg-[#1E1E1E]/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-2xl font-space font-bold text-white mb-4">Comment ça marche</h3>
            <p className="text-gray-300 mb-4">
              Cette simulation montre comment notre algorithme basé sur la théorie des jeux optimise 
              le flux de circulation à un carrefour. Vous pouvez ajuster la densité du trafic pour 
              voir comment le système s'adapte à différentes conditions.
            </p>
            <p className="text-gray-300">
              Observez comment les feux s'adaptent automatiquement en fonction de la densité du trafic, 
              accordant plus de temps aux voies les plus chargées. Le système vise à minimiser le temps 
              d'attente global tout en maximisant le nombre de véhicules qui traversent l'intersection.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#1E1E1E]/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-2xl font-space font-bold text-white mb-4">Résultats attendus</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-neon-green mr-2">✓</span>
                <span>Réduction des temps d'attente jusqu'à 30% aux intersections équipées</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-green mr-2">✓</span>
                <span>Diminution des embouteillages de 20% sur les axes principaux</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-green mr-2">✓</span>
                <span>Baisse des émissions de CO₂ grâce à la réduction des arrêts/redémarrages inutiles</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-green mr-2">✓</span>
                <span>Amélioration de la fluidité globale du trafic urbain</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-green mr-2">✓</span>
                <span>Adaptabilité aux événements imprévus (accidents, travaux, manifestations)</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
