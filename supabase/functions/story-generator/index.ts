
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

    const { prompt } = await req.json();

    if (!prompt || !prompt.innovation || !prompt.impact) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: innovation and impact are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { innovation, impact, organization, keyOutcomes } = prompt;

    // In a real implementation, this would call OpenAI or another LLM
    // For now, we'll generate a simple story with the provided information
    
    // Format the outcomes as bullet points if provided
    const outcomesText = keyOutcomes && keyOutcomes.length > 0 
      ? keyOutcomes.map(outcome => `• ${outcome}`).join('\n')
      : 'No specific outcomes were provided.';

    const title = `${organization || 'Healthcare Organization'}: ${innovation} Success Story`;
    
    const summary = `This success story highlights how ${organization || 'a healthcare organization'} 
      successfully implemented ${innovation} with significant impact on ${impact}.`;
    
    const content = `# ${title}

## Background
${organization || 'A leading healthcare organization'} faced challenges related to ${impact}. 
They identified ${innovation} as a potential solution to address these challenges.

## Implementation Journey
The team diligently worked to implement ${innovation}, focusing on key areas that 
would maximize impact. Through careful planning and execution, they were able to 
overcome initial hurdles and establish a successful implementation framework.

## Key Outcomes
${outcomesText}

## Impact and Results
The implementation of ${innovation} resulted in significant improvements in ${impact}. 
Stakeholders reported high satisfaction with the results, and metrics showed measurable 
positive changes in operational efficiency and patient outcomes.

## Lessons Learned
Throughout this journey, the team learned valuable lessons about technology adoption, 
change management, and the importance of stakeholder engagement. These insights will 
guide future innovation initiatives.

## Future Plans
Building on this success, ${organization || 'the organization'} plans to expand the implementation 
of ${innovation} to other areas and explore additional innovative solutions to further enhance healthcare delivery.`;

    // Generate some sample impact metrics
    const impactMetrics = {
      "Patient Satisfaction": Math.floor(Math.random() * 30) + 70, // 70-100%
      "Cost Reduction": Math.floor(Math.random() * 40) + 10, // 10-50%
      "Implementation Time": Math.floor(Math.random() * 6) + 3, // 3-9 months
      "ROI": Math.floor(Math.random() * 200) + 100, // 100-300%
    };

    // Generate some relevant tags
    const suggestedTags = [
      innovation.split(' ')[0].toLowerCase(),
      'healthcare',
      'innovation',
      'success',
      impact.split(' ')[0].toLowerCase(),
      organization ? organization.split(' ')[0].toLowerCase() : 'organization',
    ];

    const result = {
      title,
      summary,
      content,
      impactMetrics,
      suggestedTags: suggestedTags.slice(0, 5), // Keep just 5 tags
    };

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
