
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Service, 
  HeroSlide, 
  Lead, 
  PortfolioProject, 
  BlogPost, 
  SiteSettings, 
  PricingPlan 
} from '../types';
import { supabase } from '../supabaseClient';

interface DataContextType {
  services: Service[];
  heroSlides: HeroSlide[];
  leads: Lead[];
  portfolio: PortfolioProject[];
  blogs: BlogPost[];
  settings: SiteSettings;
  pricing: PricingPlan[];
  loading: boolean;
  
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => Promise<void>;
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => Promise<void>;
  deleteHeroSlide: (id: string) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => Promise<void>;
  updateLeadStatus: (id: string, status: Lead['status']) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  addPortfolioItem: (item: Omit<PortfolioProject, 'id'>) => Promise<void>;
  updatePortfolioItem: (id: string, item: Partial<PortfolioProject>) => Promise<void>;
  deletePortfolioItem: (id: string) => Promise<void>;
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  addPricingPlan: (plan: Omit<PricingPlan, 'id'>) => Promise<void>;
  updatePricingPlan: (id: string, plan: Partial<PricingPlan>) => Promise<void>;
  deletePricingPlan: (id: string) => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
}

const DEFAULT_SETTINGS: SiteSettings = {
  companyName: 'Build to Grow',
  address: '123 Innovation Drive, Tech Valley, CA 94043',
  phone: '+1 (555) 123-4567',
  email: 'hello@buildtogrow.com',
  facebook: '#',
  twitter: '#',
  instagram: '#',
  linkedin: '#',
  aboutTitle: 'Fueling Growth for Tomorrow\'s Leaders',
  aboutText: 'Founded in 2018, Build to Grow started with a simple vision: to bridge the gap between complex technology and business success.'
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  const fetchData = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        supabase.from('services').select('*').order('created_at', { ascending: true }),
        supabase.from('hero_slides').select('*').order('created_at', { ascending: true }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('portfolio').select('*').order('created_at', { ascending: false }),
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('pricing_plans').select('*').order('created_at', { ascending: true }),
        supabase.from('site_settings').select('*').maybeSingle()
      ]);

      const [srv, hero, lds, port, blgs, prc, sett] = results.map(res => 
        res.status === 'fulfilled' ? res.value : { data: null, error: res.reason }
      );

      // NO CONSTANTS: Strictly fetch from database. If empty, the page will be empty.
      setServices(srv.data || []);
      setHeroSlides(hero.data || []);
      setLeads(lds.data || []);
      setPortfolio(port.data || []);
      setBlogs(blgs.data || []);
      setPricing(prc.data || []);
      
      if (sett.data) {
        setSettings({ ...DEFAULT_SETTINGS, ...sett.data });
      } else {
        setSettings(DEFAULT_SETTINGS);
      }
    } catch (error) {
      console.error("Critical error syncing with Supabase:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CRUD Implementations using camelCase columns
  const addService = async (s: Omit<Service, 'id'>) => {
    const { data, error } = await supabase.from('services').insert([s]).select();
    if (error) throw error;
    if (data) setServices(prev => [...prev, data[0]]);
  };
  const updateService = async (id: string, f: Partial<Service>) => {
    const { error } = await supabase.from('services').update(f).eq('id', id);
    if (error) throw error;
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...f } : s));
  };
  const deleteService = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw error;
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addHeroSlide = async (s: Omit<HeroSlide, 'id'>) => {
    const { data, error } = await supabase.from('hero_slides').insert([s]).select();
    if (error) throw error;
    if (data) setHeroSlides(prev => [...prev, data[0]]);
  };
  const updateHeroSlide = async (id: string, f: Partial<HeroSlide>) => {
    const { error } = await supabase.from('hero_slides').update(f).eq('id', id);
    if (error) throw error;
    setHeroSlides(prev => prev.map(s => s.id === id ? { ...s, ...f } : s));
  };
  const deleteHeroSlide = async (id: string) => {
    const { error } = await supabase.from('hero_slides').delete().eq('id', id);
    if (error) throw error;
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  const addLead = async (l: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const newLead = { ...l, status: 'pending', date: new Date().toLocaleDateString() };
    const { data, error } = await supabase.from('leads').insert([newLead]).select();
    if (error) throw error;
    if (data) setLeads(prev => [data[0], ...prev]);
  };
  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (error) throw error;
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };
  const deleteLead = async (id: string) => {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw error;
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const addPortfolioItem = async (i: Omit<PortfolioProject, 'id'>) => {
    const { data, error } = await supabase.from('portfolio').insert([i]).select();
    if (error) throw error;
    if (data) setPortfolio(prev => [data[0], ...prev]);
  };
  const updatePortfolioItem = async (id: string, f: Partial<PortfolioProject>) => {
    const { error } = await supabase.from('portfolio').update(f).eq('id', id);
    if (error) throw error;
    setPortfolio(prev => prev.map(i => i.id === id ? { ...i, ...f } : i));
  };
  const deletePortfolioItem = async (id: string) => {
    const { error } = await supabase.from('portfolio').delete().eq('id', id);
    if (error) throw error;
    setPortfolio(prev => prev.filter(i => i.id !== id));
  };

  const addBlogPost = async (p: Omit<BlogPost, 'id' | 'date'>) => {
    const newPost = { ...p, date: new Date().toLocaleDateString() };
    const { data, error } = await supabase.from('blogs').insert([newPost]).select();
    if (error) throw error;
    if (data) setBlogs(prev => [data[0], ...prev]);
  };
  const updateBlogPost = async (id: string, f: Partial<BlogPost>) => {
    const { error } = await supabase.from('blogs').update(f).eq('id', id);
    if (error) throw error;
    setBlogs(prev => prev.map(p => p.id === id ? { ...p, ...f } : p));
  };
  const deleteBlogPost = async (id: string) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) throw error;
    setBlogs(prev => prev.filter(p => p.id !== id));
  };

  const addPricingPlan = async (p: Omit<PricingPlan, 'id'>) => {
    const { data, error } = await supabase.from('pricing_plans').insert([p]).select();
    if (error) throw error;
    if (data) setPricing(prev => [...prev, data[0]]);
  };
  const updatePricingPlan = async (id: string, f: Partial<PricingPlan>) => {
    const { error } = await supabase.from('pricing_plans').update(f).eq('id', id);
    if (error) throw error;
    setPricing(prev => prev.map(p => p.id === id ? { ...p, ...f } : p));
  };
  const deletePricingPlan = async (id: string) => {
    const { error } = await supabase.from('pricing_plans').delete().eq('id', id);
    if (error) throw error;
    setPricing(prev => prev.filter(p => p.id !== id));
  };

  const updateSettings = async (f: Partial<SiteSettings>) => {
    const updated = { id: 1, ...settings, ...f };
    const { error } = await supabase.from('site_settings').upsert(updated);
    if (error) throw error;
    setSettings(prev => ({ ...prev, ...f }));
  };

  return (
    <DataContext.Provider value={{ 
      services, heroSlides, leads, portfolio, blogs, settings, pricing, loading,
      addService, updateService, deleteService,
      addHeroSlide, updateHeroSlide, deleteHeroSlide,
      addLead, updateLeadStatus, deleteLead,
      addPortfolioItem, updatePortfolioItem, deletePortfolioItem,
      addBlogPost, updateBlogPost, deleteBlogPost,
      addPricingPlan, updatePricingPlan, deletePricingPlan,
      updateSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
