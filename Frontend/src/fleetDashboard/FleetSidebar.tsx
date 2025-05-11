// src/fleetDashboard/FleetDashboardLayout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MapPinned, LayoutDashboard, AlertCircle, Users, Settings, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProtectedNavbar from '@/components/ProtectedNavbar';

const navItems = [
  { name: 'Dashboard', path: '/fleet/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Fleet Management', path: '/fleet/dashboard/fleet', icon: <MapPinned size={20} /> },
  { name: 'Incident Alerts', path: '/fleet/dashboard/alerts', icon: <AlertCircle size={20} /> },
  { name: 'Driver Management', path: '/fleet/dashboard/drivers', icon: <Users size={20} /> },
  { name: 'Settings', path: '/fleet/dashboard/settings', icon: <Settings size={20} /> },
  { name: 'Support', path: '/fleet/dashboard/support', icon: <HelpCircle size={20} /> },
];

const FleetDashboardLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-6">Fleet Panel</h2>
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

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FleetDashboardLayout;
