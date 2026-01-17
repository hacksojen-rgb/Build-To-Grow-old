
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import GetAQuote from './pages/GetAQuote';
import Login from './pages/Login';
import Register from './pages/Register';
import Pricing from './pages/Pricing';

// Admin Imports
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import ManageServices from './pages/admin/ManageServices';
import ManageHero from './pages/admin/ManageHero';
import Leads from './pages/admin/Leads';
import ManagePortfolio from './pages/admin/ManagePortfolio';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManagePricing from './pages/admin/ManagePricing';
import ManageSettings from './pages/admin/ManageSettings';
import ManageAdmins from './pages/admin/ManageAdmins';

import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Fix: Making children optional to satisfy TypeScript when used as a layout wrapper in elements
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

// Fix: Making children optional to satisfy TypeScript when used as a layout wrapper
const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<PortfolioDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/get-quote" element={<GetAQuote />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Auth */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="leads" element={<Leads />} />
                <Route path="services" element={<ManageServices />} />
                <Route path="hero" element={<ManageHero />} />
                <Route path="portfolio" element={<ManagePortfolio />} />
                <Route path="blogs" element={<ManageBlogs />} />
                <Route path="pricing" element={<ManagePricing />} />
                <Route path="settings" element={<ManageSettings />} />
                <Route path="admins" element={<ManageAdmins />} />
              </Route>
            </Routes>
          </MainLayout>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
