
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

/**
 * Generate investment opportunity matches using AI
 * @param criteria Criteria for matching (sector, stage, etc.)
 * @returns Investment matches and confidence scores
 */
export const generateInvestmentMatches = async (criteria: any): Promise<AIResponse> => {
  try {
    const message = {
      role: "user" as const,
      content: `Find investment matches based on these criteria: ${JSON.stringify(criteria)}`
    };
    
    const { data: responseData, error } = await supabase.functions.invoke("admin-assistant", {
      body: { 
        messages: [message],
        context: "investment-matching"
      }
    });

    if (error) throw error;
    return responseData as AIResponse;
  } catch (error: any) {
    console.error("Error generating investment matches:", error);
    return {
      message: "",
      error: error.message || "Failed to generate investment matches"
    };
  }
};

/**
 * Analyze regulatory compliance requirements for an innovation
 * @param innovationData Information about the innovation
 * @returns Compliance requirements and recommendations
 */
export const analyzeRegulatoryCompliance = async (innovationData: any): Promise<AIResponse> => {
  try {
    const message = {
      role: "user" as const,
      content: `Analyze regulatory compliance for this innovation: ${JSON.stringify(innovationData)}`
    };
    
    const { data: responseData, error } = await supabase.functions.invoke("admin-assistant", {
      body: { 
        messages: [message],
        context: "regulatory-compliance"
      }
    });

    if (error) throw error;
    return responseData as AIResponse;
  } catch (error: any) {
    console.error("Error analyzing regulatory compliance:", error);
    return {
      message: "",
      error: error.message || "Failed to analyze regulatory compliance"
    };
  }
};

/**
 * Generate market trend analysis for healthcare investments
 * @param parameters Analysis parameters (timeframe, sectors, etc.)
 * @returns Market trends and growth predictions
 */
export const analyzeMarketTrends = async (parameters: any): Promise<AIResponse> => {
  try {
    const message = {
      role: "user" as const,
      content: `Analyze healthcare investment market trends based on these parameters: ${JSON.stringify(parameters)}`
    };
    
    const { data: responseData, error } = await supabase.functions.invoke("admin-assistant", {
      body: { 
        messages: [message],
        context: "market-analysis"
      }
    });

    if (error) throw error;
    return responseData as AIResponse;
  } catch (error: any) {
    console.error("Error analyzing market trends:", error);
    return {
      message: "",
      error: error.message || "Failed to analyze market trends"
    };
  }
};
