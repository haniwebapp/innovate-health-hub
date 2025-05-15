
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
  isLoading: boolean;
  updateMapboxToken: (token: string) => void;
}

export function useMapboxGlobe({ hotspots }: UseMapboxGlobeProps): UseMapboxGlobeResult {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  const { mapboxToken, tokenError, isLoading, fetchAttempted, fetchToken, updateToken } = useTokenManager();
  const { addHotspotMarkers, clearMarkers } = useMapMarkers();
  const { setupAnimationControls } = useMapAnimation();
  
  // Set map error if token has error
  useEffect(() => {
    if (tokenError) {
      setMapError(tokenError);
      setMapLoaded(false);
    }
  }, [tokenError]);

  // Safely remove existing map
  const safelyRemoveMap = () => {
    try {
      if (map.current) {
        // Clear all markers first
        clearMarkers();
        
        if (!map.current._removed) {
          // Only call remove if the map hasn't been removed yet
          map.current.remove();
        }
        
        map.current = null;
      }
    } catch (err) {
      console.error("Error removing map:", err);
    }
  };

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;
    
    // Safely clean up any existing map
    safelyRemoveMap();

    console.log("Initializing map with token:", token.substring(0, 5) + '...');
    const mapInstance = initializeMapboxGlobe(
      mapContainer.current, 
      token,
      {
        onError: (error) => {
          console.error("Map initialization error:", error);
          setMapError(error);
          setMapLoaded(false);
        },
        onStyleLoad: (mapInstance) => {
          // Verify map still exists before adding markers
          if (mapInstance && !mapInstance._removed) {
            // Add markers for investment hotspots after the map style loads
            addHotspotMarkers(mapInstance, hotspots);
            console.log("Map style loaded, markers added");
            setMapLoaded(true);
            setMapError(null);
          }
        },
        onLoad: (mapInstance) => {
          // Verify map still exists before setting up animations
          if (mapInstance && !mapInstance._removed) {
            // Set up animation controls
            setupAnimationControls(mapInstance);
            console.log("Map loaded, animation controls set up");
          }
        }
      }
    );

    if (mapInstance) {
      map.current = mapInstance;
    } else {
      console.error("Failed to create map instance");
    }
  };

  // Initialize map when the token is available
  useEffect(() => {
    if (mapboxToken) {
      console.log("Token available, initializing map");
      initializeMap(mapboxToken);
    } else if (fetchAttempted && !isLoading) {
      console.log("Token fetch attempted but no token available");
      setMapError("No valid Mapbox token available. Please provide a valid token.");
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      safelyRemoveMap();
    };
  }, [mapboxToken, hotspots, fetchAttempted, isLoading]);

  // Function to handle manual token update
  const handleUpdateToken = (token: string) => {
    if (updateToken(token)) {
      console.log("Token updated, initializing map");
      initializeMap(token);
      return true;
    }
    return false;
  };

  return { 
    mapContainer, 
    mapLoaded, 
    mapError, 
    isLoading,
    updateMapboxToken: handleUpdateToken 
  };
}
