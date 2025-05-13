
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
}
