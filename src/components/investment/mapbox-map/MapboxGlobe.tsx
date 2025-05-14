
import React, { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from '@/lib/utils';
import { InvestmentHotspot } from './types';
import { useMapboxGlobe } from './useMapboxGlobe';
import { MapStyles } from './MapStyles';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidMapboxToken } from './config';
import { useToast } from '@/hooks/use-toast';

interface MapboxGlobeProps {
  hotspots: InvestmentHotspot[];
}

export function MapboxGlobe({ hotspots }: MapboxGlobeProps) {
  const { mapContainer, mapLoaded, mapError, updateMapboxToken } = useMapboxGlobe({ hotspots });
  const [tokenInput, setTokenInput] = useState('');
  const { toast } = useToast();

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidMapboxToken(tokenInput.trim())) {
      updateMapboxToken(tokenInput.trim());
      toast({
        title: "Token updated",
        description: "Your Mapbox token has been updated successfully.",
        variant: "success",
      });
    } else {
      toast({
        title: "Invalid token",
        description: "Please provide a valid Mapbox token that starts with 'pk.' or 'sk.'",
        variant: "destructive",
      });
    }
  };

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
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-lg">
          <div className="animate-pulse text-moh-green">Loading map...</div>
        </div>
      )}

      {/* Error state with token input */}
      {mapError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100 rounded-lg p-4">
          <div className="flex items-center text-red-600 mb-2">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="font-medium">Map Error</span>
          </div>
          
          <p className="text-sm text-center text-slate-700 max-w-sm mb-2">
            {mapError.includes("token") ? 
              "Please provide a valid Mapbox token to display the interactive map." : 
              mapError
            }
          </p>
          
          <form onSubmit={handleTokenSubmit} className="w-full max-w-sm flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Enter your Mapbox token (pk. or sk.)"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="text-sm"
            />
            <Button 
              type="submit" 
              size="sm" 
              className="w-full bg-moh-green hover:bg-moh-green/90"
            >
              Update Token
            </Button>
            <div className="text-xs text-center text-slate-500 mt-1">
              Get a token at <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="text-moh-green hover:underline">mapbox.com</a>
            </div>
          </form>
        </div>
      )}
      
      {/* Add CSS for animations */}
      <MapStyles />
    </div>
  );
}
