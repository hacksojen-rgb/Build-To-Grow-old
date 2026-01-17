
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Save, Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const ManageServices: React.FC = () => {
  const { services, addService, updateService, deleteService, loading } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', icon: 'Target' });

  const iconOptions = ['Target', 'Code2', 'Megaphone', 'Search', 'PenTool', 'BarChart3', 'Smartphone', 'Video', 'Zap', 'ShieldCheck'];

  const openAddModal = () => {
    setFormData({ title: '', description: '', icon: 'Target' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: any) => {
    setFormData({ title: service.title, description: service.description, icon: service.icon });
    setEditingId(service.id);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateService(editingId, formData);
      } else {
        await addService(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Error saving service: " + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
      } catch (err) {
        alert("Error deleting service: " + (err as Error).message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#014034] mb-2">CMS: Services</h1>
          <p className="text-gray-500">Manage your agency's outcome-driven service offerings.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[#014034] text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-[#00332a] transition-all shadow-lg"
        >
          <Plus size={20} />
          <span>New Service</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center text-[#014034]">
          <Loader2 className="animate-spin mr-2" /> Loading services...
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider">Icon & Title</th>
                  <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider">Outcome Description</th>
                  <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {services.map((service) => {
                  const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Target;
                  return (
                    <tr key={service.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-[#014034]/5 rounded-xl flex items-center justify-center text-[#014034] group-hover:bg-[#014034] group-hover:text-white transition-all">
                            <Icon size={24} />
                          </div>
                          <span className="font-bold text-[#014034] text-lg">{service.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                          {service.description}
                        </p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => openEditModal(service)}
                            className="p-3 rounded-xl text-blue-500 hover:bg-blue-50 transition-all"
                            title="Edit Service"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(service.id)}
                            className="p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                            title="Delete Service"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#014034]/40 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-extrabold text-[#014034]">{editingId ? 'Edit Service' : 'Add New Service'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                  <X size={28} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-[#014034] uppercase tracking-wider ml-1">Service Name</label>
                    <input 
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] transition-all"
                      placeholder="e.g. SEO Dominance"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-[#014034] uppercase tracking-wider ml-1">Representing Icon</label>
                    <div className="relative">
                      <select 
                        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] bg-white appearance-none transition-all"
                        value={formData.icon}
                        onChange={(e) => setFormData({...formData, icon: e.target.value})}
                      >
                        {iconOptions.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        {React.createElement((LucideIcons as any)[formData.icon] || LucideIcons.Target, { size: 20 })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-[#014034] uppercase tracking-wider ml-1">Outcome-Driven Description</label>
                  <textarea 
                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] transition-all"
                    placeholder="Describe how this service helps businesses grow (1-2 lines)..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button 
                    onClick={handleSave}
                    disabled={!formData.title || !formData.description || isSubmitting}
                    className="flex-grow bg-[#014034] text-white py-5 rounded-2xl font-extrabold text-xl hover:bg-[#00332a] transition-all flex items-center justify-center space-x-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={24} />}
                    <span>{editingId ? 'Update Service' : 'Publish Service'}</span>
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-10 py-5 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
