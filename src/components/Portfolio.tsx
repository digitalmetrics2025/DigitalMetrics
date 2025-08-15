import React, { useState } from 'react';
import { ExternalLink, Code, TrendingUp, Users, DollarSign, Eye } from 'lucide-react';
import PopupForm from './PopupForm';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'TechStart E-commerce Platform',
      category: 'ecommerce',
      type: 'Full Integration',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complete e-commerce solution with integrated marketing automation',
      metrics: {
        revenue: '+340% Revenue Growth',
        traffic: '2.5M Monthly Visitors',
        conversion: '8.3% Conversion Rate'
      },
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      marketing: ['SEO', 'PPC', 'Email Marketing', 'Social Media']
    },
    {
      id: 2,
      title: 'HealthCare Mobile App',
      category: 'mobile',
      type: 'App + Campaign',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Healthcare app with comprehensive digital marketing strategy',
      metrics: {
        downloads: '500K+ Downloads',
        retention: '85% User Retention',
        rating: '4.8★ App Store Rating'
      },
      tech: ['React Native', 'Firebase', 'Python', 'AWS'],
      marketing: ['Content Marketing', 'Influencer Outreach', 'ASO', 'PR']
    },
    {
      id: 3,
      title: 'FinTech SaaS Platform',
      category: 'saas',
      type: 'Platform + Growth',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Enterprise SaaS platform with lead generation system',
      metrics: {
        users: '50K+ Active Users',
        growth: '+180% MRR Growth',
        leads: '300% More Qualified Leads'
      },
      tech: ['Vue.js', 'Laravel', 'PostgreSQL', 'Redis'],
      marketing: ['Account-Based Marketing', 'LinkedIn Ads', 'Webinars', 'SEO']
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Projects', icon: Eye },
    { id: 'ecommerce', label: 'E-commerce', icon: DollarSign },
    { id: 'mobile', label: 'Mobile Apps', icon: Users },
    { id: 'saas', label: 'SaaS Platforms', icon: TrendingUp }
  ];

  const filteredProjects = activeTab === 'all' ? projects : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            Portfolio of Excellence
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Every project tells a story of transformation. Here's how we've helped brands grow and technologies scale.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-1 gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 group">
              <div className="lg:flex">
                {/* Project Image */}
                <div className="lg:w-1/2 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.type}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="lg:w-1/2 p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
                        <span className="text-slate-300 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech & Marketing Stack */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Code className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-slate-300">Tech Stack:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium text-slate-300">Marketing:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.marketing.map((strategy) => (
                          <span key={strategy} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                            {strategy}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300">
                    <span>View Case Study</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Join Our Success Stories?</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Let's create something extraordinary together. From concept to launch, from traffic to conversions.
          </p>
          <button 
            onClick={() => setIsPopupOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Start Your Project
          </button>
        </div>
      </div>
      
      {/* Popup Form */}
      <PopupForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
};

export default Portfolio;