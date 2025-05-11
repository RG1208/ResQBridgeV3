import { useState } from 'react';
import { Plus, Trash2, Edit, Phone } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  phone: string;
  assignedVehicle: string;
  status: 'Active' | 'Off Duty';
  emergencyContact: string;
}

const initialDrivers: Driver[] = [
  {
    id: 'D001',
    name: 'John Doe',
    phone: '(555) 123-4567',
    assignedVehicle: 'V001',
    status: 'Active',
    emergencyContact: '(555) 987-6543',
  },
  {
    id: 'D002',
    name: 'Jane Smith',
    phone: '(555) 234-5678',
    assignedVehicle: 'V002',
    status: 'Off Duty',
    emergencyContact: '(555) 876-5432',
  },
  {
    id: 'D003',
    name: 'Mike Johnson',
    phone: '(555) 345-6789',
    assignedVehicle: 'V003',
    status: 'Active',
    emergencyContact: '(555) 765-4321',
  },
];

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);

  const handleDelete = (id: string) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700">
          <Plus size={20} />
          Add Driver
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="px-6 py-4 whitespace-nowrap">{driver.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{driver.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{driver.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{driver.assignedVehicle}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    driver.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {driver.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    {driver.emergencyContact}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(driver.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}