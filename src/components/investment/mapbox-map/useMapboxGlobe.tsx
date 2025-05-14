
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { InvestmentHotspot } from './types';
import { MAPBOX_TOKEN } from './config';

interface UseMapboxGlobeProps {
  hotspots: InvestmentHotspot[];
}

export function useMapboxGlobe({ hotspots }: UseMapboxGlobeProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

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

  // Initialize map when the component mounts
  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
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
  }, [hotspots]);

  return { mapContainer, mapLoaded };
}
