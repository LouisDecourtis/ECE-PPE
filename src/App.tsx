import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { Demo } from './components/Demo';
import { Impact } from './components/Impact';
import { OpenSource } from './components/OpenSource';
import { Team } from './components/Team';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-anthracite">
      <Navigation />
      <Hero />
      <Problem />
      <Solution />
      <Demo />
      <Impact />
      <OpenSource />
      <Team />
      <Footer />
    </div>
  );
};

export default App;