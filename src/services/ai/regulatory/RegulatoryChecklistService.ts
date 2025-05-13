
import { supabase } from "@/integrations/supabase/client";
import { RegulatoryChecklistInput, RegulatoryChecklistResult } from "../policy/types";

export class RegulatoryChecklistService {
  /**
   * Generates a regulatory compliance checklist for a healthcare innovation
   */
  static async generateChecklist(input: RegulatoryChecklistInput): Promise<RegulatoryChecklistResult> {
    try {
      const { data, error } = await supabase.functions.invoke("regulatory-checklist", {
        body: input
      });

      if (error) throw new Error(error.message);
      return data as RegulatoryChecklistResult;
    } catch (error: any) {
      console.error("Error generating regulatory checklist:", error);
      throw new Error(error.message || "Failed to generate regulatory checklist");
    }
  }
}
