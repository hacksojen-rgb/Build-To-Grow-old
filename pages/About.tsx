
import React from 'react';
import { Target, Users, Zap, Globe } from 'lucide-react';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
  const { settings } = useData();

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <span className="text-[#00695c] font-bold text-sm uppercase tracking-widest mb-3 block">Our Story</span>
            <h1 className="text-5xl font-extrabold text-[#014034] mb-8 leading-tight">{settings.aboutTitle}</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 whitespace-pre-wrap">
              {settings.aboutText}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-4xl font-extrabold text-[#014034] mb-1">250+</h4>
                <p className="text-gray-500 font-medium">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-4xl font-extrabold text-[#014034] mb-1">98%</h4>
                <p className="text-gray-500 font-medium">Client Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" className="rounded-[3rem] shadow-2xl" alt="About Us" />
            <div className="absolute -bottom-10 -right-10 bg-[#014034] p-10 rounded-3xl text-white hidden md:block">
              <h3 className="text-3xl font-bold mb-2 italic">"Growth is our only metric."</h3>
              <p className="text-teal-200">— Founder's Motto</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {[
            { icon: Target, title: "Our Mission", desc: "To empower every business with enterprise-grade digital tools." },
            { icon: Users, title: "Our Team", desc: "Collaborative experts passionate about pushing boundaries." },
            { icon: Zap, title: "Our Speed", desc: "Rapid deployment cycles without compromising quality." },
            { icon: Globe, title: "Our Reach", desc: "Global perspective with localized market strategies." }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 bg-[#014034]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#014034]">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#014034] mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
