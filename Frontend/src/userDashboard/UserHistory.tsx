import React, { useState } from 'react';
import { Calendar, Filter, Download, Search } from 'lucide-react';

interface IncidentRecord {
  id: number;
  type: string;
  location: string;
  date: string;
  time: string;
  status: 'resolved' | 'pending' | 'investigating';
  priority: 'high' | 'medium' | 'low';
  description: string;
}

const incidents: IncidentRecord[] = [
  {
    id: 1,
    type: 'Fire Alarm',
    location: 'Kitchen',
    date: 'June 15, 2025',
    time: '14:32',
    status: 'resolved',
    priority: 'high',
    description: 'Smoke detector triggered due to burned food. No actual fire.'
  },
  {
    id: 2,
    type: 'Break-in Attempt',
    location: 'Front Door',
    date: 'June 12, 2025',
    time: '02:15',
    status: 'resolved',
    priority: 'high',
    description: 'Motion sensors detected movement. Police were called.'
  },
  {
    id: 3,
    type: 'Gas Leak',
    location: 'Basement',
    date: 'June 10, 2025',
    time: '19:45',
    status: 'resolved',
    priority: 'high',
    description: 'Gas detector identified a potential leak. Maintenance resolved the issue.'
  },
  {
    id: 4,
    type: 'Power Outage',
    location: 'Entire Home',
    date: 'June 8, 2025',
    time: '21:20',
    status: 'resolved',
    priority: 'medium',
    description: 'Power outage due to storm. Backup generator activated.'
  },
  {
    id: 5,
    type: 'Water Leak',
    location: 'Bathroom',
    date: 'June 5, 2025',
    time: '09:12',
    status: 'pending',
    priority: 'medium',
    description: 'Water sensor detected a leak under the sink. Plumber scheduled.'
  },
  {
    id: 6,
    type: 'Fall Detection',
    location: 'Stairs',
    date: 'June 3, 2025',
    time: '16:50',
    status: 'resolved',
    priority: 'high',
    description: 'Fall detected. Emergency contact was notified.'
  },
  {
    id: 7,
    type: 'Carbon Monoxide',
    location: 'Living Room',
    date: 'May 29, 2025',
    time: '22:05',
    status: 'investigating',
    priority: 'high',
    description: 'Low levels of carbon monoxide detected. Source under investigation.'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 dark:bg-red-900/20';
    case 'medium':
      return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
    case 'low':
      return 'text-green-600 bg-green-50 dark:bg-green-900/20';
    default:
      return 'text-gray-600 bg-gray-50 dark:bg-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'resolved':
      return 'text-green-600 bg-green-50 dark:bg-green-900/20';
    case 'pending':
      return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
    case 'investigating':
      return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    default:
      return 'text-gray-600 bg-gray-50 dark:bg-gray-800';
  }
};

const History: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredIncidents = incidents.filter(incident => 
    incident.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Incident History</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View and analyze past safety incidents
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Calendar size={16} />
            <span>Date Range</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Search incidents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredIncidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{incident.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{incident.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {incident.date} at {incident.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(incident.priority)}`}>
                    {incident.priority.charAt(0).toUpperCase() + incident.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;