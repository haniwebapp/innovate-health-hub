
import { supabase } from "@/integrations/supabase/client";
import { AIService } from "../AIService";

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

export interface EthicsAssessment {
  ethicsScore: number;
  risks: {
    category: string;
    description: string;
    severity: "low" | "medium" | "high";
    mitigationSteps: string[];
  }[];
  recommendations: string[];
  requiredActions: string[];
}

export interface ComplianceMatchResult {
  standardName: string;
  matchScore: number;
  requiredActions: string[];
  complianceEstimate: {
    percentCompliant: number;
    missingElements: string[];
  };
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
   * Perform an ethics assessment on a healthcare innovation
   */
  static async assessEthics(
    innovationData: InnovationData
  ): Promise<EthicsAssessment> {
    try {
      const { data, error } = await supabase.functions.invoke("ethics-assessment", {
        body: { 
          innovationDescription: innovationData.description,
          sector: innovationData.sector,
          userImpact: innovationData.patientImpact || '',
          dataCollection: innovationData.dataCollection || '',
          targetUsers: innovationData.targetUsers || [],
        }
      });

      if (error) throw error;
      return data as EthicsAssessment;
    } catch (error: any) {
      console.error("Error assessing ethics considerations:", error);
      return {
        ethicsScore: 0,
        risks: [],
        recommendations: [
          "Unable to analyze ethics considerations at this time. Please try again later."
        ],
        requiredActions: []
      };
    }
  }

  /**
   * Match innovation against healthcare standards and regulatory frameworks
   */
  static async matchComplianceStandards(
    innovationData: InnovationData,
    standards: string[] = ["ISO 13485", "HIPAA", "GDPR", "MOH Standards"]
  ): Promise<ComplianceMatchResult[]> {
    try {
      const { data, error } = await supabase.functions.invoke("compliance-matcher", {
        body: { 
          innovationDescription: innovationData.description,
          innovationType: innovationData.type,
          standards
        }
      });

      if (error) throw error;
      return data as ComplianceMatchResult[];
    } catch (error: any) {
      console.error("Error matching compliance standards:", error);
      
      // Return fallback data in case of error
      return standards.map(standard => ({
        standardName: standard,
        matchScore: 0,
        requiredActions: ["Unable to analyze compliance requirements at this time."],
        complianceEstimate: {
          percentCompliant: 0,
          missingElements: ["Analysis failed"]
        }
      }));
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
      
      // Generate compliance requirements based on the analysis
      await RegulatoryAIService.generateComplianceRequirements(applicationId, analysis);
      
    } catch (error: any) {
      console.error("Error saving regulatory analysis:", error);
      throw error;
    }
  }
  
  /**
   * Generate compliance requirements based on AI analysis
   */
  private static async generateComplianceRequirements(
    applicationId: string, 
    analysis: RegulatoryAnalysis
  ): Promise<void> {
    try {
      // Convert key requirements to compliance requirements
      const complianceItems = analysis.keyRequirements.map(req => ({
        application_id: applicationId,
        title: req.requirement,
        description: `Complexity: ${req.complexity}, Estimated time: ${req.estimatedTime}`,
        status: req.status.toLowerCase() === 'required' ? 'required' : 'recommended',
        completed: false
      }));
      
      // Add documentation requirements
      analysis.documentationNeeded.forEach((doc, index) => {
        complianceItems.push({
          application_id: applicationId,
          title: `Documentation: ${doc}`,
          description: 'Required documentation for regulatory compliance',
          status: 'required',
          completed: false
        });
      });
      
      // Add testing requirements
      analysis.testingRequirements.forEach((test, index) => {
        complianceItems.push({
          application_id: applicationId,
          title: `Testing: ${test}`,
          description: 'Required testing for regulatory validation',
          status: 'required',
          completed: false
        });
      });
      
      // Insert all compliance requirements
      const { error } = await supabase
        .from('sandbox_compliance_requirements')
        .insert(complianceItems);
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error("Error generating compliance requirements:", error);
      throw error;
    }
  }
}
