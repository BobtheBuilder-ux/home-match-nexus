
import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { UserProfile, createUserProfile, getUserProfile, determineUserRole } from '@/services/userService';
import { enforceEmailRoleRestriction } from '@/services/adminService';
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
            
            // Enforce email role restriction
            await enforceEmailRoleRestriction(user.email!, role);
            
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
          // If there's a role restriction error, sign out the user
          if (error instanceof Error && error.message.includes('already registered with a different role')) {
            await signOut(auth);
            alert(error.message);
          }
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
      
      // If signing in as agent, check role restriction first
      if (asAgent) {
        await enforceEmailRoleRestriction(user.email!, 'agent');
        
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
          // If existing user tries to change role, prevent it
          throw new Error('This email is already registered with a different role. Each email can only be associated with one role.');
        }
        
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      if (error instanceof Error && error.message.includes('already registered with a different role')) {
        alert(error.message);
      }
      throw error;
    }
  };

  const registerAsAgent = async () => {
    if (!user || !userProfile) {
      throw new Error('User must be logged in to register as agent');
    }

    try {
      // Check if user can change to agent role
      if (userProfile.role !== 'customer') {
        throw new Error('Only customers can register as agents. This email is already associated with a different role.');
      }

      // Enforce email role restriction for agent role
      await enforceEmailRoleRestriction(user.email!, 'agent');

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
