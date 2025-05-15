import { PolicyData, PolicyImpactResult } from '@/services/ai/policy/types';
import { supabase } from '@/integrations/supabase/client';

export const initialPolicyData: PolicyData = {
  name: '',
  description: '',
  sector: 'healthcare',
  stakeholders: [] // Added initialization for the stakeholders array
};

export const simulatePolicy = async (policyData: PolicyData, params: { timeframe: string; region: string }) => {
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
    return data as PolicyImpactResult;
  } catch (error: any) {
    console.error("Error simulating policy impact:", error);
    return {
      impactScore: 0,
      stakeholderImpact: {},
      economicImpact: {
        score: 0,
        description: "Unable to analyze due to an error"
      },
      socialImpact: {
        score: 0,
        description: "Unable to analyze due to an error"
      },
      healthcareImpact: {
        score: 0,
        description: "Unable to analyze due to an error"
      },
      healthcareOutcomeImpact: "Analysis failed", 
      implementationComplexity: "Unknown",
      recommendations: ["Error occurred during analysis. Please try again."]
    } as PolicyImpactResult;
  }
};
