import { supabase } from "@/integrations/supabase/client";
import { ClinicalRecord, ClinicalTag, ClinicalAnalysis } from "@/types/clinicalTypes";

export class ClinicalService {
  /**
   * Create a new clinical record
   */
  static async createRecord(recordData: Omit<ClinicalRecord, 'id' | 'created_at' | 'updated_at' | 'created_by'>): Promise<ClinicalRecord | null> {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        throw new Error("User must be authenticated to create a clinical record");
      }
      
      const record = {
        ...recordData,
        created_by: user.data.user.id
      };
      
      const { data, error } = await supabase
        .from('clinical_records')
        .insert(record)
        .select()
        .single();
      
      if (error) throw error;
      
      // Return data with proper string dates as expected by ClinicalRecord type
      return data ? {
        ...data,
        created_at: data.created_at,
        updated_at: data.updated_at
      } as ClinicalRecord : null;
    } catch (error) {
      console.error("Error creating clinical record:", error);
      return null;
    }
  }
  
  /**
   * Get clinical records with filters
   */
  static async getRecords(filters: {
    recordType?: string,
    createdBy?: string,
    relatedInnovationId?: string
  } = {}): Promise<ClinicalRecord[]> {
    try {
      let query = supabase
        .from('clinical_records')
        .select('*');
      
      // Apply filters
      if (filters.recordType) {
        query = query.eq('record_type', filters.recordType);
      }
      
      if (filters.createdBy) {
        query = query.eq('created_by', filters.createdBy);
      }
      
      if (filters.relatedInnovationId) {
        query = query.eq('related_innovation_id', filters.relatedInnovationId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Return data with proper string dates as expected by ClinicalRecord type
      return (data || []).map(record => ({
        ...record,
        created_at: record.created_at,
        updated_at: record.updated_at
      })) as ClinicalRecord[];
    } catch (error) {
      console.error("Error getting clinical records:", error);
      return [];
    }
  }
  
  /**
   * Get a clinical record by ID
   */
  static async getRecordById(id: string): Promise<ClinicalRecord | null> {
    try {
      const { data, error } = await supabase
        .from('clinical_records')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Return data with proper string dates as expected by ClinicalRecord type
      return data ? {
        ...data,
        created_at: data.created_at,
        updated_at: data.updated_at
      } as ClinicalRecord : null;
    } catch (error) {
      console.error(`Error getting clinical record with ID ${id}:`, error);
      return null;
    }
  }
  
  /**
   * Update a clinical record
   */
  static async updateRecord(id: string, updates: Partial<ClinicalRecord>): Promise<ClinicalRecord | null> {
    try {
      // Remove fields that should not be updated directly
      const { id: _, created_at, updated_at, created_by, ...validUpdates } = updates as any;
      
      const { data, error } = await supabase
        .from('clinical_records')
        .update(validUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Convert date strings to string format (not Date objects) to match ClinicalRecord type
      return data ? {
        ...data,
        created_at: data.created_at,
        updated_at: data.updated_at
      } as ClinicalRecord : null;
    } catch (error) {
      console.error(`Error updating clinical record with ID ${id}:`, error);
      return null;
    }
  }
  
  /**
   * Add tags to a clinical record
   */
  static async addTag(tag: Omit<ClinicalTag, 'id' | 'created_at'>): Promise<ClinicalTag | null> {
    try {
      const { data, error } = await supabase
        .from('clinical_tags')
        .insert(tag)
        .select()
        .single();
      
      if (error) throw error;
      
      // Return data with proper string dates as expected by ClinicalTag type
      return data ? {
        ...data,
        created_at: data.created_at
      } as ClinicalTag : null;
    } catch (error) {
      console.error("Error adding clinical tag:", error);
      return null;
    }
  }
  
  /**
   * Get tags for a clinical record
   */
  static async getTagsForRecord(recordId: string): Promise<ClinicalTag[]> {
    try {
      const { data, error } = await supabase
        .from('clinical_tags')
        .select('*')
        .eq('record_id', recordId);
      
      if (error) throw error;
      
      // Return data with proper string dates as expected by ClinicalTag type
      return (data || []).map(tag => ({
        ...tag,
        created_at: tag.created_at
      })) as ClinicalTag[];
    } catch (error) {
      console.error(`Error getting tags for clinical record ${recordId}:`, error);
      return [];
    }
  }
  
  /**
   * Add an analysis to a clinical record
   */
  static async addAnalysis(analysis: Omit<ClinicalAnalysis, 'id' | 'created_at'>): Promise<ClinicalAnalysis | null> {
    try {
      const { data, error } = await supabase
        .from('clinical_analyses')
        .insert(analysis)
        .select()
        .single();
      
      if (error) throw error;
      
      // Return data with proper string dates as expected by ClinicalAnalysis type
      return data ? {
        ...data,
        created_at: data.created_at
      } as ClinicalAnalysis : null;
    } catch (error) {
      console.error("Error adding clinical analysis:", error);
      return null;
    }
  }
  
  /**
   * Get analyses for a clinical record
   */
  static async getAnalysesForRecord(recordId: string): Promise<ClinicalAnalysis[]> {
    try {
      const { data, error } = await supabase
        .from('clinical_analyses')
        .select('*')
        .eq('record_id', recordId);
      
      if (error) throw error;
      
      // Return data with proper string dates as expected by ClinicalAnalysis type
      return (data || []).map(analysis => ({
        ...analysis,
        created_at: analysis.created_at
      })) as ClinicalAnalysis[];
    } catch (error) {
      console.error(`Error getting analyses for clinical record ${recordId}:`, error);
      return [];
    }
  }
}
