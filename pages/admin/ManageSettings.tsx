
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Globe, Share2, Loader2 } from 'lucide-react';

const ManageSettings: React.FC = () => {
  const { settings, updateSettings, loading } = useData();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Ensure we are using the exact camelCase keys as provided by the user
      await updateSettings({
        ...formData
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Error updating settings: " + (err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="py-20 flex justify-center text-[#014034]"><Loader2 className="animate-spin mr-2" /> Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#014034] mb-2">General Settings</h1>
          <p className="text-gray-500">Configure global company info and branding.</p>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="bg-[#014034] text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg disabled:opacity-50 transition-all hover:bg-[#00332a]">
          {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          <span>Save Changes</span>
        </button>
      </div>

      {saved && <div className="p-4 bg-green-50 text-green-600 rounded-xl font-bold text-center border border-green-200 animate-in fade-in slide-in-from-top-2">Settings updated successfully!</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
          <h3 className="text-xl font-bold text-[#014034] flex items-center space-x-3">
            <Globe className="text-[#00695c]" />
            <span>Company Information</span>
          </h3>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Company Name</label>
              <input className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#014034] transition-all" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Address</label>
              <input className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#014034] transition-all" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Phone</label>
                <input className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#014034] transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
                <input className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#014034] transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#014034] flex items-center space-x-3 pt-6 border-t border-gray-100">
            <Share2 className="text-[#00695c]" />
            <span>Social Links</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#014034] transition-all" placeholder="Facebook URL" value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} />
            <input className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#014034] transition-all" placeholder="Twitter URL" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} />
            <input className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#014034] transition-all" placeholder="Instagram URL" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
            <input className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#014034] transition-all" placeholder="LinkedIn URL" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} />
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
          <h3 className="text-xl font-bold text-[#014034]">About Page Content</h3>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Main Heading (aboutTitle)</label>
              <input className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none font-bold focus:border-[#014034] transition-all" value={formData.aboutTitle} onChange={e => setFormData({...formData, aboutTitle: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">About Text (aboutText)</label>
              <textarea className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none leading-relaxed focus:border-[#014034] transition-all" rows={12} value={formData.aboutText} onChange={e => setFormData({...formData, aboutText: e.target.value})} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSettings;
