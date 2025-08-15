import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Code, 
  Smartphone, 
  Search, 
  Share2, 
  MousePointer, 
  Mail, 
  ShoppingCart,
  Monitor,
  Palette
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      category: 'Brand Growth',
      icon: TrendingUp,
      color: 'from-blue-600 to-blue-400',
      services: [
        { name: 'SEO Optimization', icon: Search, description: 'Dominate search rankings with data-driven strategies', href: '/services/seo' },
        { name: 'Social Media Marketing', icon: Share2, description: 'Build engaged communities across all platforms', href: '/services/social-media' },
        { name: 'PPC Campaigns', icon: MousePointer, description: 'Maximize ROI with precision-targeted advertising', href: '/services/ppc' },
        { name: 'Email Marketing', icon: Mail, description: 'Convert prospects with personalized campaigns', href: '/services/email-marketing' }
      ]
    },
    {
      category: 'Digital Infrastructure',
      icon: Code,
      color: 'from-green-600 to-green-400',
      services: [
        { name: 'Custom Websites', icon: Monitor, description: 'Beautiful, fast, and conversion-optimized sites', href: '/services/web-development' },
        { name: 'Mobile Apps', icon: Smartphone, description: 'Native and cross-platform app development', href: '/services/mobile-apps' },
        { name: 'E-commerce Platforms', icon: ShoppingCart, description: 'Scalable online stores that drive sales', href: '/services/ecommerce' }
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            One Team. Complete Solutions.
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We don't just offer services—we create ecosystems. Every project combines marketing brilliance 
            with technical excellence to deliver measurable results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {services.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{category.category}</h3>
              </div>

              {/* Services List */}
              <div className="space-y-6">
                {category.services.map((service, serviceIndex) => (
                  <Link 
                    key={serviceIndex} 
                    to={service.href}
                    className="block group hover:bg-slate-700/30 p-4 rounded-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-slate-700 group-hover:bg-slate-600 rounded-lg transition-colors duration-300">
                        <service.icon className="h-5 w-5 text-slate-300 group-hover:text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          {service.name}
                        </h4>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Message */}
        <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-2xl p-8 text-center border border-slate-700/50">
          <h3 className="text-3xl font-bold text-white mb-4">
            The Power of Integration
          </h3>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-6">
            Unlike agencies that specialize in just marketing or just development, we seamlessly blend both. 
            Your website isn't just beautiful—it's optimized for conversions. Your campaigns don't just drive traffic—they drive results.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105">
            Discover How We Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;