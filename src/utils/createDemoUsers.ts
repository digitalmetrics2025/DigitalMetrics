import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  Timestamp 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserProfile, UserRole } from '../components/AuthProvider';

// Demo users configuration
const demoUsers = [
  {
    email: 'admin@digitalmetrics.com',
    password: 'admin123',
    name: 'System Administrator',
    role: 'administrator' as UserRole
  },
  {
    email: 'manager@digitalmetrics.com',
    password: 'manager123',
    name: 'CRM Manager',
    role: 'crm_manager' as UserRole
  },
  {
    email: 'sales@digitalmetrics.com',
    password: 'sales123',
    name: 'Sales Representative',
    role: 'sales' as UserRole
  }
];

// Function to create a single user
const createDemoUser = async (userData: typeof demoUsers[0]) => {
  try {
    console.log(`Creating user: ${userData.email}`);
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    const user = userCredential.user;
    
    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      role: userData.role,
      name: userData.name,
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
      isActive: true
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    console.log(`✅ Successfully created user: ${userData.email}`);
    return { success: true, user: userProfile };
    
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(`⚠️ User already exists: ${userData.email}`);
      return { success: false, error: 'User already exists', code: 'already-exists' };
    } else {
      console.error(`❌ Error creating user ${userData.email}:`, error.message);
      return { success: false, error: error.message };
    }
  }
};

// Main function to create all demo users
export const createAllDemoUsers = async () => {
  console.log('🚀 Starting demo user creation process...');
  
  const results = {
    created: [] as UserProfile[],
    existing: [] as string[],
    errors: [] as { email: string; error: string }[]
  };

  for (const userData of demoUsers) {
    const result = await createDemoUser(userData);
    
    if (result.success && result.user) {
      results.created.push(result.user);
    } else if (result.code === 'already-exists') {
      results.existing.push(userData.email);
    } else {
      results.errors.push({ email: userData.email, error: result.error || 'Unknown error' });
    }
    
    // Small delay between user creation
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Sign out after creating users
  try {
    await signOut(auth);
  } catch (error) {
    console.log('Note: No user was signed in to sign out');
  }

  console.log('\n📊 Demo User Creation Summary:');
  console.log(`✅ Created: ${results.created.length} users`);
  console.log(`⚠️ Already existed: ${results.existing.length} users`);
  console.log(`❌ Errors: ${results.errors.length} users`);

  if (results.created.length > 0) {
    console.log('\n🎉 Successfully created users:');
    results.created.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`);
    });
  }

  if (results.existing.length > 0) {
    console.log('\n⚠️ Users that already existed:');
    results.existing.forEach(email => {
      console.log(`  - ${email}`);
    });
  }

  if (results.errors.length > 0) {
    console.log('\n❌ Errors occurred:');
    results.errors.forEach(({ email, error }) => {
      console.log(`  - ${email}: ${error}`);
    });
  }

  return results;
};

// Function to verify demo users exist
export const verifyDemoUsers = async () => {
  console.log('🔍 Verifying demo users...');
  
  for (const userData of demoUsers) {
    try {
      // Try to sign in with demo credentials
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
      console.log(`✅ ${userData.email} - Login successful`);
      await signOut(auth);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log(`❌ ${userData.email} - User not found`);
      } else if (error.code === 'auth/wrong-password') {
        console.log(`❌ ${userData.email} - Wrong password`);
      } else {
        console.log(`❌ ${userData.email} - Error: ${error.message}`);
      }
    }
    
    // Small delay between attempts
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};

// Export demo users data for reference
export { demoUsers };