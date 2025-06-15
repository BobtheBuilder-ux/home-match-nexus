
import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { UserProfile, createUserProfile, getUserProfile, determineUserRole } from '@/services/userService';
import { doc, updateDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: (asAgent?: boolean) => Promise<void>;
  registerAsAgent: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          let profile = await getUserProfile(user.uid);
          
          if (!profile) {
            // Create new user profile with default customer role
            const role = determineUserRole(user.email!);
            const newProfile = {
              userId: user.uid,
              email: user.email!,
              displayName: user.displayName || 'User',
              role,
              photoURL: user.photoURL,
              createdAt: new Date().toISOString(),
              isApproved: role === 'admin' || role === 'customer' // Agents need approval
            };
            
            profile = await createUserProfile(newProfile);
          }
          
          setUserProfile(profile);
        } catch (error) {
          console.error('Error managing user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async (asAgent: boolean = false) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // If signing in as agent, immediately update their role
      if (asAgent) {
        let profile = await getUserProfile(user.uid);
        
        if (!profile) {
          // Create new agent profile
          const newProfile = {
            userId: user.uid,
            email: user.email!,
            displayName: user.displayName || 'User',
            role: 'agent' as const,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            isApproved: false // Agents need approval
          };
          
          profile = await createUserProfile(newProfile);
        } else if (profile.role !== 'agent') {
          // Update existing profile to agent
          if (profile.id) {
            const userRef = doc(db, 'users', profile.id);
            await updateDoc(userRef, { role: 'agent', isApproved: false });
            profile = { ...profile, role: 'agent', isApproved: false };
          }
        }
        
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const registerAsAgent = async () => {
    if (!user || !userProfile) {
      throw new Error('User must be logged in to register as agent');
    }

    try {
      const updatedProfile = {
        ...userProfile,
        role: 'agent' as const,
        isApproved: false // Agents need admin approval
      };

      if (userProfile.id) {
        const userRef = doc(db, 'users', userProfile.id);
        await updateDoc(userRef, { role: 'agent', isApproved: false });
      }

      setUserProfile(updatedProfile);
    } catch (error) {
      console.error('Error registering as agent:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signInWithGoogle,
    registerAsAgent,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
