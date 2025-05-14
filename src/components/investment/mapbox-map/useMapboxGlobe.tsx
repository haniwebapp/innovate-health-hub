
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { InvestmentHotspot } from './types';
import { getMapboxToken, isValidMapboxToken } from './config';
import { useToast } from '@/hooks/use-toast';

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
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Fetch the token on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getMapboxToken();
        if (token && isValidMapboxToken(token)) {
          setMapboxToken(token);
        } else {
          setMapError("No valid Mapbox token available. Please provide a valid token.");
        }
      } catch (error) {
        console.error("Error fetching Mapbox token:", error);
        setMapError("Failed to fetch Mapbox token. Please try again later or provide your own token.");
      }
    };
    
    fetchToken();
  }, []);

  const updateMapboxToken = (token: string) => {
    if (isValidMapboxToken(token)) {
      localStorage.setItem('mapbox_token', token);
      setMapboxToken(token);
      setMapError(null);
      
      // Reinitialize map with new token
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      initializeMap(token);
      
      toast({
        title: "Token updated",
        description: "Your Mapbox token has been updated successfully.",
        variant: "success",
      });
    } else {
      setMapError("Invalid Mapbox token format. Token should start with 'pk.' (public) or 'sk.' (secret).");
      
      toast({
        title: "Invalid token",
        description: "Please provide a valid Mapbox token that starts with 'pk.' or 'sk.'",
        variant: "destructive",
      });
    }
  };

  const addHotspotMarkers = () => {
    if (!map.current) return;

    // Clear any existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Create a popup but don't add it to the map until needed
    popupRef.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 25,
      className: 'investment-popup'
    });

    // Add markers for each hotspot
    hotspots.forEach((hotspot) => {
      // Create custom marker element
      const markerSize = {
        'sm': 10,
        'md': 14,
        'lg': 18
      }[hotspot.size] || 14;
      
      const el = document.createElement('div');
      el.className = 'investment-marker';
      el.style.width = `${markerSize}px`;
      el.style.height = `${markerSize}px`;
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#00814A';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 10px rgba(0, 129, 74, 0.5)';
      el.style.cursor = 'pointer';
      
      // Add pulse effect
      const pulse = document.createElement('div');
      pulse.className = 'investment-marker-pulse';
      pulse.style.position = 'absolute';
      pulse.style.width = `${markerSize * 2}px`;
      pulse.style.height = `${markerSize * 2}px`;
      pulse.style.borderRadius = '50%';
      pulse.style.backgroundColor = 'rgba(0, 129, 74, 0.25)';
      pulse.style.animation = 'pulse 1.5s infinite';
      pulse.style.top = `${-markerSize / 2}px`;
      pulse.style.left = `${-markerSize / 2}px`;
      el.appendChild(pulse);

      // Create the actual mapbox marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(hotspot.coordinates)
        .addTo(map.current!);

      // Add hover and click events
      el.addEventListener('mouseenter', () => {
        if (!popupRef.current || !map.current) return;

        popupRef.current
          .setLngLat(hotspot.coordinates)
          .setHTML(`
            <div class="font-medium text-sm">${hotspot.city}, ${hotspot.country}</div>
            <div class="text-sm font-bold text-moh-green">${hotspot.amount}</div>
          `)
          .addTo(map.current);
        
        el.style.transform = 'scale(1.2)';
        el.style.transition = 'transform 0.2s ease-in-out';
      });

      el.addEventListener('mouseleave', () => {
        if (popupRef.current) {
          popupRef.current.remove();
        }
        el.style.transform = 'scale(1)';
      });

      el.addEventListener('click', () => {
        if (!map.current) return;
        map.current.flyTo({
          center: hotspot.coordinates,
          zoom: 5,
          duration: 1000
        });
      });

      markersRef.current.push(marker);
    });
  };

  const initializeMap = (token: string | null) => {
    if (!mapContainer.current || !token) return;
    
    // Don't try to initialize if we don't have a valid token
    if (!isValidMapboxToken(token)) {
      setMapError("Invalid Mapbox token. Please provide a valid token.");
      return;
    }

    try {
      // Initialize Mapbox
      mapboxgl.accessToken = token;
      
      // Create the map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: { name: 'globe' } as mapboxgl.ProjectionSpecification,
        zoom: 1.5,
        center: [30, 25],
        bearing: 0,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Handle map load errors
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError(`Error loading map: ${e.error?.message || 'Unknown error'}`);
      });

      // Add globe effects
      map.current.on('style.load', () => {
        if (!map.current) return;
        
        // Add atmosphere and fog effects for a more realistic globe
        map.current.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });

        // Add markers for investment hotspots after the map style loads
        addHotspotMarkers();
        
        setMapLoaded(true);
        setMapError(null);
      });

      // Globe rotation settings
      const secondsPerRevolution = 240;
      const maxSpinZoom = 3;
      const slowSpinZoom = 2;
      let userInteracting = false;
      let spinEnabled = true;

      // Function to make the globe spin automatically
      function spinGlobe() {
        if (!map.current) return;
        
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond;
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      // Control interaction states
      map.current.on('mousedown', () => {
        userInteracting = true;
      });
      
      map.current.on('dragstart', () => {
        userInteracting = true;
      });
      
      map.current.on('mouseup', () => {
        userInteracting = false;
        setTimeout(() => {
          spinGlobe();
        }, 1000);
      });
      
      map.current.on('touchend', () => {
        userInteracting = false;
        setTimeout(() => {
          spinGlobe();
        }, 1000);
      });

      map.current.on('moveend', () => {
        spinGlobe();
      });

      // Start the globe spinning
      spinGlobe();
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Initialize map when the token is available
  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }

    // Cleanup on unmount
    return () => {
      // Clear all markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      // Close any open popup
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
      
      // Remove the map
      map.current?.remove();
    };
  }, [mapboxToken, hotspots]);

  return { mapContainer, mapLoaded, mapError, updateMapboxToken };
}
