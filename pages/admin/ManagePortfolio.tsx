
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Save, Loader2 } from 'lucide-react';

const ManagePortfolio: React.FC = () => {
  const { portfolio, addPortfolioItem, updatePortfolioItem, deletePortfolioItem, loading } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', imageUrl: '', client: '', content: '' });

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updatePortfolioItem(editingId, formData);
      } else {
        await addPortfolioItem(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Error: " + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEdit = (p: any) => {
    setFormData({
      title: p.title || '',
      category: p.category || '',
      imageUrl: p.imageUrl || '',
      client: p.client || '',
      content: p.content || ''
    });
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setFormData({ title: '', category: '', imageUrl: '', client: '', content: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete project?")) {
      try {
        await deletePortfolioItem(id);
      } catch (err) {
        alert("Error: " + (err as Error).message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#014034] mb-2">CMS: Portfolio</h1>
          <p className="text-gray-500">Manage your agency's case studies and projects.</p>
        </div>
        <button onClick={openAdd} className="bg-[#014034] text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg">
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center text-[#014034]"><Loader2 className="animate-spin mr-2" /> Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {portfolio.map(project => (
            <div key={project.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
              <div className="aspect-[4/3] relative">
                <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-[#014034] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">{project.category}</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-[#014034] mb-2">{project.title}</h4>
                <p className="text-gray-500 text-sm mb-6">Client: {project.client}</p>
                <div className="mt-auto flex justify-end space-x-2">
                  <button onClick={() => openEdit(project)} className="p-2.5 rounded-xl text-blue-500 hover:bg-blue-50 transition-all"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(project.id)} className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
          <div className="absolute inset-0 bg-[#014034]/40 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl relative z-10 p-10 animate-in zoom-in duration-300">
            <h3 className="text-2xl font-bold mb-8 text-[#014034]">{editingId ? 'Edit Project' : 'New Project'}</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#014034] uppercase tracking-wider">Project Title</label>
                  <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034]" placeholder="e.g. SaaS Redesign" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#014034] uppercase tracking-wider">Category</label>
                  <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034]" placeholder="e.g. Web Development" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#014034] uppercase tracking-wider">Client Name</label>
                  <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034]" placeholder="e.g. Acme Corp" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#014034] uppercase tracking-wider">Image URL</label>
                  <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034]" placeholder="https://images.unsplash.com/..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#014034] uppercase tracking-wider">Full Case Study Content</label>
                <textarea 
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034] min-h-[200px]" 
                  placeholder="Tell the full story of this project, challenges faced, and outcomes achieved..." 
                  rows={8}
                  value={formData.content} 
                  onChange={e => setFormData({...formData, content: e.target.value})} 
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button onClick={handleSave} disabled={isSubmitting} className="flex-grow bg-[#014034] text-white py-4 rounded-xl font-bold shadow-lg flex justify-center items-center hover:bg-[#00332a] transition-all">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Project'}
                </button>
                <button onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition-all">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePortfolio;
