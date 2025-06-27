import { useEffect, useState } from 'react';
import { Car, AlertTriangle, Phone, Clock } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

type Vehicle = {
  id: string | number;
  model: string;
  status: string; // Can be 'Online', 'offline', etc.
  sidd: string;
  state: string;
};

type Incident = {
  id: string | number;
  vehicleId: string | number;
  severity: string;
  status: 'Pending' | 'Resolved' | 'Responded';
  time: string;
  location: string;
  transcript: string;
};

export default function FleetDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [alerts, setAlerts] = useState<Incident[]>([]);

  const fetchDashboardData = async () => {
    try {
      const [vehicleRes, alertRes] = await Promise.all([
        fetch('https://resqbridgev3.onrender.com/api/fleet/vehicles'),
        fetch('https://resqbridgev3.onrender.com/api/alerts'),
      ]);

      const vehicleData: Vehicle[] = await vehicleRes.json();
      const alertData: Incident[] = await alertRes.json();

      setVehicles(vehicleData);
      setAlerts(alertData);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalVehicles = vehicles.length;

  const activeVehicles = vehicles.filter(
    (v) => typeof v.status === 'string' && v.status.toLowerCase() === 'online'
  ).length;

  const currentAlerts = alerts.filter((a) => a.status === 'Pending').length;

  const recentAlerts = [...alerts]
    .filter((a) => a.time)
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 3);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Fleet Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Vehicles"
          value={totalVehicles}
          icon={<Car size={24} />}
          trend={{ value: totalVehicles, isPositive: true }}
        />
        <DashboardCard
          title="Active Vehicles"
          value={activeVehicles}
          icon={<Car size={24} />}
          trend={{ value: activeVehicles, isPositive: true }}
        />
        <DashboardCard
          title="Current Alerts"
          value={currentAlerts}
          icon={<AlertTriangle size={24} />}
        />
        <DashboardCard
          title="Emergency Contact"
          value="0123456789"
          icon={<Phone size={24} />}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Clock size={20} className="text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Vehicle #{alert.vehicleId} Alert - {alert.transcript || 'No transcript'}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(alert.time).toLocaleString()} • Status: 
                  <span
                    className={`ml-1 font-semibold ${
                      alert.status === 'Pending'
                        ? 'text-yellow-600'
                        : alert.status === 'Resolved'
                        ? 'text-green-600'
                        : 'text-blue-600'
                    }`}
                  >
                    {alert.status}
                  </span>
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(alert.time).toLocaleString()}
                </p>
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
