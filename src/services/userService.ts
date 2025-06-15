import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  role: 'customer' | 'agent' | 'admin';
  photo_url?: string;
  is_approved?: boolean;
  created_at: string;
  updated_at: string;
}

export const createUserProfile = async (userProfile: Omit<UserProfile, 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([userProfile])
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return data as UserProfile | null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserRole = async (userId: string, role: 'customer' | 'agent' | 'admin') => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as UserProfile[];
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

export const determineUserRole = (email: string): 'customer' | 'agent' | 'admin' => {
  const adminEmails = ['admin@mecwebcraft.com', 'admin@bobbieberry.com'];
  if (adminEmails.includes(email)) {
    return 'admin';
  }
  
  return 'customer';
};
