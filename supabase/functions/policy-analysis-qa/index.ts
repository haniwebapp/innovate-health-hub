
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    // Get OpenAI API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
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

    // Call OpenAI API
    const messages = question 
      ? [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Policy document: ${policyText}\n\nQuestion: ${question}` }
        ]
      : [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this healthcare policy: ${policyText}` }
        ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await response.json();
    const analysisResult = JSON.parse(data.choices[0].message.content);
    
    console.log(`Analysis completed for ${analysisType || 'Q&A'}`);

    return new Response(
      JSON.stringify({ ...responseFormat, ...analysisResult }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
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
