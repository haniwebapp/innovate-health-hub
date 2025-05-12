
/**
 * Simple in-memory cache utility
 */
export class CacheUtils {
  private static cache: Map<string, { value: any; expiry: number }> = new Map();
  
  /**
   * Get a value from cache
   */
  static get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    // Return null if item doesn't exist or is expired
    if (!item || (item.expiry !== 0 && Date.now() > item.expiry)) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }
  
  /**
   * Set a value in cache
   * @param ttl Time to live in milliseconds, 0 for no expiry
   */
  static set<T>(key: string, value: T, ttl: number = 60000): void {
    const expiry = ttl === 0 ? 0 : Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }
  
  /**
   * Remove a value from cache
   */
  static remove(key: string): void {
    this.cache.delete(key);
  }
  
  /**
   * Clear all expired items from cache
   */
  static cleanup(): void {
    const now = Date.now();
    this.cache.forEach((item, key) => {
      if (item.expiry !== 0 && now > item.expiry) {
        this.cache.delete(key);
      }
    });
  }
  
  /**
   * Get a cached value or compute it if not in cache
   */
  static async getOrCompute<T>(
    key: string,
    compute: () => Promise<T>,
    ttl: number = 60000
  ): Promise<T> {
    const cachedValue = this.get<T>(key);
    if (cachedValue !== null) {
      return cachedValue;
    }
    
    const computedValue = await compute();
    this.set(key, computedValue, ttl);
    return computedValue;
  }
}

// Set up periodic cleanup
setInterval(() => CacheUtils.cleanup(), 300000); // Clean every 5 minutes
