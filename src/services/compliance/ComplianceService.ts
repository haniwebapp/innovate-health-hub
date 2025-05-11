
import { supabase } from "@/integrations/supabase/client";
import { ComplianceRecord } from "@/types/complianceTypes";

export class ComplianceService {
  /**
   * Create a new compliance record
   */
  static async createRecord(recordData: Omit<ComplianceRecord, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'reviewed_by' | 'reviewed_at'>): Promise<ComplianceRecord | null> {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        throw new Error("User must be authenticated to create a compliance record");
      }
      
      const record = {
        ...recordData,
        created_by: user.data.user.id
      };
      
      const { data, error } = await supabase
        .from('compliance_records')
        .insert(record)
        .select()
        .single();
      
      if (error) throw error;
      
      // Convert string dates to Date objects
      return data ? {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        reviewed_at: data.reviewed_at ? new Date(data.reviewed_at) : undefined
      } as ComplianceRecord : null;
    } catch (error) {
      console.error("Error creating compliance record:", error);
      return null;
    }
  }
  
  /**
   * Get compliance records with filters
   */
  static async getRecords(filters: {
    status?: string,
    complianceType?: string,
    resourceId?: string,
    resourceType?: string
  } = {}): Promise<ComplianceRecord[]> {
    try {
      let query = supabase
        .from('compliance_records')
        .select('*');
      
      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.complianceType) {
        query = query.eq('compliance_type', filters.complianceType);
      }
      
      if (filters.resourceId) {
        query = query.eq('resource_id', filters.resourceId);
      }
      
      if (filters.resourceType) {
        query = query.eq('resource_type', filters.resourceType);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Convert string dates to Date objects
      return (data || []).map(record => ({
        ...record,
        created_at: new Date(record.created_at),
        updated_at: new Date(record.updated_at),
        reviewed_at: record.reviewed_at ? new Date(record.reviewed_at) : undefined
      })) as ComplianceRecord[];
    } catch (error) {
      console.error("Error getting compliance records:", error);
      return [];
    }
  }
  
  /**
   * Get a compliance record by ID
   */
  static async getRecordById(id: string): Promise<ComplianceRecord | null> {
    try {
      const { data, error } = await supabase
        .from('compliance_records')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Convert string dates to Date objects
      return data ? {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        reviewed_at: data.reviewed_at ? new Date(data.reviewed_at) : undefined
      } as ComplianceRecord : null;
    } catch (error) {
      console.error(`Error getting compliance record with ID ${id}:`, error);
      return null;
    }
  }
  
  /**
   * Update a compliance record
   */
  static async updateRecord(id: string, updates: Partial<ComplianceRecord>): Promise<ComplianceRecord | null> {
    try {
      // Remove fields that should not be updated directly
      const { id: _, created_at, updated_at, created_by, ...validUpdates } = updates as any;
      
      const { data, error } = await supabase
        .from('compliance_records')
        .update(validUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Convert string dates to Date objects
      return data ? {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        reviewed_at: data.reviewed_at ? new Date(data.reviewed_at) : undefined
      } as ComplianceRecord : null;
    } catch (error) {
      console.error(`Error updating compliance record with ID ${id}:`, error);
      return null;
    }
  }
  
  /**
   * Review a compliance record
   */
  static async reviewRecord(id: string, status: string): Promise<ComplianceRecord | null> {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        throw new Error("User must be authenticated to review a compliance record");
      }
      
      const { data, error } = await supabase
        .from('compliance_records')
        .update({
          status: status,
          reviewed_by: user.data.user.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Convert string dates to Date objects
      return data ? {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        reviewed_at: data.reviewed_at ? new Date(data.reviewed_at) : undefined
      } as ComplianceRecord : null;
    } catch (error) {
      console.error(`Error reviewing compliance record with ID ${id}:`, error);
      return null;
    }
  }
}
