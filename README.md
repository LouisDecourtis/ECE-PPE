# SmartTraffic - Optimisation Intelligente des Feux de Circulation

![SmartTraffic](https://img.shields.io/badge/SmartTraffic-Optimisation%20du%20Trafic-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.161.0-blueviolet)

## 📋 Présentation du Projet

SmartTraffic est une solution innovante d'optimisation du trafic urbain qui utilise l'intelligence artificielle pour rendre les feux de circulation plus intelligents. Notre système analyse en temps réel les flux de circulation et adapte dynamiquement les feux pour réduire les embouteillages, diminuer les temps d'attente et améliorer l'efficacité globale du réseau routier.

## 🚦 Fonctionnalités Principales

- **Analyse en temps réel** des flux de circulation
- **Optimisation dynamique** des cycles de feux
- **Réduction des embouteillages** et des temps d'attente
- **Diminution de l'empreinte carbone** liée au trafic urbain
- **Interface visuelle interactive** pour démontrer l'efficacité du système
- **Simulation de trafic** pour comparer les approches traditionnelles et intelligentes

## 🧪 Simulation de Trafic

Notre projet inclut une simulation interactive permettant de comparer deux approches de gestion des feux de circulation :

### Fonctionnement de la Simulation

- **Contrôle par Théorie des Jeux** : Algorithme intelligent qui optimise les cycles de feux en fonction de la densité du trafic et du temps d'attente des véhicules. Ce système prend des décisions adaptatives basées sur :
  - La longueur des files d'attente à chaque intersection
  - Le temps d'attente cumulé des véhicules
  - Un facteur d'équité qui empêche certaines voies d'attendre trop longtemps
  - La synchronisation des feux appartenant au même groupe

- **Contrôle à Temps Fixe** : Système traditionnel où les feux changent selon un cycle prédéfini, indépendamment de la densité du trafic.

### Métriques de Performance

La simulation calcule et affiche en temps réel :
- Le temps d'attente total cumulé pour chaque système
- La longueur moyenne des files d'attente
- Des graphiques comparatifs montrant l'évolution des performances

### Configuration

L'utilisateur peut ajuster plusieurs paramètres :
- La vitesse de la simulation
- Le taux d'arrivée des véhicules
- Les groupes de synchronisation des feux
- Les conflits entre différentes voies

Cette simulation démontre concrètement les avantages de notre approche par théorie des jeux par rapport aux systèmes traditionnels à temps fixe.

## 🛠️ Technologies Utilisées

- **Frontend**: React, TypeScript, Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D et Visualisations**: Three.js, React Three Fiber
- **Déploiement**: Netlify

## 🚀 Installation et Démarrage

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/LouisDecourtis/ECE-PPE.git
cd ECE-PPE

# Installer les dépendances
npm install
# ou
yarn install
```

### Démarrage en mode développement

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173).

### Construction pour la production

```bash
npm run build
# ou
yarn build
```

## 📱 Compatibilité

L'application est entièrement responsive et compatible avec :
- Ordinateurs de bureau
- Tablettes
- Smartphones

## 👥 Équipe

Notre équipe est composée d'étudiants passionnés de l'ECE Paris, spécialisés dans différents domaines de l'ingénierie et du développement :

- **Victor DENIS** - Chef de Projet, Intelligence Artificielle
- **Nicolas LAINE** - Développeur Backend, Algorithmes & Optimisation
- **Louis DECOURTIS** - Développeur Frontend, UX/UI & Visualisation
- **Vincent BARE** - Data Scientist, Modélisation & Simulation
- **Mael DEPREVILLE** - Ingénieur Système, IoT & Capteurs
- **Pierre-Olivier ROUX-SAVELLI** - Chercheur, Théorie des Jeux
- **Rémi LAMOULEN** - Ingénieur Qualité, Tests & Documentation

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

## 🔗 Liens Utiles

- [Démo en ligne](https://ece-ppe.netlify.app)
- [Documentation technique](docs/technical.md)
- [Rapport de recherche](docs/research.md)

---

© 2025 SmartTraffic | Projet ECE PPE
