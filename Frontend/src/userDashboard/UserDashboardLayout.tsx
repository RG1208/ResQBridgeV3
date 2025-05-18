import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock,
  TabletSmartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProtectedNavbar from '@/components/ProtectedNavbar';

const navItems = [
  { name: 'Dashboard', path: '/user/dashboard', icon: <LayoutDashboard size={20} /> },
  // { name: 'Alerts', path: '/user/dashboard/alerts', icon: <AlertTriangle size={20} /> },
  { name: 'History', path: '/user/dashboard/history', icon: <Clock size={20} /> },
  // { name: 'Live Map', path: '/user/dashboard/map', icon: <MapPinned size={20} /> },
  { name: 'Devices', path: '/user/dashboard/devices', icon: <TabletSmartphone size={20} /> },
];

const UserDashboardLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-6">User Dashboard</h2>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-red-500 text-white'
                    : 'text-gray-700 hover:bg-red-100'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        <ProtectedNavbar />

        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
