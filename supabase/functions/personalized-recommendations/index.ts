
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
    const { userId, interests = [], recentActivity = [], limit = 10 } = await req.json();
    
    if (!openAIApiKey) {
      throw new Error("OpenAI API key not found");
    }

    // Sample data for demonstration purposes - in a real implementation we'd query the database
    const availableItems = [
      // Challenges
      { id: "ch1", title: "AI-Driven Diagnostics Challenge", description: "Design an AI solution that improves diagnostic accuracy for rural healthcare providers", type: "challenge", tags: ["AI", "Diagnostics", "Rural Healthcare"] },
      { id: "ch2", title: "Remote Patient Monitoring Innovation", description: "Create a solution for effective remote monitoring of chronic conditions", type: "challenge", tags: ["Remote Care", "Monitoring", "Chronic Disease"] },
      { id: "ch3", title: "Preventive Health Screening Tool", description: "Develop a tool that encourages preventive health screenings", type: "challenge", tags: ["Preventive Care", "Screening", "Public Health"] },
      
      // Resources
      { id: "r1", title: "Digital Health Implementation Guide", description: "Comprehensive guide for implementing digital health solutions in Saudi Arabia", type: "resource", tags: ["Digital Health", "Implementation", "Guide"] },
      { id: "r2", title: "Healthcare Innovation Funding Sources", description: "Overview of funding opportunities for healthcare innovations", type: "resource", tags: ["Funding", "Investment", "Innovation"] },
      { id: "r3", title: "Regulatory Pathways for Medical Devices", description: "Navigating regulatory requirements for medical devices in Saudi Arabia", type: "resource", tags: ["Regulatory", "Medical Devices", "Compliance"] },
      
      // Events
      { id: "e1", title: "Digital Health Summit 2025", description: "Annual conference on digital health innovation and implementation", type: "event", tags: ["Digital Health", "Conference", "Networking"] },
      { id: "e2", title: "Healthcare AI Workshop", description: "Hands-on workshop for applying AI in healthcare settings", type: "event", tags: ["AI", "Workshop", "Training"] },
      { id: "e3", title: "Preventive Care Innovation Forum", description: "Forum discussing latest innovations in preventive healthcare", type: "event", tags: ["Preventive Care", "Forum", "Innovation"] },
      
      // Learning
      { id: "l1", title: "Introduction to Healthcare Data Analytics", description: "Learn the fundamentals of healthcare data analysis and visualization", type: "learning", tags: ["Data Analytics", "Healthcare Data", "Learning"] },
      { id: "l2", title: "Digital Health Implementation", description: "Course on successfully implementing digital health solutions", type: "learning", tags: ["Digital Health", "Implementation", "Course"] },
      { id: "l3", title: "Regulatory Compliance for Healthcare Innovations", description: "Understanding regulatory requirements for healthcare innovations", type: "learning", tags: ["Regulatory", "Compliance", "Innovation"] }
    ];

    // Call OpenAI to get personalized recommendations based on user interests
    const prompt = `
      Generate personalized recommendations for a healthcare professional based on the following information:
      
      User interests: ${interests.join(", ")}
      
      Recent activity: ${JSON.stringify(recentActivity)}
      
      Available items: ${JSON.stringify(availableItems)}
      
      For each recommendation, explain why it might be relevant to the user.
      Return your response as a JSON object with two arrays:
      1. "personalizedRecommendations" - items sorted by relevance to the user
      2. "trendingItems" - items that are currently trending or popular
      
      Each item should have: id, title, description, type, relevanceScore (0-100), and reasoning (why recommended).
      Limit each array to ${limit} items.
    `;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an AI recommendation engine for a healthcare innovation platform in Saudi Arabia. Your task is to recommend relevant items to users based on their interests and activity." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await openaiResponse.json();
    const recommendations = JSON.parse(data.choices[0].message.content);

    // Return the recommendations
    return new Response(
      JSON.stringify(recommendations),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in personalized-recommendations function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
