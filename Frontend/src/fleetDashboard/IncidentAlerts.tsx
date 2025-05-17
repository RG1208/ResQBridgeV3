import { useEffect, useState } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

type Alert = {
  id: string | number;
  vehicleId: string | number;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Responded' | 'Resolved' | string;
  time: string;
  location: string;
  transcript: string;
};

export default function IncidentAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/alerts');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Incident Alerts</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid gap-4 p-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`${
                    alert.severity === 'High' ? 'text-red-500' :
                    alert.severity === 'Medium' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <span className="font-semibold">Vehicle {alert.vehicleId}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  alert.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  alert.status === 'Responded' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {alert.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2" />
                  {alert.time}
                </div>
                <p className="text-sm text-gray-600">{alert.location}</p>
                <p className="text-sm font-medium">{alert.transcript}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
