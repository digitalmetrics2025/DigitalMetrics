import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code, TrendingUp, ChevronDown } from 'lucide-react';
import PopupForm from './PopupForm';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '#services', hasDropdown: true },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const serviceDropdownItems = [
    { name: 'SEO Optimization', href: '/services/seo', description: 'Dominate search rankings' },
    { name: 'Social Media Marketing', href: '/services/social-media', description: 'Build engaged communities' },
    { name: 'PPC Campaigns', href: '/services/ppc', description: 'Maximize advertising ROI' },
    { name: 'Email Marketing', href: '/services/email-marketing', description: 'Convert with personalized campaigns' },
    { name: 'Custom Websites', href: '/services/web-development', description: 'Beautiful, fast websites' },
    { name: 'Mobile Apps', href: '/services/mobile-apps', description: 'Native & cross-platform apps' },
    { name: 'E-commerce Platforms', href: '/services/ecommerce', description: 'Scalable online stores' },
  ];

  return (
    <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/50 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Code className="h-8 w-8 text-blue-400" />
              <TrendingUp className="h-4 w-4 text-green-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Digital Metrics
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.name} className="relative">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      onMouseEnter={() => setIsServicesOpen(true)}
                      className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Services Dropdown */}
                    {isServicesOpen && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl z-50"
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <div className="p-4">
                          <div className="grid grid-cols-1 gap-1">
                            {serviceDropdownItems.map((service) => (
                              <Link
                                key={service.name}
                                to={service.href}
                                className="block p-3 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 group"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                <div className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors duration-200">
                                  {service.name}
                                </div>
                                <div className="text-slate-400 text-xs mt-1">
                                  {service.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-slate-700 mt-4 pt-4">
                            <a
                              href="#services"
                              className="block text-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              View All Services
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href.startsWith('#') ? '/' : item.href}
                  className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                  onClick={() => {
                    if (item.href.startsWith('#')) {
                      const element = document.querySelector(item.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
            
            {/* Admin Link */}
            <Link
              to="/admin"
              className="bg-slate-800 hover:bg-slate-700 text-orange-400 hover:text-orange-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-orange-400/30 hover:border-orange-300/50"
            >
              CRM Panel
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href.startsWith('#') ? '/' : item.href}
                  className="block px-3 py-2 text-slate-300 hover:text-white transition-colors duration-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (item.href.startsWith('#')) {
                      setTimeout(() => {
                        const element = document.querySelector(item.href);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsPopupOpen(true);
                }}
                className="w-full text-left bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-2 rounded-md text-sm font-medium mt-4"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {/* Popup Form */}
      <PopupForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </header>
  );
};

export default Header;