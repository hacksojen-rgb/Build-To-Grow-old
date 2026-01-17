
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Services: React.FC = () => {
  const { services } = useData();

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#00695c] font-bold text-sm uppercase tracking-widest mb-4 block">Engineered for Results</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#014034] mb-8 leading-tight">Our Growth Ecosystem</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We don't just provide services; we implement systems. Every offering is designed to remove bottlenecks and accelerate your business trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service) => {
            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Target;
            return (
              <div key={service.id} className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row gap-10 hover:shadow-2xl transition-all duration-500 group">
                <div className="w-20 h-20 bg-[#014034] text-white rounded-[2rem] flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                  <Icon size={40} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-3xl font-bold text-[#014034] mb-6">{service.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {['Increased Conversions', 'Premium Branding', 'Strategic Positioning', 'Fast ROI'].map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-[#014034] font-bold text-sm">
                        <CheckCircle2 className="text-[#4DB6AC] mr-2" size={20} />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <Link 
                    to="/get-quote" 
                    className="inline-flex items-center bg-[#014034] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#00332a] transition-all group-hover:shadow-lg"
                  >
                    Discuss This Service
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 bg-gray-50 p-12 md:p-20 rounded-[4rem] text-center border border-gray-100 shadow-sm">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#014034] mb-6">Need a custom growth bundle?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Most of our clients see the best results when we combine web, design, and marketing into a single, unified growth strategy.
          </p>
          <Link 
            to="/get-quote" 
            className="bg-[#00695c] text-white px-12 py-5 rounded-2xl font-extrabold text-xl hover:bg-[#014034] transition-all shadow-xl inline-flex items-center"
          >
            Start Your Custom Project
            <ArrowRight className="ml-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
