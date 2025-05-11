
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const openaiApiKey = Deno.env.get('OPENAI_API_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get the application data from the request
    const { applicationId } = await req.json();
    
    if (!applicationId) {
      return new Response(
        JSON.stringify({ error: 'Application ID is required' }),
        { 
          status: 400, 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      );
    }
    
    // Get the application data
    const { data: application, error: applicationError } = await supabase
      .from('sandbox_applications')
      .select('*')
      .eq('id', applicationId)
      .single();
      
    if (applicationError || !application) {
      return new Response(
        JSON.stringify({ error: 'Application not found' }),
        { 
          status: 404, 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      );
    }
    
    // Call OpenAI to analyze the application and determine compliance requirements
    const requirements = await analyzeApplicationForCompliance(application);
    
    // Store the requirements in the database
    const insertPromises = requirements.map(requirement => {
      return supabase.from('sandbox_compliance_requirements').insert([{
        application_id: applicationId,
        title: requirement.title,
        description: requirement.description,
        status: requirement.status,
        completed: false
      }]);
    });
    
    await Promise.all(insertPromises);
    
    // Get the inserted requirements
    const { data: insertedRequirements, error: requirementsError } = await supabase
      .from('sandbox_compliance_requirements')
      .select('*')
      .eq('application_id', applicationId);
      
    if (requirementsError) {
      throw requirementsError;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        requirements: insertedRequirements 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in analyze-sandbox-application:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

// Function to analyze the application and determine compliance requirements
async function analyzeApplicationForCompliance(application: any) {
  try {
    // If OpenAI API key is available, use it for analysis
    if (openaiApiKey) {
      const prompt = `
        I need to determine the regulatory compliance requirements for a healthcare innovation in a sandbox environment.
        
        Application details:
        - Name: ${application.name}
        - Description: ${application.description}
        - Innovation type: ${application.innovation_type}
        - Risk level: ${application.risk_level}
        - Organization type: ${application.organization_type}
        ${application.regulatory_challenges ? `- Regulatory challenges: ${application.regulatory_challenges}` : ''}
        
        Based on this information, generate 3-6 specific compliance requirements that this application should meet.
        For each requirement, provide a title, detailed description, and status (required, recommended, or optional).
        
        Format the output as a JSON array of objects with the following structure:
        [
          {
            "title": "Short title of requirement",
            "description": "Detailed description of what needs to be done",
            "status": "required/recommended/optional"
          }
        ]
        
        Focus on requirements relevant to healthcare regulations, data privacy, security, safety standards, and documentation needs.
      `;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a healthcare regulatory compliance expert.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        console.error('OpenAI API error:', data.error);
        // Fall back to default requirements
        return getDefaultRequirements(application);
      }
      
      try {
        const content = data.choices[0].message.content;
        const parsedRequirements = JSON.parse(content);
        if (Array.isArray(parsedRequirements) && parsedRequirements.length > 0) {
          return parsedRequirements;
        } else {
          return getDefaultRequirements(application);
        }
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        return getDefaultRequirements(application);
      }
    } else {
      // If no OpenAI API key, use default requirements
      return getDefaultRequirements(application);
    }
  } catch (error) {
    console.error('Error in analyzeApplicationForCompliance:', error);
    return getDefaultRequirements(application);
  }
}

// Fallback function to get default requirements based on application type
function getDefaultRequirements(application: any) {
  const baseRequirements = [
    {
      title: "Data Privacy Impact Assessment",
      description: "Complete a detailed assessment of how patient data is collected, stored, and processed in your innovation.",
      status: "required"
    },
    {
      title: "Risk Management Plan",
      description: "Create a comprehensive plan identifying potential risks and mitigation strategies for your innovation.",
      status: "required"
    }
  ];
  
  // Add requirements based on innovation type
  if (application.innovation_type?.toLowerCase().includes('device') || 
      application.innovation_type?.toLowerCase().includes('hardware')) {
    baseRequirements.push({
      title: "Medical Device Classification",
      description: "Confirm the classification of your device according to risk level and intended use.",
      status: "required"
    });
    baseRequirements.push({
      title: "Clinical Validation Plan",
      description: "Submit a plan for clinical testing and validation of your device.",
      status: "required"
    });
  }
  
  if (application.innovation_type?.toLowerCase().includes('software') || 
      application.innovation_type?.toLowerCase().includes('digital') || 
      application.innovation_type?.toLowerCase().includes('app')) {
    baseRequirements.push({
      title: "Security Testing Results",
      description: "Provide results from security vulnerability assessments and penetration testing of your software.",
      status: "required"
    });
    baseRequirements.push({
      title: "Interoperability Documentation",
      description: "Document how your solution integrates with existing healthcare systems and standards.",
      status: "recommended"
    });
  }
  
  if (application.risk_level?.toLowerCase().includes('high')) {
    baseRequirements.push({
      title: "Expert Clinical Review",
      description: "Obtain reviews from independent clinical experts on the safety and efficacy of your innovation.",
      status: "required"
    });
  }
  
  return baseRequirements;
}
