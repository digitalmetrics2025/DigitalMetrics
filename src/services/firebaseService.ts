import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Check if Firebase is configured
const isFirebaseAvailable = () => {
  return db !== undefined;
};

// Types for our data
export interface ClientSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services: string[];
  budget?: string;
  timeline?: string;
  message: string;
  source?: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ClientFeedback {
  id?: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientImage?: string;
  rating: number;
  testimonial: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Client submissions (from popup form)
export const submitClientForm = async (formData: Omit<ClientSubmission, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
  try {
    if (!isFirebaseAvailable()) {
      console.warn('Firebase not configured, using mock response');
      return { success: true, id: 'mock-id-' + Date.now() };
    }

    const submission: Omit<ClientSubmission, 'id'> = {
      ...formData,
      status: 'new',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'clientSubmissions'), submission);
    console.log('Client submission saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving client submission: ', error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
};

// Contact form submissions
export const submitContactForm = async (formData: Omit<ContactSubmission, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
  try {
    if (!isFirebaseAvailable()) {
      console.warn('Firebase not configured, using mock response');
      return { success: true, id: 'mock-id-' + Date.now() };
    }

    const submission: Omit<ContactSubmission, 'id'> = {
      ...formData,
      status: 'new',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'contactSubmissions'), submission);
    console.log('Contact submission saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving contact submission: ', error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
};

// Get all client submissions (for admin dashboard)
export const getClientSubmissions = async () => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured', data: [] };
    }

    const q = query(collection(db, 'clientSubmissions'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const submissions: ClientSubmission[] = [];
    
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() } as ClientSubmission);
    });
    
    return { success: true, data: submissions };
  } catch (error) {
    console.error('Error fetching client submissions: ', error);
    return { success: false, error: error.message };
  }
};

// Get all contact submissions (for admin dashboard)
export const getContactSubmissions = async () => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured', data: [] };
    }

    const q = query(collection(db, 'contactSubmissions'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const submissions: ContactSubmission[] = [];
    
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() } as ContactSubmission);
    });
    
    return { success: true, data: submissions };
  } catch (error) {
    console.error('Error fetching contact submissions: ', error);
    return { success: false, error: error.message };
  }
};

// Update submission status
export const updateSubmissionStatus = async (
  collection_name: 'clientSubmissions' | 'contactSubmissions',
  id: string, 
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed'
) => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured' };
    }

    const docRef = doc(db, collection_name, id);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating submission status: ', error);
    return { success: false, error: error.message };
  }
};

// Delete submission
export const deleteSubmission = async (
  collection_name: 'clientSubmissions' | 'contactSubmissions',
  id: string
) => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured' };
    }

    await deleteDoc(doc(db, collection_name, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting submission: ', error);
    return { success: false, error: error.message };
  }
};

// Get submissions by status
export const getSubmissionsByStatus = async (
  collection_name: 'clientSubmissions' | 'contactSubmissions',
  status: string
) => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured', data: [] };
    }

    const q = query(
      collection(db, collection_name), 
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const submissions: (ClientSubmission | ContactSubmission)[] = [];
    
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() } as ClientSubmission | ContactSubmission);
    });
    
    return { success: true, data: submissions };
  } catch (error) {
    console.error('Error fetching submissions by status: ', error);
    return { success: false, error: error.message };
  }
};

// Newsletter subscription
export const subscribeToNewsletter = async (email: string) => {
  try {
    if (!isFirebaseAvailable()) {
      console.warn('Firebase not configured, using mock response');
      return { success: true, id: 'mock-id-' + Date.now() };
    }

    const subscription = {
      email,
      subscribedAt: Timestamp.now(),
      status: 'active'
    };

    const docRef = await addDoc(collection(db, 'newsletterSubscriptions'), subscription);
    console.log('Newsletter subscription saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving newsletter subscription: ', error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
};

// Get all newsletter subscriptions (for admin dashboard)
export const getNewsletterSubscriptions = async () => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured', data: [] };
    }

    const q = query(collection(db, 'newsletterSubscriptions'), orderBy('subscribedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const subscriptions: any[] = [];
    
    querySnapshot.forEach((doc) => {
      subscriptions.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: subscriptions };
  } catch (error) {
    console.error('Error fetching newsletter subscriptions: ', error);
    return { success: false, error: error.message };
  }
};

// Update newsletter subscription status
export const updateNewsletterStatus = async (id: string, status: 'active' | 'unsubscribed') => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured' };
    }

    const docRef = doc(db, 'newsletterSubscriptions', id);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating newsletter status: ', error);
    return { success: false, error: error.message };
  }
};

// Delete newsletter subscription
export const deleteNewsletterSubscription = async (id: string) => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured' };
    }

    await deleteDoc(doc(db, 'newsletterSubscriptions', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting newsletter subscription: ', error);
    return { success: false, error: error.message };
  }
};

// Client feedback functions
export const addClientFeedback = async (formData: Omit<ClientFeedback, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    if (!isFirebaseAvailable()) {
      console.warn('Firebase not configured, using mock response');
      return { success: true, id: 'mock-id-' + Date.now() };
    }

    const feedback: Omit<ClientFeedback, 'id'> = {
      ...formData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'clientFeedbacks'), feedback);
    console.log('Client feedback saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving client feedback: ', error);
    return { success: false, error: error.message };
  }
};

export const getClientFeedbacks = async () => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured', data: [] };
    }

    const q = query(collection(db, 'clientFeedbacks'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const feedbacks: ClientFeedback[] = [];
    
    querySnapshot.forEach((doc) => {
      feedbacks.push({ id: doc.id, ...doc.data() } as ClientFeedback);
    });
    
    return { success: true, data: feedbacks };
  } catch (error) {
    console.error('Error fetching client feedbacks: ', error);
    return { success: false, error: error.message };
  }
};

export const getActiveFeedbacks = async () => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured', data: [] };
    }

    // Get all feedbacks first, then filter and sort in memory to avoid composite index requirement
    const q = query(collection(db, 'clientFeedbacks'));
    const querySnapshot = await getDocs(q);
    const feedbacks: ClientFeedback[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() } as ClientFeedback;
      if (data.isActive) {
        feedbacks.push(data);
      }
    });
    
    // Sort by createdAt descending and limit to 8
    const sortedFeedbacks = feedbacks
      .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
      .slice(0, 8);
    
    return { success: true, data: sortedFeedbacks };
  } catch (error) {
    console.error('Error fetching active feedbacks: ', error);
    return { success: false, error: error.message };
  }
};

export const updateClientFeedback = async (id: string, formData: Partial<ClientFeedback>) => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured' };
    }

    const docRef = doc(db, 'clientFeedbacks', id);
    await updateDoc(docRef, {
      ...formData,
      updatedAt: Timestamp.now()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating client feedback: ', error);
    return { success: false, error: error.message };
  }
};

export const deleteClientFeedback = async (id: string) => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured' };
    }

    await deleteDoc(doc(db, 'clientFeedbacks', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting client feedback: ', error);
    return { success: false, error: error.message };
  }
};

export const toggleFeedbackStatus = async (id: string, isActive: boolean) => {
  try {
    if (!isFirebaseAvailable()) {
      return { success: false, error: 'Firebase not configured' };
    }

    const docRef = doc(db, 'clientFeedbacks', id);
    await updateDoc(docRef, {
      isActive,
      updatedAt: Timestamp.now()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error toggling feedback status: ', error);
    return { success: false, error: error.message };
  }
};