import React from 'react';

type SIDDUnit = {
  id: string;
  buyerName: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  purchaseDate: string;
};

const siddData: SIDDUnit[] = [
  { id: 'SIDD001', buyerName: 'Rajesh Kumar', location: 'Delhi', status: 'Active', purchaseDate: '2025-03-12' },
  { id: 'SIDD002', buyerName: 'Anjali Sharma', location: 'Mumbai', status: 'Inactive', purchaseDate: '2025-03-15' },
  { id: 'SIDD003', buyerName: 'Amit Verma', location: 'Bangalore', status: 'Maintenance', purchaseDate: '2025-04-02' },
];

const statusColor = {
  Active: 'bg-green-100 text-green-700',
  Inactive: 'bg-gray-100 text-gray-700',
  Maintenance: 'bg-yellow-100 text-yellow-700',
};

const SiddTracking: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">SIDD Product Tracking</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded-md overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">SIDD ID</th>
              <th className="p-3 border-b">Buyer Name</th>
              <th className="p-3 border-b">Location</th>
              <th className="p-3 border-b">Purchase Date</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {siddData.map((unit) => (
              <tr key={unit.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{unit.id}</td>
                <td className="p-3 border-b">{unit.buyerName}</td>
                <td className="p-3 border-b">{unit.location}</td>
                <td className="p-3 border-b">{unit.purchaseDate}</td>
                <td className="p-3 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[unit.status]}`}>
                    {unit.status}
                  </span>
                </td>
              </tr>
            ))}
            {siddData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No SIDD units found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiddTracking;
