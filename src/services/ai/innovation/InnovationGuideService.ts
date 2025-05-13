
import { supabase } from "@/integrations/supabase/client";
import { InnovationGuideInput, InnovationGuideResult } from "../policy/types";

export class InnovationGuideService {
  /**
   * Generates personalized guidance for healthcare innovators
   */
  static async generateGuidance(input: InnovationGuideInput): Promise<InnovationGuideResult> {
    try {
      const { data, error } = await supabase.functions.invoke("innovation-guide", {
        body: input
      });

      if (error) throw new Error(error.message);
      return data as InnovationGuideResult;
    } catch (error: any) {
      console.error("Error generating innovation guidance:", error);
      throw new Error(error.message || "Failed to generate innovation guidance");
    }
  }
}
