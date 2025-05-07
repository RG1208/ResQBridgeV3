import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Login from './pages/Login';
import Crowdfunding from './pages/Crowdfunding';
import AdminLayout from './adminDashboard/AdminLayout';
import Dashboard from './adminDashboard/Dashboard';
import SIDDTracking from './adminDashboard/SiddTracking';
import EmergencyManagement from './adminDashboard/EmergencyManagement';
import UserManagement from './adminDashboard/UserManagement';
import CrowdFunding from './adminDashboard/CrowdFunding';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/login" element={<Login />} />
            <Route path="/crowdfunding" element={<Crowdfunding />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="sidd-tracking" element={<SIDDTracking />} />
              <Route path="emergencies" element={<EmergencyManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="crowdfunding" element={<CrowdFunding />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
