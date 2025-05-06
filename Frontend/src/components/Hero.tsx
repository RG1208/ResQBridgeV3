import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white text-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-100 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-20 -right-20 w-60 h-60 bg-red-50 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 -left-20 w-40 h-40 bg-red-100 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Emergency Response Made Simple
            </h1>
          </div>
          
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-gray-700">
            
          </p>
          
          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            An intelligent emergency response system that uses IoT and AI to detect road accidents 
            and send SOS alerts in real-time, saving critical response time.
          </p>
          
          <div className="mt-10 space-x-4">
            <button
              onClick={() => scrollToAbout()}
              className="px-8 py-3 rounded-full bg-red-500 text-white font-medium text-lg hover:bg-red-600 transition-colors duration-300 transform hover:scale-105"
            >
              Learn More
            </button>
            <a
              href="/crowdfunding"
              className="px-8 py-3 rounded-full border-2 border-red-500 text-red-500 font-medium text-lg hover:bg-red-50 transition-colors duration-300 transform hover:scale-105"
            >
              Support Our Mission
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <button onClick={scrollToAbout} className="p-2 rounded-full">
          <ChevronDown className="h-8 w-8 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Hero;