import React, { useState } from 'react';
import { MapPin, Home, Search, Layers, RefreshCw } from 'lucide-react';

const Map: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const refreshMap = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Live Map</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View real-time locations of family members and devices
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Layers size={16} />
            <span>Layers</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={refreshMap}
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Search locations..."
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Family Members</h3>
            <div className="space-y-3">
              {[
                { name: 'John Smith', location: 'Home', color: 'bg-green-500' },
                { name: 'Sarah Johnson', location: 'Downtown', color: 'bg-amber-500' },
                { name: 'Michael Brown', location: 'School', color: 'bg-blue-500' },
                { name: 'Emily Davis', location: 'Unknown', color: 'bg-red-500' }
              ].map((member, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${member.color} mr-3`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.location}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                    <MapPin size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Safe Zones</h3>
            <div className="space-y-3">
              {[
                { name: 'Home', address: '123 Safe St', color: 'bg-green-500' },
                { name: 'School', address: '456 Learning Ave', color: 'bg-blue-500' },
                { name: 'Grandparents', address: '789 Family Ln', color: 'bg-purple-500' },
                { name: 'Work', address: '101 Office Blvd', color: 'bg-amber-500' }
              ].map((zone, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${zone.color} mr-3`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{zone.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{zone.address}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                    <Home size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden h-[600px] relative">
          {/* Map placeholder */}
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="mx-auto text-red-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                {isLoading 
                  ? "Loading map data..." 
                  : "Live map would appear here. This would typically integrate with a mapping service API like Google Maps, Mapbox, or OpenStreetMap."}
              </p>
              {isLoading && (
                <div className="mt-4 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Map overlay elements would go here */}
          <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
            <div className="flex space-x-2">
              {['Satellite', 'Streets', 'Terrain'].map((type, idx) => (
                <button 
                  key={idx} 
                  className={`px-3 py-1 text-sm rounded-md ${idx === 1 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;