
import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { InvestmentHotspot } from './types';
import { useMapboxGlobe } from './useMapboxGlobe';
import { MapStyles } from './MapStyles';
import { MapErrorDisplay } from './MapErrorDisplay';

interface MapboxGlobeProps {
  hotspots: InvestmentHotspot[];
}

export function MapboxGlobe({ hotspots }: MapboxGlobeProps) {
  const { mapContainer, mapLoaded, mapError, isLoading, updateMapboxToken } = useMapboxGlobe({ hotspots });

  return (
    <div className="relative h-[280px] w-full rounded-lg overflow-hidden">
      {/* Mapbox container */}
      <div 
        ref={mapContainer} 
        className={cn(
          "absolute inset-0 bg-slate-100 rounded-lg",
          mapLoaded && !mapError ? "opacity-100" : "opacity-0"
        )}
        style={{ transition: "opacity 0.5s ease-in-out" }}
      />
      
      {/* Loading placeholder */}
      {isLoading && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-lg">
          <Loader2 className="h-8 w-8 text-moh-green animate-spin" />
          <span className="ml-2 text-moh-darkGreen">Loading map...</span>
        </div>
      )}

      {/* Placeholder when no token has been fetched yet */}
      {!isLoading && !mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-lg">
          <div className="text-moh-green">Initializing map...</div>
        </div>
      )}

      {/* Error display with token input */}
      {mapError && (
        <MapErrorDisplay 
          errorMessage={mapError} 
          onTokenSubmit={updateMapboxToken}
          isLoading={isLoading}
        />
      )}
      
      {/* Add CSS for animations */}
      <MapStyles />
    </div>
  );
}
