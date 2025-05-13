
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mock data for geographic distribution
const regionData = [
  { region: 'Middle East', percentage: 45, color: '#00814A' },
  { region: 'North America', percentage: 25, color: '#C3A86B' },
  { region: 'Europe', percentage: 15, color: '#006B3E' },
  { region: 'Asia', percentage: 10, color: '#A38A56' },
  { region: 'Africa', percentage: 5, color: '#80C18E' },
];

const investmentHotspots = [
  { city: 'Riyadh', country: 'Saudi Arabia', amount: '$120M', x: 62, y: 42, size: 'lg' },
  { city: 'Dubai', country: 'UAE', amount: '$75M', x: 65, y: 40, size: 'md' },
  { city: 'London', country: 'UK', amount: '$50M', x: 48, y: 25, size: 'md' },
  { city: 'New York', country: 'USA', amount: '$85M', x: 28, y: 30, size: 'md' },
  { city: 'Singapore', country: 'Singapore', amount: '$45M', x: 75, y: 52, size: 'sm' },
  { city: 'Tokyo', country: 'Japan', amount: '$30M', x: 85, y: 35, size: 'sm' },
];

interface HotspotProps {
  x: number;
  y: number;
  city: string;
  country: string;
  amount: string;
  size: 'sm' | 'md' | 'lg';
}

const Hotspot: React.FC<HotspotProps> = ({ x, y, city, country, amount, size }) => {
  const sizeClass = {
    sm: 'h-2 w-2 group-hover:h-3 group-hover:w-3',
    md: 'h-3 w-3 group-hover:h-4 group-hover:w-4',
    lg: 'h-4 w-4 group-hover:h-5 group-hover:w-5',
  };
  
  const pulseClass = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };
  
  return (
    <div 
      className="absolute group cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative">
        <div className={cn(
          "rounded-full bg-moh-green transition-all duration-300",
          sizeClass[size]
        )} />
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-moh-green/30 animate-ping",
          pulseClass[size]
        )} />
      </div>
      
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 p-2 rounded-md shadow-md -translate-x-1/2 translate-y-2 z-10 min-w-[120px]">
        <p className="font-medium text-xs text-moh-darkGreen">{city}, {country}</p>
        <p className="text-xs font-bold text-moh-green">{amount}</p>
      </div>
    </div>
  );
};

export function GeographicDistributionMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="h-5 w-5 text-moh-green mr-2" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
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
        
        <div className="relative h-[280px] w-full bg-slate-100 rounded-lg overflow-hidden">
          {/* Simple world map background (placeholder) */}
          <div className="absolute inset-0 bg-[url('/lovable-uploads/8b61ff0c-8ac1-4567-a8c2-24b34ecda18b.png')] bg-cover bg-center opacity-20"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Investment hotspots */}
            {investmentHotspots.map((hotspot) => (
              <Hotspot 
                key={hotspot.city}
                x={hotspot.x}
                y={hotspot.y}
                city={hotspot.city}
                country={hotspot.country}
                amount={hotspot.amount}
                size={hotspot.size as 'sm' | 'md' | 'lg'}
              />
            ))}
          </div>
          
          <div className="absolute bottom-2 right-2">
            <div className="bg-white/80 px-2 py-1 rounded text-xs font-medium text-moh-darkGreen">
              Investment Hotspots
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            The Middle East region leads healthcare investment with 45% of total funding, 
            followed by North America (25%) and Europe (15%).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
