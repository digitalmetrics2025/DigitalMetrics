import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import PopupForm from './PopupForm';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const texts = [
    'We Grow Your Brand.',
    'We Build Your Future.',
    'We Deliver Results.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 animate-pulse">
        <Sparkles className="h-6 w-6 text-blue-400 opacity-60" />
      </div>
      <div className="absolute top-1/3 right-1/3 animate-bounce delay-1000">
        <Zap className="h-8 w-8 text-green-400 opacity-60" />
      </div>
      <div className="absolute bottom-1/4 left-1/6 animate-pulse delay-2000">
        <Sparkles className="h-4 w-4 text-purple-400 opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-8 h-20 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {texts[currentText].split(' ').slice(0, -2).join(' ')}
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                {texts[currentText].split(' ').slice(-2).join(' ')}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            The perfect fusion of <span className="text-blue-400 font-semibold">creative marketing vision</span> and 
            <span className="text-green-400 font-semibold"> rock-solid tech expertise</span>. 
            From strategy to code, we deliver excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => setIsPopupOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-2xl"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 backdrop-blur-sm">
              <Link to="/portfolio" className="block w-full h-full">
                View Our Work
              </Link>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Projects Delivered' },
              { number: '99%', label: 'Client Satisfaction' },
              { number: '5X', label: 'Average ROI Increase' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center cursor-pointer" onClick={() => {
          const servicesSection = document.querySelector('#services');
          servicesSection?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-green-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      
      {/* Popup Form */}
      <PopupForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
};

export default Hero;