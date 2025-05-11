
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

interface RequestPayload {
  metric?: string;
  timePeriod?: string;
  startDate?: string;
  endDate?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  // Get environment variables
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const payload = await req.json() as RequestPayload;
    const { metric, timePeriod, startDate, endDate } = payload;

    // Get basic analytics
    const analyticsData = await getAnalytics(supabase, metric, timePeriod, startDate, endDate);
    
    // Get user activity data
    const userActivityData = await getUserActivityStats(supabase);
    
    // Get system health data
    const systemHealthData = await getSystemHealth(supabase);
    
    console.log("Admin analytics data compiled successfully");
    
    return new Response(
      JSON.stringify({
        analytics: analyticsData,
        userActivity: userActivityData,
        systemHealth: systemHealthData,
        generatedAt: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Admin analytics error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

async function getAnalytics(
  supabase: any,
  metric?: string,
  timePeriod?: string,
  startDate?: string,
  endDate?: string
) {
  let query = supabase.from('admin_analytics').select('*');
  
  if (metric) {
    query = query.eq('metric_name', metric);
  }
  
  if (timePeriod) {
    query = query.eq('time_period', timePeriod);
  }
  
  if (startDate) {
    query = query.gte('start_date', startDate);
  }
  
  if (endDate) {
    query = query.lte('end_date', endDate);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    throw new Error(`Error retrieving analytics: ${error.message}`);
  }
  
  return data || [];
}

async function getUserActivityStats(supabase: any) {
  // Get aggregate stats about users
  const { data: userStats, error: userStatsError } = await supabase
    .from('user_activity_summary')
    .select('login_count, submission_count, comment_count, event_participation_count, resource_view_count')
    .limit(100);
  
  if (userStatsError) {
    throw new Error(`Error retrieving user activity stats: ${userStatsError.message}`);
  }
  
  // Calculate average engagement metrics
  const totalUsers = userStats?.length || 0;
  const totals = userStats?.reduce((acc, user) => {
    acc.logins += user.login_count || 0;
    acc.submissions += user.submission_count || 0;
    acc.comments += user.comment_count || 0;
    acc.events += user.event_participation_count || 0;
    acc.resources += user.resource_view_count || 0;
    return acc;
  }, { logins: 0, submissions: 0, comments: 0, events: 0, resources: 0 });
  
  // Return the aggregated metrics
  return {
    totalUsersAnalyzed: totalUsers,
    averageLogins: totalUsers > 0 ? totals.logins / totalUsers : 0,
    averageSubmissions: totalUsers > 0 ? totals.submissions / totalUsers : 0,
    averageComments: totalUsers > 0 ? totals.comments / totalUsers : 0,
    averageEventParticipation: totalUsers > 0 ? totals.events / totalUsers : 0,
    averageResourceViews: totalUsers > 0 ? totals.resources / totalUsers : 0
  };
}

async function getSystemHealth(supabase: any) {
  // Get the most recent logs for system health assessment
  const { data: recentLogs, error: logsError } = await supabase
    .from('admin_logs')
    .select('log_type, source, severity, created_at')
    .order('created_at', { ascending: false })
    .limit(100);
  
  if (logsError) {
    throw new Error(`Error retrieving system logs: ${logsError.message}`);
  }
  
  // Count errors by service
  const serviceErrorCounts = {};
  const lastDayTimestamp = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  
  recentLogs?.forEach(log => {
    if (log.severity === 'error' || log.severity === 'critical') {
      if (!serviceErrorCounts[log.source]) {
        serviceErrorCounts[log.source] = {
          total: 0,
          lastDay: 0
        };
      }
      
      serviceErrorCounts[log.source].total++;
      
      if (log.created_at >= lastDayTimestamp) {
        serviceErrorCounts[log.source].lastDay++;
      }
    }
  });
  
  // Generate health status for each service
  const healthStatus = Object.entries(serviceErrorCounts).map(([service, counts]) => {
    const anyErrors = counts.lastDay > 0;
    const manyErrors = counts.lastDay > 5;
    
    return {
      service,
      status: manyErrors ? 'down' : (anyErrors ? 'degraded' : 'operational'),
      errorCount: counts.total,
      recentErrorCount: counts.lastDay
    };
  });
  
  return healthStatus;
}
