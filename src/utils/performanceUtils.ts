
/**
 * Performance utilities for optimizing application performance
 */

/**
 * Debounce function to limit how often a function can be called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Memoize function results to avoid recalculating expensive operations
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function memoized(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Measures execution time of functions for performance monitoring
 */
export function measureExecutionTime<T extends (...args: any[]) => any>(
  func: T,
  functionName: string = func.name
): (...args: Parameters<T>) => ReturnType<T> {
  return function measured(...args: Parameters<T>): ReturnType<T> {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    
    console.log(`[Performance] ${functionName} executed in ${(end - start).toFixed(2)}ms`);
    
    return result;
  };
}

/**
 * Ensures a function isn't called too frequently in succession
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function throttled(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
