import React from 'react';
import { Bell, AlertTriangle, Info, RefreshCw } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'danger' | 'info';
  title: string;
  location: string;
  time: string;
  description: string;
}

const alerts: Alert[] = [
  {
    id: 1,
    type: 'danger',
    title: 'Fire Alarm Triggered',
    location: 'Kitchen',
    time: '10 minutes ago',
    description: 'Smoke detector in the kitchen has detected smoke.'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Motion Detected',
    location: 'Front Door',
    time: '25 minutes ago',
    description: 'Unusual activity detected at the front entrance.'
  },
  {
    id: 3,
    type: 'info',
    title: 'Weather Alert',
    location: 'Your Area',
    time: '1 hour ago',
    description: 'Severe weather warning issued for your area.'
  },
  {
    id: 4,
    type: 'warning',
    title: 'Low Battery',
    location: 'Garage Sensor',
    time: '3 hours ago',
    description: 'Garage door sensor battery is running low.'
  },
  {
    id: 5,
    type: 'danger',
    title: 'Carbon Monoxide',
    location: 'Basement',
    time: '5 hours ago',
    description: 'Increased levels of carbon monoxide detected in the basement.'
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'danger':
      return <AlertTriangle className="h-6 w-6 text-red-600" />;
    case 'warning':
      return <Bell className="h-6 w-6 text-amber-500" />;
    case 'info':
      return <Info className="h-6 w-6 text-blue-500" />;
    default:
      return <Info className="h-6 w-6 text-gray-500" />;
  }
};

const getAlertBg = (type: string) => {
  switch (type) {
    case 'danger':
      return 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30';
    case 'warning':
      return 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30';
    case 'info':
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30';
    default:
      return 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700';
  }
};

const Alerts: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Real-time Alerts</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor and manage safety alerts in real-time
          </p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex space-x-4">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            All Alerts
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Critical Only
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Today
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`rounded-xl border p-5 transition-all hover:shadow-md ${getAlertBg(alert.type)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                  <div className="flex space-x-4 mt-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{alert.location}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{alert.time}</span>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{alert.description}</p>
                </div>
              </div>
              <button className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 rounded border border-red-100 dark:border-red-800/30 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;