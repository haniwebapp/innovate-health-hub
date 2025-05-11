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
    console.log("Fetching all integrations...");
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error("Supabase error in fetchIntegrations:", error);
      
      if (error.message.includes("recursion") || error.message.includes("permission")) {
        throw new Error(`Database access error: You may not have the correct permissions to view integrations. Please make sure you're logged in with an admin account.`);
      } else {
        throw new Error(`Failed to fetch integrations: ${error.message}`);
      }
    }
    
    return data as Integration[];
  } catch (error) {
    console.error("Error in fetchIntegrations:", error);
    throw error;
  }
}

export async function fetchIntegrationsByType(type: string) {
  try {
    console.log(`Fetching integrations with type: ${type}`);
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('type', type)
      .order('name', { ascending: true });

    if (error) {
      console.error("Supabase error in fetchIntegrationsByType:", error);
      
      if (error.message.includes("recursion") || error.message.includes("permission")) {
        throw new Error(`Database access error: You may not have the correct permissions to view ${type} integrations. Please make sure you're logged in with an admin account.`);
      } else {
        throw new Error(`Failed to fetch ${type} integrations: ${error.message}`);
      }
    }
    
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

    if (error) {
      console.error("Supabase error in fetchIntegrationLogs:", error);
      throw new Error(`Failed to fetch integration logs: ${error.message}`);
    }
    
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

    if (error) {
      console.error("Supabase error in createIntegration:", error);
      throw new Error(`Failed to create integration: ${error.message}`);
    }
    
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

    if (error) {
      console.error("Supabase error in updateIntegration:", error);
      throw new Error(`Failed to update integration: ${error.message}`);
    }
    
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

    if (error) {
      console.error("Supabase error in logIntegrationEvent:", error);
      throw new Error(`Failed to log integration event: ${error.message}`);
    }
    
    return true;
  } catch (error) {
    console.error("Error in logIntegrationEvent:", error);
    throw error;
  }
}

export async function toggleIntegration(id: string, isActive: boolean) {
  try {
    console.log(`Toggling integration ${id} to ${isActive ? 'active' : 'inactive'}`);
    
    const { data, error } = await supabase
      .from('integrations')
      .update({ 
        is_active: isActive,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error in toggleIntegration:", error);
      
      if (error.message.includes("recursion") || error.message.includes("permission")) {
        throw new Error(`Database access error: You may not have the correct permissions to update integrations. Please make sure you're logged in with an admin account.`);
      } else {
        throw new Error(`Failed to toggle integration: ${error.message}`);
      }
    }
    
    // Log the state change
    try {
      await logIntegrationEvent(
        id, 
        isActive ? 'activation' : 'deactivation',
        'success',
        { is_active: isActive }
      );
    } catch (logError) {
      // Log but don't fail if logging fails
      console.warn("Failed to log integration toggle event:", logError);
    }
    
    return data as Integration;
  } catch (error) {
    console.error("Error in toggleIntegration:", error);
    throw error;
  }
}
