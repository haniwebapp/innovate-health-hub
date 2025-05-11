
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get OpenAI API key from environment variable
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    const { newChallengeTitle, newChallengeDescription } = await req.json();
    
    if (!newChallengeTitle || !newChallengeDescription) {
      throw new Error("Challenge title and description are required");
    }

    console.log(`Processing duplicate challenge detection for: ${newChallengeTitle}`);

    // In a real implementation, we would fetch existing challenges from the database
    // For this demo, we'll use a mock list of challenges
    const existingChallenges = [
      {
        id: "ch-001", 
        title: "AI-Powered Diagnostic Tool for Rural Areas",
        description: "Develop an AI solution that can diagnose common diseases with minimal equipment, suitable for deployment in rural healthcare facilities with limited resources."
      },
      {
        id: "ch-002", 
        title: "Remote Patient Monitoring System",
        description: "Create a solution for continuous monitoring of patients with chronic conditions while they are at home, with real-time data transmission to healthcare providers."
      },
      {
        id: "ch-003", 
        title: "Healthcare Data Interoperability Platform",
        description: "Build a platform that enables secure and standardized sharing of healthcare data between different systems, providers, and organizations."
      },
      {
        id: "ch-004", 
        title: "Mental Health Digital Intervention",
        description: "Design a digital intervention that helps users manage stress, anxiety, and depression through evidence-based techniques and personalized recommendations."
      },
      {
        id: "ch-005", 
        title: "Accessible Telehealth Solution",
        description: "Develop a telehealth platform specifically designed to be accessible for elderly patients and people with disabilities."
      }
    ];

    // Call OpenAI to calculate embeddings for similarity comparison
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert at detecting similar or duplicate challenge descriptions. 
            Your task is to analyze a new challenge idea against existing challenges and determine:
            1. Whether the new challenge is a potential duplicate of any existing challenges
            2. Calculate a similarity score (0-100) for each comparison
            3. Identify specific overlapping concepts or objectives
            
            Format your response as valid JSON with this structure:
            {
              "isDuplicate": boolean,
              "similarityScore": number,
              "similarChallenges": [
                {
                  "id": string,
                  "title": string,
                  "similarity": number,
                  "overlappingConcepts": string[]
                }
              ],
              "analysis": string
            }`
          },
          {
            role: "user",
            content: `
            NEW CHALLENGE:
            Title: ${newChallengeTitle}
            Description: ${newChallengeDescription}
            
            EXISTING CHALLENGES:
            ${existingChallenges.map(c => `ID: ${c.id}\nTitle: ${c.title}\nDescription: ${c.description}\n`).join('\n')}
            
            Compare the new challenge with the existing ones and provide your analysis in the specified JSON format.`
          }
        ],
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
    
    console.log("Duplicate detection completed successfully");

    // Return the analysis results
    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in duplicate-challenge-detection function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to detect duplicate challenges",
        isDuplicate: false,
        similarChallenges: []
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
