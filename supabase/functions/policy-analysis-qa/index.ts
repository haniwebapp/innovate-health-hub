
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createOpenAIClient, handleOpenAIError, OPENAI_MODELS } from "../_shared/openai.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { policyText, question, analysisType, trace } = await req.json();
    
    if (!policyText) {
      throw new Error("Policy text is required");
    }

    console.log(`Processing ${analysisType || 'Q&A'} for policy`);

    // Define different system prompts based on analysis type
    let systemPrompt = "";
    let responseFormat = {};

    if (analysisType === "annotation") {
      systemPrompt = `
        You are an expert in healthcare policy analysis.
        Analyze the provided healthcare policy text and identify key sections that should be annotated.
        For each section, provide:
        1. The section text or a summary of it
        2. An annotation explaining its significance
        3. Any relevant guidelines or best practices related to this section
        4. Any potential implementation challenges
        Provide annotations for the most important sections only (maximum 5).
      `;
      responseFormat = {
        annotations: [
          {
            section: "",
            annotation: "",
            guidelines: [],
            challenges: []
          }
        ],
        overallAnalysis: "",
        keyTakeaways: []
      };
    } else if (analysisType === "implementation") {
      systemPrompt = `
        You are a healthcare implementation specialist.
        Analyze the provided healthcare policy and create a step-by-step implementation guide.
        Focus on practical steps, required resources, stakeholder engagement, and timeline considerations.
        Provide a realistic implementation roadmap with key milestones.
      `;
      responseFormat = {
        implementationSteps: [],
        requiredResources: [],
        stakeholders: [],
        timeline: {
          shortTerm: [],
          mediumTerm: [],
          longTerm: []
        },
        potentialChallenges: [],
        successMetrics: []
      };
    } else {
      // Default to Q&A mode
      systemPrompt = `
        You are a healthcare policy expert assistant.
        Answer the question about the provided policy document accurately and concisely.
        If the answer cannot be determined from the policy document, clearly state that.
        Base your answer only on the content of the policy document.
      `;
      responseFormat = {
        answer: "",
        confidence: "high|medium|low",
        relevantSections: [],
        suggestions: []
      };
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();

    // Call OpenAI API
    try {
      const messages = question 
        ? [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Policy document: ${policyText}\n\nQuestion: ${question}` }
          ]
        : [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Analyze this healthcare policy: ${policyText}` }
          ];

      const completion = await openai.chat.completions.create({
        model: OPENAI_MODELS.CHAT,
        messages: messages,
        temperature: 0.3,
        response_format: { type: "json_object" }
      });

      const analysisResult = JSON.parse(completion.choices[0].message.content || "{}");
      
      console.log(`Analysis completed for ${analysisType || 'Q&A'}`);

      return new Response(
        JSON.stringify({ ...responseFormat, ...analysisResult }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleOpenAIError(error);
    }
  } catch (error) {
    console.error("Error in policy-analysis-qa function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
