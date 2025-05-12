
import { toast } from "@/hooks/use-toast";
import { debounce } from "./performanceUtils";

/**
 * UI utilities for enhancing user experience
 */

/**
 * Shows a standardized toast notification
 */
export function showNotification(
  title: string, 
  description?: string, 
  variant: "default" | "destructive" = "default"
): void {
  toast({
    title,
    description,
    variant,
  });
}

/**
 * Creates a responsive size value based on screen size
 */
export function responsiveSize(
  base: number, 
  options?: { sm?: number; md?: number; lg?: number; xl?: number }
): string {
  const getBreakpoint = () => {
    const width = window.innerWidth;
    if (width < 640) return 'base';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    return 'xl';
  };
  
  const getSizeForBreakpoint = (breakpoint: string): number => {
    if (!options) return base;
    
    switch (breakpoint) {
      case 'sm': return options.sm ?? base;
      case 'md': return options.md ?? options.sm ?? base;
      case 'lg': return options.lg ?? options.md ?? options.sm ?? base;
      case 'xl': return options.xl ?? options.lg ?? options.md ?? options.sm ?? base;
      default: return base;
    }
  };
  
  // Use a state variable in a real component, but we'll just return the base value here
  return `${getSizeForBreakpoint(getBreakpoint())}px`;
}

/**
 * Debouncers for various UI events
 */
export const debouncedResize = debounce((callback: () => void) => {
  callback();
}, 250);

export const debouncedScroll = debounce((callback: () => void) => {
  callback();
}, 100);

export const debouncedSearch = debounce((callback: () => void) => {
  callback();
}, 300);

/**
 * Error boundary utility function
 */
export function createErrorBoundaryHandler(componentName: string) {
  return function handleError(error: Error, info: { componentStack: string }) {
    // Log the error
    console.error(`Error in ${componentName}:`, error);
    console.error(`Component stack:`, info.componentStack);
    
    // Show user-friendly notification
    showNotification(
      "Something went wrong",
      "There was an error loading part of the page. Please try again later.",
      "destructive"
    );
    
    // Send to error tracking service (would integrate with a real service)
    console.info("[Error Tracking] Error would be sent to monitoring service");
  };
}
