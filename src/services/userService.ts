
import { databases, DATABASE_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';

export interface UserProfile {
  $id?: string;
  userId: string;
  email: string;
  displayName: string;
  role: 'customer' | 'agent' | 'admin';
  photoURL?: string;
  createdAt: string;
  isApproved?: boolean;
}

const USERS_COLLECTION_ID = 'users';

export const createUserProfile = async (userProfile: Omit<UserProfile, '$id'>) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      userProfile
    );
    return response;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [
        `userId = "${userId}"`
      ]
    );
    
    if (response.documents.length > 0) {
      return response.documents[0] as UserProfile;
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
    if (userProfile) {
      const response = await databases.updateDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        userProfile.$id!,
        { role }
      );
      return response;
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
