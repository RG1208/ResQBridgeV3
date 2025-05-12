import React, { useState } from 'react';
import { 
  Smartphone, 
  Camera, 
  Bell, 
  Lock, 
  Thermometer, 
  Power, 
  Plus, 
  Settings,
  RefreshCw,
  MoreVertical,
  Search
} from 'lucide-react';

interface Device {
  id: number;
  name: string;
  type: 'camera' | 'sensor' | 'alarm' | 'lock' | 'thermostat' | 'smartphone';
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastActive: string;
  batteryLevel?: number;
}

const devices: Device[] = [
  { 
    id: 1, 
    name: 'Front Door Camera', 
    type: 'camera', 
    location: 'Front Entrance', 
    status: 'online', 
    lastActive: '2 minutes ago', 
    batteryLevel: 87 
  },
  { 
    id: 2, 
    name: 'Kitchen Smoke Detector', 
    type: 'sensor', 
    location: 'Kitchen', 
    status: 'online', 
    lastActive: '15 minutes ago', 
    batteryLevel: 92 
  },
  { 
    id: 3, 
    name: 'Main Alarm System', 
    type: 'alarm', 
    location: 'Whole House', 
    status: 'online', 
    lastActive: 'Just now' 
  },
  { 
    id: 4, 
    name: 'Garage Door Lock', 
    type: 'lock', 
    location: 'Garage', 
    status: 'warning', 
    lastActive: '1 hour ago', 
    batteryLevel: 15 
  },
  { 
    id: 5, 
    name: 'Living Room Thermostat', 
    type: 'thermostat', 
    location: 'Living Room', 
    status: 'online', 
    lastActive: '5 minutes ago' 
  },
  { 
    id: 6, 
    name: 'Backyard Camera', 
    type: 'camera', 
    location: 'Backyard', 
    status: 'offline', 
    lastActive: '2 days ago', 
    batteryLevel: 0 
  },
  { 
    id: 7, 
    name: 'John\'s Phone', 
    type: 'smartphone', 
    location: 'With John', 
    status: 'online', 
    lastActive: 'Just now', 
    batteryLevel: 75 
  },
  { 
    id: 8, 
    name: 'Basement Motion Sensor', 
    type: 'sensor', 
    location: 'Basement', 
    status: 'online', 
    lastActive: '30 minutes ago', 
    batteryLevel: 65 
  }
];

const deviceIcons = {
  camera: <Camera size={24} />,
  sensor: <Bell size={24} />,
  alarm: <Bell size={24} />,
  lock: <Lock size={24} />,
  thermostat: <Thermometer size={24} />,
  smartphone: <Smartphone size={24} />
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'text-green-500';
    case 'warning':
      return 'text-amber-500';
    case 'offline':
      return 'text-gray-400';
    default:
      return 'text-gray-500';
  }
};

const getBatteryColor = (level?: number) => {
  if (!level && level !== 0) return 'bg-gray-300 dark:bg-gray-600';
  if (level > 60) return 'bg-green-500';
  if (level > 20) return 'bg-amber-500';
  return 'bg-red-600';
};

const Devices: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  const filteredDevices = devices.filter(device => 
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Device Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage all your safety devices in one place
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Plus size={16} />
            <span>Add Device</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewType('grid')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
              viewType === 'grid' 
                ? 'bg-red-600 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
            Grid
          </button>
          <button 
            onClick={() => setViewType('list')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
              viewType === 'list' 
                ? 'bg-red-600 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
            List
          </button>
        </div>
      </div>

      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDevices.map((device) => (
            <div key={device.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="p-6">
                <div className="flex justify-between">
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                    {deviceIcons[device.type]}
                  </div>
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${
                      device.status === 'online' ? 'bg-green-500' : 
                      device.status === 'warning' ? 'bg-amber-500' : 'bg-gray-400'
                    } mr-2`}></div>
                    <span className={`text-sm ${getStatusColor(device.status)}`}>
                      {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">{device.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{device.location}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Active {device.lastActive}
                  </span>
                  {device.batteryLevel !== undefined && (
                    <div className="flex items-center space-x-1">
                      <div className="w-8 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={getBatteryColor(device.batteryLevel)} 
                          style={{ width: `${device.batteryLevel}%` }} 
                          role="progressbar"
                          aria-valuenow={device.batteryLevel}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{device.batteryLevel}%</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-850 px-6 py-3 flex justify-between">
                <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
                  <Power size={16} className="inline mr-1" />
                  {device.status === 'online' ? 'Turn Off' : 'Turn On'}
                </button>
                <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium">
                  <Settings size={16} className="inline mr-1" />
                  Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Device</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Battery</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
                        {deviceIcons[device.type]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{device.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{device.type.charAt(0).toUpperCase() + device.type.slice(1)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{device.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-2.5 w-2.5 rounded-full ${
                        device.status === 'online' ? 'bg-green-500' : 
                        device.status === 'warning' ? 'bg-amber-500' : 'bg-gray-400'
                      } mr-2`}></div>
                      <span className={`text-sm ${getStatusColor(device.status)}`}>
                        {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {device.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.batteryLevel !== undefined ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={getBatteryColor(device.batteryLevel)} 
                            style={{ width: `${device.batteryLevel}%` }} 
                            role="progressbar"
                            aria-valuenow={device.batteryLevel}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{device.batteryLevel}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Devices;