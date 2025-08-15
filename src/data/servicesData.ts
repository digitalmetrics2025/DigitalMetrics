import { 
  Search, 
  Share2, 
  MousePointer, 
  Mail, 
  Monitor, 
  Smartphone, 
  ShoppingCart, 
  Palette 
} from 'lucide-react';

export const servicesData = {
  seo: {
    title: 'SEO Optimization',
    subtitle: 'Dominate Search Rankings with Data-Driven Strategies',
    description: 'Our comprehensive SEO approach combines technical excellence with content strategy to drive organic traffic and improve search visibility. We don\'t just optimize for search engines—we optimize for your business goals.',
    icon: Search,
    color: 'from-blue-600 to-blue-400',
    benefits: [
      'Increased Organic Traffic',
      'Higher Search Rankings',
      'Better User Experience',
      'Improved Site Speed',
      'Mobile Optimization',
      'Local SEO Dominance'
    ],
    features: [
      'Comprehensive SEO Audit & Strategy',
      'Keyword Research & Competitive Analysis',
      'On-Page & Technical SEO Optimization',
      'Content Strategy & Creation',
      'Link Building & Authority Development',
      'Local SEO & Google My Business Optimization',
      'Performance Tracking & Reporting',
      'Ongoing Optimization & Updates'
    ],
    process: [
      {
        step: 1,
        title: 'SEO Audit',
        description: 'Comprehensive analysis of your current SEO performance and opportunities'
      },
      {
        step: 2,
        title: 'Strategy Development',
        description: 'Custom SEO roadmap based on your business goals and market analysis'
      },
      {
        step: 3,
        title: 'Implementation',
        description: 'Execute optimization strategies and monitor performance improvements'
      }
    ],
    pricing: {
      starter: {
        price: '$2,500/mo',
        features: [
          'SEO Audit & Strategy',
          'Keyword Research',
          'On-Page Optimization',
          'Monthly Reporting',
          'Email Support'
        ]
      },
      professional: {
        price: '$5,000/mo',
        features: [
          'Everything in Starter',
          'Content Creation',
          'Link Building',
          'Technical SEO',
          'Local SEO',
          'Priority Support'
        ]
      },
      enterprise: {
        price: '$10,000/mo',
        features: [
          'Everything in Professional',
          'Advanced Analytics',
          'Dedicated Account Manager',
          'Custom Integrations',
          '24/7 Support'
        ]
      }
    },
    caseStudy: {
      client: 'TechStart E-commerce',
      challenge: 'Low organic visibility and poor search rankings for competitive keywords in the tech industry.',
      solution: 'Implemented comprehensive SEO strategy including technical optimization, content marketing, and strategic link building.',
      results: [
        '340% increase in organic traffic',
        '85% of target keywords ranking on page 1',
        '250% increase in qualified leads',
        '180% improvement in conversion rate'
      ]
    }
  },
  'social-media': {
    title: 'Social Media Marketing',
    subtitle: 'Build Engaged Communities Across All Platforms',
    description: 'Transform your social media presence into a powerful growth engine. Our data-driven approach creates authentic connections that convert followers into customers and brand advocates.',
    icon: Share2,
    color: 'from-purple-600 to-pink-400',
    benefits: [
      'Increased Brand Awareness',
      'Higher Engagement Rates',
      'Quality Lead Generation',
      'Community Building',
      'Brand Authority',
      'Customer Loyalty'
    ],
    features: [
      'Social Media Strategy & Planning',
      'Content Creation & Curation',
      'Community Management',
      'Paid Social Advertising',
      'Influencer Partnerships',
      'Social Commerce Integration',
      'Analytics & Performance Tracking',
      'Crisis Management & Reputation'
    ],
    process: [
      {
        step: 1,
        title: 'Strategy & Planning',
        description: 'Develop comprehensive social media strategy aligned with business objectives'
      },
      {
        step: 2,
        title: 'Content & Community',
        description: 'Create engaging content and build active, loyal communities'
      },
      {
        step: 3,
        title: 'Optimize & Scale',
        description: 'Analyze performance and scale successful campaigns across platforms'
      }
    ],
    pricing: {
      starter: {
        price: '$3,000/mo',
        features: [
          'Strategy Development',
          '3 Platforms Management',
          'Content Creation (20 posts/mo)',
          'Community Management',
          'Monthly Reporting'
        ]
      },
      professional: {
        price: '$6,000/mo',
        features: [
          'Everything in Starter',
          '5 Platforms Management',
          'Content Creation (40 posts/mo)',
          'Paid Social Campaigns',
          'Influencer Outreach'
        ]
      },
      enterprise: {
        price: '$12,000/mo',
        features: [
          'Everything in Professional',
          'Unlimited Platforms',
          'Custom Content Strategy',
          'Dedicated Social Team',
          'Advanced Analytics'
        ]
      }
    },
    caseStudy: {
      client: 'HealthTech Solutions',
      challenge: 'Limited social media presence and low engagement rates across platforms.',
      solution: 'Developed comprehensive social media strategy with targeted content and community building initiatives.',
      results: [
        '500% increase in social media followers',
        '85% improvement in engagement rates',
        '300% more qualified leads from social',
        '4.8★ average customer satisfaction'
      ]
    }
  },
  ppc: {
    title: 'PPC Campaigns',
    subtitle: 'Maximize ROI with Precision-Targeted Advertising',
    description: 'Drive immediate results with our data-driven PPC campaigns. We optimize every dollar spent to deliver maximum return on investment through strategic targeting and continuous optimization.',
    icon: MousePointer,
    color: 'from-green-600 to-emerald-400',
    benefits: [
      'Immediate Traffic & Results',
      'Precise Audience Targeting',
      'Measurable ROI',
      'Budget Control',
      'Competitive Advantage',
      'Scalable Growth'
    ],
    features: [
      'Campaign Strategy & Setup',
      'Keyword Research & Selection',
      'Ad Copy Creation & Testing',
      'Landing Page Optimization',
      'Bid Management & Optimization',
      'Conversion Tracking & Analytics',
      'A/B Testing & Performance Analysis',
      'Cross-Platform Campaign Management'
    ],
    process: [
      {
        step: 1,
        title: 'Research & Strategy',
        description: 'Analyze market opportunities and develop targeted campaign strategies'
      },
      {
        step: 2,
        title: 'Launch & Monitor',
        description: 'Execute campaigns with continuous monitoring and real-time adjustments'
      },
      {
        step: 3,
        title: 'Optimize & Scale',
        description: 'Refine performance and scale successful campaigns for maximum ROI'
      }
    ],
    pricing: {
      starter: {
        price: '$2,000/mo',
        features: [
          'Google Ads Management',
          'Keyword Research',
          'Ad Copy Creation',
          'Basic Reporting',
          'Email Support'
        ]
      },
      professional: {
        price: '$4,000/mo',
        features: [
          'Everything in Starter',
          'Multi-Platform Campaigns',
          'Landing Page Optimization',
          'Advanced Analytics',
          'Phone Support'
        ]
      },
      enterprise: {
        price: '$8,000/mo',
        features: [
          'Everything in Professional',
          'Custom Attribution Models',
          'Dedicated PPC Specialist',
          'Advanced Automation',
          '24/7 Support'
        ]
      }
    },
    caseStudy: {
      client: 'FinancePlus SaaS',
      challenge: 'High customer acquisition costs and low conversion rates from paid advertising.',
      solution: 'Implemented strategic PPC campaigns with optimized landing pages and advanced targeting.',
      results: [
        '180% increase in monthly recurring revenue',
        '65% reduction in cost per acquisition',
        '300% more qualified leads',
        '8.3% average conversion rate'
      ]
    }
  },
  'email-marketing': {
    title: 'Email Marketing',
    subtitle: 'Convert Prospects with Personalized Campaigns',
    description: 'Turn your email list into a revenue-generating machine. Our strategic email marketing campaigns nurture leads, retain customers, and drive consistent sales through personalized, data-driven messaging.',
    icon: Mail,
    color: 'from-orange-600 to-red-400',
    benefits: [
      'Higher Conversion Rates',
      'Customer Retention',
      'Automated Revenue',
      'Personalized Messaging',
      'Cost-Effective Marketing',
      'Measurable Results'
    ],
    features: [
      'Email Strategy & Planning',
      'List Building & Segmentation',
      'Campaign Design & Development',
      'Marketing Automation Setup',
      'A/B Testing & Optimization',
      'Deliverability Management',
      'Performance Analytics',
      'CRM Integration'
    ],
    process: [
      {
        step: 1,
        title: 'Strategy & Setup',
        description: 'Develop email marketing strategy and set up automation workflows'
      },
      {
        step: 2,
        title: 'Create & Launch',
        description: 'Design compelling campaigns and launch targeted email sequences'
      },
      {
        step: 3,
        title: 'Analyze & Improve',
        description: 'Monitor performance metrics and optimize for better results'
      }
    ],
    pricing: {
      starter: {
        price: '$1,500/mo',
        features: [
          'Email Strategy',
          'Campaign Creation (4/mo)',
          'Basic Automation',
          'List Management',
          'Monthly Reporting'
        ]
      },
      professional: {
        price: '$3,000/mo',
        features: [
          'Everything in Starter',
          'Advanced Automation',
          'A/B Testing',
          'Segmentation',
          'CRM Integration'
        ]
      },
      enterprise: {
        price: '$6,000/mo',
        features: [
          'Everything in Professional',
          'Custom Workflows',
          'Advanced Analytics',
          'Dedicated Manager',
          'Priority Support'
        ]
      }
    },
    caseStudy: {
      client: 'E-commerce Fashion Brand',
      challenge: 'Low email engagement and poor customer retention rates.',
      solution: 'Implemented personalized email automation with behavioral triggers and segmented campaigns.',
      results: [
        '45% increase in email open rates',
        '120% improvement in click-through rates',
        '200% increase in email revenue',
        '35% improvement in customer lifetime value'
      ]
    }
  },
  'web-development': {
    title: 'Custom Websites',
    subtitle: 'Beautiful, Fast, and Conversion-Optimized Sites',
    description: 'Create stunning websites that not only look amazing but drive real business results. Our development approach combines cutting-edge technology with conversion optimization to maximize your online success.',
    icon: Monitor,
    color: 'from-blue-600 to-cyan-400',
    benefits: [
      'Professional Brand Image',
      'Mobile-First Design',
      'Fast Loading Speed',
      'SEO Optimized',
      'Conversion Focused',
      'Scalable Architecture'
    ],
    features: [
      'Custom Website Design',
      'Responsive Development',
      'CMS Integration',
      'E-commerce Functionality',
      'SEO Optimization',
      'Performance Optimization',
      'Security Implementation',
      'Ongoing Maintenance'
    ],
    process: [
      {
        step: 1,
        title: 'Design & Planning',
        description: 'Create wireframes, designs, and development roadmap'
      },
      {
        step: 2,
        title: 'Development',
        description: 'Build responsive, fast, and secure website with modern technologies'
      },
      {
        step: 3,
        title: 'Launch & Support',
        description: 'Deploy website and provide ongoing maintenance and support'
      }
    ],
    pricing: {
      starter: {
        price: '$5,000',
        features: [
          '5-Page Website',
          'Responsive Design',
          'Basic SEO',
          'Contact Forms',
          '3 Months Support'
        ]
      },
      professional: {
        price: '$15,000',
        features: [
          'Everything in Starter',
          'Custom Design',
          'CMS Integration',
          'Advanced SEO',
          '6 Months Support'
        ]
      },
      enterprise: {
        price: '$35,000',
        features: [
          'Everything in Professional',
          'E-commerce Features',
          'Custom Integrations',
          'Advanced Analytics',
          '12 Months Support'
        ]
      }
    },
    caseStudy: {
      client: 'Professional Services Firm',
      challenge: 'Outdated website with poor user experience and low conversion rates.',
      solution: 'Redesigned and developed modern, conversion-optimized website with improved UX.',
      results: [
        '250% increase in website conversions',
        '40% improvement in page load speed',
        '180% more qualified leads',
        '95% client satisfaction score'
      ]
    }
  },
  'mobile-apps': {
    title: 'Mobile Apps',
    subtitle: 'Native & Cross-Platform App Development',
    description: 'Bring your ideas to life with powerful mobile applications. We develop native and cross-platform apps that deliver exceptional user experiences and drive business growth.',
    icon: Smartphone,
    color: 'from-purple-600 to-blue-400',
    benefits: [
      'Enhanced User Experience',
      'Increased Customer Engagement',
      'Brand Differentiation',
      'Revenue Generation',
      'Customer Loyalty',
      'Competitive Advantage'
    ],
    features: [
      'iOS & Android Development',
      'Cross-Platform Solutions',
      'UI/UX Design',
      'Backend Development',
      'API Integration',
      'App Store Optimization',
      'Analytics Implementation',
      'Ongoing Maintenance'
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Design',
        description: 'Define requirements, create wireframes, and design user interface'
      },
      {
        step: 2,
        title: 'Development',
        description: 'Build app with modern frameworks and integrate necessary features'
      },
      {
        step: 3,
        title: 'Launch & Growth',
        description: 'Deploy to app stores and implement growth strategies'
      }
    ],
    pricing: {
      starter: {
        price: '$25,000',
        features: [
          'Single Platform App',
          'Basic Features',
          'Standard UI/UX',
          'App Store Submission',
          '3 Months Support'
        ]
      },
      professional: {
        price: '$50,000',
        features: [
          'Cross-Platform App',
          'Advanced Features',
          'Custom UI/UX',
          'Backend Integration',
          '6 Months Support'
        ]
      },
      enterprise: {
        price: '$100,000',
        features: [
          'Everything in Professional',
          'Complex Integrations',
          'Advanced Analytics',
          'Dedicated Team',
          '12 Months Support'
        ]
      }
    },
    caseStudy: {
      client: 'Healthcare Startup',
      challenge: 'Need for patient engagement platform with complex healthcare integrations.',
      solution: 'Developed comprehensive mobile app with secure patient portal and provider tools.',
      results: [
        '500,000+ app downloads',
        '85% user retention rate',
        '4.8★ app store rating',
        '300% increase in patient engagement'
      ]
    }
  },
  ecommerce: {
    title: 'E-commerce Platforms',
    subtitle: 'Scalable Online Stores That Drive Sales',
    description: 'Build powerful e-commerce platforms that convert visitors into customers. Our solutions combine beautiful design with robust functionality to maximize your online sales potential.',
    icon: ShoppingCart,
    color: 'from-green-600 to-teal-400',
    benefits: [
      'Increased Online Sales',
      'Better User Experience',
      'Mobile Commerce Ready',
      'Inventory Management',
      'Payment Processing',
      'Scalable Growth'
    ],
    features: [
      'Custom E-commerce Design',
      'Shopping Cart Development',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Processing System',
      'Mobile Optimization',
      'SEO & Marketing Tools',
      'Analytics & Reporting'
    ],
    process: [
      {
        step: 1,
        title: 'Planning & Design',
        description: 'Define e-commerce strategy and create conversion-focused designs'
      },
      {
        step: 2,
        title: 'Development',
        description: 'Build robust e-commerce platform with all necessary features'
      },
      {
        step: 3,
        title: 'Launch & Optimize',
        description: 'Deploy store and continuously optimize for better performance'
      }
    ],
    pricing: {
      starter: {
        price: '$10,000',
        features: [
          'Basic E-commerce Site',
          'Product Catalog',
          'Shopping Cart',
          'Payment Processing',
          '3 Months Support'
        ]
      },
      professional: {
        price: '$25,000',
        features: [
          'Everything in Starter',
          'Advanced Features',
          'Inventory Management',
          'Marketing Tools',
          '6 Months Support'
        ]
      },
      enterprise: {
        price: '$50,000',
        features: [
          'Everything in Professional',
          'Custom Integrations',
          'Multi-vendor Support',
          'Advanced Analytics',
          '12 Months Support'
        ]
      }
    },
    caseStudy: {
      client: 'Fashion Retail Brand',
      challenge: 'Outdated e-commerce platform with poor mobile experience and low conversions.',
      solution: 'Built modern, mobile-first e-commerce platform with advanced features and optimization.',
      results: [
        '340% increase in online revenue',
        '8.3% conversion rate improvement',
        '2.5M monthly visitors',
        '95% mobile user satisfaction'
      ]
    }
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    subtitle: 'User-Centered Designs That Convert',
    description: 'Create exceptional user experiences that drive engagement and conversions. Our design approach combines aesthetic excellence with data-driven insights to deliver results.',
    icon: Palette,
    color: 'from-pink-600 to-purple-400',
    benefits: [
      'Improved User Experience',
      'Higher Conversion Rates',
      'Brand Differentiation',
      'User Satisfaction',
      'Reduced Bounce Rate',
      'Increased Engagement'
    ],
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design',
      'Interaction Design',
      'Usability Testing',
      'Design System Creation',
      'Responsive Design',
      'Accessibility Compliance'
    ],
    process: [
      {
        step: 1,
        title: 'Research & Strategy',
        description: 'Understand users, analyze competitors, and define design strategy'
      },
      {
        step: 2,
        title: 'Design & Prototype',
        description: 'Create wireframes, designs, and interactive prototypes'
      },
      {
        step: 3,
        title: 'Test & Refine',
        description: 'Conduct usability testing and refine designs based on feedback'
      }
    ],
    pricing: {
      starter: {
        price: '$5,000',
        features: [
          'UI/UX Audit',
          'Wireframes',
          'Basic Design',
          'Style Guide',
          '2 Revisions'
        ]
      },
      professional: {
        price: '$15,000',
        features: [
          'Everything in Starter',
          'User Research',
          'Interactive Prototypes',
          'Usability Testing',
          '5 Revisions'
        ]
      },
      enterprise: {
        price: '$30,000',
        features: [
          'Everything in Professional',
          'Design System',
          'Advanced Prototyping',
          'Ongoing Support',
          'Unlimited Revisions'
        ]
      }
    },
    caseStudy: {
      client: 'SaaS Platform',
      challenge: 'Complex interface with poor user experience and high churn rates.',
      solution: 'Redesigned entire user interface with focus on simplicity and user flow optimization.',
      results: [
        '60% reduction in user churn',
        '150% increase in user engagement',
        '40% improvement in task completion',
        '4.9★ user satisfaction rating'
      ]
    }
  }
};