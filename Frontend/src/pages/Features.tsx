import React from 'react';
import { 
  Bell, Radio, Cpu, AlertTriangle, 
  MapPin, Phone, Shield, MessageSquare
} from 'lucide-react';
import  type { FeatureType } from '../types';

const Features: React.FC = () => {
  const features: FeatureType[] = [
    {
      title: 'Real-time Accident Detection',
      description: 'Advanced sensors detect collisions, rollovers, and other accident scenarios immediately as they occur.',
      icon: 'AlertTriangle'
    },
    {
      title: 'Voice-based SOS via AI',
      description: 'Voice recognition technology allows for hands-free SOS calls when drivers are unable to reach their phones.',
      icon: 'MessageSquare'
    },
    {
      title: 'IoT-enabled Crash Sensors',
      description: 'Network of smart sensors that accurately identify crash severity and vehicle position.',
      icon: 'Cpu'
    },
    {
      title: 'Automated Emergency Alerts',
      description: 'Instant notifications sent to emergency services with precise location and accident details.',
      icon: 'Bell'
    },
    {
      title: 'GPS Location Tracking',
      description: 'Pinpoint location services ensure responders can find the accident site quickly, even in remote areas.',
      icon: 'MapPin'
    },
    {
      title: 'Emergency Contact Notification',
      description: 'Automatically alerts designated emergency contacts when an accident is detected.',
      icon: 'Phone'
    },
    {
      title: 'Secure Data Transmission',
      description: 'End-to-end encrypted communication ensures personal and medical information remains secure.',
      icon: 'Shield'
    },
    {
      title: 'Seamless Communication',
      description: 'Integrated communication channels between victims, emergency services, and medical facilities.',
      icon: 'Radio'
    }
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle':
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
      case 'MessageSquare':
        return <MessageSquare className="h-8 w-8 text-red-500" />;
      case 'Cpu':
        return <Cpu className="h-8 w-8 text-red-500" />;
      case 'Bell':
        return <Bell className="h-8 w-8 text-red-500" />;
      case 'MapPin':
        return <MapPin className="h-8 w-8 text-red-500" />;
      case 'Phone':
        return <Phone className="h-8 w-8 text-red-500" />;
      case 'Shield':
        return <Shield className="h-8 w-8 text-red-500" />;
      case 'Radio':
        return <Radio className="h-8 w-8 text-red-500" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
    }
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Key Features</h1>
            <div className="w-16 h-1 bg-red-500 mx-auto my-4"></div>
            <p className="mt-4 text-lg text-gray-600">
              ResQ-Bridge combines cutting-edge technology with practical solutions to create 
              a comprehensive emergency response system.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4">
                  {renderIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;