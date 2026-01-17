
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Save, Check, Loader2 } from 'lucide-react';

const ManagePricing: React.FC = () => {
  const { pricing, addPricingPlan, updatePricingPlan, deletePricingPlan, loading } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', period: 'mo', description: '', features: [] as string[], isPopular: false });
  const [featureInput, setFeatureInput] = useState('');

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updatePricingPlan(editingId, formData);
      } else {
        await addPricingPlan(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to save plan: " + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({...formData, features: [...formData.features, featureInput.trim()]});
      setFeatureInput('');
    }
  };

  const removeFeature = (idx: number) => {
    setFormData({...formData, features: formData.features.filter((_, i) => i !== idx)});
  };

  const openEdit = (p: any) => {
    setFormData(p);
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this pricing plan?")) {
      try {
        await deletePricingPlan(id);
      } catch (err) {
        alert("Failed to delete: " + (err as Error).message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#014034] mb-2">CMS: Pricing Plans</h1>
          <p className="text-gray-500">Manage your revenue models and growth packages.</p>
        </div>
        <button onClick={() => { setFormData({ name: '', price: '', period: 'mo', description: '', features: [], isPopular: false }); setEditingId(null); setIsModalOpen(true); }} className="bg-[#014034] text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg hover:bg-[#00332a] transition-all">
          <Plus size={20} />
          <span>New Plan</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center text-[#014034]">
          <Loader2 className="animate-spin mr-2" /> Loading pricing plans...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pricing.map(plan => (
            <div key={plan.id} className={`bg-white rounded-[2.5rem] p-10 border shadow-sm relative overflow-hidden transition-all ${plan.isPopular ? 'border-[#014034] ring-2 ring-[#014034]' : 'border-gray-100'}`}>
              {plan.isPopular && <div className="absolute top-0 right-0 bg-[#014034] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-bl-2xl">Popular Choice</div>}
              <h4 className="text-2xl font-bold text-[#014034] mb-2">{plan.name}</h4>
              <div className="text-4xl font-extrabold text-[#014034] mb-6">{plan.price}<span className="text-lg font-medium text-gray-400">{plan.period ? `/${plan.period}` : ''}</span></div>
              <ul className="space-y-3 mb-10">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600"><Check size={16} className="text-green-500 mr-2 shrink-0" /> {f}</li>
                ))}
              </ul>
              <div className="flex space-x-2">
                <button onClick={() => openEdit(plan)} className="flex-grow bg-[#014034]/5 text-[#014034] py-3 rounded-xl font-bold hover:bg-[#014034] hover:text-white transition-all">Edit</button>
                <button onClick={() => handleDelete(plan.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#014034]/40 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative z-10 p-10 animate-in zoom-in duration-300">
            <h3 className="text-2xl font-bold mb-8 text-[#014034]">{editingId ? 'Edit Plan' : 'New Plan'}</h3>
            <div className="space-y-5">
              <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034]" placeholder="Plan Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034]" placeholder="Price (e.g. $2,500)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034]" placeholder="Period (e.g. mo)" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} />
              </div>
              <textarea className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-[#014034]" placeholder="Description" rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#014034]">Features</label>
                <div className="flex space-x-2">
                  <input className="flex-grow px-5 py-3 rounded-xl border border-gray-200 outline-none" placeholder="Add feature..." value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && addFeature()} />
                  <button onClick={addFeature} className="p-3 bg-[#014034] text-white rounded-xl"><Plus size={20} /></button>
                </div>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                  {formData.features.map((f, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs flex items-center">
                      {f} <button onClick={() => removeFeature(i)} className="ml-2 text-gray-400 hover:text-red-500"><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>

              <label className="flex items-center space-x-3 cursor-pointer py-2">
                <input type="checkbox" className="w-5 h-5 accent-[#014034]" checked={formData.isPopular} onChange={e => setFormData({...formData, isPopular: e.target.checked})} />
                <span className="text-sm font-bold text-[#014034]">Mark as Popular Choice</span>
              </label>

              <div className="flex space-x-3 pt-4">
                <button onClick={handleSave} disabled={isSubmitting} className="flex-grow bg-[#014034] text-white py-4 rounded-xl font-bold shadow-lg flex justify-center items-center hover:bg-[#00332a] transition-all disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Plan'}
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

export default ManagePricing;
