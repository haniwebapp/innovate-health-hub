
import { supabase } from "@/integrations/supabase/client";
import { AdminLog } from "@/types/adminTypes";

class AdminLogService {
  /**
   * Add a new log entry
   */
  static async addLog(logData: Omit<AdminLog, "id" | "created_at">): Promise<AdminLog | null> {
    try {
      const { data, error } = await supabase
        .from('admin_logs')
        .insert({
          log_type: logData.log_type,
          source: logData.source,
          severity: logData.severity,
          details: logData.details,
          user_id: logData.user_id
        })
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
      // For demo/testing purposes, let's return mock data
      // In a real implementation, this would query the database
      
      // Mock data generation
      const mockLogs: AdminLog[] = Array(50).fill(null).map((_, index) => ({
        id: `log-${index + 1}`,
        log_type: ['access', 'error', 'audit', 'event'][Math.floor(Math.random() * 4)],
        source: ['api', 'auth', 'database', 'user', 'system'][Math.floor(Math.random() * 5)],
        details: { message: `Log message ${index + 1}`, path: `/api/endpoint/${index}` },
        severity: ['info', 'warning', 'error', 'critical'][Math.floor(Math.random() * 4)] as any,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
        user_id: Math.random() > 0.3 ? `user-${Math.floor(Math.random() * 10) + 1}` : undefined
      }));
      
      // Apply filters
      let filteredLogs = [...mockLogs];
      
      if (filters.severity) {
        filteredLogs = filteredLogs.filter(log => log.severity === filters.severity);
      }
      
      if (filters.source) {
        filteredLogs = filteredLogs.filter(log => log.source === filters.source);
      }
      
      if (filters.logType) {
        filteredLogs = filteredLogs.filter(log => log.log_type === filters.logType);
      }
      
      if (filters.fromDate) {
        filteredLogs = filteredLogs.filter(log => log.created_at >= filters.fromDate!);
      }
      
      if (filters.toDate) {
        // Add one day to include the full end date
        const endDate = new Date(filters.toDate);
        endDate.setDate(endDate.getDate() + 1);
        filteredLogs = filteredLogs.filter(log => log.created_at <= endDate);
      }
      
      // Sort by created_at desc
      filteredLogs = filteredLogs.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
      
      // Apply pagination
      const totalCount = filteredLogs.length;
      const from = (page - 1) * pageSize;
      const to = from + pageSize;
      const paginatedLogs = filteredLogs.slice(from, to);
      
      return {
        logs: paginatedLogs,
        totalCount
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

export { AdminLogService as adminLogService };
