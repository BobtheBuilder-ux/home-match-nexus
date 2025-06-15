
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { UserProfile } from '@/services/userService';

const USERS_COLLECTION = 'users';

export const getUserProfiles = async (): Promise<UserProfile[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
    const users: UserProfile[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as UserProfile));
    
    return users;
  } catch (error) {
    console.error('Error getting user profiles:', error);
    throw error;
  }
};

export const updateUserApprovalStatus = async (userId: string, isApproved: boolean) => {
  try {
    // First find the user document by userId
    const q = query(collection(db, USERS_COLLECTION), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, USERS_COLLECTION, userDoc.id);
      await updateDoc(userRef, { isApproved });
      return { id: userDoc.id, ...userDoc.data(), isApproved } as UserProfile;
    }
    
    throw new Error('User not found');
  } catch (error) {
    console.error('Error updating user approval status:', error);
    throw error;
  }
};

export const checkEmailRoleRestriction = async (email: string, newRole: 'customer' | 'agent' | 'admin'): Promise<boolean> => {
  try {
    // Check if email already exists with a different role
    const q = query(collection(db, USERS_COLLECTION), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const existingUser = querySnapshot.docs[0].data() as UserProfile;
      
      // If user exists and is trying to change to a different role, prevent it
      if (existingUser.role !== newRole) {
        return false; // Role change not allowed
      }
    }
    
    return true; // Email can be used for this role
  } catch (error) {
    console.error('Error checking email role restriction:', error);
    throw error;
  }
};

export const enforceEmailRoleRestriction = async (email: string, role: 'customer' | 'agent' | 'admin'): Promise<void> => {
  const isAllowed = await checkEmailRoleRestriction(email, role);
  
  if (!isAllowed) {
    throw new Error(`This email is already registered with a different role. Each email can only be associated with one role.`);
  }
};
