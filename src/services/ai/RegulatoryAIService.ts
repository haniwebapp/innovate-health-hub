
import { supabase } from "@/integrations/supabase/client";

export interface InnovationData {
  name: string;
  description: string;
  type: string;
  sector: string;
  stage: string;
  medicalClaims?: string[];
  targetUsers?: string[];
  dataCollection?: string;
  patientImpact?: string;
  [key: string]: any;
}

export interface RegulatoryAnalysis {
  summary: string;
  complianceScore: number;
  riskLevel: string;
  keyRequirements: {
    requirement: string;
    status: string;
    complexity: string;
    estimatedTime: string;
  }[];
  applicableRegulations: {
    name: string;
    authority: string;
    relevance: string;
  }[];
  documentationNeeded: string[];
  testingRequirements: string[];
  complianceTimeline: {
    preparationPhase: string;
    submissionPhase: string;
    reviewPhase: string;
    approvalPhase: string;
    totalEstimatedTime: string;
  };
  nextSteps: string[];
  internationalConsiderations: string;
  vision2030Alignment: string;
  error?: string;
}

export class RegulatoryAIService {
  /**
   * Generate an AI-powered regulatory compliance analysis
   */
  static async generateComplianceAnalysis(innovationData: InnovationData): Promise<RegulatoryAnalysis> {
    try {
      const { data, error } = await supabase.functions.invoke("regulatory-analysis", {
        body: { innovationData }
      });

      if (error) throw error;
      return data as RegulatoryAnalysis;
    } catch (error: any) {
      console.error("Error generating regulatory compliance analysis:", error);
      return {
        summary: "",
        complianceScore: 0,
        riskLevel: "Unknown",
        keyRequirements: [],
        applicableRegulations: [],
        documentationNeeded: [],
        testingRequirements: [],
        complianceTimeline: {
          preparationPhase: "",
          submissionPhase: "",
          reviewPhase: "",
          approvalPhase: "",
          totalEstimatedTime: ""
        },
        nextSteps: [],
        internationalConsiderations: "",
        vision2030Alignment: "",
        error: error.message || "Failed to generate regulatory compliance analysis"
      };
    }
  }

  /**
   * Save regulatory analysis results to the database
   */
  static async saveRegulatoryAnalysis(
    applicationId: string,
    analysis: RegulatoryAnalysis
  ): Promise<void> {
    try {
      // Store the summary and score in the main application table
      const { error: updateError } = await supabase
        .from('regulatory_applications')
        .update({
          risk_level: analysis.riskLevel,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (updateError) throw updateError;
      
      // Store the full analysis for future use in a separate table
      // This would require creating a table for storing regulatory analyses
      
    } catch (error: any) {
      console.error("Error saving regulatory analysis:", error);
      throw error;
    }
  }

  /**
   * Synchronize regulatory requirements with compliance checklist
   */
  static async syncComplianceRequirements(
    applicationId: string, 
    requirements: { requirement: string }[]
  ): Promise<void> {
    try {
      // This would match requirements to existing compliance requirements
      // and create application_compliance records for tracking
      
      // In a complete implementation, we would need to check existing requirements
      // and create new ones as needed based on the AI analysis
      
    } catch (error: any) {
      console.error("Error synchronizing compliance requirements:", error);
      throw error;
    }
  }
}
