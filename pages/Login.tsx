
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login attempt');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 pb-10">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[#014034]">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Access your project dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                required 
                type="email" 
                className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#014034]/10 focus:border-[#014034] outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <a href="#" className="text-xs text-[#00695c] font-bold hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                required 
                type="password" 
                className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#014034]/10 focus:border-[#014034] outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-[#014034] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#00332a] transition-all shadow-lg">
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account? <Link to="/register" className="text-[#00695c] font-bold hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
