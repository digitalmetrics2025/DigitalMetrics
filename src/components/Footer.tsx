import React from 'react';
import { Code, TrendingUp, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { subscribeToNewsletter } from '../services/firebaseService';

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center space-x-3';
        successMessage.innerHTML = `
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <div>
            <div class="font-semibold">Successfully Subscribed!</div>
            <div class="text-sm opacity-90">Welcome to our newsletter community.</div>
          </div>
        `;
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
          if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
          }
        }, 5000);
        
        setEmail('');
      } else {
        console.error('Newsletter subscription failed:', result.error);
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'fixed top-4 right-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center space-x-3';
        errorMessage.innerHTML = `
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <div>
            <div class="font-semibold">Subscription Failed</div>
            <div class="text-sm opacity-90">Please try again later.</div>
          </div>
        `;
        document.body.appendChild(errorMessage);
        
        setTimeout(() => {
          if (errorMessage.parentNode) {
            errorMessage.parentNode.removeChild(errorMessage);
          }
        }, 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // Show error message for catch block
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center space-x-3';
      errorMessage.innerHTML = `
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <div>
          <div class="font-semibold">Connection Error</div>
          <div class="text-sm opacity-90">Please check your connection and try again.</div>
        </div>
      `;
      document.body.appendChild(errorMessage);
      
      setTimeout(() => {
        if (errorMessage.parentNode) {
          errorMessage.parentNode.removeChild(errorMessage);
        }
      }, 5000);
    }
    setIsSubscribing(false);
  };

  const services = [
    'SEO Optimization',
    'Web Development',
    'Mobile Apps',
    'PPC Campaigns',
    'E-commerce Platforms',
    'Social Media Marketing'
  ];

  const company = [
    'About Us',
    'Our Team',
    'Careers',
    'Case Studies',
    'Blog',
    'Contact'
  ];

  const resources = [
    'Free Tools',
    'Marketing Guides',
    'Development Blog',
    'Industry Reports',
    'Webinars',
    'Support'
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <Code className="h-8 w-8 text-blue-400" />
                <TrendingUp className="h-4 w-4 text-green-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Digital Metrics
              </span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed max-w-md">
              The perfect fusion of creative marketing vision and rock-solid tech expertise. 
              From strategy to code, we deliver excellence that drives real business results.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                <Linkedin className="h-5 w-5 text-slate-400 hover:text-blue-400" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                <Twitter className="h-5 w-5 text-slate-400 hover:text-blue-400" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                <Github className="h-5 w-5 text-slate-400 hover:text-green-400" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {company.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {resources.map((resource) => (
                  <li key={resource}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <span className="text-slate-400">hello@digitalmetrics.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-400" />
              <span className="text-slate-400">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span className="text-slate-400">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-slate-800/50 rounded-2xl p-8 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Ahead of the Curve</h3>
            <p className="text-slate-400 mb-6">Get the latest insights on digital marketing and development trends.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:from-slate-600 disabled:to-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 Digital Metrics. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;