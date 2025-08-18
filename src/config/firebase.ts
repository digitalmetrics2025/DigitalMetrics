import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuaIVPvLbhvEOi1R8BzuAgOncdFmJLwfc",
  authDomain: "digital-metrics-452c9.firebaseapp.com",
  projectId: "digital-metrics-452c9",
  storageBucket: "digital-metrics-452c9.firebasestorage.app",
  messagingSenderId: "193752642919",
  appId: "1:193752642919:web:6df25c423ef8fc088aabc2",
  measurementId: "G-YS43YG0MWB"
};

// Initialize Firebase only if API key is provided
let app;
let db;
let auth;
let analytics;

// Check if we're in development and Firebase config is available
const isFirebaseConfigured = firebaseConfig.apiKey && 
  firebaseConfig.apiKey.startsWith('AIza') && // Valid Firebase API keys start with AIza
  firebaseConfig.projectId;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    
    // Initialize Analytics only if supported and in browser environment
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {
        // Silently handle analytics initialization errors
      });
    }
    
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    // Reset variables if initialization fails
    app = undefined;
    db = undefined;
    auth = undefined;
  }
} else {
  if (import.meta.env.DEV) {
    console.warn('Firebase configuration is missing or invalid. App will run in demo mode.');
  }
}

export { db, auth, analytics };

export default app;