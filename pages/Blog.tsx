
import React from 'react';
import { useData } from '../context/DataContext';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const { blogs } = useData();
  
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-extrabold text-[#014034] mb-6">Our Blog</h1>
          <p className="text-xl text-gray-600">
            Insights, trends, and strategies from our team of digital experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.map((post) => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-56 object-cover"
              />
              <div className="p-8 flex-grow">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-[#014034]/10 text-[#014034] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#014034] mb-4 hover:text-[#00695c] transition-colors cursor-pointer leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <button className="text-[#014034] font-bold inline-flex items-center hover:translate-x-1 transition-transform">
                    Read More <ArrowRight className="ml-1" size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
