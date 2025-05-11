
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.22.0";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { eventTopic, eventDetails } = await req.json();

    if (!eventTopic) {
      return new Response(
        JSON.stringify({ error: "Missing required field: eventTopic" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // In a real implementation, this would search a database of speakers
    // and use AI to match speakers to the event topic
    // For demonstration, we'll return simulated suggestions based on the topic

    // Parse the topic and details to determine relevant experts
    const topic = eventTopic.toLowerCase();
    const details = eventDetails ? eventDetails.toLowerCase() : '';
    
    const speakerDatabase = [
      {
        name: "Dr. Sarah Al-Mahmoud",
        expertise: ["AI in Healthcare", "Medical Imaging", "Clinical Decision Support"],
        bio: "Leading researcher in AI applications for diagnostic medicine",
        relevanceScore: 95,
        potentialTopics: [
          "AI-Powered Medical Diagnostics", 
          "The Future of Radiology with Machine Learning",
          "Ethics in Medical AI"
        ]
      },
      {
        name: "Prof. Ahmed Hassan",
        expertise: ["Telemedicine", "Healthcare Access", "Rural Healthcare"],
        bio: "Pioneer in telemedicine implementation across Saudi Arabia",
        relevanceScore: 92,
        potentialTopics: [
          "Expanding Healthcare Access Through Technology", 
          "Building Effective Telemedicine Programs",
          "Patient Experience in Virtual Care"
        ]
      },
      {
        name: "Dr. Fatima Al-Saud",
        expertise: ["Digital Health Policy", "Healthcare Regulation", "Health Data Security"],
        bio: "Advisor on healthcare regulatory frameworks and policy",
        relevanceScore: 88,
        potentialTopics: [
          "Navigating Regulatory Challenges in Healthcare Innovation", 
          "Building Policy Frameworks for Digital Health",
          "Data Protection in Healthcare"
        ]
      },
      {
        name: "Tariq Al-Zuhair",
        expertise: ["Health Technology Implementation", "Change Management", "Hospital Administration"],
        bio: "Healthcare executive with expertise in technology transformation",
        relevanceScore: 85,
        potentialTopics: [
          "Implementing New Technologies in Healthcare Settings", 
          "Change Management for Digital Transformation",
          "ROI of Health Technology Investments"
        ]
      },
      {
        name: "Dr. Noura Al-Qahtani",
        expertise: ["Genomics", "Personalized Medicine", "Clinical Research"],
        bio: "Leading researcher in genomic medicine and personalized treatments",
        relevanceScore: 89,
        potentialTopics: [
          "The Future of Personalized Medicine", 
          "Genomics in Clinical Practice",
          "Research Advances in Tailored Treatments"
        ]
      },
      {
        name: "Khalid Al-Rasheed",
        expertise: ["Healthcare Investment", "MedTech Startups", "Innovation Funding"],
        bio: "Healthcare investor and advisor to medical technology startups",
        relevanceScore: 82,
        potentialTopics: [
          "Funding Healthcare Innovation", 
          "Investment Trends in MedTech",
          "Building Successful Healthcare Startups"
        ]
      },
      {
        name: "Dr. Layla Ibrahim",
        expertise: ["Patient Engagement", "Health Literacy", "Consumer Health"],
        bio: "Expert in patient education and engagement strategies",
        relevanceScore: 84,
        potentialTopics: [
          "Engaging Patients in Their Care Journey", 
          "Health Literacy in the Digital Age",
          "Designing Patient-Centered Digital Solutions"
        ]
      },
      {
        name: "Mohammed Al-Tawil",
        expertise: ["Health Information Systems", "Interoperability", "Clinical Informatics"],
        bio: "Specialist in healthcare information systems implementation",
        relevanceScore: 87,
        potentialTopics: [
          "Achieving Interoperability in Healthcare", 
          "Optimizing Electronic Health Records",
          "Data-Driven Clinical Decision Making"
        ]
      }
    ];
    
    // Match speakers to the topic
    const matchedSpeakers = speakerDatabase.map(speaker => {
      let adjustedRelevance = speaker.relevanceScore;
      let matchReasons = [];
      
      // Check if any expertise keywords match the topic
      const expertiseMatches = speaker.expertise.filter(exp => 
        topic.includes(exp.toLowerCase()) || 
        details.includes(exp.toLowerCase())
      );
      
      if (expertiseMatches.length > 0) {
        adjustedRelevance += expertiseMatches.length * 3;
        matchReasons.push(`Expert in ${expertiseMatches.join(", ")}`);
      }
      
      // Check if any potential topics match
      const topicMatches = speaker.potentialTopics.filter(t => 
        topic.includes(t.toLowerCase()) || 
        details.includes(t.toLowerCase())
      );
      
      if (topicMatches.length > 0) {
        adjustedRelevance += topicMatches.length * 2;
        matchReasons.push(`Has presented on similar topics`);
      }
      
      // Apply specific topic boosts
      if ((topic.includes("ai") || details.includes("artificial intelligence")) && 
          speaker.expertise.some(exp => exp.toLowerCase().includes("ai"))) {
        adjustedRelevance += 5;
        matchReasons.push("Specialized in AI applications");
      }
      
      if ((topic.includes("telemedicine") || details.includes("virtual care")) && 
          speaker.expertise.some(exp => exp.toLowerCase().includes("tele"))) {
        adjustedRelevance += 5;
        matchReasons.push("Telemedicine expert");
      }
      
      if ((topic.includes("policy") || details.includes("regulation")) && 
          speaker.expertise.some(exp => exp.toLowerCase().includes("policy") || exp.toLowerCase().includes("regul"))) {
        adjustedRelevance += 5;
        matchReasons.push("Healthcare policy specialist");
      }
      
      // Cap at 100 and ensure at least 60
      adjustedRelevance = Math.min(100, Math.max(60, adjustedRelevance));
      
      // If we don't have specific reasons, add a generic one
      if (matchReasons.length === 0) {
        matchReasons.push("Background relevant to healthcare innovation");
      }
      
      return {
        name: speaker.name,
        expertise: speaker.expertise,
        relevanceScore: adjustedRelevance,
        reasonForSuggestion: matchReasons.join(". "),
        potentialTopics: speaker.potentialTopics
      };
    });
    
    // Sort by adjusted relevance and return top 5
    const suggestions = matchedSpeakers
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5);

    return new Response(
      JSON.stringify(suggestions),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
