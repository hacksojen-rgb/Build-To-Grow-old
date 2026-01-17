
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { settings } = useData();

  const companyName = settings?.companyName || 'Build to Grow';
  const nameParts = companyName.split(' ');
  const firstWord = nameParts[0];
  const rest = nameParts.slice(1).join(' ');

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-[#014034] p-1.5 rounded-lg">
                <Rocket className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#014034]">
                {firstWord}<span className="text-[#00695c]">{rest}</span>
              </span>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              We empower startups and enterprises with high-performance digital solutions designed to drive significant business growth.
            </p>
            <div className="flex space-x-4">
              <a href={settings.facebook} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#014034] hover:border-[#014034] transition-all">
                <Facebook size={18} />
              </a>
              <a href={settings.twitter} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#014034] hover:border-[#014034] transition-all">
                <Twitter size={18} />
              </a>
              <a href={settings.instagram} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#014034] hover:border-[#014034] transition-all">
                <Instagram size={18} />
              </a>
              <a href={settings.linkedin} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#014034] hover:border-[#014034] transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-[#014034] mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Portfolio', 'About', 'Pricing', 'Blog'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-[#014034] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold text-[#014034] mb-6">Support</h4>
            <ul className="space-y-4">
              {['Contact Support', 'Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Help Center'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-[#014034] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-[#014034] mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-[#00695c] w-5 h-5 mt-1 shrink-0" />
                <span className="text-gray-600">{settings.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-[#00695c] w-5 h-5 shrink-0" />
                <span className="text-gray-600">{settings.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-[#00695c] w-5 h-5 shrink-0" />
                <span className="text-gray-600">{settings.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {companyName} Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
