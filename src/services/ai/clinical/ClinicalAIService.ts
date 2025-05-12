
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
}
