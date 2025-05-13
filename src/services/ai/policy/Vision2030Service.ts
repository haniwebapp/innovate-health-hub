
import { supabase } from "@/integrations/supabase/client";
import { Vision2030AlignmentInput, Vision2030AlignmentResult } from "./types";

export class Vision2030Service {
  /**
   * Checks how well an innovation aligns with Saudi Vision 2030 goals
   */
  static async checkAlignment(input: Vision2030AlignmentInput): Promise<Vision2030AlignmentResult> {
    try {
      const { data, error } = await supabase.functions.invoke("vision-2030-alignment", {
        body: { innovationData: input }
      });

      if (error) throw new Error(error.message);
      return data as Vision2030AlignmentResult;
    } catch (error: any) {
      console.error("Error checking Vision 2030 alignment:", error);
      throw new Error(error.message || "Failed to check Vision 2030 alignment");
    }
  }
}
