import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { getActiveFeedbacks, ClientFeedback } from '../services/firebaseService';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState<ClientFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback testimonials if no data from database
  const fallbackTestimonials = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'CEO, TechStart Inc.',
      company: 'E-commerce Platform',
      rating: 5,
      content: "Digital Metrics didn't just build our platform—they transformed our entire business model. The integration of their technical expertise with marketing strategy resulted in 340% revenue growth in just 8 months.",
      metrics: {
        revenue: '+340% Revenue',
        traffic: '2.5M Monthly Visitors',
        conversion: '8.3% Conversion Rate'
      },
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      title: 'Founder, HealthTech Solutions',
      company: 'Healthcare Mobile App',
      rating: 5,
      content: "What sets Digital Metrics apart is their holistic approach. They built our app and simultaneously created a marketing machine. 500K downloads and 85% retention rate speak for themselves.",
      metrics: {
        downloads: '500K+ Downloads',
        retention: '85% User Retention',
        rating: '4.8★ App Rating'
      },
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Emily Watson',
      title: 'CMO, FinancePlus',
      company: 'SaaS Platform',
      rating: 5,
      content: "The results speak volumes: 50K active users, 180% MRR growth, and 300% more qualified leads. Digital Metrics understands that great technology needs great marketing to succeed.",
      metrics: {
        users: '50K+ Active Users',
        growth: '+180% MRR Growth',
        leads: '300% More Leads'
      },
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Fetch testimonials from database
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const result = await getActiveFeedbacks();
        if (result.success && result.data && result.data.length > 0) {
          setTestimonials(result.data);
        } else {
          // Fallback to mock data if no database testimonials
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.warn('Firebase permissions error, using fallback testimonials:', error);
        // Use mock data as fallback when Firebase permissions are not set up
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-slate-400 mt-4">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients say about the transformative impact of our integrated approach.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-20">
              <Quote className="h-16 w-16 text-blue-400" />
            </div>

            <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Client Info */}
              <div className="lg:w-1/3 text-center lg:text-left">
                <div className="relative inline-block mb-6">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-700"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-2">
                    <div className="flex space-x-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-white fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-1">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-slate-400 mb-2">
                  {testimonials[currentTestimonial].title}
                </p>
                <p className="text-sm text-slate-500">
                  {testimonials[currentTestimonial].company}
                </p>
              </div>

              {/* Testimonial Content */}
              <div className="lg:w-2/3">
                <blockquote className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                {/* Metrics */}
                {testimonials[currentTestimonial].metrics && (
                  <div className="grid grid-cols-3 gap-6">
                    {Object.entries(testimonials[currentTestimonial].metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">
                          {key === 'revenue' ? 'Revenue' : 
                           key === 'traffic' ? 'Visitors' : 
                           key === 'conversion' ? 'Conversion' :
                           key === 'downloads' ? 'Downloads' :
                           key === 'retention' ? 'Retention' :
                           key === 'rating' ? 'Rating' :
                           key === 'users' ? 'Users' :
                           key === 'growth' ? 'Growth' :
                           key === 'leads' ? 'Leads' :
                           key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-slate-300" />
              </button>

              {/* Indicators */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentTestimonial 
                        ? 'bg-gradient-to-r from-blue-400 to-green-400' 
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
              >
                <ArrowRight className="h-5 w-5 text-slate-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '98%', label: 'Client Retention Rate' },
            { number: '5.2X', label: 'Average ROI Increase' },
            { number: '150+', label: 'Successful Projects' },
            { number: '24/7', label: 'Dedicated Support' }
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
    </section>
  );
};

export default Testimonials;