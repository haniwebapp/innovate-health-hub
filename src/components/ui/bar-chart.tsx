
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
  options?: any;
  className?: string;
  height?: number;
}

export function BarChart({ data, options, className, height = 300 }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: data.datasets.length > 1,
          position: 'top' as const,
        },
      },
    };
    
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        ...data,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          backgroundColor: dataset.backgroundColor || [
            'rgba(20, 83, 45, 0.8)', // moh-green with opacity
            'rgba(234, 179, 8, 0.8)', // amber with opacity
            'rgba(59, 130, 246, 0.8)', // blue with opacity
            'rgba(239, 68, 68, 0.8)', // red with opacity
            'rgba(168, 85, 247, 0.8)', // purple with opacity
          ],
          borderColor: dataset.borderColor || 'rgba(0, 0, 0, 0.1)',
          borderWidth: dataset.borderWidth || 1,
        })),
      },
      options: options || defaultOptions,
    });

    // Clean up
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, options]);

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <canvas ref={chartRef} />
    </div>
  );
}
