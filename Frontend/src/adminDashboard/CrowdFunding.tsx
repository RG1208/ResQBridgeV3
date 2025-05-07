import React, { useState } from 'react';

interface Contribution {
  id: number;
  name: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

const initialContributions: Contribution[] = [
  { id: 1, name: 'Ravi Sharma', amount: 5000, status: 'Pending', date: '2025-05-01' },
  { id: 2, name: 'Anita Verma', amount: 2000, status: 'Approved', date: '2025-05-03' },
  { id: 3, name: 'Suresh Kumar', amount: 1000, status: 'Rejected', date: '2025-05-05' },
];

const CrowdFunding: React.FC = () => {
  const [contributions, setContributions] = useState(initialContributions);

  const handleStatusChange = (id: number, newStatus: Contribution['status']) => {
    setContributions((prev) =>
      prev.map((contribution) =>
        contribution.id === id ? { ...contribution, status: newStatus } : contribution
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Crowdfunding Contributions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Amount (INR)</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution) => (
              <tr key={contribution.id} className="border-t">
                <td className="px-4 py-2">{contribution.name}</td>
                <td className="px-4 py-2">₹{contribution.amount}</td>
                <td className="px-4 py-2">{contribution.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      contribution.status === 'Approved'
                        ? 'bg-green-100 text-green-600'
                        : contribution.status === 'Rejected'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {contribution.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleStatusChange(contribution.id, 'Approved')}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(contribution.id, 'Rejected')}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {contributions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No contributions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrowdFunding;
