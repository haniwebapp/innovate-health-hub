
import { useCallback, useRef } from 'react';

/**
 * A hook that returns a memoized callback that only changes if one of the dependencies changes.
 * Unlike useCallback, it guarantees that the function reference will stay the same between renders
 * if the dependencies don't change, even if the component re-renders for other reasons.
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
): T {
  const callbackRef = useRef<T>(callback);
  
  // Update the callback ref when the callback changes
  callbackRef.current = callback;
  
  // Return a stable callback that calls the latest function
  return useCallback(
    ((...args) => callbackRef.current(...args)) as T,
    dependencies
  );
}
