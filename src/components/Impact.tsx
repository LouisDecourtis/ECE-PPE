import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Leaf, DollarSign, Clock, BarChart3 } from 'lucide-react';
import gsap from 'gsap';

export const Impact: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (chartRef.current) {
      // Animation des barres du graphique
      gsap.fromTo(
        '.chart-bar',
        { scaleY: 0, transformOrigin: 'bottom' },
        { 
          scaleY: 1, 
          stagger: 0.1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

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
    <section id="impact" className="py-24 bg-[#121212] relative overflow-hidden">
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
            Impact
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Des bénéfices concrets pour les villes, les citoyens et l'environnement
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="bg-[#1E1E1E]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mr-4">
                  <Leaf className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-space font-bold text-white">Impact environnemental</h3>
              </div>
              <p className="text-gray-300">
                Notre solution permet de réduire significativement les émissions de CO₂ en diminuant les arrêts et 
                redémarrages inutiles. Les embouteillages représentent environ 25% des émissions de gaz à effet de 
                serre dans les grandes villes. En optimisant les flux de circulation, nous contribuons directement 
                à la réduction de la pollution atmosphérique et sonore.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#1E1E1E]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-full mr-4">
                  <DollarSign className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-space font-bold text-white">Impact économique</h3>
              </div>
              <p className="text-gray-300">
                Les embouteillages coûtent environ 8,8 milliards d'euros par an en France en termes de perte de temps 
                et de carburant. Au niveau européen, ce coût s'élève à plus de 100 milliards d'euros, soit environ 1% 
                du PIB de l'UE. Notre solution permet de réduire ces coûts tout en améliorant la productivité des 
                citoyens et en diminuant le stress lié aux déplacements.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#1E1E1E]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mr-4">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-space font-bold text-white">Qualité de vie</h3>
              </div>
              <p className="text-gray-300">
                En réduisant les temps d'attente aux intersections jusqu'à 30% et en fluidifiant le trafic, notre 
                solution améliore considérablement la qualité de vie des citadins. Moins de temps passé dans les 
                embouteillages signifie plus de temps pour la famille, les loisirs et le travail. La réduction du 
                stress lié aux déplacements a également un impact positif sur la santé mentale.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            ref={chartRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-[#1E1E1E]/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 shadow-xl"
          >
            <h3 className="text-xl font-space font-bold text-white mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 text-neon-green mr-2" />
              Réduction des temps d'attente
            </h3>
            
            <div className="h-64 flex items-end justify-around space-x-2">
              {[
                { label: 'Actuel', value: 100, color: '#e74c3c' },
                { label: 'Notre solution', value: 70, color: '#4ADE80' },
                { label: 'Objectif 2026', value: 60, color: '#3498db' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-16 mb-2">
                    <div 
                      className="chart-bar absolute bottom-0 w-full rounded-t-md"
                      style={{ 
                        height: `${item.value * 2}px`, 
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}80`
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white font-bold">
                        {item.value}%
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 mt-2">{item.label}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-lg font-space font-bold text-white mb-3">Résultats des tests pilotes</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Réduction du temps d'attente</span>
                    <span className="text-sm text-neon-green">30%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-neon-green h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Diminution des embouteillages</span>
                    <span className="text-sm text-neon-green">20%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-neon-green h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Réduction des émissions de CO₂</span>
                    <span className="text-sm text-neon-green">25%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-neon-green h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
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
            Cas d'usage concrets
          </motion.h3>
          
          <motion.div variants={itemVariants} className="space-y-6 text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
                <h4 className="text-neon-green font-space font-bold mb-3">Heures de pointe</h4>
                <p className="text-sm text-gray-400">
                  Pendant les heures de pointe, notre système détecte un volume élevé de véhicules sur le boulevard principal 
                  et ajuste dynamiquement la durée des feux verts pour fluidifier le trafic, réduisant ainsi le temps d'attente 
                  de 35% pour les automobilistes.
                </p>
              </div>
              
              <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
                <h4 className="text-neon-green font-space font-bold mb-3">Véhicules d'urgence</h4>
                <p className="text-sm text-gray-400">
                  Une ambulance en intervention peut transmettre sa position en temps réel. Notre système crée alors un 
                  "corridor vert" en synchronisant les feux sur son trajet, réduisant le temps d'intervention de 40% et 
                  potentiellement sauvant des vies.
                </p>
              </div>
              
              <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
                <h4 className="text-neon-green font-space font-bold mb-3">Événements spéciaux</h4>
                <p className="text-sm text-gray-400">
                  Lors d'événements spéciaux (matchs, concerts, travaux), notre algorithme s'adapte en intégrant ces données 
                  et en ajustant les cycles des feux pour gérer efficacement les pics de trafic inhabituels, fluidifiant 
                  ainsi la circulation autour des zones concernées.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
