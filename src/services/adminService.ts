
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from './userService';

export const getUserProfiles = async (): Promise<UserProfile[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(profile => ({
      id: profile.id,
      email: profile.email,
      display_name: profile.display_name,
      role: profile.role as 'customer' | 'agent' | 'admin',
      photo_url: profile.photo_url,
      is_approved: profile.is_approved,
      created_at: profile.created_at,
      updated_at: profile.updated_at
    }));
  } catch (error) {
    console.error('Error getting user profiles:', error);
    throw error;
  }
};

export const updateUserApprovalStatus = async (userId: string, isApproved: boolean) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ is_approved: isApproved })
      .eq('id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating user approval status:', error);
    throw error;
  }
};
