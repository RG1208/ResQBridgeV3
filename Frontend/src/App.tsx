import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Crowdfunding from './pages/Crowdfunding';
import AdminLayout from './adminDashboard/AdminLayout';
import Dashboard from './adminDashboard/Dashboard';
import SIDDTracking from './adminDashboard/SiddTracking';
import EmergencyManagement from './adminDashboard/EmergencyManagement';
import UserManagement from './adminDashboard/UserManagement';
import CrowdFunding from './adminDashboard/CrowdFunding';
import PublicLayout from './components/PublicLayout';
import FleetManagement from './fleetDashboard/FleetManagement';
import IncidentAlerts from './fleetDashboard/IncidentAlerts';
import DriverManagement from './fleetDashboard/DriverManagement';
import Settings from './fleetDashboard/Settings';
import Support from './fleetDashboard/Support';
import FleetSidebar from './fleetDashboard/FleetSidebar';
import FleetDashboard from './fleetDashboard/FleetDashboard';
import Alerts from './userDashboard/UserAlerts';
import Family from './userDashboard/UserFamily';
import DeviceManagement from './userDashboard/UserDevices';
import History from './userDashboard/UserHistory';
import Map from './userDashboard/UserMap';
import UserSidebar from './userDashboard/UserDashboardLayout';
import UserDashboard from './userDashboard/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Layout routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/crowdfunding" element={<Crowdfunding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Admin routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="sidd-tracking" element={<SIDDTracking />} />
          <Route path="emergencies" element={<EmergencyManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="crowdfunding" element={<CrowdFunding />} />
        </Route>

        {/* Protected User route */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserSidebar />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="family" element={<Family />} />
          <Route path="history" element={<History />} />
          <Route path="map" element={<Map />} />
          <Route path="devices" element={<DeviceManagement />} />
        </Route>


        {/* Protected Fleet route */}
        <Route
          path="/fleet/dashboard"
          element={
            <ProtectedRoute allowedRoles={['fleetowner']}>
              <FleetSidebar />
            </ProtectedRoute>
          }
        >
          <Route index element={<FleetDashboard />} />
          <Route path="fleet" element={<FleetManagement />} />
          <Route path="alerts" element={<IncidentAlerts />} />
          <Route path="drivers" element={<DriverManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* Redirect root or invalid routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
