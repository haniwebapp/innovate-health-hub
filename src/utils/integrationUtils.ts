
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

// Fetch all integrations, ordered by name
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

// Fetch integrations by specific type
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

// Fetch a specific integration by ID
export async function fetchIntegrationById(id: string) {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to fetch integration: ${error.message}`);
    return data as Integration;
  } catch (error) {
    console.error("Error in fetchIntegrationById:", error);
    throw error;
  }
}

// Fetch logs for a specific integration
export async function fetchIntegrationLogs(integrationId: string) {
  try {
    const { data, error } = await supabase
      .from('integration_logs')
      .select('*')
      .eq('integration_id', integrationId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw new Error(`Failed to fetch integration logs: ${error.message}`);
    return data as IntegrationLog[];
  } catch (error) {
    console.error("Error in fetchIntegrationLogs:", error);
    throw error;
  }
}

// Create a new integration
export async function createIntegration(integration: Omit<Integration, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .insert(integration)
      .select()
      .single();

    if (error) throw new Error(`Failed to create integration: ${error.message}`);
    
    // Log the creation event
    await logIntegrationEvent(
      data.id,
      'integration_created',
      'success',
      { timestamp: new Date().toISOString() }
    );
    
    return data as Integration;
  } catch (error) {
    console.error("Error in createIntegration:", error);
    throw error;
  }
}

// Update an existing integration
export async function updateIntegration(id: string, updates: Partial<Integration>) {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update integration: ${error.message}`);
    
    // Log the update event
    await logIntegrationEvent(
      id,
      'integration_updated',
      'success',
      { 
        timestamp: new Date().toISOString(),
        updated_fields: Object.keys(updates)
      }
    );
    
    return data as Integration;
  } catch (error) {
    console.error("Error in updateIntegration:", error);
    throw error;
  }
}

// Log an event related to an integration
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

// Toggle an integration's active status
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
      isActive ? 'integration_activated' : 'integration_deactivated',
      'success',
      { 
        timestamp: new Date().toISOString(),
        is_active: isActive 
      }
    );
    
    return data as Integration;
  } catch (error) {
    console.error("Error in toggleIntegration:", error);
    throw error;
  }
}

// Delete an integration
export async function deleteIntegration(id: string) {
  try {
    // First, log that we're about to delete the integration
    await logIntegrationEvent(
      id,
      'integration_deleted',
      'success',
      { timestamp: new Date().toISOString() }
    );
    
    // Then perform the delete operation
    const { error } = await supabase
      .from('integrations')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete integration: ${error.message}`);
    return true;
  } catch (error) {
    console.error("Error in deleteIntegration:", error);
    throw error;
  }
}

// Test an integration's connection
export async function testIntegrationConnection(id: string): Promise<boolean> {
  try {
    // First log that we're testing the connection
    await logIntegrationEvent(
      id,
      'connection_test',
      'pending',
      { timestamp: new Date().toISOString() }
    );
    
    // Fetch the integration details
    const integration = await fetchIntegrationById(id);
    
    // Simple test based on integration type
    // In a real app, this would make actual API calls to test the connection
    let success = true;
    let errorMessage = '';
    
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock test logic based on integration type
    if (integration.type === 'api' && !integration.endpoint) {
      success = false;
      errorMessage = 'API endpoint not configured';
    } else if (integration.type === 'database' && (!integration.config || !integration.config.connection_string)) {
      success = false;
      errorMessage = 'Database connection string not configured';
    }
    
    // Log the test result
    await logIntegrationEvent(
      id,
      'connection_test',
      success ? 'success' : 'error',
      { 
        timestamp: new Date().toISOString(),
        message: success ? 'Connection successful' : `Connection failed: ${errorMessage}`
      }
    );
    
    return success;
  } catch (error) {
    // Log the error
    await logIntegrationEvent(
      id,
      'connection_test',
      'error',
      { 
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    );
    
    console.error("Error testing integration connection:", error);
    throw error;
  }
}
