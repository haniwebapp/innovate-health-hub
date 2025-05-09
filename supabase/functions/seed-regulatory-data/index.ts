
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting to seed regulatory frameworks data...');

    // Sample regulatory frameworks
    const frameworks = [
      {
        id: 'mdf',
        title: 'Medical Devices Framework',
        description: 'For physical medical devices and equipment',
        icon: 'Shield',
        total_steps: 5,
      },
      {
        id: 'dhf',
        title: 'Digital Health Software Framework',
        description: 'For healthcare software and digital tools',
        icon: 'Code',
        total_steps: 4,
      },
      {
        id: 'biof',
        title: 'Biotechnology Framework',
        description: 'For biotech and pharmaceutical innovations',
        icon: 'Beaker',
        total_steps: 6,
      },
    ];

    // Insert regulatory frameworks
    const { error: frameworkError } = await supabaseClient
      .from('regulatory_frameworks')
      .upsert(frameworks, { onConflict: 'id' });

    if (frameworkError) {
      throw frameworkError;
    }

    // Sample compliance requirements
    const requirements = [
      {
        framework_id: 'mdf',
        title: 'Device Classification Form',
        description: 'Complete the form to classify your medical device according to risk levels.',
        status: 'required',
        order_index: 1,
      },
      {
        framework_id: 'mdf',
        title: 'Technical Documentation',
        description: 'Submit comprehensive technical documentation including specifications and design.',
        status: 'required',
        order_index: 2,
      },
      {
        framework_id: 'dhf',
        title: 'Software Assessment Form',
        description: 'Complete the digital health software assessment to determine regulatory pathway.',
        status: 'required',
        order_index: 1,
      },
      {
        framework_id: 'dhf',
        title: 'Security & Privacy Documentation',
        description: 'Provide documentation on data security measures and privacy protections.',
        status: 'required',
        order_index: 2,
      },
      {
        framework_id: 'biof',
        title: 'Product Classification Form',
        description: 'Complete form to classify your biotechnology product according to regulations.',
        status: 'required',
        order_index: 1,
      },
      {
        framework_id: 'biof',
        title: 'R&D Protocols',
        description: 'Register research and development protocols for review.',
        status: 'required',
        order_index: 2,
      },
    ];

    // Insert compliance requirements
    const { error: requirementsError } = await supabaseClient
      .from('compliance_requirements')
      .upsert(requirements, { ignoreDuplicates: true });

    if (requirementsError) {
      throw requirementsError;
    }

    console.log('Successfully seeded regulatory data');

    return new Response(
      JSON.stringify({ success: true, message: 'Regulatory data seeded successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error seeding data:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
