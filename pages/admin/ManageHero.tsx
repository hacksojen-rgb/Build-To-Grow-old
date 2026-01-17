
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Trash2, Edit2, Plus, X, Loader2 } from 'lucide-react';

const ManageHero: React.FC = () => {
  const { heroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide, loading } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', 
    subtitle: '', 
    ctaPrimary: 'Get Started', 
    ctaSecondary: 'Contact Us', 
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174' 
  });

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateHeroSlide(editingId, formData);
      } else {
        await addHeroSlide(formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', subtitle: '', ctaPrimary: 'Get Started', ctaSecondary: 'Contact Us', image: '' });
    } catch (err) {
      alert("Error saving hero slide: " + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (slide: any) => {
    setFormData(slide);
    setEditingId(slide.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this hero slide?")) {
      try {
        await deleteHeroSlide(id);
      } catch (err) {
        alert("Error deleting: " + (err as Error).message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#014034] mb-2">Hero Banners</h1>
          <p className="text-gray-500">Customize the first impression of your agency.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => { setFormData({ title: '', subtitle: '', ctaPrimary: 'Get Started', ctaSecondary: 'Contact Us', image: '' }); setShowForm(true); setEditingId(null); }}
            className="bg-[#014034] text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-[#00332a] transition-all shadow-lg"
          >
            <Plus size={20} />
            <span>Add Slide</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#014034]/10 mb-10 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-[#014034]">{editingId ? 'Edit Slide' : 'New Slide'}</h3>
            <button onClick={() => { setShowForm(false); setEditingId(null); }}><X size={24} className="text-gray-400" /></button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#014034]">Main Headline</label>
                <input 
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#014034]/20"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#014034]">Subheadline</label>
                <textarea 
                  rows={3}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#014034]/20"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#014034]">Primary CTA</label>
                  <input 
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#014034]/20"
                    value={formData.ctaPrimary}
                    onChange={(e) => setFormData({...formData, ctaPrimary: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#014034]">Secondary CTA</label>
                  <input 
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#014034]/20"
                    value={formData.ctaSecondary}
                    onChange={(e) => setFormData({...formData, ctaSecondary: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#014034]">Background Image URL</label>
                <input 
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#014034]/20"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-inner bg-gray-100">
                <img src={formData.image || 'https://via.placeholder.com/1920x1080'} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isSubmitting}
            className="w-full mt-10 bg-[#014034] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-[#00332a] transition-all disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            <span>{editingId ? 'Update Slide' : 'Publish Slide'}</span>
          </button>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex justify-center text-[#014034]"><Loader2 className="animate-spin mr-2" /> Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {heroSlides.map((slide, idx) => (
            <div key={slide.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row group">
              <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative">
                <img src={slide.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute top-4 left-4 bg-[#014034] text-white px-3 py-1 rounded-full text-xs font-bold">Slide #{idx + 1}</div>
              </div>
              <div className="flex-grow p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-[#014034] mb-3">{slide.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-2">{slide.subtitle}</p>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex space-x-4">
                    <span className="text-xs font-bold text-[#00695c] uppercase bg-teal-50 px-3 py-1 rounded-full">{slide.ctaPrimary}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase bg-gray-50 px-3 py-1 rounded-full">{slide.ctaSecondary}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => startEdit(slide)} className="p-3 rounded-xl text-blue-500 hover:bg-blue-50 transition-all"><Edit2 size={20} /></button>
                    <button onClick={() => handleDelete(slide.id)} className="p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"><Trash2 size={20} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageHero;
