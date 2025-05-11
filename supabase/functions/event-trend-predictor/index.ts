
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

    const { sector = "healthcare", timeframe = "6months" } = await req.json();

    // In a real implementation, this would analyze event data and use AI
    // For demonstration, we'll return predefined trends based on the sector
    
    // Define some healthcare innovation trends
    const healthcareTrends = [
      {
        topic: "AI-Powered Diagnostics",
        popularity: 95,
        momentumScore: 89,
        relevantAudiences: ["Clinical Professionals", "Researchers", "Technology Partners"],
        relatedEvents: ["AI in Healthcare Summit", "Medical Imaging Conference", "Diagnostic Innovation Workshop"]
      },
      {
        topic: "Telemedicine Evolution",
        popularity: 88,
        momentumScore: 75,
        relevantAudiences: ["Healthcare Providers", "Patients", "Health Administrators"],
        relatedEvents: ["Digital Health Conference", "Patient Engagement Summit", "Rural Healthcare Symposium"]
      },
      {
        topic: "Healthcare Data Security",
        popularity: 82,
        momentumScore: 78,
        relevantAudiences: ["IT Professionals", "Healthcare Administrators", "Compliance Officers"],
        relatedEvents: ["Healthcare Cybersecurity Conference", "HIPAA Compliance Workshop", "Data Protection Summit"]
      },
      {
        topic: "Personalized Medicine",
        popularity: 79,
        momentumScore: 85,
        relevantAudiences: ["Clinicians", "Researchers", "Pharmaceutical Companies"],
        relatedEvents: ["Genomic Medicine Conference", "Precision Healthcare Summit", "Personalized Treatment Workshop"]
      },
      {
        topic: "Remote Patient Monitoring",
        popularity: 76,
        momentumScore: 81,
        relevantAudiences: ["Clinicians", "Patients", "Device Manufacturers"],
        relatedEvents: ["Connected Health Conference", "Wearable Health Tech Expo", "Remote Care Symposium"]
      }
    ];
    
    // Define some digital health trends
    const digitalTrends = [
      {
        topic: "Health Apps & Wearables",
        popularity: 91,
        momentumScore: 87,
        relevantAudiences: ["Consumer Health", "Device Manufacturers", "App Developers"],
        relatedEvents: ["Health Tech Expo", "Consumer Health Conference", "Wearable Technology Summit"]
      },
      {
        topic: "Health Data Interoperability",
        popularity: 84,
        momentumScore: 79,
        relevantAudiences: ["Health IT", "Healthcare Systems", "Standards Organizations"],
        relatedEvents: ["Healthcare Interoperability Conference", "FHIR Implementation Workshop", "Health Data Exchange Forum"]
      },
      {
        topic: "Virtual Reality in Healthcare",
        popularity: 72,
        momentumScore: 88,
        relevantAudiences: ["Medical Educators", "Mental Health Professionals", "Technologists"],
        relatedEvents: ["Medical VR Symposium", "Immersive Healthcare Summit", "Therapeutic VR Conference"]
      }
    ];
    
    // Define some policy and regulatory trends
    const policyTrends = [
      {
        topic: "Healthcare Policy Updates",
        popularity: 85,
        momentumScore: 72,
        relevantAudiences: ["Policy Makers", "Healthcare Administrators", "Legal Professionals"],
        relatedEvents: ["Health Policy Conference", "Regulatory Update Seminar", "Compliance Workshop"]
      },
      {
        topic: "International Healthcare Collaboration",
        popularity: 78,
        momentumScore: 76,
        relevantAudiences: ["Global Health Officials", "NGOs", "Research Institutions"],
        relatedEvents: ["Global Health Summit", "International Cooperation Forum", "Cross-Border Healthcare Conference"]
      }
    ];

    // Select trends based on sector
    let trends: any[] = [];
    
    if (sector.toLowerCase().includes("health")) {
      trends = [...healthcareTrends];
      
      if (sector.toLowerCase().includes("digital")) {
        trends = [...trends, ...digitalTrends];
      }
      
      if (sector.toLowerCase().includes("polic") || sector.toLowerCase().includes("regul")) {
        trends = [...trends, ...policyTrends];
      }
    } else if (sector.toLowerCase().includes("digital")) {
      trends = [...digitalTrends];
    } else if (sector.toLowerCase().includes("polic") || sector.toLowerCase().includes("regul")) {
      trends = [...policyTrends];
    } else {
      // Default to a mix of all trends
      trends = [...healthcareTrends.slice(0, 2), ...digitalTrends.slice(0, 2), ...policyTrends.slice(0, 1)];
    }
    
    // Adjust momentum based on timeframe
    if (timeframe.includes("3")) {
      // Short-term: Higher volatility
      trends = trends.map(trend => ({
        ...trend,
        momentumScore: Math.min(100, trend.momentumScore + (Math.random() * 10 - 5))
      }));
    } else if (timeframe.includes("12")) {
      // Long-term: More established trends
      trends = trends.map(trend => ({
        ...trend,
        momentumScore: Math.min(100, trend.momentumScore - (Math.random() * 5))
      }));
    }
    
    // Sort by combined popularity and momentum
    trends.sort((a, b) => 
      (b.popularity + b.momentumScore) - (a.popularity + a.momentumScore)
    );

    // Return top trends based on sector and timeframe
    return new Response(
      JSON.stringify(trends.slice(0, 5)),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
