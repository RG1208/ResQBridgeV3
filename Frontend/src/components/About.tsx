import React from 'react';
import { ShieldAlert, Clock, Activity } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About ResQ-Bridge</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto my-4"></div>
          <p className="mt-4 text-lg text-gray-600">
            ResQ-Bridge is a revolutionary emergency response system designed to save lives by cutting down 
            critical response times during road accidents and emergencies.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg text-center transform transition duration-500 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-center">
              <ShieldAlert className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">Instant Detection</h3>
            <p className="mt-2 text-gray-600">
              Uses advanced IoT sensors and AI algorithms to detect accidents the moment they happen.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg text-center transform transition duration-500 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-center">
              <Clock className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">Reduced Response Time</h3>
            <p className="mt-2 text-gray-600">
              Dramatically cuts down emergency response times, potentially saving countless lives.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg text-center transform transition duration-500 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-center">
              <Activity className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">Real-time Monitoring</h3>
            <p className="mt-2 text-gray-600">
              Provides continuous monitoring and alerts to emergency services and designated contacts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;