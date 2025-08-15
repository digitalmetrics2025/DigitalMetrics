import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Users } from 'lucide-react';
import { submitContactForm } from '../services/firebaseService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleContactSubmit();
  };

  const handleContactSubmit = async () => {
    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        message: formData.message
      });

      if (result.success) {
        // Show success message in the form
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center space-x-3';
        successMessage.innerHTML = `
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <div>
            <div class="font-semibold">Message Sent Successfully!</div>
            <div class="text-sm opacity-90">We'll get back to you within 24 hours.</div>
          </div>
        `;
        document.body.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
          }
        }, 5000);
        
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          budget: '',
          message: ''
        });
      } else {
        console.error('Contact submission failed:', result.error);
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'fixed top-4 right-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center space-x-3';
        errorMessage.innerHTML = `
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <div>
            <div class="font-semibold">Error Sending Message</div>
            <div class="text-sm opacity-90">Please try again or contact us directly.</div>
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
      console.error('Contact submission error:', error);
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Ready to transform your business? Let's discuss how our integrated approach can drive your success.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">Get Your Free Strategy Session</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select a service</option>
                    <option value="full-integration">Full Integration Package</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="ecommerce">E-commerce Platform</option>
                    <option value="consultation">Strategy Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Project Budget
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">Select budget range</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Project Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Info & Process */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="group flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-600/10 to-blue-600/5 border border-blue-600/20 hover:border-blue-600/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/10">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg group-hover:shadow-blue-600/30 transition-all duration-300">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors duration-300">Email Us</p>
                    <p className="text-blue-300 font-medium">hello@digitalmetrics.com</p>
                  </div>
                </div>
                
                <div className="group flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-green-600/10 to-green-600/5 border border-green-600/20 hover:border-green-600/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/10">
                  <div className="p-3 bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg group-hover:shadow-green-600/30 transition-all duration-300">
                    <Phone className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg group-hover:text-green-300 transition-colors duration-300">Call Us</p>
                    <p className="text-green-300 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="group flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-600/10 to-purple-600/5 border border-purple-600/20 hover:border-purple-600/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/10">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl shadow-lg group-hover:shadow-purple-600/30 transition-all duration-300 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors duration-300">Visit Us</p>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <p className="text-purple-300 font-medium text-sm">Kukatpally, Hyderabad</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <p className="text-purple-300 font-medium text-sm">Manikonda, Hyderabad</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <p className="text-purple-300 font-medium text-sm">Pattabhipuram, Guntur</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Timeline */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Our Process</h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Users,
                    title: 'Discovery Call',
                    description: 'Free 30-minute consultation to understand your goals',
                    time: 'Within 24 hours'
                  },
                  {
                    icon: CheckCircle,
                    title: 'Strategy Development',
                    description: 'Custom proposal with integrated marketing & tech plan',
                    time: '2-3 business days'
                  },
                  {
                    icon: Clock,
                    title: 'Project Kickoff',
                    description: 'Begin development and marketing campaigns',
                    time: '1 week to start'
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-slate-700 rounded-lg">
                      <step.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{step.title}</h4>
                      <p className="text-slate-400 text-sm mb-1">{step.description}</p>
                      <p className="text-green-400 text-xs font-medium">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;