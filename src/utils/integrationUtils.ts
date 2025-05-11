
import { supabase } from "@/integrations/supabase/client";

export interface Integration {
  id: string;
  name: string;
  description: string | null;
  type: string;
  config: any;
  is_active: boolean;
  endpoint: string | null;
  created_at: string;
  updated_at: string;
}

export interface IntegrationLog {
  id: string;
  integration_id: string | null;
  event_type: string;
  status: string;
  details: any;
  created_at: string;
}

export async function fetchIntegrations() {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw new Error(`Failed to fetch integrations: ${error.message}`);
    return data as Integration[];
  } catch (error) {
    console.error("Error in fetchIntegrations:", error);
    throw error;
  }
}

export async function fetchIntegrationsByType(type: string) {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('type', type)
      .order('name', { ascending: true });

    if (error) throw new Error(`Failed to fetch integrations by type: ${error.message}`);
    return data as Integration[];
  } catch (error) {
    console.error("Error in fetchIntegrationsByType:", error);
    throw error;
  }
}

export async function fetchIntegrationLogs(integrationId: string) {
  try {
    const { data, error } = await supabase
      .from('integration_logs')
      .select('*')
      .eq('integration_id', integrationId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch integration logs: ${error.message}`);
    return data as IntegrationLog[];
  } catch (error) {
    console.error("Error in fetchIntegrationLogs:", error);
    throw error;
  }
}

export async function createIntegration(integration: Omit<Integration, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .insert(integration)
      .select()
      .single();

    if (error) throw new Error(`Failed to create integration: ${error.message}`);
    return data as Integration;
  } catch (error) {
    console.error("Error in createIntegration:", error);
    throw error;
  }
}

export async function updateIntegration(id: string, updates: Partial<Integration>) {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update integration: ${error.message}`);
    return data as Integration;
  } catch (error) {
    console.error("Error in updateIntegration:", error);
    throw error;
  }
}

export async function logIntegrationEvent(integrationId: string, eventType: string, status: string, details?: any) {
  try {
    const { error } = await supabase
      .from('integration_logs')
      .insert({
        integration_id: integrationId,
        event_type: eventType,
        status,
        details: details || {}
      });

    if (error) throw new Error(`Failed to log integration event: ${error.message}`);
    return true;
  } catch (error) {
    console.error("Error in logIntegrationEvent:", error);
    throw error;
  }
}

export async function toggleIntegration(id: string, isActive: boolean) {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .update({ 
        is_active: isActive,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to toggle integration: ${error.message}`);
    
    // Log the state change
    await logIntegrationEvent(
      id, 
      isActive ? 'activation' : 'deactivation',
      'success',
      { is_active: isActive }
    );
    
    return data as Integration;
  } catch (error) {
    console.error("Error in toggleIntegration:", error);
    throw error;
  }
}
