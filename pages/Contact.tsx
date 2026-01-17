
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { settings } = useData();
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log('Contact Form Data:', Object.fromEntries(formData));
    setStatus('Thank you! Your message has been sent.');
    e.currentTarget.reset();
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-extrabold text-[#014034] mb-8">Let's Talk</h1>
            <p className="text-xl text-gray-600 mb-12">
              Have a question or want to start a project? We're here to help you grow. Reach out and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-[#014034]/5 rounded-xl flex items-center justify-center text-[#014034] shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#014034]">Our Office</h4>
                  <p className="text-gray-600">{settings.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-[#014034]/5 rounded-xl flex items-center justify-center text-[#014034] shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#014034]">Call Us</h4>
                  <p className="text-gray-600">{settings.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-[#014034]/5 rounded-xl flex items-center justify-center text-[#014034] shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#014034]">Email Us</h4>
                  <p className="text-gray-600">{settings.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-[#014034] mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Name</label>
                  <input required name="name" type="text" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#014034]/20 focus:border-[#014034] transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <input required name="email" type="email" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#014034]/20 focus:border-[#014034] transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Subject</label>
                <input required name="subject" type="text" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#014034]/20 focus:border-[#014034] transition-all" placeholder="Project Inquiry" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea required name="message" rows={5} className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#014034]/20 focus:border-[#014034] transition-all" placeholder="Tell us more about your needs..." />
              </div>
              <button type="submit" className="w-full bg-[#014034] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#00332a] transition-all flex items-center justify-center space-x-2">
                <span>Send Message</span>
                <Send size={18} />
              </button>
              {status && <p className="text-green-600 font-medium text-center">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
