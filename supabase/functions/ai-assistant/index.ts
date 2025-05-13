
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createOpenAIClient, handleOpenAIError, OPENAI_MODELS, handleCorsPreflightRequest, createResponse, createErrorResponse } from "../_shared/openai.ts";

const contextConfig: Record<string, { 
  systemPrompt: string; 
  model?: string;
  temperature?: number;
}> = {
  "admin-panel": {
    systemPrompt: "You are an AI assistant specialized in healthcare platform administration. Help with user management, analytics insights, and platform administration tasks.",
    temperature: 0.4
  },
  "admin-integrations": {
    systemPrompt: "You are an AI assistant specialized in healthcare platform integrations. Help with connecting systems, data interoperability, and technical integration questions.",
    temperature: 0.5
  },
  "workflow-automation": {
    systemPrompt: "You are a healthcare innovation platform workflow expert. Generate detailed workflows for platform automation based on the user's requirements.",
    temperature: 0.6
  },
  "regulatory": {
    systemPrompt: "You are an AI assistant specialized in healthcare regulations and compliance. Help with regulatory questions, compliance requirements, and sandbox applications.",
    model: OPENAI_MODELS.CHAT_ADVANCED,
    temperature: 0.3
  },
  "innovation": {
    systemPrompt: "You are an AI assistant specialized in healthcare innovation. Help with ideation, innovation assessment, and development of healthcare solutions.",
    temperature: 0.7
  },
  "support": {
    systemPrompt: "You are a helpful support assistant for a healthcare innovation platform. Provide accurate and concise answers to users' questions about the platform.",
    temperature: 0.5
  },
  "general": {
    systemPrompt: "You are a helpful assistant for a healthcare innovation platform. Provide concise and informative responses to user questions.",
    temperature: 0.6
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCorsPreflightRequest(req);
  if (corsResponse) return corsResponse;

  try {
    const { messages, context = "general", options = {} } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return createErrorResponse("Messages array is required", 400);
    }
    
    console.log(`Processing AI assistant request with context: ${context}`);
    
    // Get context configuration or use default
    const contextSettings = contextConfig[context] || contextConfig.general;
    
    // Check if there's already a system message
    let updatedMessages = [...messages];
    if (!messages.some(msg => msg.role === 'system')) {
      updatedMessages.unshift({
        role: "system",
        content: contextSettings.systemPrompt
      });
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();
    
    try {
      const completion = await openai.chat.completions.create({
        model: contextSettings.model || OPENAI_MODELS.CHAT,
        messages: updatedMessages,
        temperature: options.temperature ?? contextSettings.temperature ?? 0.7,
        max_tokens: options.maxTokens || 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });
      
      const message = completion.choices[0].message.content || "";
      
      console.log(`AI assistant response generated for context: ${context}`);
      
      return createResponse({ message });
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in ai-assistant function:", error);
    return createErrorResponse("Failed to process request");
  }
});
