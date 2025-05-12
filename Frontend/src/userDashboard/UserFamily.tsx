import React from 'react';
import { MapPin, Battery, PhoneCall, Plus } from 'lucide-react';

interface FamilyMember {
  id: number;
  name: string;
  avatar: string;
  status: 'safe' | 'warning' | 'danger';
  location: string;
  lastSeen: string;
  batteryLevel: number;
}

const familyMembers: FamilyMember[] = [
  {
    id: 1,
    name: 'John Smith',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'safe',
    location: 'Home',
    lastSeen: '2 minutes ago',
    batteryLevel: 75
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'warning',
    location: 'Downtown',
    lastSeen: '15 minutes ago',
    batteryLevel: 32
  },
  {
    id: 3,
    name: 'Michael Brown',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'safe',
    location: 'School',
    lastSeen: '5 minutes ago',
    batteryLevel: 92
  },
  {
    id: 4,
    name: 'Emily Davis',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'danger',
    location: 'Unknown',
    lastSeen: '45 minutes ago',
    batteryLevel: 10
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'safe':
      return 'bg-green-500';
    case 'warning':
      return 'bg-amber-500';
    case 'danger':
      return 'bg-red-600';
    default:
      return 'bg-gray-500';
  }
};

const getBatteryColor = (level: number) => {
  if (level > 60) return 'bg-green-500';
  if (level > 20) return 'bg-amber-500';
  return 'bg-red-600';
};

const Family: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Family Monitoring</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track and monitor your family members in real-time
          </p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={16} />
          <span>Add Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {familyMembers.map((member) => (
          <div 
            key={member.id} 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
          >
            <div className="flex space-x-4">
              <div className="relative">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(member.status)}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Battery className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="w-8 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getBatteryColor(member.batteryLevel)}`} 
                        style={{ width: `${member.batteryLevel}%` }} 
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{member.location}</span>
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Last seen {member.lastSeen}
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 flex justify-center items-center gap-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-800/30 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <MapPin size={14} />
                    <span>Locate</span>
                  </button>
                  <button className="flex-1 flex justify-center items-center gap-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-800/30 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <PhoneCall size={14} />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Family;