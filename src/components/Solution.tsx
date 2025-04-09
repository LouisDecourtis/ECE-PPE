import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Brain, Network, GitBranch, Zap } from 'lucide-react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Composant pour la visualisation 3D de l'algorithme
const AlgorithmVisualization = () => {
  return (
    <div className="h-[400px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 10, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={1} color="#4ADE80" />
        
        <TrafficIntersection />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
};

// Type pour les positions des voitures
type Position = {
  x: number;
  z: number;
};

// Composant représentant un carrefour avec des feux de circulation
export const TrafficIntersection = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [lightTime, setLightTime] = useState(0);
  const [carPositions, setCarPositions] = useState<Array<Position>>([]);
  const [initialized, setInitialized] = useState(false);
  
  // Nombre fixe de voitures dans chaque direction
  const CARS_PER_DIRECTION = 3;
  const TOTAL_CARS = CARS_PER_DIRECTION * 2; // Nord-Sud et Est-Ouest
  
  // Initialiser les positions des voitures une seule fois
  useEffect(() => {
    // Positions initiales des voitures
    const initialPositions: Position[] = [];
    
    // Voitures Nord-Sud (axe Z)
    for (let i = 0; i < CARS_PER_DIRECTION; i++) {
      initialPositions.push({
        x: -0.8, // Position sur la voie de gauche
        z: -12 + (i * 6) // Espacées régulièrement
      });
    }
    
    // Voitures Est-Ouest (axe X)
    for (let i = 0; i < CARS_PER_DIRECTION; i++) {
      initialPositions.push({
        x: -12 + (i * 6), // Espacées régulièrement
        z: -0.8 // Position sur la voie de gauche
      });
    }
    
    setCarPositions(initialPositions);
    setInitialized(true);
  }, []);
  
  // Mettre à jour le temps des feux
  useEffect(() => {
    const interval = setInterval(() => {
      setLightTime(prev => (prev + 1) % 10);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Mettre à jour les positions des voitures
  useEffect(() => {
    if (!initialized) return;
    
    const moveInterval = setInterval(() => {
      setCarPositions(prev => {
        // Créer une copie pour calculer les nouvelles positions
        const newPositions = [...prev];
        
        // Calculer les nouvelles positions proposées
        for (let i = 0; i < newPositions.length; i++) {
          const pos = newPositions[i];
          const isNorthSouth = i < CARS_PER_DIRECTION; // Voitures Nord-Sud
          
          // Vérifier si le feu est rouge pour cette direction
          const northSouthLight = lightTime % 10 < 5;
          const eastWestLight = !northSouthLight;
          
          // Déterminer si le feu est rouge pour cette voiture
          const isRedLight = isNorthSouth ? !northSouthLight : !eastWestLight;
          
          // Zone d'arrêt plus éloignée pour l'intersection
          const isApproachingIntersection = isNorthSouth 
            ? (pos.z > -4 && pos.z < 0) // Voitures venant du nord s'arrêtent plus tôt
            : (pos.x > -4 && pos.x < 0); // Voitures venant de l'ouest s'arrêtent plus tôt
          
          // Si le feu est rouge et la voiture approche de l'intersection, ne pas bouger
          if (isRedLight && isApproachingIntersection) {
            continue; // Passer à la voiture suivante
          }
          
          // Calculer la nouvelle position proposée
          if (isNorthSouth) {
            let newZ = pos.z + 0.10; // Vitesse ajustée
            
            // Boucler quand la voiture sort de l'écran
            if (newZ > 12) {
              newPositions[i] = { ...pos, z: -12 };
            } else {
              newPositions[i] = { ...pos, z: newZ };
            }
          } else {
            let newX = pos.x + 0.10; // Vitesse ajustée
            
            // Boucler quand la voiture sort de l'écran
            if (newX > 12) {
              newPositions[i] = { ...pos, x: -12 };
            } else {
              newPositions[i] = { ...pos, x: newX };
            }
          }
        }
        
        // Système de collision simplifié
        // Vérifier les collisions entre voitures de même direction
        for (let i = 0; i < CARS_PER_DIRECTION; i++) {
          // Vérifier les voitures Nord-Sud
          for (let j = 0; j < CARS_PER_DIRECTION; j++) {
            if (i !== j) {
              // Si deux voitures sont trop proches, ajuster la position
              const distance = Math.abs(newPositions[i].z - newPositions[j].z);
              if (distance < 5 && distance > 0 && 
                  Math.abs(newPositions[i].x - newPositions[j].x) < 0.5) {
                // Déterminer quelle voiture est derrière
                if (newPositions[i].z > newPositions[j].z) {
                  // Maintenir une distance minimale plus grande
                  newPositions[i].z = newPositions[j].z + 5;
                }
              }
            }
          }
          
          // Vérifier les voitures Est-Ouest
          const iEW = i + CARS_PER_DIRECTION;
          for (let j = 0; j < CARS_PER_DIRECTION; j++) {
            const jEW = j + CARS_PER_DIRECTION;
            if (i !== j) {
              // Si deux voitures sont trop proches, ajuster la position
              const distance = Math.abs(newPositions[iEW].x - newPositions[jEW].x);
              if (distance < 5 && distance > 0 && 
                  Math.abs(newPositions[iEW].z - newPositions[jEW].z) < 0.5) {
                // Déterminer quelle voiture est derrière
                if (newPositions[iEW].x > newPositions[jEW].x) {
                  // Maintenir une distance minimale plus grande
                  newPositions[iEW].x = newPositions[jEW].x + 5;
                }
              }
            }
          }
        }
        
        // Vérifier les collisions à l'intersection
        for (let i = 0; i < CARS_PER_DIRECTION; i++) {
          for (let j = CARS_PER_DIRECTION; j < TOTAL_CARS; j++) {
            // Vérifier si les deux voitures sont dans l'intersection
            const nsCarInIntersection = 
              newPositions[i].z >= -1.5 && newPositions[i].z <= 1.5;
            const ewCarInIntersection = 
              newPositions[j].x >= -1.5 && newPositions[j].x <= 1.5;
            
            // Si les deux voitures sont dans l'intersection, éviter la collision
            if (nsCarInIntersection && ewCarInIntersection) {
              // Déterminer quelle voiture a le feu vert
              const northSouthLight = lightTime % 10 < 5;
              
              if (northSouthLight) {
                // Les voitures Nord-Sud ont priorité, ralentir Est-Ouest
                newPositions[j].x -= 0.05;
              } else {
                // Les voitures Est-Ouest ont priorité, ralentir Nord-Sud
                newPositions[i].z -= 0.05;
              }
            }
          }
        }
        
        return newPositions;
      });
    }, 50); // Mise à jour fréquente pour un mouvement fluide
    
    return () => clearInterval(moveInterval);
  }, [initialized, lightTime]);
  
  // Couleurs des feux qui changent
  const northSouthLight = new THREE.Color(
    lightTime % 10 < 5 ? 0x4ADE80 : 0xff3333
  );
  
  const eastWestLight = new THREE.Color(
    lightTime % 10 < 5 ? 0xff3333 : 0x4ADE80
  );

  return (
    <group ref={groupRef}>
      {/* Routes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="green" /> {/* Fond plus foncé */}
      </mesh>
      
      {/* Route Nord-Sud */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <planeGeometry args={[3, 20]} />
        <meshStandardMaterial color="#7f8c8d" /> {/* Route gris clair */}
      </mesh>
      
      {/* Route Est-Ouest */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <planeGeometry args={[20, 3]} />
        <meshStandardMaterial color="#7f8c8d" /> {/* Route gris clair */}
      </mesh>
      
      {/* Lignes centrales de la route */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.89, 0]}>
        <planeGeometry args={[0.1, 20]} />
        <meshStandardMaterial color="white" /> {/* Ligne jaune */}
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.89, 0]}>
        <planeGeometry args={[20, 0.1]} />
        <meshStandardMaterial color="white" /> {/* Ligne jaune */}
      </mesh>
      
      {/* Feux de circulation */}
      {/* Nord */}
      <mesh position={[1.8, 0, -3]}>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshStandardMaterial color="#34495e" /> {/* Poteau plus foncé */}
      </mesh>
      <mesh position={[1.8, 1, -3]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={northSouthLight} emissive={northSouthLight} emissiveIntensity={1} /> {/* Lumière plus intense */}
      </mesh>
      
      {/* Sud */}
      <mesh position={[-1.9, 0, 3]}>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshStandardMaterial color="#34495e" /> {/* Poteau plus foncé */}
      </mesh>
      <mesh position={[-1.9, 1, 3]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={northSouthLight} emissive={northSouthLight} emissiveIntensity={1} /> {/* Lumière plus intense */}
      </mesh>
      
      {/* Est */}
      <mesh position={[2.0, 0, 1.9]}>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshStandardMaterial color="#34495e" /> {/* Poteau plus foncé */}
      </mesh>
      <mesh position={[2.0, 1, 1.9]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={eastWestLight} emissive={eastWestLight} emissiveIntensity={1} /> {/* Lumière plus intense */}
      </mesh>
      
      {/* Ouest */}
      <mesh position={[-3, 0, -1.9]}>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshStandardMaterial color="#34495e" /> {/* Poteau plus foncé */}
      </mesh>
      <mesh position={[-3, 1, -1.9]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={eastWestLight} emissive={eastWestLight} emissiveIntensity={1} /> {/* Lumière plus intense */}
      </mesh>
      
      {/* Voitures en mouvement */}
      {initialized && carPositions.map((pos, i) => {
        const isNorthSouth = i < CARS_PER_DIRECTION; // Voitures Nord-Sud
        
        // Couleurs aléatoires pour les voitures
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#d35400', '#34495e'];
        
        return (
          <mesh 
            key={i} 
            position={[pos.x, -0.5, pos.z]}
            rotation={[0, isNorthSouth ? 0 : Math.PI / 2, 0]}
          >
            <boxGeometry args={[1, 0.5, 2]} />
            <meshStandardMaterial 
              color={colors[i % colors.length]} 
            />
          </mesh>
        );
      })}
    </group>
  );
};

export const Solution: React.FC = () => {
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
    <section id="solution" className="py-24 bg-[#121212] relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
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
            Notre Solution
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Un algorithme intelligent basé sur la théorie des jeux pour optimiser la circulation en temps réel
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
                  <Brain className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-space font-bold text-white">Théorie des jeux coopératifs</h3>
              </div>
              <p className="text-gray-300">
                Notre algorithme considère les feux de circulation comme des agents intelligents capables de négocier 
                entre eux le temps de passage, en fonction de l'état réel du carrefour. Cette modélisation permet 
                d'atteindre un équilibre de Nash où aucun feu n'a intérêt à changer de stratégie unilatéralement.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#1E1E1E]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mr-4">
                  <Network className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-space font-bold text-white">Système multi-agents</h3>
              </div>
              <p className="text-gray-300">
                Chaque feu évalue la situation actuelle (file d'attente, durée d'attente moyenne, fréquence d'arrivée des véhicules) 
                et propose une stratégie. L'ensemble des feux échange ensuite des informations pour converger vers une stratégie 
                commune qui maximise le bénéfice collectif.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#1E1E1E]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mr-4">
                  <GitBranch className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-space font-bold text-white">Modularité et adaptabilité</h3>
              </div>
              <p className="text-gray-300">
                Notre solution est entièrement modulaire et peut fonctionner avec différents types de capteurs : boucles électromagnétiques, 
                données GPS, capteurs Bluetooth, caméras intelligentes ou LIDAR. Cette indépendance matérielle permet à notre produit 
                de s'adapter à l'environnement dans lequel il est déployé.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-[#1E1E1E]/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 shadow-xl"
          >
            <AlgorithmVisualization />
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
            className="text-2xl font-space font-bold text-white mb-6 flex items-center"
          >
            <Zap className="w-6 h-6 text-neon-green mr-3" />
            Fonctionnement de l'algorithme
          </motion.h3>
          
          <motion.div variants={itemVariants} className="space-y-6 text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
                <h4 className="text-neon-green font-space font-bold mb-3">1. Collecte de données</h4>
                <p className="text-sm text-gray-400">
                  L'algorithme collecte des données en temps réel via des capteurs : nombre de véhicules, 
                  temps d'attente, vitesse moyenne et densité du trafic à chaque intersection.
                </p>
              </div>
              
              <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
                <h4 className="text-neon-green font-space font-bold mb-3">2. Calcul des scores</h4>
                <p className="text-sm text-gray-400">
                  Chaque direction se voit attribuer un score de priorité basé sur le nombre de véhicules, 
                  le temps d'attente moyen et la probabilité d'arrivée de nouveaux véhicules.
                </p>
              </div>
              
              <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
                <h4 className="text-neon-green font-space font-bold mb-3">3. Prise de décision</h4>
                <p className="text-sm text-gray-400">
                  L'algorithme compare les scores et détermine quelle direction doit avoir la priorité, 
                  en ajustant dynamiquement la durée des feux verts selon les besoins.
                </p>
              </div>
            </div>
            
            <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
              <h4 className="text-neon-green font-space font-bold mb-3">Exemple concret</h4>
              <p className="text-sm text-gray-400">
                Situation initiale : Nord (10 voitures, 20s d'attente), Sud (5 voitures, 10s d'attente), 
                Est (2 voitures, 5s d'attente), Ouest (3 voitures, 5s d'attente).<br/><br/>
                
                Scores calculés : Nord = 40, Sud = 20, Est = 9, Ouest = 11<br/><br/>
                
                Décision : Le feu reste vert pour l'axe Nord-Sud qui a le score le plus élevé. 
                Après 30 secondes, les scores sont recalculés et la priorité est réévaluée.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
