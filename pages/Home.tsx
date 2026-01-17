
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Quote, 
  Megaphone, 
  Code2, 
  Search, 
  PenTool, 
  Smartphone, 
  BarChart3,
  Video,
  Target,
  Zap,
  TrendingUp,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import { CLIENT_LOGOS, TESTIMONIALS } from '../constants';
import { useData } from '../context/DataContext';

const IconMap: Record<string, any> = {
  Megaphone,
  Code2,
  Search,
  PenTool,
  Smartphone,
  BarChart3,
  Video,
  Target
};

const Home: React.FC = () => {
  const { services, loading } = useData();

  if (loading && services.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-[#014034]">
        <Loader2 className="animate-spin w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <HeroSlider />

      {/* Client Logos */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-10">
            Trusted by Growing Businesses Worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mb-6">
            {CLIENT_LOGOS.map((logo, idx) => (
              <img key={idx} src={logo} alt="Client Logo" className="h-6 md:h-10 w-auto" />
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-300 italic">Logos shown for demonstration purposes.</p>
        </div>
      </section>

      {/* Services Overview - Outcome Driven */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#00695c] font-bold text-sm uppercase tracking-widest mb-4 block">Our Solutions</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#014034] mb-6 leading-tight">Engineered for Business Outcomes</h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              We focus on the metrics that matter. Our services are built to drive tangible growth, not just vanity metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = IconMap[service.icon] || Target;
              return (
                <div key={service.id} className="group p-10 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="w-16 h-16 bg-[#014034]/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#014034] transition-all duration-300">
                    <Icon className="text-[#014034] group-hover:text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#014034] mb-4 group-hover:text-[#00695c] transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  <Link to="/get-quote" className="inline-flex items-center text-[#00695c] font-bold text-base hover:gap-3 transition-all border-b-2 border-transparent hover:border-[#00695c] pb-1">
                    Book This Service <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Sharper Focus */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1470" 
                alt="Growth Strategy Meeting" 
                className="rounded-[3rem] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-8 -right-8 bg-[#014034] p-10 rounded-3xl text-white shadow-xl z-20 hidden md:block">
                <div className="flex items-center space-x-4">
                  <TrendingUp className="text-[#4DB6AC]" size={40} />
                  <div>
                    <h4 className="text-3xl font-bold">140%</h4>
                    <p className="text-teal-100 text-sm">Average Growth Increase</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <span className="text-[#00695c] font-bold text-sm uppercase tracking-widest mb-4 block">The Build to Grow Advantage</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#014034] mb-8 leading-tight">Strategy-First Execution</h2>
              <p className="text-gray-600 text-xl mb-10 leading-relaxed">
                We bridge the gap between business goals and digital execution. No fluff, just results.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Strategy-First Approach", desc: "We don't just execute; we align every pixel with your bottom line.", icon: Target },
                  { title: "Everything Under One Roof", desc: "A unified team handling design, dev, and growth to eliminate friction.", icon: Zap },
                  { title: "Business Results Over Vanity", desc: "We measure success by your leads and sales, not just likes and clicks.", icon: TrendingUp },
                  { title: "Clear Communication & Fast Execution", desc: "Agile workflows that move at the speed of your business.", icon: ShieldCheck }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-5">
                    <div className="mt-1 bg-[#014034]/5 p-2 rounded-lg text-[#014034]">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#014034] mb-1">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link to="/get-quote" className="bg-[#014034] text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#00332a] transition-all inline-flex items-center shadow-lg group">
                  Get Your Free Growth Plan
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - More Realistic */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#00695c] font-bold text-sm uppercase tracking-widest mb-4 block">Proven Results</span>
            <h2 className="text-4xl font-extrabold text-[#014034] mb-6">Real Results for Ambitious Brands</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="p-12 bg-white rounded-[2.5rem] relative shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
                <Quote className="text-[#014034]/5 absolute top-10 right-10" size={60} />
                <p className="text-gray-600 mb-10 italic text-xl leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-5">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full border-2 border-[#014034]/10" />
                  <div>
                    <h4 className="font-bold text-[#014034] text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-[#00695c] font-bold uppercase tracking-wider">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Optimized for conversion */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="deep-green-gradient rounded-[4rem] p-12 md:p-24 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-[1.1]">Ready to Grow Your Business?</h2>
              <p className="text-xl md:text-2xl text-teal-50 opacity-90 mb-12 leading-relaxed">
                Tell us about your goals and get a free growth plan within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Link to="/get-quote" className="w-full sm:w-auto bg-white text-[#014034] px-12 py-5 rounded-2xl font-extrabold text-xl hover:shadow-2xl hover:scale-105 transition-all">
                  Get a Free Growth Plan
                </Link>
                <Link to="/contact" className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white px-12 py-5 rounded-2xl font-extrabold text-xl hover:bg-white/10 transition-all">
                  Book a Consultation
                </Link>
              </div>
            </div>
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4DB6AC]/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
