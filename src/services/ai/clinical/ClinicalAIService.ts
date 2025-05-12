
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

export interface ClinicalAnalysisRequest {
  patientData?: string;
  clinicalNotes?: string;
  medicalImages?: string[];
  labResults?: Record<string, any>;
  vitalSigns?: Record<string, any>;
  previousDiagnoses?: string[];
}

export interface ClinicalAnalysisResult {
  summary: string;
  possibleDiagnoses: {
    condition: string;
    confidence: number;
    reasoning: string;
  }[];
  recommendedActions: string[];
  differentialDiagnosis: string[];
  riskFactors: string[];
  notes: string;
}

export interface TreatmentPlan {
  recommendations: string[];
  medicationSuggestions: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    precautions: string[];
  }[];
  followUpRecommendation: string;
  lifestyle: string[];
  monitoringPlan: string;
}

export interface SimilarRecord {
  id: string;
  title: string;
  similarity: number;
  diagnosis: string[];
  record_type?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  description?: string;
}

export interface ClinicalTextAnalysisResult {
  entities: {
    type: string;
    text: string;
    confidence: number;
  }[];
  summary: string;
  suggestedCodes: {
    code: string;
    description: string;
    system: string;
  }[];
  keyFindings: string[];
  // Adding the properties needed by ClinicalRecordForm
  medicalCodes?: Record<string, any>;
  symptoms?: string[];
  diagnosis?: string[];
}

/**
 * Service for healthcare clinical AI operations
 */
export class ClinicalAIService {
  /**
   * Analyze clinical data and generate insights
   */
  static async analyzeClinicalData(
    request: ClinicalAnalysisRequest
  ): Promise<ClinicalAnalysisResult> {
    try {
      const { data, error } = await supabase.functions.invoke("clinical-analyzer", {
        body: request
      });

      if (error) throw error;
      return data as ClinicalAnalysisResult;
    } catch (error: any) {
      console.error("Error analyzing clinical data:", error);
      throw AIService.handleError(error, "analyzeClinicalData", "clinical");
    }
  }

  /**
   * Generate treatment plan suggestions based on diagnosis
   */
  static async generateTreatmentPlan(
    diagnosis: string,
    patientInfo: Record<string, any>
  ): Promise<TreatmentPlan> {
    try {
      const { data, error } = await supabase.functions.invoke("treatment-plan-generator", {
        body: { 
          diagnosis,
          patientInfo
        }
      });

      if (error) throw error;
      return data as TreatmentPlan;
    } catch (error: any) {
      console.error("Error generating treatment plan:", error);
      throw AIService.handleError(error, "generateTreatmentPlan", "clinical");
    }
  }

  /**
   * Extract structured data from unstructured clinical notes
   */
  static async extractStructuredData(
    clinicalNotes: string
  ): Promise<Record<string, any>> {
    try {
      const { data, error } = await supabase.functions.invoke("clinical-data-extractor", {
        body: { clinicalNotes }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error extracting structured data:", error);
      throw AIService.handleError(error, "extractStructuredData", "clinical");
    }
  }

  /**
   * Check for drug interactions in medication list
   */
  static async checkDrugInteractions(
    medications: string[]
  ): Promise<{
    interactions: { drugs: string[], severity: string, description: string }[],
    warnings: string[],
    recommendations: string[]
  }> {
    try {
      const { data, error } = await supabase.functions.invoke("drug-interaction-checker", {
        body: { medications }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error checking drug interactions:", error);
      throw AIService.handleError(error, "checkDrugInteractions", "clinical");
    }
  }

  /**
   * Generate clinical documentation from structured data
   */
  static async generateClinicalDocumentation(
    patientData: Record<string, any>,
    documentType: "soap" | "discharge" | "referral" | "prescription"
  ): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke("clinical-documentation-generator", {
        body: { 
          patientData,
          documentType
        }
      });

      if (error) throw error;
      return data.document;
    } catch (error: any) {
      console.error("Error generating clinical documentation:", error);
      throw AIService.handleError(error, "generateClinicalDocumentation", "clinical");
    }
  }

  /**
   * Find similar clinical records based on symptoms and diagnosis
   */
  static async findSimilarRecords(
    recordId: string,
    limit: number = 5
  ): Promise<SimilarRecord[]> {
    try {
      const { data, error } = await supabase.functions.invoke("clinical-similarity-search", {
        body: { 
          recordId,
          limit
        }
      });

      if (error) throw error;
      return data as SimilarRecord[];
    } catch (error: any) {
      console.error("Error finding similar records:", error);
      throw AIService.handleError(error, "findSimilarRecords", "clinical");
    }
  }

  /**
   * Analyze clinical text for entities, codes, and insights
   */
  static async analyzeText(
    text: string
  ): Promise<ClinicalTextAnalysisResult> {
    try {
      const { data, error } = await supabase.functions.invoke("clinical-text-analysis", {
        body: { text }
      });

      if (error) throw error;
      return data as ClinicalTextAnalysisResult;
    } catch (error: any) {
      console.error("Error analyzing clinical text:", error);
      throw AIService.handleError(error, "analyzeText", "clinical");
    }
  }

  /**
   * Automatically generate tags for a clinical record
   */
  static async autoTagRecord(
    recordId: string
  ): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('clinical_records')
        .select('*')
        .eq('id', recordId)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Record not found");
      
      const record = data;
      
      const analysisResult = await this.analyzeText(
        `${record.title}. ${record.description || ''}`
      );
      
      const tags = analysisResult.entities
        .filter(entity => entity.confidence > 0.7)
        .map(entity => entity.text);
      
      // Store tags in the database
      await Promise.all(tags.map(tag => 
        supabase.from('clinical_tags').insert({
          record_id: recordId,
          tag,
          source: 'ai',
          confidence: 0.8
        })
      ));
      
      return tags;
    } catch (error: any) {
      console.error("Error auto-tagging record:", error);
      throw AIService.handleError(error, "autoTagRecord", "clinical");
    }
  }

  /**
   * Generate treatment recommendations based on record
   */
  static async generateRecommendations(
    recordId: string
  ): Promise<{recommendations: string[], references: string[]}> {
    try {
      const { data: record, error } = await supabase
        .from('clinical_records')
        .select('*')
        .eq('id', recordId)
        .single();

      if (error) throw error;
      if (!record) throw new Error("Record not found");

      // For simplicity we'll use the analyzeClinicalData method
      const analysis = await this.analyzeClinicalData({
        patientData: JSON.stringify(record),
        clinicalNotes: record.description
      });

      // Return both recommendations and references
      return {
        recommendations: analysis.recommendedActions,
        references: [] // In a real app, this would contain reference data
      };
    } catch (error: any) {
      console.error("Error generating recommendations:", error);
      throw AIService.handleError(error, "generateRecommendations", "clinical");
    }
  }
}
