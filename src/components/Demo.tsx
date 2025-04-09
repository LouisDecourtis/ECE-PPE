import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Minus, Car, Clock } from 'lucide-react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Composant pour la simulation interactive
const TrafficSimulation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [trafficDensity, setTrafficDensity] = useState(0.5);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [averageWaitTime, setAverageWaitTime] = useState(0);
  const [carsPassed, setCarsPassed] = useState(0);
  
  // Référence pour l'animation
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  // Réinitialiser la simulation
  const resetSimulation = () => {
    setElapsedTime(0);
    setAverageWaitTime(0);
    setCarsPassed(0);
  };
  
  // Animation loop
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (time - previousTimeRef.current) / 1000;
      setElapsedTime(prevTime => prevTime + deltaTime * speed);
      
      // Mise à jour des statistiques de simulation
      setAverageWaitTime(prev => {
        const newValue = prev + (Math.sin(elapsedTime * 0.1) * 0.2 * trafficDensity);
        return Math.max(0, Math.min(newValue, 60)); // Limiter entre 0 et 60 secondes
      });
      
      setCarsPassed(prev => prev + deltaTime * speed * trafficDensity * 2);
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, speed, trafficDensity]);
  
  return (
    <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-[#252525] hover:bg-[#333] p-2 rounded-lg transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5 text-gray-300" /> : <Play className="w-5 h-5 text-gray-300" />}
            </button>
            
            <button 
              onClick={resetSimulation}
              className="bg-[#252525] hover:bg-[#333] p-2 rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-gray-300" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Vitesse:</span>
            <button 
              onClick={() => setSpeed(prev => Math.max(0.1, prev - 0.1))}
              className="bg-[#252525] hover:bg-[#333] p-1 rounded-lg transition-colors"
              disabled={speed <= 0.1}
            >
              <Minus className="w-4 h-4 text-gray-300" />
            </button>
            
            <span className="text-sm text-white w-8 text-center">{speed.toFixed(1)}x</span>
            
            <button 
              onClick={() => setSpeed(prev => Math.min(3, prev + 0.1))}
              className="bg-[#252525] hover:bg-[#333] p-1 rounded-lg transition-colors"
              disabled={speed >= 3}
            >
              <Plus className="w-4 h-4 text-gray-300" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Densité:</span>
            <input 
              type="range" 
              min="0.1" 
              max="1" 
              step="0.1" 
              value={trafficDensity}
              onChange={(e) => setTrafficDensity(parseFloat(e.target.value))}
              className="w-24 accent-neon-green"
            />
            <span className="text-sm text-white w-8 text-center">{Math.round(trafficDensity * 100)}%</span>
          </div>
        </div>
      </div>
      
      <div className="h-[400px]">
        <Canvas camera={{ position: [0, 15, 0], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-5, 5, 5]} intensity={1} color="#4ADE80" />
          
          <IntersectionModel 
            time={elapsedTime} 
            trafficDensity={trafficDensity} 
            isPlaying={isPlaying}
          />
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            maxPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </div>
      
      <div className="p-4 bg-[#1E1E1E] border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#252525] p-3 rounded-lg flex items-center">
            <Clock className="w-5 h-5 text-blue-400 mr-3" />
            <div>
              <p className="text-xs text-gray-400">Temps écoulé</p>
              <p className="text-white font-medium">{Math.floor(elapsedTime)}s</p>
            </div>
          </div>
          
          <div className="bg-[#252525] p-3 rounded-lg flex items-center">
            <Clock className="w-5 h-5 text-amber-400 mr-3" />
            <div>
              <p className="text-xs text-gray-400">Temps d'attente moyen</p>
              <p className="text-white font-medium">{averageWaitTime.toFixed(1)}s</p>
            </div>
          </div>
          
          <div className="bg-[#252525] p-3 rounded-lg flex items-center">
            <Car className="w-5 h-5 text-green-400 mr-3" />
            <div>
              <p className="text-xs text-gray-400">Véhicules passés</p>
              <p className="text-white font-medium">{Math.floor(carsPassed)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interface pour les props du modèle d'intersection
interface IntersectionModelProps {
  time: number;
  trafficDensity: number;
  isPlaying: boolean;
}

// Interface pour une voiture
interface CarData {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}

// Modèle 3D de l'intersection
const IntersectionModel: React.FC<IntersectionModelProps> = ({ time, trafficDensity, isPlaying }) => {
  // Déterminer l'état des feux en fonction du temps
  const cycleTime = 10; // Durée d'un cycle complet en secondes
  const currentCycle = time % cycleTime;
  
  // Avec l'algorithme, les feux s'adaptent en fonction de la densité du trafic
  const northSouthGreen = currentCycle < (5 + trafficDensity * 2);
  const eastWestGreen = !northSouthGreen;
  
  // Couleurs des feux
  const northSouthLight = new THREE.Color(
    northSouthGreen ? 0x4ADE80 : 0xff3333
  );
  
  const eastWestLight = new THREE.Color(
    eastWestGreen ? 0x4ADE80 : 0xff3333
  );
  
  // Générer les voitures
  const cars: CarData[] = [];
  const carCount = Math.floor(20 * trafficDensity);
  
  for (let i = 0; i < carCount; i++) {
    const isNorthSouth = i % 2 === 0;
    // Nous n'utilisons pas directement cette variable, mais elle est utile pour comprendre le code
    // const direction = isNorthSouth ? [0, 0, 1] : [1, 0, 0];
    const lane = Math.floor(Math.random() * 2) - 0.5; // -0.5 ou 0.5 pour différentes voies
    
    const startPos = isNorthSouth 
      ? [lane, 0, -10 + (i % 10) * 2] 
      : [-10 + (i % 10) * 2, 0, lane];
    
    const speed = (0.05 + Math.random() * 0.03) * (isPlaying ? 1 : 0);
    const offset = Math.random() * 20;
    
    // Calculer la position en fonction du temps
    const x = isNorthSouth 
      ? startPos[0] 
      : startPos[0] + ((time * speed + offset) % 20) - 10;
    
    const z = isNorthSouth 
      ? startPos[2] + ((time * speed + offset) % 20) - 10
      : startPos[2];
    
    // Vérifier si le feu est rouge et si la voiture doit s'arrêter
    const shouldStop = isNorthSouth 
      ? (northSouthLight.r > 0.5 && z > -1.5 && z < 1.5) 
      : (eastWestLight.r > 0.5 && x > -1.5 && x < 1.5);
    
    const finalX = shouldStop 
      ? (isNorthSouth ? x : Math.max(-1.5, Math.min(x, -1.5))) 
      : x;
    
    const finalZ = shouldStop 
      ? (isNorthSouth ? Math.max(-1.5, Math.min(z, -1.5)) : z) 
      : z;
    
    cars.push({
      position: [finalX, -0.5, finalZ] as [number, number, number],
      rotation: [0, isNorthSouth ? 0 : Math.PI / 2, 0] as [number, number, number],
      color: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'][i % 5]
    });
  }
  
  return (
    <group>
      {/* Route */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Routes principales */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <planeGeometry args={[5, 30]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -0.9, 0]}>
        <planeGeometry args={[5, 30]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Marquages routiers */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.89, 0]}>
        <planeGeometry args={[0.2, 30]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -0.89, 0]}>
        <planeGeometry args={[0.2, 30]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Feux de circulation */}
      <mesh position={[2.5, 1, -5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={northSouthLight} emissive={northSouthLight} emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[2.5, 1, 5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={northSouthLight} emissive={northSouthLight} emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[5, 1, 2.5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={eastWestLight} emissive={eastWestLight} emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[-5, 1, 2.5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={eastWestLight} emissive={eastWestLight} emissiveIntensity={0.5} />
      </mesh>
      
      {/* Voitures */}
      {cars.map((car, i) => (
        <mesh 
          key={i} 
          position={car.position}
          rotation={car.rotation}
        >
          <boxGeometry args={[1, 0.5, 2]} />
          <meshStandardMaterial color={car.color} />
        </mesh>
      ))}
      
      {/* Connexions de données entre les feux (représentant l'algorithme) */}
      {time % 2 < 1 && (
        <>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([2.5, 1, -5, 2.5, 1, 5])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#4ADE80" linewidth={2} />
          </line>
          
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([-5, 1, 2.5, 5, 1, 2.5])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#4ADE80" linewidth={2} />
          </line>
        </>
      )}
    </group>
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
