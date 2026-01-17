
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { UserPlus, Trash2, Shield, Mail, Loader2, X } from 'lucide-react';

const ManageAdmins: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    const { data } = await supabase.from('admin_users').select('*').order('created_at', { ascending: false });
    setAdmins(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAdd = async () => {
    setIsSubmitting(true);
    const { error } = await supabase.from('admin_users').insert([formData]);
    if (error) {
      alert(error.message);
    } else {
      setIsModalOpen(false);
      fetchAdmins();
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Remove this administrator?")) {
      const { error } = await supabase.from('admin_users').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchAdmins();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#014034] mb-2">Manage Administrators</h1>
          <p className="text-gray-500">Control who has access to the agency's backend systems.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#014034] text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg hover:bg-[#00332a] transition-all"
        >
          <UserPlus size={20} />
          <span>Add Admin</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center text-[#014034]"><Loader2 className="animate-spin mr-2" /> Synchronizing...</div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider">Admin Email</th>
                <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider">Role</th>
                <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#014034]/5 rounded-full flex items-center justify-center text-[#014034]">
                        <Mail size={18} />
                      </div>
                      <span className="font-bold text-[#014034]">{admin.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-teal-50 text-[#00695c] tracking-widest">
                      <Shield size={10} className="mr-1" /> Super Admin
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleDelete(admin.id)}
                      className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#014034]/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl relative z-10 p-10 animate-in zoom-in duration-300">
            <h3 className="text-2xl font-bold mb-8 text-[#014034]">Add New Admin</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#014034] uppercase tracking-wider">Email Address</label>
                <input 
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034]" 
                  placeholder="name@agency.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#014034] uppercase tracking-wider">Access Password</label>
                <input 
                  type="password"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034]" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={handleAdd}
                  disabled={isSubmitting}
                  className="flex-grow bg-[#014034] text-white py-4 rounded-xl font-bold shadow-lg flex justify-center items-center hover:bg-[#00332a]"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Create User'}
                </button>
                <button onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-xl text-gray-500 font-bold hover:bg-gray-100">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;
