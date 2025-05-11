import { useEffect, useState } from 'react';
import { Car, AlertTriangle, Phone, Clock } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

const FleetDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/fleet/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch dashboard data');
        const result = await response.json();
        setData(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Fleet Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Vehicles"
          value={data.total_vehicles}
          icon={<Car size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Active Vehicles"
          value={data.active_vehicles}
          icon={<Car size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardCard
          title="Current Alerts"
          value={data.current_alerts}
          icon={<AlertTriangle size={24} />}
        />
        <DashboardCard
          title="Emergency Contact"
          value={data.emergency_status}
          icon={<Phone size={24} />}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {data.recent_activity.map((item: any, index: number) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Clock size={20} className="text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.timestamp}</p>
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
};

export default FleetDashboard;