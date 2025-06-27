import React, { useState } from 'react';

type Emergency = {
  id: string;
  location: string;
  status: 'Ongoing' | 'Resolved';
  type: string;
  reportedBy: string;
  time: string;
};

const dummyEmergencies: Emergency[] = [
  { id: 'E001', location: 'Delhi', status: 'Ongoing', type: 'Accident', reportedBy: 'User102', time: '10:30 AM' },
  { id: 'E002', location: 'Mumbai', status: 'Resolved', type: 'Fire', reportedBy: 'User215', time: '8:15 AM' },
  { id: 'E003', location: 'Chennai', status: 'Ongoing', type: 'Flood', reportedBy: 'User178', time: '12:45 PM' },
  { id: 'E004', location: 'Pune', status: 'Resolved', type: 'Roadblock', reportedBy: 'User043', time: '6:50 AM' },
];

const EmergencyManagement: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Ongoing' | 'Resolved'>('All');

  const filteredData = dummyEmergencies.filter((e) => filter === 'All' || e.status === filter);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Emergency Management</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {['All', 'Ongoing', 'Resolved'].map((tab) => (
          <button
            key={tab}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={() => setFilter(tab as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === tab
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Location</th>
              <th className="p-3 border-b">Type</th>
              <th className="p-3 border-b">Reported By</th>
              <th className="p-3 border-b">Time</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((emergency) => (
              <tr key={emergency.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{emergency.id}</td>
                <td className="p-3 border-b">{emergency.location}</td>
                <td className="p-3 border-b">{emergency.type}</td>
                <td className="p-3 border-b">{emergency.reportedBy}</td>
                <td className="p-3 border-b">{emergency.time}</td>
                <td className="p-3 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      emergency.status === 'Resolved'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {emergency.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No emergencies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmergencyManagement;
