
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { InvestmentHotspot } from './types';
import { useMapMarkers, useMapAnimation, useTokenManager } from './hooks';
import { initializeMapboxGlobe } from './utils';

interface UseMapboxGlobeProps {
  hotspots: InvestmentHotspot[];
}

interface UseMapboxGlobeResult {
  mapContainer: React.RefObject<HTMLDivElement>;
  mapLoaded: boolean;
  mapError: string | null;
  updateMapboxToken: (token: string) => void;
}

export function useMapboxGlobe({ hotspots }: UseMapboxGlobeProps): UseMapboxGlobeResult {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  const { mapboxToken, tokenError, fetchToken, updateToken } = useTokenManager();
  const { addHotspotMarkers, clearMarkers } = useMapMarkers();
  const { setupAnimationControls } = useMapAnimation();
  
  // Fetch the token on component mount
  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  // Set map error if token has error
  useEffect(() => {
    if (tokenError) {
      setMapError(tokenError);
    }
  }, [tokenError]);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;
    
    // Clean up any existing map
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    const mapInstance = initializeMapboxGlobe(
      mapContainer.current, 
      token,
      {
        onError: (error) => {
          setMapError(error);
          setMapLoaded(false);
        },
        onStyleLoad: (mapInstance) => {
          // Add markers for investment hotspots after the map style loads
          addHotspotMarkers(mapInstance, hotspots);
          setMapLoaded(true);
          setMapError(null);
        },
        onLoad: (mapInstance) => {
          // Set up animation controls
          setupAnimationControls(mapInstance);
        }
      }
    );

    if (mapInstance) {
      map.current = mapInstance;
    }
  };

  // Initialize map when the token is available
  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }

    // Cleanup on unmount
    return () => {
      clearMarkers();
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, hotspots, clearMarkers]);

  return { 
    mapContainer, 
    mapLoaded, 
    mapError, 
    updateMapboxToken: updateToken 
  };
}
