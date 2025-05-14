
import React from 'react';
import { motion } from "framer-motion";

interface RegionDataItem {
  region: string;
  percentage: number;
  color: string;
}

interface RegionDistributionChartProps {
  regionData: RegionDataItem[];
}

export function RegionDistributionChart({ regionData }: RegionDistributionChartProps) {
  return (
    <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-2">
      {regionData.map((region, index) => (
        <div key={region.region} className="flex items-center space-x-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${region.percentage}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="h-2 bg-gradient-to-r from-moh-green to-moh-green/60 rounded-full"
            style={{ maxWidth: '100%' }}
          />
          <div className="flex justify-between w-full text-sm">
            <span className="font-medium">{region.region}</span>
            <span className="text-moh-green font-bold">{region.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
