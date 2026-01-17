
import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Image as ImageIcon, 
  Users, 
  LogOut, 
  Rocket,
  ChevronRight,
  Briefcase,
  FileText,
  DollarSign,
  Globe,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  const menuItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Leads', path: '/admin/leads', icon: Users },
    { name: 'Hero Banners', path: '/admin/hero', icon: ImageIcon },
    { name: 'Services', path: '/admin/services', icon: Settings },
    { name: 'Portfolio', path: '/admin/portfolio', icon: Briefcase },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Pricing', path: '/admin/pricing', icon: DollarSign },
    { name: 'Site Settings', path: '/admin/settings', icon: Globe },
    { name: 'Admins', path: '/admin/admins', icon: UserCheck },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-[#014034] text-white hidden lg:flex flex-col fixed h-full shadow-2xl z-50 overflow-y-auto">
        <div className="p-8 border-b border-white/10 shrink-0">
          <Link to="/" className="flex items-center space-x-2">
            <Rocket className="text-[#4DB6AC] w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">Admin<span className="text-[#4DB6AC]">Panel</span></span>
          </Link>
          <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] uppercase font-bold text-teal-400 tracking-widest mb-1">Signed in as</p>
            <p className="text-xs truncate font-medium opacity-80">{user?.email}</p>
          </div>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  isActive 
                  ? 'bg-white/10 text-[#4DB6AC] shadow-lg translate-x-1' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={20} />
                  <span className="font-semibold text-sm">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 text-gray-400 hover:text-white transition-colors p-4 rounded-xl hover:bg-red-500/10 group"
          >
            <LogOut size={20} className="group-hover:text-red-400" />
            <span className="font-semibold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow lg:ml-64 p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
