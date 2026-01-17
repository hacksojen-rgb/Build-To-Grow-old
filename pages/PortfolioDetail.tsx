
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const PortfolioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { portfolio, loading } = useData();

  const project = portfolio.find(p => p.id === id);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-[#014034]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#014034]"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-40 pb-24 container mx-auto px-6 text-center">
        <h1 className="text-3xl font-bold text-[#014034] mb-4">Project Not Found</h1>
        <button 
          onClick={() => navigate('/portfolio')}
          className="bg-[#014034] text-white px-8 py-3 rounded-xl font-bold"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24">
      {/* Main Image on Top */}
      <div className="container mx-auto px-6 mb-16">
         <Link to="/portfolio" className="inline-flex items-center text-[#00695c] font-bold mb-8 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="mr-2" size={20} /> Back to Portfolio
          </Link>
        <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 aspect-[21/9] max-h-[600px]">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Header & Meta */}
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl">
          <span className="text-[#00695c] font-bold text-sm uppercase tracking-widest mb-4 block">
            {project.category}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#014034] mb-8 leading-[1.1]">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-12 border-t border-gray-200 pt-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Client</p>
              <p className="text-xl font-bold text-[#014034]">{project.client}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Expertise</p>
              <p className="text-xl font-bold text-[#014034]">{project.category}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Outcome</p>
              <div className="flex items-center text-xl font-bold text-green-600">
                <CheckCircle2 size={18} className="mr-2" /> Verified Growth
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Content */}
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <div className="prose prose-xl max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">
            {project.content || `This project for ${project.client} showcases our ability to deliver high-performance solutions in the ${project.category} space. By focusing on conversion-driven design and scalable architecture, we helped the client move their key business metrics forward.`}
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 p-12 md:p-16 deep-green-gradient rounded-[3rem] text-center text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready for similar impact?</h3>
            <p className="text-teal-50 text-xl mb-10 opacity-80">Let’s discuss your specific growth challenges and build a roadmap to success.</p>
            <Link 
              to="/get-quote" 
              className="bg-white text-[#014034] px-12 py-5 rounded-2xl font-extrabold text-xl hover:scale-105 transition-all inline-flex items-center shadow-xl"
            >
              Get a Free Quote <ChevronRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
