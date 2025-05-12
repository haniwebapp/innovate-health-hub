
type MetricName = 'pageLoad' | 'apiCall' | 'renderTime' | 'interactionDelay';

interface PerformanceMetric {
  name: MetricName;
  value: number;
  context?: Record<string, any>;
  timestamp: number;
}

export class PerformanceMonitoringService {
  private static metrics: PerformanceMetric[] = [];
  private static readonly MAX_METRICS = 100;
  
  /**
   * Measures the time taken to execute a function and records the metric
   */
  static async measurePerformance<T>(
    name: MetricName, 
    fn: () => Promise<T> | T, 
    context?: Record<string, any>
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      this.recordMetric(name, performance.now() - start, context);
      return result;
    } catch (error) {
      this.recordMetric(name, performance.now() - start, { 
        ...context, 
        error: true,
        errorMessage: (error as Error)?.message 
      });
      throw error;
    }
  }
  
  /**
   * Records a performance metric
   */
  static recordMetric(name: MetricName, value: number, context?: Record<string, any>): void {
    this.metrics.push({
      name,
      value,
      context,
      timestamp: Date.now()
    });
    
    // Prevent unlimited growth of metrics array
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS);
    }
    
    // In production environment, you might want to send metrics to an analytics service
    console.debug(`[Performance] ${name}: ${value.toFixed(2)}ms`, context);
  }
  
  /**
   * Gets aggregated metrics for analysis
   */
  static getMetricsSummary(): Record<MetricName, { avg: number, min: number, max: number, count: number }> {
    const result: any = {};
    
    this.metrics.forEach(metric => {
      if (!result[metric.name]) {
        result[metric.name] = {
          values: [],
          sum: 0,
          min: Infinity,
          max: -Infinity,
          count: 0
        };
      }
      
      const stats = result[metric.name];
      stats.values.push(metric.value);
      stats.sum += metric.value;
      stats.min = Math.min(stats.min, metric.value);
      stats.max = Math.max(stats.max, metric.value);
      stats.count++;
    });
    
    // Calculate averages and remove the raw values
    Object.keys(result).forEach(key => {
      const stats = result[key];
      stats.avg = stats.count > 0 ? stats.sum / stats.count : 0;
      delete stats.values;
      delete stats.sum;
    });
    
    return result;
  }
}
