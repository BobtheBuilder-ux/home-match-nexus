
import { db } from '@/lib/firebase';
import { collection, doc, addDoc, getDocs, query, where, updateDoc, getDoc } from 'firebase/firestore';

export interface UserProfile {
  id?: string;
  userId: string;
  email: string;
  displayName: string;
  role: 'customer' | 'agent' | 'admin';
  photoURL?: string;
  createdAt: string;
  isApproved?: boolean;
}

const USERS_COLLECTION = 'users';

export const createUserProfile = async (userProfile: Omit<UserProfile, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, USERS_COLLECTION), userProfile);
    return { id: docRef.id, ...userProfile } as UserProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const q = query(collection(db, USERS_COLLECTION), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserRole = async (userId: string, role: 'customer' | 'agent' | 'admin') => {
  try {
    const userProfile = await getUserProfile(userId);
    if (userProfile && userProfile.id) {
      const userRef = doc(db, USERS_COLLECTION, userProfile.id);
      await updateDoc(userRef, { role });
      return { ...userProfile, role } as UserProfile;
    }
    throw new Error('User profile not found');
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

export const determineUserRole = (email: string): 'customer' | 'agent' | 'admin' => {
  if (email === 'admin@bobbieberry.com') {
    return 'admin';
  }
  
  // Default role is customer, agents will be upgraded when they join as agent
  return 'customer';
};
