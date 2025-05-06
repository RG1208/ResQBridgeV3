import React from 'react';
import { Search, Activity, Zap } from 'lucide-react';
import type { ProcessStepType } from '../types/index.ts';

const HowItWorks: React.FC = () => {
  const steps: ProcessStepType[] = [
    {
      title: 'Detect',
      description: 'IoT sensors in vehicles and infrastructure detect accidents and emergency situations in real-time.',
      icon: 'Search'
    },
    {
      title: 'Analyze',
      description: 'AI algorithms analyze sensor data to determine accident severity and required response.',
      icon: 'Activity'
    },
    {
      title: 'Respond',
      description: 'Emergency services are alerted with precise location and situation details for faster response.',
      icon: 'Zap'
    }
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="h-12 w-12 text-red-500" />;
      case 'Activity':
        return <Activity className="h-12 w-12 text-red-500" />;
      case 'Zap':
        return <Zap className="h-12 w-12 text-red-500" />;
      default:
        return <Search className="h-12 w-12 text-red-500" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto my-4"></div>
          <p className="mt-4 text-lg text-gray-600">
            Our technology follows a simple yet powerful three-step process to save lives
            during emergencies.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-red-500 z-0"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-8 text-center relative z-10 shadow-lg transform transition duration-500 hover:-translate-y-2"
            >
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
                  {renderIcon(step.icon)}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {/* Step number */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold text-white">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
            Learn More About Our Technology
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;