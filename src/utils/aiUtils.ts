
import { supabase } from "@/integrations/supabase/client";

export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIResponse {
  message: string;
  insights?: string[];
  error?: string;
}

/**
 * Call the admin-assistant edge function with messages
 * @param messages Array of messages to send to the assistant
 * @param context Context for the assistant (optional)
 * @returns Response from the assistant
 */
export const callAIAssistant = async (messages: AIMessage[], context?: string): Promise<AIResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke("admin-assistant", {
      body: { 
        messages,
        context
      }
    });

    if (error) throw error;
    return data as AIResponse;
  } catch (error: any) {
    console.error("Error calling AI assistant:", error);
    return {
      message: "",
      error: error.message || "Failed to get a response from the assistant"
    };
  }
};

/**
 * Generate recommendations based on settings or integrations
 * @param data Data to analyze
 * @param context Context for the recommendations (e.g., "admin-settings", "admin-integrations")
 * @returns Recommendations and insights
 */
export const generateAIRecommendations = async (data: any, context: string): Promise<AIResponse> => {
  try {
    const message = {
      role: "user" as const,
      content: `Analyze this data and provide recommendations: ${JSON.stringify(data)}`
    };
    
    const { data: responseData, error } = await supabase.functions.invoke("admin-assistant", {
      body: { 
        messages: [message],
        context
      }
    });

    if (error) throw error;
    return responseData as AIResponse;
  } catch (error: any) {
    console.error("Error getting AI recommendations:", error);
    return {
      message: "",
      error: error.message || "Failed to get AI recommendations"
    };
  }
};

/**
 * Parse structured insights from AI response text
 * @param text Response text from AI
 * @returns Structured insights object
 */
export const parseAIInsights = (text: string): string[] => {
  // Simple parsing of key insights from text
  if (!text) return [];
  
  const insights = text
    .split(/\n+/)
    .filter((line) => line.trim().length > 0 && !line.includes(':') && line.length > 10)
    .slice(0, 4);
  
  return insights;
};

/**
 * Format error messages for user display
 * @param error Error object or string
 * @returns Formatted error message
 */
export const formatAIError = (error: any): string => {
  if (!error) return "Unknown error occurred";
  
  if (typeof error === 'string') {
    return error;
  }
  
  return error.message || "An error occurred while processing your request";
};
