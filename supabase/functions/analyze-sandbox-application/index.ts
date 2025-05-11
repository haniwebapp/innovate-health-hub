
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define compliance requirement type
interface ComplianceRequirement {
  title: string;
  description: string;
  status: "required" | "recommended" | "optional";
}

// Define the CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get request body
    const { applicationId, description, innovationType } = await req.json();
    
    // Validate required fields
    if (!applicationId || !description || !innovationType) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: applicationId, description, and innovationType are required" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Create a Supabase client with the Deno runtime
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    // Generate requirements based on application type and description
    const requirements = generateRequirements(description, innovationType);
    
    // Insert requirements into the database
    for (const requirement of requirements) {
      await supabaseClient
        .from('sandbox_compliance_requirements')
        .insert({
          application_id: applicationId,
          title: requirement.title,
          description: requirement.description,
          status: requirement.status
        });
    }
    
    // Return success response with generated requirements
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Generated ${requirements.length} compliance requirements`, 
        requirements 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    // Return error response
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Function to generate compliance requirements based on description and type
// In a real implementation, this would use an AI model or more complex rule engine
function generateRequirements(description: string, innovationType: string): ComplianceRequirement[] {
  const commonRequirements: ComplianceRequirement[] = [
    {
      title: "Data Privacy Assessment",
      description: "Complete assessment of how data is collected, processed, stored, and protected.",
      status: "required"
    },
    {
      title: "Risk Management Plan",
      description: "Document identifying risks and mitigation strategies.",
      status: "required"
    },
    {
      title: "User Documentation",
      description: "Provide comprehensive user guides and documentation.",
      status: "required"
    }
  ];
  
  let specificRequirements: ComplianceRequirement[] = [];
  
  // Check for device-related innovations
  if (innovationType.includes('device') || 
      description.toLowerCase().includes('device') ||
      description.toLowerCase().includes('hardware')) {
    specificRequirements = specificRequirements.concat([
      {
        title: "Medical Device Classification",
        description: "Confirm the classification of your device according to risk level and intended use.",
        status: "required"
      },
      {
        title: "Clinical Validation Plan",
        description: "Submit a plan for clinical testing and validation.",
        status: "required"
      },
      {
        title: "Hardware Safety Assessment",
        description: "Provide documentation on the safety testing of any hardware components.",
        status: "required"
      }
    ]);
  }
  
  // Check for digital health solutions
  if (innovationType.includes('digital') || 
      innovationType.includes('app') || 
      description.toLowerCase().includes('software') ||
      description.toLowerCase().includes('app') ||
      description.toLowerCase().includes('digital')) {
    specificRequirements = specificRequirements.concat([
      {
        title: "Security Testing Results",
        description: "Provide results from security vulnerability assessments.",
        status: "required"
      },
      {
        title: "Interoperability Documentation",
        description: "Document how your solution integrates with existing systems.",
        status: "recommended"
      },
      {
        title: "User Authentication Methods",
        description: "Detail the methods used for user authentication and authorization.",
        status: "recommended"
      }
    ]);
  }
  
  // Check for AI/ML solutions
  if (description.toLowerCase().includes('ai') ||
      description.toLowerCase().includes('machine learning') ||
      description.toLowerCase().includes('artificial intelligence') ||
      description.toLowerCase().includes('neural network') ||
      description.toLowerCase().includes('algorithm')) {
    specificRequirements = specificRequirements.concat([
      {
        title: "AI Model Validation Report",
        description: "Document validation methodology and results for AI/ML models.",
        status: "required"
      },
      {
        title: "Algorithm Bias Assessment",
        description: "Provide analysis of potential biases in algorithms and mitigation strategies.",
        status: "required"
      },
      {
        title: "Training Data Documentation",
        description: "Document sources and characteristics of data used for model training.",
        status: "recommended"
      }
    ]);
  }
  
  // Check for diagnostic tools
  if (innovationType.includes('diagnostic') || 
      description.toLowerCase().includes('diagnos') ||
      description.toLowerCase().includes('test') ||
      description.toLowerCase().includes('screening')) {
    specificRequirements = specificRequirements.concat([
      {
        title: "Diagnostic Accuracy Report",
        description: "Provide documentation on sensitivity, specificity, and accuracy metrics.",
        status: "required"
      },
      {
        title: "False Result Mitigation Strategy",
        description: "Detail strategies for handling false positives/negatives.",
        status: "required"
      }
    ]);
  }
  
  // Check for therapeutic solutions
  if (innovationType.includes('therapeutic') || 
      description.toLowerCase().includes('therapy') ||
      description.toLowerCase().includes('treatment') ||
      description.toLowerCase().includes('therapeutic')) {
    specificRequirements = specificRequirements.concat([
      {
        title: "Treatment Efficacy Documentation",
        description: "Provide evidence of efficacy for the therapeutic solution.",
        status: "required"
      },
      {
        title: "Side Effects Documentation",
        description: "Document potential side effects and mitigation strategies.",
        status: "required"
      },
      {
        title: "Patient Monitoring Protocol",
        description: "Detail how patients will be monitored during and after treatment.",
        status: "recommended"
      }
    ]);
  }
  
  // Generate accessible documentation requirement if needed
  if (description.toLowerCase().includes('patient') ||
      description.toLowerCase().includes('user') ||
      description.toLowerCase().includes('accessibility')) {
    specificRequirements.push({
      title: "Accessibility Documentation",
      description: "Provide documentation on how the solution meets accessibility standards.",
      status: "recommended"
    });
  }

  return [...commonRequirements, ...specificRequirements];
}
