
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import { useData } from '../context/DataContext';

const Navbar: React.FC = () => {
  const { settings } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const companyName = settings?.companyName || 'Build to Grow';
  const nameParts = companyName.split(' ');
  const firstWord = nameParts[0];
  const rest = nameParts.slice(1).join(' ');

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-[#014034] p-1.5 rounded-lg">
              <Rocket className="text-white w-6 h-6" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-[#014034]' : 'text-[#014034]'}`}>
              {firstWord}<span className="text-[#00695c]">{rest}</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#014034] ${location.pathname === link.path ? 'text-[#014034] font-semibold' : 'text-gray-600'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#014034]">Login</Link>
              <Link to="/get-quote" className="bg-[#014034] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00332a] transition-all shadow-lg hover:shadow-xl">
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-[#014034]" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col items-center space-y-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-medium ${location.pathname === link.path ? 'text-[#014034]' : 'text-gray-600'}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="w-full px-8 pt-4 border-t border-gray-100 flex flex-col space-y-4">
            <Link to="/login" className="text-center py-2 text-gray-600 font-medium" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/get-quote" className="bg-[#014034] text-white py-3 rounded-lg text-center font-bold" onClick={() => setIsOpen(false)}>Get a Quote</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
