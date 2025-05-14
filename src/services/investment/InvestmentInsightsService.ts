
import { supabase } from "@/integrations/supabase/client";

export interface InvestmentInsightsRequest {
  query?: string;
  sector?: string;
  stage?: string;
  region?: string;
  investmentSize?: string;
}

export class InvestmentInsightsService {
  static async getInsights(params: InvestmentInsightsRequest): Promise<string[]> {
    try {
      const { data, error } = await supabase.functions.invoke('investment-insights', {
        body: params
      });

      if (error) {
        console.error('Error calling investment-insights function:', error);
        throw new Error(error.message || 'Failed to generate investment insights');
      }

      if (!data || !data.insights) {
        throw new Error('Invalid response from AI service');
      }
      
      return data.insights;
    } catch (error) {
      console.error('Error in getInsights:', error);
      throw error;
    }
  }
}
