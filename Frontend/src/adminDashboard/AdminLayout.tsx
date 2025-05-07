import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, Users, Activity, DollarSign, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'SIDD Tracking', path: '/admin/sidd-tracking', icon: <MapPin size={20} /> },
    { name: 'Emergencies', path: '/admin/emergencies', icon: <Activity size={20} /> },
    { name: 'User Management', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Crowdfunding', path: '/admin/crowdfunding', icon: <DollarSign size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-6">Admin Panel</h2>
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

        {/* Logout at the bottom */}
        <div className="mt-6">
          <Link
            to="/"
            className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-100"
          >
            <LogOut size={20} />
            <span className="ml-2">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar (Optional) */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {navItems.find((item) => location.pathname === item.path)?.name || 'Admin'}
          </h1>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
