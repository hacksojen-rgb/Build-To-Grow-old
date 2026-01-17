
import React from 'react';
import { useData } from '../../context/DataContext';
import { Mail, Phone, Briefcase, ExternalLink, Trash2 } from 'lucide-react';

const Leads: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead } = useData();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-600';
      case 'approved':
        return 'bg-green-100 text-green-600';
      case 'completed':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#014034] mb-2">Lead Submissions</h1>
          <p className="text-gray-500">Review project inquiries and manage follow-up workflows.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider">Contact</th>
                <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider">Company & Budget</th>
                <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider">Challenge & Message</th>
                <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-sm font-bold text-[#014034] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-400 italic">No project inquiries collected yet.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="font-bold text-[#014034]">{lead.firstName} {lead.lastName}</p>
                        <div className="flex items-center text-xs text-gray-500 space-x-2">
                          <Mail size={12} className="shrink-0" />
                          <span className="truncate max-w-[150px]">{lead.email}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 space-x-2">
                          <Phone size={12} className="shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-700">{lead.company}</p>
                        <p className="text-xs text-[#00695c] font-bold">{lead.budget}</p>
                        {lead.website && (
                          <a href={lead.website} target="_blank" rel="noreferrer" className="text-[10px] text-blue-500 flex items-center hover:underline">
                            View Website <ExternalLink size={10} className="ml-1" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 max-w-xs">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-[#014034] uppercase tracking-tight">Challenge:</p>
                        <p className="text-sm text-gray-600 line-clamp-2 italic">"{lead.growthChallenge}"</p>
                        <p className="text-[10px] text-gray-400">Date: {lead.date}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-[#014034]/20 outline-none cursor-pointer transition-all ${getStatusStyles(lead.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this lead?')) {
                            deleteLead(lead.id);
                          }
                        }}
                        className="text-red-400 hover:text-red-600 p-3 rounded-xl hover:bg-red-50 transition-all"
                        title="Delete lead"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
