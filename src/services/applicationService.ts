import { supabase } from '@/integrations/supabase/client';

export interface TenantApplication {
  id: string;
  property_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  application_date: string;
  move_in_date?: string;
  monthly_income?: number;
  employment_status?: string;
  emergency_contacts?: any;
  documents?: any;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const submitApplication = async (applicationData: Omit<TenantApplication, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .insert([applicationData])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export const getApplicationsByProperty = async (propertyId: string) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('property_id', propertyId)
      .order('application_date', { ascending: false });

    if (error) throw error;
    return data as TenantApplication[];
  } catch (error) {
    console.error('Error getting applications:', error);
    throw error;
  }
};

export const getUserApplications = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', userId)
      .order('application_date', { ascending: false });

    if (error) throw error;
    return data as TenantApplication[];
  } catch (error) {
    console.error('Error getting user applications:', error);
    throw error;
  }
};

export const getApplicationsByApplicant = async (applicantId: string) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', applicantId)
      .order('application_date', { ascending: false });

    if (error) throw error;
    return data as TenantApplication[];
  } catch (error) {
    console.error('Error getting user applications:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (
  applicationId: string, 
  status: TenantApplication['status']
) => {
  try {
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', applicationId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};
