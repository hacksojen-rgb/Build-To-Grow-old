
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Shield } from 'lucide-react';

const Register: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Registration attempt');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24 pb-12">
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[#014034]">Create Account</h2>
          <p className="text-gray-500 mt-2">Join Build to Grow platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input required type="text" className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#014034]/10 outline-none" placeholder="John Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Company</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input required type="text" className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#014034]/10 outline-none" placeholder="Growth Inc" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input required type="email" className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#014034]/10 outline-none" placeholder="email@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input required type="password" minLength={8} className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#014034]/10 outline-none" placeholder="••••••••" />
            </div>
            <p className="text-[10px] text-gray-400 px-1 italic">Must be at least 8 characters</p>
          </div>
          
          <button type="submit" className="w-full bg-[#014034] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#00332a] transition-all shadow-lg mt-4">
            Create My Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account? <Link to="/login" className="text-[#00695c] font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
