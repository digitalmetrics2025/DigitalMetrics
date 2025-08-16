import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  User, 
  Target, 
  TrendingUp, 
  Award, 
  Users, 
  Globe, 
  Code, 
  Lightbulb,
  CheckCircle,
  Star,
  ArrowRight,
  Calendar,
  MapPin,
  Briefcase
} from 'lucide-react';

const AboutPage = () => {
  const milestones = [
    {
      year: '2018',
      title: 'The Beginning',
      description: 'Started as a freelance developer with a vision to bridge the gap between marketing and technology.',
      icon: Lightbulb
    },
    {
      year: '2019',
      title: 'First Major Client',
      description: 'Delivered my first integrated marketing + development project, achieving 300% ROI for a local startup.',
      icon: Target
    },
    {
      year: '2020',
      title: 'Team Formation',
      description: 'Assembled a core team of marketing strategists and developers who shared the same vision.',
      icon: Users
    },
    {
      year: '2021',
      title: 'Digital Metrics Born',
      description: 'Officially launched Digital Metrics as a full-service agency with our unique integrated approach.',
      icon: Award
    },
    {
      year: '2022',
      title: 'Scaling Success',
      description: 'Expanded to serve enterprise clients, delivering $50M+ in measurable business impact.',
      icon: TrendingUp
    },
    {
      year: '2024',
      title: 'Industry Recognition',
      description: 'Recognized as a leading agency for our innovative approach to combining marketing and development.',
      icon: Globe
    }
  ];

  const values = [
    {
      icon: Code,
      title: 'Technical Excellence',
      description: 'We build with precision, using cutting-edge technologies and best practices to ensure every solution is robust, scalable, and future-proof.'
    },
    {
      icon: TrendingUp,
      title: 'Results-Driven',
      description: 'Every strategy, every line of code, every campaign is designed with one goal: delivering measurable business results that matter.'
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'We don\'t just work for our clients—we work with them as true partners, invested in their long-term success and growth.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We stay ahead of industry trends, constantly exploring new technologies and strategies to give our clients a competitive edge.'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Projects Delivered' },
    { number: '$50M+', label: 'Client Revenue Generated' },
    { number: '98%', label: 'Client Retention Rate' },
    { number: '150+', label: 'Happy Clients Worldwide' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'CEO, TechStart Inc.',
      content: 'Working with the founder was transformative. Their unique ability to see both the technical and marketing sides of our business helped us achieve results we never thought possible.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      title: 'Founder, HealthTech Solutions',
      content: 'The leadership and vision demonstrated throughout our project was exceptional. They didn\'t just deliver a solution—they delivered a competitive advantage.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-2 mb-6">
                <User className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300 text-sm">Founder & CEO</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                The Story Behind
                <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  Digital Metrics
                </span>
              </h1>
              
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                From a solo developer with a vision to leading a team that's transformed hundreds of businesses. 
                This is the journey of building something truly different in the digital agency space.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                  <span>Let's Work Together</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <Link 
                  to="/portfolio"
                  className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center"
                >
                  View Our Work
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                        {achievement.number}
                      </div>
                      <div className="text-slate-400 text-sm">{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">How It All Started</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Every great company starts with a problem that needs solving. Here's the problem I saw—and how I decided to fix it.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">The Problem I Discovered</h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  As a developer working with various marketing agencies, I kept seeing the same frustrating pattern: 
                  beautiful campaigns that led to websites that couldn't convert, and amazing websites that no one could find.
                </p>
                <p>
                  Marketing teams would create brilliant strategies, but the technical execution would fall short. 
                  Development teams would build incredible platforms, but they lacked the marketing insight to drive results.
                </p>
                <p>
                  I realized that the industry was fundamentally broken—split into silos that should have been working as one unified force.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-700/50 rounded-2xl p-8 border border-slate-600/50">
              <h4 className="text-xl font-bold text-white mb-6">The "Aha" Moment</h4>
              <blockquote className="text-slate-300 italic text-lg leading-relaxed">
                "What if we could build a team that thinks like marketers but codes like engineers? 
                What if every website was built for conversions from day one? What if every campaign 
                was designed with the technical infrastructure to scale?"
              </blockquote>
              <div className="mt-6 flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">The Vision Was Born</div>
                  <div className="text-slate-400 text-sm">2018 - The Beginning</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">The Journey to Leadership</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              From a one-person operation to leading a team that's transformed hundreds of businesses worldwide.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-green-600 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
                          <milestone.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">{milestone.year}</div>
                          <div className="text-blue-400 font-medium">{milestone.title}</div>
                        </div>
                      </div>
                      <p className="text-slate-300">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-full border-4 border-slate-900"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">How I Lead</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Leadership isn't about having all the answers—it's about creating an environment where the best ideas can flourish.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600/50 text-center">
                <div className="inline-flex p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Recognition */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our reputation is built on results, relationships, and the trust our clients place in us to deliver excellence.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-300 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                  6+
                </div>
                <div className="text-slate-400 text-sm">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                  25+
                </div>
                <div className="text-slate-400 text-sm">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                  15+
                </div>
                <div className="text-slate-400 text-sm">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <div className="text-slate-400 text-sm">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-green-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's discuss how our integrated approach can transform your business. 
            Every great partnership starts with a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105">
              Schedule a Strategy Call
            </button>
            <Link 
              to="/portfolio"
              className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;