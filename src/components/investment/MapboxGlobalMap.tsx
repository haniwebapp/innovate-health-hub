
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';

// Mapbox token - in a real app, this should come from env variables
// For this demo, we'll use a temporary public token
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZWRldiIsImEiOiJjbHUxbHRweWIwMHgxMmptaG5ycDN1MXVjIn0.AtBYM5P-XE9zLleaSTr8-Q';

// Investment hotspot data
const investmentHotspots = [
  { city: 'Riyadh', country: 'Saudi Arabia', amount: '$120M', coordinates: [46.738586, 24.774265], size: 'lg' },
  { city: 'Dubai', country: 'UAE', amount: '$75M', coordinates: [55.270783, 25.204849], size: 'md' },
  { city: 'London', country: 'UK', amount: '$50M', coordinates: [-0.127758, 51.507351], size: 'md' },
  { city: 'New York', country: 'USA', amount: '$85M', coordinates: [-74.005974, 40.712776], size: 'md' },
  { city: 'Singapore', country: 'Singapore', amount: '$45M', coordinates: [103.819836, 1.352083], size: 'sm' },
  { city: 'Tokyo', country: 'Japan', amount: '$30M', coordinates: [139.839478, 35.652832], size: 'sm' },
];

// Region data for the bar chart
const regionData = [
  { region: 'Middle East', percentage: 45, color: '#00814A' },
  { region: 'North America', percentage: 25, color: '#C3A86B' },
  { region: 'Europe', percentage: 15, color: '#006B3E' },
  { region: 'Asia', percentage: 10, color: '#A38A56' },
  { region: 'Africa', percentage: 5, color: '#80C18E' },
];

interface MapboxGlobalMapProps {
  className?: string;
}

export function MapboxGlobalMap({ className }: MapboxGlobalMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map when the component mounts
  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    // Create the map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
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
  }, []);

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
    investmentHotspots.forEach((hotspot) => {
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

  return (
    <Card className={className}>
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
        
        <div className="relative h-[280px] w-full rounded-lg overflow-hidden">
          {/* Mapbox container */}
          <div 
            ref={mapContainer} 
            className={cn(
              "absolute inset-0 bg-slate-100 rounded-lg",
              mapLoaded ? "opacity-100" : "opacity-0"
            )}
            style={{ transition: "opacity 0.5s ease-in-out" }}
          />
          
          {/* Loading placeholder */}
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-lg">
              <div className="animate-pulse text-moh-green">Loading map...</div>
            </div>
          )}
          
          {/* Add some CSS for animations */}
          <style jsx>{`
            @keyframes pulse {
              0% {
                transform: scale(1);
                opacity: 0.8;
              }
              70% {
                transform: scale(2);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 0;
              }
            }

            .mapboxgl-popup {
              z-index: 1;
            }

            .mapboxgl-popup-content {
              background-color: white;
              border-radius: 6px;
              padding: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              border: 1px solid rgba(0, 129, 74, 0.2);
            }
          `}</style>
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
