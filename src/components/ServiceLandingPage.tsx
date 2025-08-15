import React from 'react';
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, Zap } from 'lucide-react';

interface ServiceLandingPageProps {
  service: {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    benefits: string[];
    features: string[];
    process: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    pricing: {
      starter: { price: string; features: string[] };
      professional: { price: string; features: string[] };
      enterprise: { price: string; features: string[] };
    };
    caseStudy: {
      client: string;
      challenge: string;
      solution: string;
      results: string[];
    };
  };
}

const ServiceLandingPage: React.FC<ServiceLandingPageProps> = ({ service }) => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-8`}>
              <service.icon className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
              {service.title}
            </h1>
            
            <p className="text-2xl text-slate-400 mb-8 max-w-3xl mx-auto">
              {service.subtitle}
            </p>
            
            <p className="text-lg text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              {service.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <span>Get Started Today</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Choose Our {service.title}?</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              We deliver measurable results that drive real business growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">{benefit}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">What's Included</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Process</h2>
            <p className="text-xl text-slate-400">A proven methodology that delivers results</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.color} text-white text-2xl font-bold mb-6`}>
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Choose Your Plan</h2>
            <p className="text-xl text-slate-400">Flexible pricing to match your needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(service.pricing).map(([plan, details], index) => (
              <div key={plan} className={`bg-slate-800/50 rounded-2xl p-8 border ${index === 1 ? 'border-blue-400 scale-105' : 'border-slate-700/50'}`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 capitalize">{plan}</h3>
                  <div className="text-4xl font-bold text-white mb-4">{details.price}</div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {details.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  index === 1 
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white' 
                    : 'border border-slate-600 text-slate-300 hover:border-blue-400 hover:text-white'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Success Story</h2>
          </div>
          
          <div className="bg-slate-700/50 rounded-2xl p-8 border border-slate-600/50">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Client: {service.caseStudy.client}</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Challenge</h4>
                    <p className="text-slate-300">{service.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-2">Solution</h4>
                    <p className="text-slate-300">{service.caseStudy.solution}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Results</h4>
                <div className="space-y-4">
                  {service.caseStudy.results.map((result, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="text-slate-300">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-green-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's discuss how our {service.title.toLowerCase()} can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105">
              Schedule Free Consultation
            </button>
            <button className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceLandingPage;