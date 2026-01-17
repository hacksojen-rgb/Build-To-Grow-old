
import React, { useState } from 'react';
import { Rocket, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const GetAQuote: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { addLead } = useData();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    addLead({
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      email: data.email as string,
      phone: data.phone as string,
      company: data.company as string,
      website: data.website as string,
      budget: data.budget as string,
      decisionMaker: data.decisionMaker as string,
      growthChallenge: data.growthChallenge as string,
      message: data.message as string,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-24 container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-gray-100">
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={56} />
          </div>
          <h2 className="text-4xl font-extrabold text-[#014034] mb-6">Discovery Call Requested!</h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Our lead growth strategist is reviewing your profile. We usually respond within 24 hours to schedule your strategy session.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-[#014034] text-white px-12 py-5 rounded-2xl font-extrabold text-lg hover:bg-[#00332a] transition-all shadow-xl"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#00695c] font-bold text-sm uppercase tracking-widest mb-4 block">Let's Build Together</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#014034] mb-6 leading-tight">Tell us about your business</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete this short brief to help us understand your growth goals. We'll get back to you with a tailored strategy within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl border border-gray-100">
            {/* Section: Contact Info */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#014034] mb-8 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#014034] text-white text-sm flex items-center justify-center mr-3">1</span>
                Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-extrabold text-[#014034]">First Name*</label>
                  <input required name="firstName" type="text" className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] outline-none transition-all" placeholder="Jane" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-extrabold text-[#014034]">Last Name*</label>
                  <input required name="lastName" type="text" className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] outline-none transition-all" placeholder="Doe" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-extrabold text-[#014034]">Work Email*</label>
                  <input required name="email" type="email" className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] outline-none transition-all" placeholder="jane@company.com" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-extrabold text-[#014034]">Phone Number*</label>
                  <input required name="phone" type="tel" className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] outline-none transition-all" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>

            {/* Section: Company & Project Info */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#014034] mb-8 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#014034] text-white text-sm flex items-center justify-center mr-3">2</span>
                Business Profiling
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="text-sm font-extrabold text-[#014034]">Company Name*</label>
                  <input required name="company" type="text" className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] outline-none transition-all" placeholder="Acme Growth Co." />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-extrabold text-[#014034]">Website URL (Optional)</label>
                  <input name="website" type="url" className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] outline-none transition-all" placeholder="https://www.acme.com" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-extrabold text-[#014034]">Monthly Budget Range*</label>
                  <select required name="budget" className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] outline-none bg-white">
                    <option value="">Select a range</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-plus">$50,000+</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-extrabold text-[#014034]">Are you the decision maker?*</label>
                  <div className="flex gap-4 pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="decisionMaker" value="yes" required className="w-5 h-5 accent-[#014034]" />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="decisionMaker" value="no" className="w-5 h-5 accent-[#014034]" />
                      <span className="text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <label className="text-sm font-extrabold text-[#014034]">What is your biggest growth challenge right now?*</label>
                <textarea required name="growthChallenge" rows={3} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] outline-none transition-all" placeholder="e.g. High customer acquisition costs, low conversion on current site, brand invisibility..." />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-extrabold text-[#014034]">Project Objectives*</label>
                <textarea required name="message" rows={4} className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-[#014034]/5 focus:border-[#014034] outline-none transition-all" placeholder="Briefly describe what success looks like for this project..." />
              </div>
            </div>

            <div className="flex items-start space-x-4 mb-10 bg-gray-50 p-6 rounded-2xl">
              <input required type="checkbox" name="consent" className="mt-1.5 w-5 h-5 accent-[#014034] shrink-0" />
              <p className="text-sm text-gray-500 leading-relaxed">
                I agree to the <a href="#" className="underline">Privacy Policy</a> and consent to Build to Grow contacting me about my project and future growth insights. We value your privacy and never sell data.
              </p>
            </div>

            <div className="text-center">
              <button type="submit" className="w-full bg-[#014034] text-white py-6 rounded-2xl font-extrabold text-2xl hover:bg-[#00332a] transition-all flex items-center justify-center space-x-4 shadow-2xl group">
                <span>Generate My Growth Plan</span>
                <Rocket size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <p className="mt-6 text-gray-400 font-medium flex items-center justify-center">
                <ShieldCheck size={18} className="mr-2 text-green-600" />
                Your data is secure. We usually respond within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetAQuote;
