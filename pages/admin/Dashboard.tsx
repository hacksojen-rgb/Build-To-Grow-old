
import React from 'react';
import { useData } from '../../context/DataContext';
import { Users, Settings, Image as ImageIcon, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { leads, services, heroSlides } = useData();

  const stats = [
    { label: 'Total Leads', value: leads.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Services', value: services.length, icon: Settings, color: 'bg-green-500' },
    { label: 'Hero Slides', value: heroSlides.length, icon: ImageIcon, color: 'bg-purple-500' },
    { label: 'Pending (New)', value: leads.filter(l => l.status === 'pending').length, icon: ArrowUpRight, color: 'bg-orange-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-600';
      case 'approved': return 'bg-green-100 text-green-600';
      case 'completed': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-[#014034] mb-2">Agency Dashboard</h1>
        <p className="text-gray-500">Monitor your growth performance and manage site content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-5">
            <div className={`${stat.color} p-4 rounded-2xl text-white`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-extrabold text-[#014034]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#014034]">Recent Leads</h3>
            <Link to="/admin/leads" className="text-[#00695c] font-bold text-sm hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {leads.length === 0 ? (
              <p className="text-gray-400 italic">No leads collected yet.</p>
            ) : (
              leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold text-[#014034]">{lead.firstName} {lead.lastName}</p>
                    <p className="text-xs text-gray-500">{lead.company} • {lead.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-[#014034] p-8 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10">
            <h3 className="text-2xl font-extrabold mb-4">Website Health</h3>
            <p className="text-teal-100/70 mb-8 leading-relaxed">Your high-conversion landing pages are currently performing at peak capacity.</p>
            <div className="space-y-4">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-[#4DB6AC] h-full w-[92%]" />
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#4DB6AC]">
                <span>Speed Score</span>
                <span>92/100</span>
              </div>
            </div>
          </div>
          <ImageIcon className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
