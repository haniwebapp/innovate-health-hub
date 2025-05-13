
import { supabase } from '@/integrations/supabase/client';

interface SimulationParams {
  timeframe: string;
  region: string;
  sectors?: string[];
}

export interface PolicyData {
  name: string;
  description: string;
  sector: string;
  stakeholders?: string[];
  goals?: string[];
  metrics?: string[];
}

export const simulatePolicy = async (policyData: PolicyData, params: SimulationParams) => {
  try {
    const { data, error } = await supabase.functions.invoke("policy-impact-simulation", {
      body: { 
        policyData, 
        simulationParams: params,
        trace: {
          traceId: `sim-${Date.now()}`,
          operation: "policy-simulation",
          timestamp: new Date().toISOString()
        }
      }
    });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error simulating policy impact:", error);
    return {
      impactScore: 0,
      stakeholderImpact: {},
      economicImpact: "Unable to analyze due to an error",
      healthcareOutcomeImpact: "Analysis failed", 
      implementationComplexity: "Unknown",
      recommendations: ["Error occurred during analysis. Please try again."]
    };
  }
};
