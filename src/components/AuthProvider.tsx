import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  Timestamp 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export type UserRole = 'administrator' | 'crm_manager' | 'sales';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  name: string;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Role permissions mapping
const rolePermissions: Record<UserRole, string[]> = {
  administrator: [
    'view_all_data',
    'edit_all_data',
    'delete_all_data',
    'manage_users',
    'manage_roles',
    'system_settings',
    'export_data',
    'view_reports',
    'manage_campaigns',
    'manage_workflows'
  ],
  crm_manager: [
    'view_all_data',
    'edit_all_data',
    'manage_leads',
    'manage_deals',
    'view_reports',
    'manage_campaigns',
    'manage_workflows',
    'assign_leads',
    'approve_deals'
  ],
  sales: [
    'view_all_data',
    'view_reports',
    'view_campaigns',
    'view_workflows',
    'view_own_data',
    'edit_own_data',
    'manage_own_leads',
    'manage_own_deals',
    'view_own_reports',
    'send_communications',
    'no_delete_access'
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && auth) {
        setUser(user);
        await fetchUserProfile(user.uid);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const fetchUserProfile = async (uid: string) => {
    try {
      if (!db) {
        console.warn('Firestore not available');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as UserProfile);
        
        // Update last login
        await setDoc(doc(db, 'users', uid), {
          lastLogin: Timestamp.now()
        }, { merge: true });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (!auth) {
        throw new Error('Authentication not available');
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      if (!auth || !db) {
        throw new Error('Authentication or database not available');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        role,
        name,
        createdAt: Timestamp.now(),
        lastLogin: Timestamp.now(),
        isActive: true
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      if (!auth) {
        throw new Error('Authentication not available');
      }
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!userProfile) return false;
    return rolePermissions[userProfile.role]?.includes(permission) || false;
  };

  const isRole = (role: UserRole): boolean => {
    return userProfile?.role === role || false;
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    logout,
    hasPermission,
    isRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};