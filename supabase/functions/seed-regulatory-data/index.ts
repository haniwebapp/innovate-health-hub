
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Seed data for regulatory frameworks
    const frameworksData = [
      {
        id: "dhf",
        title: "Digital Health Framework",
        description: "Regulatory framework for software as a medical device (SaMD) and digital health technologies.",
        icon: "Code", // Changed to use a string name that exists
        total_steps: 6,
      },
      {
        id: "mdf",
        title: "Medical Device Framework",
        description: "Regulatory pathway for traditional medical devices and equipment.",
        icon: "CheckCircle", // Changed to use a string name that exists
        total_steps: 8,
      },
      {
        id: "biof",
        title: "Biotechnology Framework",
        description: "Regulatory guidelines for biotech innovations, including therapeutics and diagnostics.",
        icon: "Beaker", // Changed to use a string name that exists
        total_steps: 10,
      },
    ];

    // Insert frameworks
    const { error: frameworksError } = await supabaseClient
      .from("regulatory_frameworks")
      .upsert(frameworksData, { onConflict: "id" });

    if (frameworksError) {
      throw frameworksError;
    }

    // Seed data for compliance requirements
    const requirementsData = [
      // Digital Health Framework (DHF) requirements
      {
        framework_id: "dhf",
        title: "Software Development Documentation",
        description: "Documentation of software design, development, and validation processes.",
        status: "required",
        order_index: 0,
      },
      {
        framework_id: "dhf",
        title: "Clinical Validation",
        description: "Evidence supporting the clinical claims and effectiveness of the digital solution.",
        status: "required",
        order_index: 1,
      },
      {
        framework_id: "dhf",
        title: "Cybersecurity Risk Assessment",
        description: "Assessment of cybersecurity vulnerabilities and mitigation strategies.",
        status: "required",
        order_index: 2,
      },
      {
        framework_id: "dhf",
        title: "Data Privacy Compliance",
        description: "Evidence of compliance with relevant data protection regulations.",
        status: "required",
        order_index: 3,
      },
      {
        framework_id: "dhf",
        title: "Usability Validation",
        description: "Documentation of human factors testing and usability validation.",
        status: "required",
        order_index: 4,
      },
      {
        framework_id: "dhf",
        title: "Post-Market Surveillance Plan",
        description: "Plan for monitoring performance and safety after deployment.",
        status: "required",
        order_index: 5,
      },

      // Medical Device Framework (MDF) requirements
      {
        framework_id: "mdf",
        title: "Device Classification",
        description: "Determination of risk classification according to regulatory criteria.",
        status: "required",
        order_index: 0,
      },
      {
        framework_id: "mdf",
        title: "Technical Documentation",
        description: "Complete technical file including device specifications and testing data.",
        status: "required",
        order_index: 1,
      },
      {
        framework_id: "mdf",
        title: "Risk Management File",
        description: "Comprehensive risk analysis and risk mitigation measures.",
        status: "required",
        order_index: 2,
      },
      {
        framework_id: "mdf",
        title: "Clinical Evaluation",
        description: "Clinical evidence supporting safety and performance claims.",
        status: "required",
        order_index: 3,
      },
      {
        framework_id: "mdf",
        title: "Quality Management System",
        description: "Documentation of quality management system compliant with ISO 13485.",
        status: "required",
        order_index: 4,
      },
      {
        framework_id: "mdf",
        title: "Labeling and Instructions for Use",
        description: "Compliant labeling and user instructions.",
        status: "required",
        order_index: 5,
      },
      {
        framework_id: "mdf",
        title: "Post-Market Surveillance",
        description: "System for monitoring device performance and safety after market release.",
        status: "required",
        order_index: 6,
      },
      {
        framework_id: "mdf",
        title: "Biocompatibility Assessment",
        description: "Evaluation of biological compatibility for patient-contacting devices.",
        status: "recommended",
        order_index: 7,
      },

      // Biotechnology Framework (BIOF) requirements
      {
        framework_id: "biof",
        title: "Preclinical Data",
        description: "Laboratory and animal testing data demonstrating safety and efficacy.",
        status: "required",
        order_index: 0,
      },
      {
        framework_id: "biof",
        title: "Manufacturing Process Documentation",
        description: "Details of production methods, quality controls, and facility compliance.",
        status: "required",
        order_index: 1,
      },
      {
        framework_id: "biof",
        title: "Clinical Trial Documentation",
        description: "Protocol, results, and analysis of human clinical trials.",
        status: "required",
        order_index: 2,
      },
      {
        framework_id: "biof",
        title: "Product Characterization",
        description: "Detailed physical, chemical, and biological characterization of the product.",
        status: "required",
        order_index: 3,
      },
      {
        framework_id: "biof",
        title: "Stability Data",
        description: "Evidence of product stability under specified storage conditions.",
        status: "required",
        order_index: 4,
      },
      {
        framework_id: "biof",
        title: "Risk Management Plan",
        description: "Comprehensive risk assessment and mitigation strategies.",
        status: "required",
        order_index: 5,
      },
      {
        framework_id: "biof",
        title: "Environmental Impact Assessment",
        description: "Analysis of potential environmental impacts and mitigation measures.",
        status: "required",
        order_index: 6,
      },
      {
        framework_id: "biof",
        title: "Pharmacovigilance Plan",
        description: "System for monitoring and reporting adverse events.",
        status: "required",
        order_index: 7,
      },
      {
        framework_id: "biof",
        title: "Genetic Modification Documentation",
        description: "Details of genetic modification techniques and containment measures.",
        status: "recommended",
        order_index: 8,
      },
      {
        framework_id: "biof",
        title: "Ethical Review Documentation",
        description: "Evidence of independent ethical review and approval.",
        status: "required",
        order_index: 9,
      },
    ];

    // Insert compliance requirements
    const { error: requirementsError } = await supabaseClient
      .from("compliance_requirements")
      .upsert(requirementsData);

    if (requirementsError) {
      throw requirementsError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Regulatory data seeded successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
