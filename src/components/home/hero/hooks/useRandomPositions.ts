
import { useMemo } from "react";

export interface RandomPosition {
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export function useRandomPositions(count: number, areaSize: { width: number, height: number }): RandomPosition[] {
  return useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * areaSize.width,
      y: Math.random() * areaSize.height,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      size: Math.random() * 10 + 5
    }));
  }, [count, areaSize.width, areaSize.height]);
}
