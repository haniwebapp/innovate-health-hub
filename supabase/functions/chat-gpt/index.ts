
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid request format. Expected 'messages' array.");
    }

    // Add system message based on context
    const systemMessage = {
      role: "system", 
      content: `You are a helpful assistant for the Ministry of Health innovation platform. 
      You provide information about healthcare innovations, regulatory processes, and support.
      ${context ? `The user is currently interested in: ${context}` : ''}
      Be concise but thorough in your responses. Use a professional, friendly tone.`
    };
    
    const requestMessages = [systemMessage, ...messages];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: requestMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    
    if (response.status !== 200) {
      throw new Error(data.error?.message || 'Error calling OpenAI API');
    }

    // Extract answer text
    const answerText = data.choices[0]?.message?.content || '';

    // Generate some follow-up questions based on the context
    const followUpQuestions = generateFollowUpQuestions(context || '', answerText);
    
    // Find related resources based on the context
    const relatedResources = getRelatedResources(context || '');

    return new Response(
      JSON.stringify({
        answer: answerText,
        followUpQuestions,
        relatedResources
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat-gpt function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred while processing your request',
        answer: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later."
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper functions to generate contextual information
function generateFollowUpQuestions(context: string, answer: string): string[] {
  // Generate follow-up questions based on the context
  const defaultQuestions = [
    "How can I learn more about healthcare innovation opportunities?",
    "What regulatory guidelines should I be aware of?",
    "Are there any funding programs available for my project?",
  ];

  // In a real implementation, this could analyze the context and answer to generate more specific questions
  if (context.toLowerCase().includes("innovation marketplace")) {
    return [
      "How can I list my innovation on the marketplace?",
      "What types of innovations are most successful?",
      "Can you explain the vetting process for innovations?",
    ];
  } else if (context.toLowerCase().includes("challenges portal")) {
    return [
      "What are the current active challenges?",
      "How do I submit a proposal for a challenge?",
      "What makes a winning challenge submission?",
    ];
  } else if (context.toLowerCase().includes("funding")) {
    return [
      "What funding options are available for early-stage projects?",
      "How do I apply for government grants?",
      "What information do I need for a funding application?",
    ];
  } else if (context.toLowerCase().includes("regulatory")) {
    return [
      "What regulatory approvals do I need for a medical device?",
      "How long does the regulatory process typically take?",
      "Can you explain the sandbox testing process?",
    ];
  } else if (context.toLowerCase().includes("knowledge")) {
    return [
      "Are there any educational resources about healthcare innovation?",
      "Where can I find case studies of successful innovations?",
      "Are there webinars or workshops available?",
    ];
  } else if (context.toLowerCase().includes("events")) {
    return [
      "What upcoming events would you recommend for networking?",
      "Are there any innovation showcases scheduled?",
      "How can I register for upcoming workshops?",
    ];
  }

  return defaultQuestions;
}

function getRelatedResources(context: string): { title: string; url: string; type: string }[] {
  // In a real implementation, this would fetch actual resources from a database
  const defaultResources = [
    { title: "Healthcare Innovation Guide", url: "/resources/innovation-guide", type: "Guide" },
    { title: "Regulatory Compliance Checklist", url: "/resources/regulatory-checklist", type: "Checklist" },
  ];

  if (context.toLowerCase().includes("innovation marketplace")) {
    return [
      { title: "Marketplace Submission Guidelines", url: "/resources/marketplace-guidelines", type: "Guide" },
      { title: "Innovation Evaluation Criteria", url: "/resources/evaluation-criteria", type: "Document" },
      { title: "Success Stories", url: "/success-stories", type: "Case Studies" },
    ];
  } else if (context.toLowerCase().includes("challenges portal")) {
    return [
      { title: "Current Challenges", url: "/challenges/active", type: "Listing" },
      { title: "Challenge Submission Template", url: "/resources/challenge-template", type: "Template" },
      { title: "Past Winners Showcase", url: "/challenges/winners", type: "Showcase" },
    ];
  }
  
  // Define resources for other contexts too
  if (context.toLowerCase().includes("funding")) {
    return [
      { title: "Funding Opportunities Database", url: "/funding/opportunities", type: "Database" },
      { title: "Grant Application Guide", url: "/resources/grant-guide", type: "Guide" },
      { title: "Investor Network", url: "/funding/investors", type: "Network" },
    ];
  } else if (context.toLowerCase().includes("regulatory")) {
    return [
      { title: "Regulatory Framework Overview", url: "/regulatory/framework", type: "Document" },
      { title: "Sandbox Application Process", url: "/regulatory/sandbox-guide", type: "Guide" },
      { title: "Compliance Requirements", url: "/regulatory/compliance", type: "Checklist" },
    ];
  } else if (context.toLowerCase().includes("knowledge hub")) {
    return [
      { title: "Research Papers Database", url: "/knowledge/research", type: "Database" },
      { title: "Innovation Learning Paths", url: "/knowledge/learning-paths", type: "Courses" },
      { title: "Expert Insights Blog", url: "/blog", type: "Blog" },
    ];
  } else if (context.toLowerCase().includes("events")) {
    return [
      { title: "Upcoming Events Calendar", url: "/events/calendar", type: "Calendar" },
      { title: "Webinar Recordings", url: "/events/recordings", type: "Videos" },
      { title: "Event Registration Portal", url: "/events/register", type: "Portal" },
    ];
  }

  return defaultResources;
}
