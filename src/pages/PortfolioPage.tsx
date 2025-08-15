import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  ExternalLink, 
  Code, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye,
  Calendar,
  MapPin,
  Star,
  ArrowRight,
  Filter,
  Search,
  Play,
  Award,
  Target,
  Zap
} from 'lucide-react';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: 'TechStart E-commerce Platform',
      category: 'ecommerce',
      industry: 'Technology',
      type: 'Full Integration',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complete e-commerce solution with integrated marketing automation that transformed a startup into a market leader.',
      challenge: 'TechStart needed a scalable e-commerce platform that could handle rapid growth while maintaining excellent user experience and conversion rates.',
      solution: 'We built a custom React-based e-commerce platform with advanced analytics, automated marketing workflows, and seamless payment processing.',
      results: {
        revenue: '+340% Revenue Growth',
        traffic: '2.5M Monthly Visitors',
        conversion: '8.3% Conversion Rate',
        roi: '450% ROI Increase'
      },
      metrics: [
        { label: 'Project Duration', value: '6 Months' },
        { label: 'Team Size', value: '8 Specialists' },
        { label: 'Technologies', value: '12 Integrated' },
        { label: 'Client Satisfaction', value: '98%' }
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Redis'],
      marketing: ['SEO', 'PPC', 'Email Marketing', 'Social Media', 'Content Marketing'],
      testimonial: {
        quote: "Digital Metrics didn't just build our platform—they transformed our entire business model. The results speak for themselves.",
        author: 'Sarah Chen, CEO'
      },
      featured: true,
      year: '2024'
    },
    {
      id: 2,
      title: 'HealthCare Mobile App',
      category: 'mobile',
      industry: 'Healthcare',
      type: 'App + Campaign',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Healthcare app with comprehensive digital marketing strategy that achieved 500K+ downloads and 85% user retention.',
      challenge: 'Healthcare startup needed a patient engagement platform with complex integrations and HIPAA compliance requirements.',
      solution: 'Developed a secure, user-friendly mobile app with telemedicine features and implemented a multi-channel marketing strategy.',
      results: {
        downloads: '500K+ Downloads',
        retention: '85% User Retention',
        rating: '4.8★ App Store Rating',
        engagement: '300% Higher Engagement'
      },
      metrics: [
        { label: 'Project Duration', value: '8 Months' },
        { label: 'Team Size', value: '10 Specialists' },
        { label: 'Platforms', value: 'iOS & Android' },
        { label: 'Security Compliance', value: 'HIPAA Certified' }
      ],
      tech: ['React Native', 'Firebase', 'Python', 'AWS', 'WebRTC'],
      marketing: ['Content Marketing', 'Influencer Outreach', 'ASO', 'PR', 'Social Media'],
      testimonial: {
        quote: "The app exceeded all our expectations. The marketing strategy was brilliant and drove incredible user adoption.",
        author: 'Dr. Michael Rodriguez, Founder'
      },
      featured: true,
      year: '2023'
    },
    {
      id: 3,
      title: 'FinTech SaaS Platform',
      category: 'saas',
      industry: 'Finance',
      type: 'Platform + Growth',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Enterprise SaaS platform with lead generation system that achieved 50K+ active users and 180% MRR growth.',
      challenge: 'Financial services company needed a secure, scalable platform to compete with established players in the market.',
      solution: 'Built a comprehensive SaaS platform with advanced security features and implemented account-based marketing strategies.',
      results: {
        users: '50K+ Active Users',
        growth: '+180% MRR Growth',
        leads: '300% More Qualified Leads',
        churn: '65% Reduced Churn'
      },
      metrics: [
        { label: 'Project Duration', value: '12 Months' },
        { label: 'Team Size', value: '12 Specialists' },
        { label: 'Security Level', value: 'Enterprise Grade' },
        { label: 'Uptime', value: '99.9%' }
      ],
      tech: ['Vue.js', 'Laravel', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
      marketing: ['Account-Based Marketing', 'LinkedIn Ads', 'Webinars', 'SEO', 'Content Marketing'],
      testimonial: {
        quote: "Digital Metrics understood our complex requirements and delivered a platform that exceeded our expectations.",
        author: 'Emily Watson, CMO'
      },
      featured: false,
      year: '2023'
    },
    {
      id: 4,
      title: 'Fashion E-commerce Store',
      category: 'ecommerce',
      industry: 'Fashion',
      type: 'Store + Marketing',
      image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Modern fashion e-commerce store with social commerce integration and influencer marketing campaigns.',
      challenge: 'Fashion brand needed to transition from brick-and-mortar to online retail with strong social media presence.',
      solution: 'Created a visually stunning e-commerce platform with social commerce features and comprehensive digital marketing.',
      results: {
        sales: '+280% Online Sales',
        social: '1M+ Social Followers',
        engagement: '12% Engagement Rate',
        conversion: '6.8% Conversion Rate'
      },
      metrics: [
        { label: 'Project Duration', value: '4 Months' },
        { label: 'Team Size', value: '6 Specialists' },
        { label: 'Social Platforms', value: '5 Integrated' },
        { label: 'Influencer Partners', value: '50+' }
      ],
      tech: ['Shopify Plus', 'React', 'Node.js', 'Stripe', 'Klaviyo'],
      marketing: ['Social Media', 'Influencer Marketing', 'PPC', 'Email Marketing', 'SEO'],
      testimonial: {
        quote: "Our online presence went from zero to industry-leading in just 4 months. Incredible results!",
        author: 'Jessica Martinez, Brand Director'
      },
      featured: false,
      year: '2024'
    },
    {
      id: 5,
      title: 'EdTech Learning Platform',
      category: 'saas',
      industry: 'Education',
      type: 'Platform + Growth',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Interactive learning platform with gamification features and comprehensive student engagement strategies.',
      challenge: 'Education startup needed a scalable platform to compete with established online learning providers.',
      solution: 'Developed an engaging learning platform with AI-powered recommendations and multi-channel marketing approach.',
      results: {
        students: '100K+ Students',
        completion: '78% Course Completion',
        satisfaction: '4.9★ Student Rating',
        revenue: '+220% Revenue Growth'
      },
      metrics: [
        { label: 'Project Duration', value: '10 Months' },
        { label: 'Team Size', value: '9 Specialists' },
        { label: 'Course Capacity', value: 'Unlimited' },
        { label: 'Languages', value: '8 Supported' }
      ],
      tech: ['React', 'Django', 'PostgreSQL', 'Redis', 'AWS', 'TensorFlow'],
      marketing: ['Content Marketing', 'SEO', 'Social Media', 'Webinars', 'Partnership Marketing'],
      testimonial: {
        quote: "The platform they built revolutionized how we deliver education. Student engagement is through the roof!",
        author: 'Prof. David Kim, Founder'
      },
      featured: false,
      year: '2023'
    },
    {
      id: 6,
      title: 'Restaurant Chain App',
      category: 'mobile',
      industry: 'Food & Beverage',
      type: 'App + Loyalty',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Mobile ordering app with loyalty program integration and location-based marketing campaigns.',
      challenge: 'Restaurant chain needed to digitize their ordering process and build customer loyalty during competitive times.',
      solution: 'Built a comprehensive mobile app with ordering, loyalty, and payment features plus targeted marketing campaigns.',
      results: {
        orders: '75% Mobile Orders',
        loyalty: '60% Loyalty Signup',
        revenue: '+150% App Revenue',
        retention: '82% Customer Retention'
      },
      metrics: [
        { label: 'Project Duration', value: '5 Months' },
        { label: 'Team Size', value: '7 Specialists' },
        { label: 'Locations', value: '50+ Restaurants' },
        { label: 'Daily Orders', value: '10K+' }
      ],
      tech: ['Flutter', 'Firebase', 'Stripe', 'Google Maps API', 'Push Notifications'],
      marketing: ['Local SEO', 'Social Media', 'Email Marketing', 'Push Campaigns', 'Loyalty Marketing'],
      testimonial: {
        quote: "Our digital transformation was seamless. The app became our primary revenue driver within months.",
        author: 'Maria Gonzalez, Operations Director'
      },
      featured: false,
      year: '2024'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Eye },
    { id: 'ecommerce', label: 'E-commerce', icon: DollarSign },
    { id: 'mobile', label: 'Mobile Apps', icon: Users },
    { id: 'saas', label: 'SaaS Platforms', icon: TrendingUp }
  ];

  const industries = ['Technology', 'Healthcare', 'Finance', 'Fashion', 'Education', 'Food & Beverage'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-2 mb-6">
              <Award className="h-5 w-5 text-blue-400" />
              <span className="text-slate-300 text-sm">Award-Winning Projects</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
              Our Work
              <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Speaks Volumes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of successful projects where marketing brilliance meets technical excellence. 
              Every project tells a story of transformation and measurable results.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: '500+', label: 'Projects Delivered' },
                { number: '$50M+', label: 'Client Revenue Generated' },
                { number: '98%', label: 'Client Satisfaction' },
                { number: '150+', label: 'Happy Clients' }
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
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Featured Success Stories</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our most impactful projects that showcase the power of integrated marketing and development.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {featuredProjects.map((project) => (
              <div key={project.id} className="bg-slate-700/50 rounded-2xl overflow-hidden border border-slate-600/50 hover:border-slate-500/50 transition-all duration-500 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-300 text-sm">{project.industry} • {project.year}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-400 mb-6">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(project.results).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>View Full Case Study</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter and Search */}
      <section className="py-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200 w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">All Projects</h2>
            <p className="text-xl text-slate-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/80 text-white px-2 py-1 rounded text-xs font-medium">
                      {project.industry}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {project.year}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {Object.entries(project.results).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="text-center bg-slate-700/50 rounded-lg p-2">
                        <div className="text-sm font-bold text-blue-400 mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-slate-500 uppercase">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Code className="h-4 w-4 text-slate-400" />
                      <span className="text-xs text-slate-400">{project.tech.length} Technologies</span>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center space-x-1 transition-colors duration-300">
                      <span>View Details</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-slate-400 text-lg mb-4">No projects found matching your criteria</div>
              <button 
                onClick={() => {setActiveFilter('all'); setSearchTerm('');}}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Industries We Transform</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our expertise spans across multiple industries, delivering tailored solutions for unique business challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-slate-700/50 rounded-xl p-4 text-center border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 group">
                <div className="text-white font-medium group-hover:text-blue-400 transition-colors duration-300">
                  {industry}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {projects.filter(p => p.industry === industry).length} Projects
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-green-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Our Success Stories?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's create something extraordinary together. From concept to launch, from traffic to conversions—we deliver results that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/about"
              className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;