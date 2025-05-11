// fleetDashboard/FleetSidebar.tsx
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, Activity, Users, Settings, HelpCircle } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/fleet/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Fleet Management', path: '/fleet/dashboard/fleet', icon: <Truck size={20} /> },
  { name: 'Incident Alerts', path: '/fleet/dashboard/alerts', icon: <Activity size={20} /> },
  { name: 'Drivers', path: '/fleet/dashboard/drivers', icon: <Users size={20} /> },
  { name: 'Settings', path: '/fleet/dashboard/settings', icon: <Settings size={20} /> },
  { name: 'Support', path: '/fleet/dashboard/support', icon: <HelpCircle size={20} /> },
];

const FleetSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0 flex flex-col justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold text-red-600 mb-6">Fleet Panel</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-red-100'
                }`
              }
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default FleetSidebar;
