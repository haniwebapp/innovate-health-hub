
import { supabase } from "@/integrations/supabase/client";
import { ClinicalRecord, ClinicalTag } from "@/types/clinicalTypes";

export class ClinicalAIService {
  /**
   * Analyze medical text to extract relevant clinical information
   */
  static async analyzeText(text: string): Promise<{
    medicalCodes?: Record<string, any>,
    symptoms?: string[],
    diagnosis?: string[],
    tags?: string[]
  }> {
    try {
      const { data, error } = await supabase.functions.invoke('clinical-text-analysis', {
        body: { text }
      });
      
      if (error) throw error;
      
      return data || { 
        medicalCodes: {},
        symptoms: [],
        diagnosis: [],
        tags: []
      };
    } catch (error) {
      console.error("Error analyzing clinical text:", error);
      return { 
        medicalCodes: {},
        symptoms: [],
        diagnosis: [],
        tags: []
      };
    }
  }
  
  /**
   * Auto-tag a clinical record with relevant terms
   */
  static async autoTagRecord(recordId: string): Promise<ClinicalTag[]> {
    try {
      // First get the record
      const record = await supabase
        .from('clinical_records')
        .select('*')
        .eq('id', recordId)
        .single();
      
      if (record.error) throw record.error;
      
      // Combine text content for analysis
      const textToAnalyze = `${record.data.title}. ${record.data.description || ''}`;
      const analysisResult = await this.analyzeText(textToAnalyze);
      
      if (!analysisResult.tags || analysisResult.tags.length === 0) {
        return [];
      }
      
      // Create tags in the database
      const tags: ClinicalTag[] = [];
      for (const tag of analysisResult.tags) {
        const tagData = {
          record_id: recordId,
          tag,
          confidence: 0.85, // Default confidence for AI-generated tags
          source: 'ai-auto-tagging'
        };
        
        const { data, error } = await supabase
          .from('clinical_tags')
          .insert(tagData)
          .select()
          .single();
        
        if (!error && data) {
          // Convert string dates to Date objects
          tags.push({
            ...data,
            created_at: new Date(data.created_at)
          } as ClinicalTag);
        }
      }
      
      return tags;
    } catch (error) {
      console.error(`Error auto-tagging clinical record ${recordId}:`, error);
      return [];
    }
  }
  
  /**
   * Generate related records based on symptoms or diagnosis
   */
  static async findSimilarRecords(recordId: string): Promise<ClinicalRecord[]> {
    try {
      const { data, error } = await supabase.functions.invoke('clinical-similarity-search', {
        body: { recordId }
      });
      
      if (error) throw error;
      
      // Convert string dates to Date objects in the returned records
      return data?.similarRecords ? data.similarRecords.map((record: any) => ({
        ...record,
        created_at: new Date(record.created_at),
        updated_at: new Date(record.updated_at)
      })) : [];
    } catch (error) {
      console.error(`Error finding similar clinical records to ${recordId}:`, error);
      return [];
    }
  }
  
  /**
   * Generate clinical recommendations based on a record
   */
  static async generateRecommendations(recordId: string): Promise<{
    recommendations: string[],
    references: string[]
  }> {
    try {
      const { data, error } = await supabase.functions.invoke('clinical-recommendations', {
        body: { recordId }
      });
      
      if (error) throw error;
      
      return data || { recommendations: [], references: [] };
    } catch (error) {
      console.error(`Error generating recommendations for clinical record ${recordId}:`, error);
      return { recommendations: [], references: [] };
    }
  }
}
