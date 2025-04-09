import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

interface ParticleProps {
  position: [number, number, number];
  color: string;
  speed: number;
}

// Particule animée
const Particle: React.FC<ParticleProps> = ({ position, color, speed }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 0.5 + position[1];
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
};

interface TrafficLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

// Ligne de circulation
const TrafficLine: React.FC<TrafficLineProps> = ({ start, end, color }) => {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  // Utiliser une ligne statique sans animation pour éviter tout clignotement
  return (
    <line>
      <bufferGeometry>
        <float32BufferAttribute 
          attach="attributes-position" 
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          count={points.length}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} opacity={0.5} transparent />
    </line>
  );
};

// Grille animée - Remplacer par une grille statique pour éviter le clignotement
const AnimatedGrid: React.FC = () => {
  return (
    <group>
      <gridHelper args={[30, 30, "#60A5FA", "#1a1a1a"]} position={[0, -0.5, 0]} />
    </group>
  );
};

// Simulation de trafic améliorée
const TrafficSimulation: React.FC = () => {
  // Générer des particules aléatoires
  const particles = useMemo(() => {
    const items: ParticleProps[] = [];
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 5 + 2;
      const z = (Math.random() - 0.5) * 20;
      const color = ["#60A5FA", "#F472B6", "#FBBF24"][Math.floor(Math.random() * 3)]; // Retirer la couleur verte
      const speed = 0.5 + Math.random() * 1;
      items.push({ position: [x, y, z], color, speed });
    }
    return items;
  }, []);

  // Lignes de circulation avec des hauteurs différentes pour éviter la superposition
  const trafficLines: TrafficLineProps[] = [
    { start: [-10, 0.1, 0], end: [10, 0.1, 0], color: "#F472B6" }, // Rose
    { start: [0, 0.2, -10], end: [0, 0.2, 10], color: "#FBBF24" }, // Jaune
    { start: [-8, 0.3, -8], end: [8, 0.3, 8], color: "#60A5FA" },  // Bleu
    { start: [8, 0.4, -8], end: [-8, 0.4, 8], color: "#60A5FA" }   // Bleu
  ];

  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
      <fog attach="fog" args={["#1a1a1a", 5, 30]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" />
      <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
      
      {/* Fond */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Grille statique */}
      <AnimatedGrid />
      
      {/* Particules flottantes */}
      {particles.map((particle, i) => (
        <Particle key={i} {...particle} />
      ))}
      
      {/* Lignes de circulation */}
      {trafficLines.map((line, i) => (
        <TrafficLine key={i} {...line} />
      ))}
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  );
};

export const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );
    }
  }, []);

  return (
    <section id="hero" className="h-screen relative overflow-hidden bg-anthracite">
      <div className="absolute inset-0">
        <TrafficSimulation />
      </div>
      
      {/* Overlay gradient pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-transparent to-transparent opacity-80"></div>
      
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-space font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Et si les feux devenaient
            <span className="text-neon-green block mt-2">intelligents ?</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#solution"
              className="inline-block bg-neon-green text-anthracite font-space font-medium px-8 py-4 rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105"
            >
              Découvrir l'algorithme
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};