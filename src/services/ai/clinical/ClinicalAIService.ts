
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

export interface ClinicalCodeResult {
  icd10Codes: string[];
  drgCodes: string[];
  confidence: number;
  notes: string;
}

export interface SymptomCluster {
  clusterId: string;
  symptoms: string[];
  possibleConditions: string[];
  severity: "low" | "moderate" | "high";
  recommendations: string[];
}

export interface DiseaseBurdenForecast {
  region: string;
  timeframe: string;
  predictions: {
    condition: string;
    prevalenceRate: number;
    trend: "increasing" | "stable" | "decreasing";
    confidenceLevel: number;
  }[];
  interventionImpact: {
    intervention: string;
    potentialImpact: number;
    timeToEffect: string;
  }[];
}

/**
 * Service for handling clinical AI operations
 */
export class ClinicalAIService {
  /**
   * Generate ICD/DRG codes for clinical text
   */
  static async generateClinicalCodes(clinicalText: string): Promise<ClinicalCodeResult> {
    try {
      const { data, error } = await supabase.functions.invoke("clinical-code-generator", {
        body: { clinicalText }
      });

      if (error) throw error;
      return data as ClinicalCodeResult;
    } catch (error: any) {
      console.error("Error generating clinical codes:", error);
      throw AIService.handleError(error, "generateClinicalCodes", "clinical");
    }
  }

  /**
   * Map symptom clusters from clinical descriptions
   */
  static async mapSymptomClusters(
    symptoms: string[]
  ): Promise<SymptomCluster[]> {
    try {
      const { data, error } = await supabase.functions.invoke("symptom-cluster-mapper", {
        body: { symptoms }
      });

      if (error) throw error;
      return data as SymptomCluster[];
    } catch (error: any) {
      console.error("Error mapping symptom clusters:", error);
      throw AIService.handleError(error, "mapSymptomClusters", "clinical");
    }
  }

  /**
   * Generate disease burden forecasts for a region
   */
  static async forecastDiseaseBurden(
    region: string,
    timeframe: string,
    conditions?: string[]
  ): Promise<DiseaseBurdenForecast> {
    try {
      const { data, error } = await supabase.functions.invoke("disease-burden-forecaster", {
        body: { 
          region,
          timeframe,
          conditions
        }
      });

      if (error) throw error;
      return data as DiseaseBurdenForecast;
    } catch (error: any) {
      console.error("Error forecasting disease burden:", error);
      throw AIService.handleError(error, "forecastDiseaseBurden", "clinical");
    }
  }

  /**
   * Generate clinical report draft from structured data
   */
  static async draftClinicalReport(
    patientData: any,
    clinicalObservations: string[],
    reportType: string
  ): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke("clinical-report-drafter", {
        body: { 
          patientData,
          clinicalObservations,
          reportType
        }
      });

      if (error) throw error;
      return data.reportContent;
    } catch (error: any) {
      console.error("Error drafting clinical report:", error);
      throw AIService.handleError(error, "draftClinicalReport", "clinical");
    }
  }
}
