
import { useMemo } from "react";

export interface Sequence {
  symbol: string;
  x: number;
  y: number;
  opacity: number;
  size: number;
  duration: number;
  delay: number;
  direction: number;
}

export function useSequences(count: number, symbols: string[]): Sequence[] {
  return useMemo(() => {
    return Array.from({ length: count }, () => ({
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      size: Math.random() * 14 + 8,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 10,
      direction: Math.random() > 0.5 ? 1 : -1
    }));
  }, [count, symbols]);
}
