
import React from 'react';
import { useData } from '../context/DataContext';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const { pricing } = useData();

  return (
    <div className="pt-32 pb-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#00695c] font-bold text-sm uppercase tracking-widest mb-4 block">Pricing Plans</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#014034] mb-6">Invest in Your Growth</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Transparent pricing models tailored for businesses at different stages of their journey. No hidden fees, just pure impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {pricing.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-white rounded-[3rem] p-12 border shadow-sm relative flex flex-col ${plan.isPopular ? 'border-[#014034] ring-2 ring-[#014034] lg:scale-105 z-10' : 'border-gray-100'}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#014034] text-white text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#014034] mb-4">{plan.name}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-5xl font-extrabold text-[#014034]">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 font-medium">/{plan.period}</span>}
                </div>
                <p className="text-gray-500 mt-6 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="flex-grow">
                <p className="font-bold text-[#014034] text-sm uppercase tracking-wider mb-6">What's included:</p>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <div className="bg-green-50 p-1 rounded-full mr-3 text-green-600">
                        <Check size={14} />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                to="/get-quote" 
                className={`w-full py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center space-x-3 transition-all ${plan.isPopular ? 'bg-[#014034] text-white hover:bg-[#00332a] shadow-xl' : 'bg-gray-100 text-[#014034] hover:bg-gray-200'}`}
              >
                <span>Get Started</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 text-lg">
            Need something more tailored? <Link to="/contact" className="text-[#00695c] font-bold hover:underline">Contact our sales team</Link> for a custom enterprise quote.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
