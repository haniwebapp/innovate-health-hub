
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AIMessage } from "@/types/chatTypes";

// Standard error handling for AI functionality
export class AIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AIError";
  }
}

// Helper function to call AI assistants via edge functions
export async function callAIAssistant(
  messages: AIMessage[],
  context: string = "general",
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<{ message: string; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke("ai-assistant", {
      body: {
        messages,
        context,
        options
      }
    });

    if (error) {
      console.error("AI Assistant error:", error);
      throw new AIError(error.message || "Failed to call AI assistant");
    }

    return data || { message: "", error: "No data returned from AI assistant" };
  } catch (error: any) {
    console.error("Error calling AI assistant:", error);
    return { message: "", error: error.message || "An unexpected error occurred" };
  }
}

// Hook for using AI features with toast notifications
export function useAI() {
  const { toast } = useToast();
  
  const callWithFeedback = async (
    functionName: string, 
    params: any, 
    options: { 
      loadingMessage?: string; 
      successMessage?: string; 
      errorMessage?: string 
    } = {}
  ) => {
    const toastId = options.loadingMessage ? 
      toast({
        title: options.loadingMessage,
        variant: "default",
      }).id : undefined;
    
    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: params
      });
      
      if (error) throw new Error(error.message);
      
      if (toastId && options.successMessage) {
        toast({
          id: toastId,
          title: options.successMessage,
          variant: "success",
        });
      }
      
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error calling ${functionName}:`, error);
      
      if (toastId) {
        toast({
          id: toastId,
          title: options.errorMessage || error.message || `Failed to complete AI operation`,
          variant: "destructive",
        });
      }
      
      return { data: null, error };
    }
  };

  return {
    callWithFeedback
  };
}

// Types for AI response data
export interface AIGenerationResult<T = any> {
  data: T | null;
  error: Error | null;
}
