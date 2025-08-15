import { 
  collection, 
  addDoc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Mock client submissions data
const mockClientSubmissions = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techstart.com',
    phone: '+1 (555) 123-4567',
    company: 'TechStart Inc.',
    services: ['SEO Optimization', 'Custom Websites', 'PPC Campaigns'],
    budget: '$25,000 - $50,000',
    timeline: '3-6 Months',
    message: 'We need a complete digital transformation for our e-commerce platform. Looking for SEO optimization, website redesign, and targeted advertising campaigns to increase our online presence and sales.',
    source: 'Google Search',
    status: 'new',
    createdAt: Timestamp.fromDate(new Date('2024-01-15T10:30:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-15T10:30:00'))
  },
  {
    name: 'Michael Rodriguez',
    email: 'michael@healthtech.io',
    phone: '+1 (555) 987-6543',
    company: 'HealthTech Solutions',
    services: ['Mobile Apps', 'Custom Websites', 'Social Media Marketing'],
    budget: '$50,000 - $100,000',
    timeline: '6+ Months',
    message: 'We are developing a healthcare mobile application and need comprehensive development and marketing support. The app needs to be HIPAA compliant and we want to build a strong social media presence.',
    source: 'Referral',
    status: 'contacted',
    createdAt: Timestamp.fromDate(new Date('2024-01-12T14:20:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-13T09:15:00'))
  },
  {
    name: 'Emily Watson',
    email: 'emily.watson@financeplus.com',
    phone: '+1 (555) 456-7890',
    company: 'FinancePlus SaaS',
    services: ['Custom Websites', 'SEO Optimization', 'Email Marketing'],
    budget: '$75,000 - $150,000',
    timeline: '3-6 Months',
    message: 'Our SaaS platform needs a modern website redesign with advanced SEO and automated email marketing campaigns. We want to improve our conversion rates and user acquisition.',
    source: 'Social Media',
    status: 'in-progress',
    createdAt: Timestamp.fromDate(new Date('2024-01-10T16:45:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-14T11:30:00'))
  },
  {
    name: 'David Kim',
    email: 'david@edutech.edu',
    phone: '+1 (555) 321-0987',
    company: 'EduTech Learning',
    services: ['Mobile Apps', 'E-commerce Platforms', 'Social Media Marketing'],
    budget: '$35,000 - $75,000',
    timeline: '1-2 Months',
    message: 'We need to develop an educational mobile app with e-commerce functionality for course sales. Also looking for social media marketing to reach students and educators.',
    source: 'Previous Client',
    status: 'completed',
    createdAt: Timestamp.fromDate(new Date('2024-01-08T09:15:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-16T15:20:00'))
  },
  {
    name: 'Jessica Martinez',
    email: 'jessica@fashionbrand.com',
    phone: '+1 (555) 654-3210',
    company: 'Fashion Forward',
    services: ['E-commerce Platforms', 'Social Media Marketing', 'PPC Campaigns'],
    budget: '$15,000 - $35,000',
    timeline: 'ASAP (Rush Project)',
    message: 'Urgent need for e-commerce platform launch before the holiday season. We need social media marketing and PPC campaigns to drive immediate sales.',
    source: 'Google Search',
    status: 'new',
    createdAt: Timestamp.fromDate(new Date('2024-01-16T13:10:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-16T13:10:00'))
  }
];

// Mock contact submissions data
const mockContactSubmissions = [
  {
    name: 'Robert Chen',
    email: 'robert.chen@startup.com',
    company: 'Innovation Startup',
    service: 'full-integration',
    budget: '50k-100k',
    message: 'We are a tech startup looking for complete digital transformation. Need website development, mobile app, and comprehensive marketing strategy to launch our product successfully.',
    status: 'new',
    createdAt: Timestamp.fromDate(new Date('2024-01-14T11:25:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-14T11:25:00'))
  },
  {
    name: 'Lisa Thompson',
    email: 'lisa@retailstore.com',
    company: 'Thompson Retail',
    service: 'ecommerce',
    budget: '25k-50k',
    message: 'Our brick-and-mortar store needs to go online. Looking for e-commerce platform development with inventory management and payment processing.',
    status: 'contacted',
    createdAt: Timestamp.fromDate(new Date('2024-01-13T15:40:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-14T10:20:00'))
  },
  {
    name: 'Mark Williams',
    email: 'mark@consultingfirm.com',
    company: 'Williams Consulting',
    service: 'web-development',
    budget: '10k-25k',
    message: 'Professional services firm needs a modern website with client portal and appointment booking system. Focus on lead generation and professional presentation.',
    status: 'in-progress',
    createdAt: Timestamp.fromDate(new Date('2024-01-11T09:30:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-15T14:15:00'))
  }
];

// Mock newsletter subscriptions
const mockNewsletterSubscriptions = [
  {
    email: 'john.doe@example.com',
    subscribedAt: Timestamp.fromDate(new Date('2024-01-15T08:20:00')),
    status: 'active'
  },
  {
    email: 'jane.smith@company.com',
    subscribedAt: Timestamp.fromDate(new Date('2024-01-14T16:45:00')),
    status: 'active'
  },
  {
    email: 'alex.brown@business.org',
    subscribedAt: Timestamp.fromDate(new Date('2024-01-13T12:30:00')),
    status: 'active'
  },
  {
    email: 'maria.garcia@startup.io',
    subscribedAt: Timestamp.fromDate(new Date('2024-01-12T10:15:00')),
    status: 'active'
  },
  {
    email: 'chris.wilson@agency.com',
    subscribedAt: Timestamp.fromDate(new Date('2024-01-11T14:50:00')),
    status: 'active'
  }
];

// Function to add mock data to Firestore
export const addMockDataToFirestore = async () => {
  try {
    console.log('🚀 Starting to add mock data to Firestore...');

    // Add client submissions
    console.log('📝 Adding client submissions...');
    for (const submission of mockClientSubmissions) {
      await addDoc(collection(db, 'clientSubmissions'), submission);
    }
    console.log(`✅ Added ${mockClientSubmissions.length} client submissions`);

    // Add contact submissions
    console.log('📞 Adding contact submissions...');
    for (const contact of mockContactSubmissions) {
      await addDoc(collection(db, 'contactSubmissions'), contact);
    }
    console.log(`✅ Added ${mockContactSubmissions.length} contact submissions`);

    // Add newsletter subscriptions
    console.log('📧 Adding newsletter subscriptions...');
    for (const subscription of mockNewsletterSubscriptions) {
      await addDoc(collection(db, 'newsletterSubscriptions'), subscription);
    }
    console.log(`✅ Added ${mockNewsletterSubscriptions.length} newsletter subscriptions`);

    console.log('🎉 All mock data added successfully!');
    
    return {
      success: true,
      message: 'Mock data added successfully!',
      counts: {
        clientSubmissions: mockClientSubmissions.length,
        contactSubmissions: mockContactSubmissions.length,
        newsletterSubscriptions: mockNewsletterSubscriptions.length
      }
    };
  } catch (error) {
    console.error('❌ Error adding mock data:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Function to clear all collections (use with caution!)
export const clearAllCollections = async () => {
  try {
    console.log('🗑️ This function would clear all data. Implement with caution!');
    // Implementation would go here if needed
    return { success: true, message: 'Clear function ready (not implemented for safety)' };
  } catch (error) {
    console.error('❌ Error clearing collections:', error);
    return { success: false, error: error.message };
  }
};