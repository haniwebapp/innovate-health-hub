
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
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data as Integration[];
}

export async function fetchIntegrationsByType(type: string) {
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('type', type)
    .order('name', { ascending: true });

  if (error) throw error;
  return data as Integration[];
}

export async function fetchIntegrationLogs(integrationId: string) {
  const { data, error } = await supabase
    .from('integration_logs')
    .select('*')
    .eq('integration_id', integrationId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as IntegrationLog[];
}

export async function createIntegration(integration: Omit<Integration, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('integrations')
    .insert(integration)
    .select()
    .single();

  if (error) throw error;
  return data as Integration;
}

export async function updateIntegration(id: string, updates: Partial<Integration>) {
  const { data, error } = await supabase
    .from('integrations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Integration;
}

export async function logIntegrationEvent(integrationId: string, eventType: string, status: string, details?: any) {
  const { error } = await supabase
    .from('integration_logs')
    .insert({
      integration_id: integrationId,
      event_type: eventType,
      status,
      details: details || {}
    });

  if (error) throw error;
  return true;
}

export async function toggleIntegration(id: string, isActive: boolean) {
  const { data, error } = await supabase
    .from('integrations')
    .update({ 
      is_active: isActive,
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  
  // Log the state change
  await logIntegrationEvent(
    id, 
    isActive ? 'activation' : 'deactivation',
    'success',
    { is_active: isActive }
  );
  
  return data as Integration;
}
