import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from './Features';
import About from '../components/About';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Features />
      <About />
    </div>
  );
};

export default Home;