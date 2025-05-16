
import { supabase } from "@/integrations/supabase/client";
import { StrategyGapInput, StrategyGapResult } from "./types";

export class StrategyGapService {
  /**
   * Analyzes the gaps between current policy implementation and goals
   */
  static async analyzeGaps(input: StrategyGapInput): Promise<StrategyGapResult> {
    try {
      const { data, error } = await supabase.functions.invoke("strategy-gap-analysis", {
        body: input
      });

      if (error) throw new Error(error.message);
      return data as StrategyGapResult;
    } catch (error: any) {
      console.error("Error analyzing strategy gaps:", error);
      throw new Error(error.message || "Failed to analyze strategy gaps");
    }
  }

  /**
   * Saves a strategy gap analysis to the database
   */
  static async saveAnalysis(
    title: string,
    description: string | undefined,
    result: StrategyGapResult
  ): Promise<string> {
    try {
      const { data: userId } = await supabase.auth.getUser();
      
      if (!userId.user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase.rpc(
        'save_strategy_gap_analysis', 
        {
          p_user_id: userId.user.id,
          p_title: title,
          p_description: description || '',
          p_overall_analysis: result.overallAnalysis,
          p_gaps: JSON.stringify(result.gaps),
          p_recommendations: result.recommendations
        }
      );

      if (error) throw new Error(error.message);
      return data;
    } catch (error: any) {
      console.error("Error saving strategy gap analysis:", error);
      throw new Error(error.message || "Failed to save strategy gap analysis");
    }
  }

  /**
   * Gets a list of all strategy gap analyses for the current user
   */
  static async listAnalyses() {
    try {
      const { data, error } = await supabase.rpc('list_strategy_gap_analyses');
      
      if (error) throw new Error(error.message);
      return data;
    } catch (error: any) {
      console.error("Error listing strategy gap analyses:", error);
      throw new Error(error.message || "Failed to list strategy gap analyses");
    }
  }

  /**
   * Gets a complete strategy gap analysis by ID
   */
  static async getAnalysis(id: string): Promise<StrategyGapResult> {
    try {
      const { data, error } = await supabase.rpc('get_strategy_gap_analysis', {
        p_analysis_id: id
      });
      
      if (error) throw new Error(error.message);
      if (!data) throw new Error("Analysis not found");
      
      // The issue is here - data is a single object, not an array
      // Check if data is an array and take the first item if needed
      const result = Array.isArray(data) ? data[0] : data;
      
      return {
        overallAnalysis: result.overall_analysis,
        gaps: result.gaps || [],
        recommendations: result.recommendations || []
      };
    } catch (error: any) {
      console.error("Error getting strategy gap analysis:", error);
      throw new Error(error.message || "Failed to get strategy gap analysis");
    }
  }
}
