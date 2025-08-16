import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if API key is provided
let app;
let db;
let auth;
let analytics;

// Check if we're in development and Firebase config is available
const isFirebaseConfigured = firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'your-api-key-here' && 
  firebaseConfig.apiKey !== 'undefined' &&
  firebaseConfig.apiKey !== '' &&
  firebaseConfig.apiKey !== 'demo-api-key' &&
  firebaseConfig.apiKey.startsWith('AIza') && // Valid Firebase API keys start with AIza
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== 'your-project-id' &&
  firebaseConfig.projectId !== 'undefined' &&
  firebaseConfig.projectId !== '' &&
  firebaseConfig.projectId !== 'demo-project-id';

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