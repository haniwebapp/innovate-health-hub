
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { MapboxGlobe, RegionDistributionChart, investmentHotspots, regionData } from './mapbox-map';

interface MapboxGlobalMapProps {
  className?: string;
}

export function MapboxGlobalMap({ className }: MapboxGlobalMapProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="h-5 w-5 text-moh-green mr-2" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RegionDistributionChart regionData={regionData} />
        <MapboxGlobe hotspots={investmentHotspots} />
        
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
