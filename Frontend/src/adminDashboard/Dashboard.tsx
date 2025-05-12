import { AlertTriangle, Users, Activity, DollarSign, Box } from 'lucide-react';

  const stats = [
    {
      title: 'Total Emergencies',
      value: 50,
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
    },
    {
      title: 'Resolved Emergencies',
      value: 40,
      icon: <Activity className="h-6 w-6 text-green-500" />,
    },
    {
      title: 'Registered Users',
      value: 200,
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Funds Raised',
      value: `₹10,000`,
      icon: <DollarSign className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: 'SIDD Devices Deployed',
      value: 100,
      icon: <Box className="h-6 w-6 text-purple-500" />,
    },
  ];

  export default function  Dashboard () {
    return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl shadow-sm p-5 flex items-center space-x-4"
          >
            <div className="bg-gray-100 p-3 rounded-full">
              {stat.icon}
            </div>
            <div>
              <div className="text-gray-600 text-sm">{stat.title}</div>
              <div className="text-xl font-semibold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for future charts, recent activity, etc. */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>🚨 Emergency reported by user <strong>#102</strong> in Delhi</li>
          <li>✅ Emergency <strong>#97</strong> resolved successfully</li>
          <li>📦 New SIDD device <strong>#SIDD058</strong> registered</li>
          <li>💸 ₹5000 raised by <strong>Aman Singh</strong></li>
        </ul>
      </div>
    </div>
  );
};


