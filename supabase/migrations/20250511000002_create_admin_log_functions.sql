
-- Create helper functions for admin logs

-- Function to get logs by severity in a date range
CREATE OR REPLACE FUNCTION public.summarize_logs_by_severity(
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE
)
RETURNS TABLE(severity TEXT, count BIGINT)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT 
    severity,
    COUNT(*) as count
  FROM 
    public.admin_logs
  WHERE 
    created_at >= start_date AND created_at <= end_date
  GROUP BY 
    severity
  ORDER BY 
    count DESC;
$$;

-- Function to get logs by source in a date range
CREATE OR REPLACE FUNCTION public.get_logs_by_source(
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE
)
RETURNS TABLE(source TEXT, count BIGINT)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT 
    source,
    COUNT(*) as count
  FROM 
    public.admin_logs
  WHERE 
    created_at >= start_date AND created_at <= end_date
  GROUP BY 
    source
  ORDER BY 
    count DESC;
$$;

-- Function to detect log anomalies
CREATE OR REPLACE FUNCTION public.detect_log_anomalies(hours_window INTEGER DEFAULT 24)
RETURNS TABLE(
  log_type TEXT,
  source TEXT,
  normal_count INTEGER,
  current_count INTEGER,
  percent_change NUMERIC,
  is_anomaly BOOLEAN
)
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
DECLARE
  current_time TIMESTAMP WITH TIME ZONE := now();
  previous_window_start TIMESTAMP WITH TIME ZONE := current_time - interval '2 days';
  previous_window_end TIMESTAMP WITH TIME ZONE := current_time - interval '1 day';
  current_window_start TIMESTAMP WITH TIME ZONE := current_time - interval '1 day';
BEGIN
  RETURN QUERY
  WITH previous_counts AS (
    SELECT 
      log_type,
      source,
      COUNT(*) as count
    FROM 
      public.admin_logs
    WHERE 
      created_at BETWEEN previous_window_start AND previous_window_end
    GROUP BY 
      log_type, source
  ),
  current_counts AS (
    SELECT 
      log_type,
      source,
      COUNT(*) as count
    FROM 
      public.admin_logs
    WHERE 
      created_at BETWEEN current_window_start AND current_time
    GROUP BY 
      log_type, source
  )
  SELECT 
    cc.log_type,
    cc.source,
    COALESCE(pc.count, 0) as normal_count,
    cc.count as current_count,
    CASE 
      WHEN COALESCE(pc.count, 0) = 0 THEN 100
      ELSE (cc.count - COALESCE(pc.count, 0))::NUMERIC / COALESCE(pc.count, 1) * 100
    END as percent_change,
    CASE 
      WHEN COALESCE(pc.count, 0) = 0 AND cc.count > 10 THEN TRUE
      WHEN (cc.count - COALESCE(pc.count, 0))::NUMERIC / COALESCE(pc.count, 1) > 2 AND cc.count > 5 THEN TRUE
      ELSE FALSE
    END as is_anomaly
  FROM 
    current_counts cc
    LEFT JOIN previous_counts pc ON cc.log_type = pc.log_type AND cc.source = pc.source
  WHERE 
    CASE 
      WHEN COALESCE(pc.count, 0) = 0 AND cc.count > 10 THEN TRUE
      WHEN (cc.count - COALESCE(pc.count, 0))::NUMERIC / COALESCE(pc.count, 1) > 2 AND cc.count > 5 THEN TRUE
      ELSE FALSE
    END = TRUE;
END;
$$;
