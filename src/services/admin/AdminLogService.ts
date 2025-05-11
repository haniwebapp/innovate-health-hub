
import { supabase } from "@/integrations/supabase/client";
import { AdminLog } from "@/types/adminTypes";

export class AdminLogService {
  /**
   * Add a new log entry
   */
  static async addLog(logData: Omit<AdminLog, 'id' | 'created_at'>): Promise<AdminLog | null> {
    try {
      const { data, error } = await supabase
        .from('admin_logs')
        .insert(logData)
        .select()
        .single();
      
      if (error) throw error;
      
      // Convert string dates to Date objects
      return data ? {
        ...data,
        created_at: new Date(data.created_at)
      } as AdminLog : null;
    } catch (error) {
      console.error("Error adding admin log:", error);
      return null;
    }
  }
  
  /**
   * Get logs by severity
   */
  static async getLogsBySeverity(startDate: Date, endDate: Date): Promise<{severity: string, count: number}[]> {
    try {
      const { data, error } = await supabase
        .rpc('summarize_logs_by_severity', {
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString()
        });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error("Error getting logs by severity:", error);
      return [];
    }
  }
  
  /**
   * Get logs by source
   */
  static async getLogsBySource(startDate: Date, endDate: Date): Promise<{source: string, count: number}[]> {
    try {
      const { data, error } = await supabase
        .rpc('get_logs_by_source', {
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString()
        });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error("Error getting logs by source:", error);
      return [];
    }
  }
  
  /**
   * Get logs with pagination and filtering
   */
  static async getLogs(
    page: number = 1, 
    pageSize: number = 20, 
    filters: {
      severity?: string,
      source?: string,
      logType?: string,
      fromDate?: Date,
      toDate?: Date
    } = {}
  ): Promise<{ logs: AdminLog[], totalCount: number }> {
    try {
      let query = supabase
        .from('admin_logs')
        .select('*', { count: 'exact' });
      
      // Apply filters
      if (filters.severity) {
        query = query.eq('severity', filters.severity);
      }
      
      if (filters.source) {
        query = query.eq('source', filters.source);
      }
      
      if (filters.logType) {
        query = query.eq('log_type', filters.logType);
      }
      
      if (filters.fromDate) {
        query = query.gte('created_at', filters.fromDate.toISOString());
      }
      
      if (filters.toDate) {
        query = query.lte('created_at', filters.toDate.toISOString());
      }
      
      // Apply pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      
      query = query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      const { data, error, count } = await query;
      
      if (error) throw error;
      
      // Convert string dates to Date objects
      const logs = (data || []).map(log => ({
        ...log,
        created_at: new Date(log.created_at)
      })) as AdminLog[];
      
      return {
        logs,
        totalCount: count || 0
      };
    } catch (error) {
      console.error("Error getting admin logs:", error);
      return { logs: [], totalCount: 0 };
    }
  }
  
  /**
   * Detect anomalies in logs over a time period
   */
  static async detectAnomalies(hoursWindow: number = 24): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .rpc('detect_log_anomalies', { hours_window: hoursWindow });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error("Error detecting log anomalies:", error);
      return [];
    }
  }
}
