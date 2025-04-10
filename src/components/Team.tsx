import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

// Type pour un membre de l'équipe
interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  image: string;
  social: {
    linkedin: string;
    github: string;
    email: string;
  };
}

// Données des membres de l'équipe
const teamMembers: TeamMember[] = [
  {
    name: "Victor DENIS",
    role: "Chef de Projet",
    expertise: "Intelligence Artificielle",
    image: "/images/remi.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "victor.denis@example.com"
    }
  },
  {
    name: "Nicolas LAINE",
    role: "Développeur Backend",
    expertise: "Algorithmes & Optimisation",
    image: "/images/nicolas.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "nicolas.laine@example.com"
    }
  },
  {
    name: "Louis DECOURTIS",
    role: "Développeur Frontend",
    expertise: "UX/UI & Visualisation",
    image: "/images/louis.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "louis.decourtis@example.com"
    }
  },
  {
    name: "Vincent BARE",
    role: "Data Scientist",
    expertise: "Modélisation & Simulation",
    image: "/images/vincent.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "vincent.bare@example.com"
    }
  },
  {
    name: "Mael DEPREVILLE",
    role: "Ingénieur Système",
    expertise: "IoT & Capteurs",
    image: "/images/mael.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "mael.depreville@example.com"
    }
  },
  {
    name: "Pierre-Olivier ROUX-SAVELLI",
    role: "Chercheur",
    expertise: "Théorie des Jeux",
    image: "/images/pierroolivier.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "pierre-olivier.roux-savelli@example.com"
    }
  },
  {
    name: "Rémi LAMOULEN",
    role: "Ingénieur Qualité",
    expertise: "Tests & Documentation",
    image: "/images/remi.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "remi.lamoulen@example.com"
    }
  }
];

// Composant pour la carte d'un membre de l'équipe
interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-300"
    >
      <div className="relative">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] to-transparent"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-space font-bold text-white mb-1">{member.name}</h3>
        <p className="text-neon-green font-medium mb-2">{member.role}</p>
        <p className="text-gray-400 text-sm mb-4">{member.expertise}</p>
        
        <div className="flex space-x-3">
          <a href={member.social.linkedin} className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={member.social.github} className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Team: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
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
        staggerChildren: 0.1,
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
    <section id="team" className="py-24 bg-[#121212] relative overflow-hidden">
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
            Notre Équipe
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Une équipe pluridisciplinaire passionnée par l'innovation et l'optimisation
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-20 bg-gradient-to-r from-[#1E1E1E]/80 to-[#252525]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-space font-bold text-white mb-6 text-center"
          >
            Nos Compétences Complémentaires
          </motion.h3>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
              <h4 className="text-neon-green font-space font-bold mb-3">Intelligence Artificielle</h4>
              <p className="text-sm text-gray-400">
                Notre expertise en IA nous permet de développer des algorithmes d'apprentissage par renforcement 
                et des systèmes multi-agents capables d'optimiser les flux de circulation en temps réel.
              </p>
            </div>
            
            <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
              <h4 className="text-neon-green font-space font-bold mb-3">Théorie des Jeux</h4>
              <p className="text-sm text-gray-400">
                Nous appliquons les principes de la théorie des jeux coopératifs pour modéliser les interactions 
                entre les différents feux de circulation et trouver des équilibres optimaux.
              </p>
            </div>
            
            <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
              <h4 className="text-neon-green font-space font-bold mb-3">Développement Logiciel</h4>
              <p className="text-sm text-gray-400">
                Notre équipe maîtrise les technologies modernes de développement pour créer des solutions 
                robustes, évolutives et faciles à maintenir, avec une approche open source.
              </p>
            </div>
            
            <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
              <h4 className="text-neon-green font-space font-bold mb-3">IoT & Capteurs</h4>
              <p className="text-sm text-gray-400">
                Nous concevons des systèmes de capteurs intelligents pour collecter des données de trafic 
                en temps réel, essentielles au fonctionnement optimal de notre algorithme.
              </p>
            </div>
            
            <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
              <h4 className="text-neon-green font-space font-bold mb-3">Modélisation & Simulation</h4>
              <p className="text-sm text-gray-400">
                Nous utilisons des techniques avancées de modélisation pour simuler et tester notre solution 
                dans différents scénarios de trafic avant son déploiement réel.
              </p>
            </div>
            
            <div className="bg-[#1A1A1A]/80 p-5 rounded-lg border border-gray-800">
              <h4 className="text-neon-green font-space font-bold mb-3">UX/UI & Visualisation</h4>
              <p className="text-sm text-gray-400">
                Nous créons des interfaces utilisateur intuitives et des visualisations de données claires 
                pour permettre aux gestionnaires de trafic de comprendre et d'interagir avec notre système.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
