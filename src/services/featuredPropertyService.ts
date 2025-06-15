
import { supabase } from '@/integrations/supabase/client';

export interface FeaturedRequest {
  id?: string;
  property_id: string;
  agent_id: string;
  property_title: string;
  requested_at: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_at?: string;
  reviewed_by?: string;
  payment_id?: string;
}

export const requestFeaturedProperty = async (
  propertyId: string, 
  agentId: string, 
  propertyTitle: string,
  paymentId?: string
) => {
  try {
    const requestData = {
      property_id: propertyId,
      agent_id: agentId,
      property_title: propertyTitle,
      status: 'pending' as const,
      ...(paymentId && { payment_id: paymentId })
    };
    
    const { data, error } = await supabase
      .from('featured_requests')
      .insert([requestData])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error requesting featured property:', error);
    throw error;
  }
};

export const getFeaturedRequests = async () => {
  try {
    const { data, error } = await supabase
      .from('featured_requests')
      .select('*')
      .order('requested_at', { ascending: false });

    if (error) throw error;
    return data as FeaturedRequest[];
  } catch (error) {
    console.error('Error getting featured requests:', error);
    throw error;
  }
};

export const updateFeaturedRequestStatus = async (
  requestId: string, 
  status: 'approved' | 'rejected', 
  adminNotes?: string
) => {
  try {
    const { error } = await supabase
      .from('featured_requests')
      .update({ 
        status,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', requestId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating featured request:', error);
    throw error;
  }
};

export const getFeaturedRequestStatus = async (propertyId: string, agentId: string) => {
  try {
    const { data, error } = await supabase
      .from('featured_requests')
      .select('*')
      .eq('property_id', propertyId)
      .eq('agent_id', agentId)
      .order('requested_at', { ascending: false })
      .limit(1);

    if (error) throw error;
    
    if (data && data.length > 0) {
      return data[0].status;
    }
    
    return 'none' as const;
  } catch (error) {
    console.error('Error getting featured request status:', error);
    return 'none' as const;
  }
};
