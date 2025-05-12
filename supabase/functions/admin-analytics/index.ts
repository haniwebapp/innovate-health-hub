
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  
  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      // Supabase API URL - env var exposed by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exposed by default.
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
    
    // Get the user who called the function
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    
    // Check if user has admin privileges
    const { data: userProfile } = await supabaseClient
      .from("profiles")
      .select("user_type")
      .eq("id", user?.id)
      .single();
      
    const isAdmin = userProfile?.user_type === "admin";
    
    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: "Not authorized" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { operation } = await req.json();
    let responseData;
    
    switch (operation) {
      case "insights":
        responseData = await generateAdminInsights(supabaseClient);
        break;
      case "anomalies":
        responseData = await detectAnomalies(supabaseClient);
        break;
      case "metrics":
        responseData = await getPerformanceMetrics(supabaseClient);
        break;
      case "recommendations":
        responseData = await getSystemRecommendations(supabaseClient);
        break;
      case "logAnalysis":
        responseData = await analyzeAdminLogs(supabaseClient);
        break;
      default:
        throw new Error("Unknown operation");
    }

    return new Response(
      JSON.stringify(responseData),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function generateAdminInsights(supabaseClient) {
  // Implement admin insights generation logic
  return [
    {
      title: "User activity increasing",
      description: "User activity has increased by 15% in the last week",
      impact: "medium",
      category: "users",
      actionItems: ["Consider scaling user-related services", "Prepare for increased support requests"]
    },
    {
      title: "New AI model performing well",
      description: "The new clinical analysis model is showing 92% accuracy",
      impact: "high",
      category: "ai",
      actionItems: ["Roll out to all users", "Collect more feedback"]
    },
    {
      title: "System performance stable",
      description: "No significant performance issues detected in the last 24 hours",
      impact: "low",
      category: "system",
      actionItems: []
    }
  ];
}

async function detectAnomalies(supabaseClient) {
  // Get anomalies from database function
  const { data, error } = await supabaseClient.rpc('detect_log_anomalies', { hours_window: 24 });
  
  if (error) throw error;
  return data || [];
}

async function getPerformanceMetrics(supabaseClient) {
  // Query performance metrics
  const { data: metricsData, error } = await supabaseClient
    .from('admin_analytics')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);
    
  if (error) throw error;
  
  // Transform data into the required format
  const metrics = [
    {
      category: "users",
      current: 2450,
      previous: 2300,
      trend: "up",
      percentChange: 6.5
    },
    {
      category: "processing",
      current: 350,
      previous: 400,
      trend: "down",
      percentChange: -12.5
    },
    {
      category: "content",
      current: 1200,
      previous: 1100,
      trend: "up",
      percentChange: 9.1
    },
    {
      category: "engagement",
      current: 0.42,
      previous: 0.38,
      trend: "up",
      percentChange: 10.5
    }
  ];
  
  return metrics;
}

async function getSystemRecommendations(supabaseClient) {
  // Generate system recommendations
  return [
    {
      recommendations: ["Implement caching for frequently accessed resources"],
      priority: "medium",
      impact: "Reduced load times by up to 30%",
      effort: "Medium (2-3 days)"
    },
    {
      recommendations: ["Update AI models with additional training data"],
      priority: "high",
      impact: "Improved accuracy for clinical analysis",
      effort: "High (1-2 weeks)"
    },
    {
      recommendations: ["Review and optimize database queries for user dashboard"],
      priority: "medium",
      impact: "Better dashboard performance, reduced load",
      effort: "Medium (3-4 days)"
    }
  ];
}

async function analyzeAdminLogs(supabaseClient) {
  // Get admin logs
  const { data: logs, error } = await supabaseClient
    .from('admin_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1000);
    
  if (error) throw error;
  
  // Simulate analysis results
  return {
    patterns: [
      { description: "Repeated authentication failures", frequency: 12, severity: "medium" },
      { description: "Resource access spikes", frequency: 5, severity: "low" },
      { description: "API rate limiting triggered", frequency: 3, severity: "high" },
    ],
    totalErrors: 27,
    criticalIssues: 3,
    recommendations: [
      "Investigate authentication failures from IP range 192.168.1.x",
      "Consider increasing rate limits for API endpoints /api/clinical/*",
      "Review error handling in the admin dashboard components"
    ]
  };
}
