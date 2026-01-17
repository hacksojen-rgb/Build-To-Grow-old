import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Rocket, Loader2, AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState(''); // ইমেইলের বদলে ইউজারনেম স্টেট
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // এখানে login ফাংশনটি এখন ইউজারনেম এবং পাসওয়ার্ড নেবে
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#014034]/5 p-6">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-12 border border-gray-100">
        <div className="text-center mb-10">
          <div className="bg-[#014034] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Rocket className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#014034]">Admin Access</h2>
          <p className="text-gray-500 mt-2">Sign in to manage your growth engine</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center text-sm font-bold border border-red-100">
            <AlertCircle size={18} className="mr-2" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#014034] uppercase tracking-wider ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                required 
                type="text"  // এখানে ইমেইল থেকে টেক্সট করে দেওয়া হয়েছে
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 outline-none focus:border-[#014034] transition-all"
                placeholder="Enter admin username"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#014034] uppercase tracking-wider ml-1">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                required 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 outline-none focus:border-[#014034] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#014034] text-white py-5 rounded-2xl font-extrabold text-xl hover:bg-[#00332a] transition-all shadow-xl flex justify-center items-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <span>Sign In to Panel</span>}
          </button>
        </form>

        <div className="mt-10 text-center">
          <Link to="/" className="text-gray-400 font-bold hover:text-[#014034] transition-colors">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;