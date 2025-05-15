
import { supabase } from "@/integrations/supabase/client";
import { Vision2030AlignmentInput, Vision2030AlignmentResult } from "./types";

export class Vision2030Service {
  /**
   * Checks how well an innovation aligns with Saudi Vision 2030 goals
   */
  static async checkAlignment(input: Vision2030AlignmentInput): Promise<Vision2030AlignmentResult> {
    try {
      console.log("Calling vision-2030-alignment with input:", input);
      
      const { data, error } = await supabase.functions.invoke("vision-2030-alignment", {
        body: { innovationData: input }
      });
      
      console.log("Response from vision-2030-alignment:", { data, error });

      if (error) throw new Error(error.message || "Error checking Vision 2030 alignment");
      
      if (!data) {
        throw new Error("No alignment data returned from service");
      }
      
      return data as Vision2030AlignmentResult;
    } catch (error: any) {
      console.error("Error checking Vision 2030 alignment:", error);
      throw new Error(error.message || "Failed to check Vision 2030 alignment");
    }
  }
}
