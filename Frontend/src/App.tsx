import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './userDashboard/UserDashboard';
import FleetDashboard from './fleetDashboard/FleetDashboard';
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
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Protected Fleet route */}
        <Route 
          path="/fleet/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['fleetowner']}>
              <FleetDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Redirect root or invalid routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
