 import { Car, AlertTriangle, Phone, Clock } from 'lucide-react';
  import DashboardCard from '../components/DashboardCard';
  
  const mockData = {
    totalVehicles: 48,
    activeVehicles: 42,
    currentAlerts: 3,
    lastAlert: '10 minutes ago',
    emergencyStatus: 'Available',
  };
  
  export default function FleetDashboard() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Fleet Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Vehicles"
            value={mockData.totalVehicles}
            icon={<Car size={24} />}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Active Vehicles"
            value={mockData.activeVehicles}
            icon={<Car size={24} />}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Current Alerts"
            value={mockData.currentAlerts}
            icon={<AlertTriangle size={24} />}
          />
          <DashboardCard
            title="Emergency Contact"
            value={mockData.emergencyStatus}
            icon={<Phone size={24} />}
          />
        </div>
  
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Clock size={20} className="text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Vehicle #{item} Status Update</p>
                  <p className="text-sm text-gray-500">Updated 10 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Locations</h2>
          <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map View Coming Soon</p>
          </div>
        </div>
      </div>
    );
  }