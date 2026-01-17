
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Save, Loader2 } from 'lucide-react';

const ManageBlogs: React.FC = () => {
  const { blogs, addBlogPost, updateBlogPost, deleteBlogPost, loading } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', excerpt: '', author: '', category: '', imageUrl: '' });

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateBlogPost(editingId, formData);
      } else {
        await addBlogPost(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Error saving post: " + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEdit = (b: any) => {
    setFormData(b);
    setEditingId(b.id);
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setFormData({ title: '', excerpt: '', author: '', category: '', imageUrl: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete blog post?")) {
      try {
        await deleteBlogPost(id);
      } catch (err) {
        alert("Error deleting: " + (err as Error).message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#014034] mb-2">CMS: Blogs</h1>
          <p className="text-gray-500">Share insights and grow your authority.</p>
        </div>
        <button onClick={openAdd} className="bg-[#014034] text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg">
          <Plus size={20} />
          <span>New Post</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center text-[#014034]"><Loader2 className="animate-spin mr-2" /> Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {blogs.map(post => (
            <div key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center space-x-6">
              <img src={post.imageUrl} className="w-32 h-32 rounded-2xl object-cover shrink-0" alt="" />
              <div className="flex-grow">
                <span className="text-[10px] font-bold text-[#00695c] uppercase bg-teal-50 px-2 py-1 rounded-md">{post.category}</span>
                <h4 className="text-xl font-bold text-[#014034] my-2">{post.title}</h4>
                <p className="text-gray-500 text-sm line-clamp-1">{post.excerpt}</p>
                <div className="mt-3 text-xs text-gray-400">By {post.author} • {post.date}</div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => openEdit(post)} className="p-3 rounded-xl text-blue-500 hover:bg-blue-50 transition-all"><Edit2 size={20} /></button>
                <button onClick={() => handleDelete(post.id)} className="p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#014034]/40 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 p-10 animate-in zoom-in duration-300">
            <h3 className="text-2xl font-bold mb-8 text-[#014034]">{editingId ? 'Edit Post' : 'New Post'}</h3>
            <div className="space-y-6">
              <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none" placeholder="Blog Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none" placeholder="Author" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
              </div>
              <textarea className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none" placeholder="Excerpt" rows={3} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
              <input className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none" placeholder="Header Image URL" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              <div className="flex space-x-3 pt-4">
                <button onClick={handleSave} disabled={isSubmitting} className="flex-grow bg-[#014034] text-white py-4 rounded-xl font-bold shadow-lg flex justify-center items-center">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Publish Post'}
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

export default ManageBlogs;
