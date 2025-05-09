
// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.com/manual/getting_started/setup_your_environment

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = 'https://ntgrokpnwizohtfkcfec.supabase.co'
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Seed data for regulatory frameworks
const frameworks = [
  {
    id: "mdf",
    title: "Medical Devices Framework",
    icon: "CheckCircle",
    description: "For physical medical devices and equipment",
    total_steps: 5,
  },
  {
    id: "dhf",
    title: "Digital Health Software Framework",
    icon: "Code",
    description: "For healthcare software and digital tools",
    total_steps: 4,
  },
  {
    id: "biof",
    title: "Biotechnology Framework",
    icon: "Flask",
    description: "For biotech and pharmaceutical innovations",
    total_steps: 6,
  }
]

// Seed data for compliance requirements
const complianceRequirements = [
  // Medical Devices Framework
  {
    framework_id: "mdf",
    title: "Device Classification",
    description: "Complete device classification form to determine regulatory pathway",
    status: "required",
    order_index: 1
  },
  {
    framework_id: "mdf",
    title: "Technical Documentation",
    description: "Submit comprehensive technical documentation including design specifications",
    status: "required",
    order_index: 2
  },
  {
    framework_id: "mdf",
    title: "Risk Management File",
    description: "Prepare and submit risk analysis and risk management documentation",
    status: "required",
    order_index: 3
  },
  {
    framework_id: "mdf",
    title: "Clinical Evaluation",
    description: "Submit evidence of clinical performance and safety",
    status: "required",
    order_index: 4
  },
  {
    framework_id: "mdf",
    title: "Post-Market Surveillance Plan",
    description: "Develop and submit post-market surveillance strategy",
    status: "required",
    order_index: 5
  },
  
  // Digital Health Framework
  {
    framework_id: "dhf",
    title: "Software Classification",
    description: "Complete software risk classification assessment",
    status: "required",
    order_index: 1
  },
  {
    framework_id: "dhf",
    title: "Security & Privacy Documentation",
    description: "Submit documentation on data protection, encryption, and privacy measures",
    status: "required",
    order_index: 2
  },
  {
    framework_id: "dhf",
    title: "Usability Testing Results",
    description: "Submit results from user testing and usability evaluation",
    status: "required",
    order_index: 3
  },
  {
    framework_id: "dhf",
    title: "Software Verification & Validation",
    description: "Submit evidence of software testing and validation procedures",
    status: "required",
    order_index: 4
  },
  
  // Biotechnology Framework
  {
    framework_id: "biof",
    title: "Product Classification",
    description: "Submit product classification form to determine regulatory pathway",
    status: "required",
    order_index: 1
  },
  {
    framework_id: "biof",
    title: "R&D Protocols",
    description: "Submit research and development protocols and methodologies",
    status: "required",
    order_index: 2
  },
  {
    framework_id: "biof",
    title: "Safety Test Results",
    description: "Submit comprehensive safety testing results",
    status: "required",
    order_index: 3
  },
  {
    framework_id: "biof",
    title: "Clinical Trial Documentation",
    description: "Submit clinical trial protocols and preliminary results",
    status: "required",
    order_index: 4
  },
  {
    framework_id: "biof",
    title: "Manufacturing Protocols",
    description: "Submit detailed manufacturing processes and quality control measures",
    status: "required",
    order_index: 5
  },
  {
    framework_id: "biof",
    title: "Environmental Impact Assessment",
    description: "Submit assessment of potential environmental impacts",
    status: "recommended",
    order_index: 6
  }
]

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  try {
    console.log('Starting to seed regulatory data...')
    
    // First insert frameworks
    for (const framework of frameworks) {
      const { error } = await supabase
        .from('regulatory_frameworks')
        .upsert(framework, { onConflict: 'id' })
      
      if (error) {
        console.error('Error inserting framework:', error)
        throw error
      }
    }
    
    console.log('Frameworks inserted successfully')
    
    // Get the IDs of the inserted frameworks
    const { data: frameworksData, error: frameworksError } = await supabase
      .from('regulatory_frameworks')
      .select('id')
    
    if (frameworksError) {
      console.error('Error fetching frameworks:', frameworksError)
      throw frameworksError
    }
    
    // Map of framework_id to actual UUID
    const frameworkMap = {}
    frameworksData?.forEach(framework => {
      frameworkMap[framework.id] = framework.id
    })
    
    // Now insert compliance requirements with the actual framework UUIDs
    for (const requirement of complianceRequirements) {
      const { error } = await supabase
        .from('compliance_requirements')
        .insert({
          ...requirement,
          framework_id: frameworkMap[requirement.framework_id]
        })
      
      if (error) {
        console.error('Error inserting compliance requirement:', error)
        throw error
      }
    }
    
    console.log('Compliance requirements inserted successfully')
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Regulatory data seeded successfully',
        frameworks: frameworksData
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
