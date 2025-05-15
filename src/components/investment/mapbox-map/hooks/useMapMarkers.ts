
import { useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { InvestmentHotspot } from '../types';

export function useMapMarkers() {
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  const clearMarkers = useCallback(() => {
    // Remove all existing markers from the map
    markers.current.forEach(marker => {
      try {
        marker.remove();
      } catch (e) {
        console.error("Error removing marker:", e);
      }
    });
    
    // Clear the markers array
    markers.current = [];
  }, []);
  
  const addHotspotMarkers = useCallback((map: mapboxgl.Map, hotspots: InvestmentHotspot[]) => {
    // Safety check to make sure the map is valid
    if (!map || map._removed) return;
    
    // Clear any existing markers first
    clearMarkers();
    
    // Create marker elements for each hotspot
    hotspots.forEach(hotspot => {
      try {
        // Create marker container
        const markerEl = document.createElement('div');
        markerEl.className = 'mapbox-marker';
        
        // Size classes based on hotspot size
        const sizeClass = {
          sm: 'mapbox-marker-sm',
          md: 'mapbox-marker-md',
          lg: 'mapbox-marker-lg',
        }[hotspot.size] || 'mapbox-marker-md';
        
        markerEl.classList.add(sizeClass);
        
        // Create a pulse element
        const pulseEl = document.createElement('div');
        pulseEl.className = 'mapbox-marker-pulse';
        markerEl.appendChild(pulseEl);
        
        // Create a dot element
        const dotEl = document.createElement('div');
        dotEl.className = 'mapbox-marker-dot';
        markerEl.appendChild(dotEl);
        
        // Create marker and add to map
        const marker = new mapboxgl.Marker({
          element: markerEl,
          anchor: 'center',
        })
          .setLngLat(hotspot.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                `<div class="p-2">
                  <h4 class="font-medium">${hotspot.city}, ${hotspot.country}</h4>
                  <p class="font-bold text-moh-green">${hotspot.amount}</p>
                </div>`
              )
          )
          .addTo(map);
        
        // Add to markers array for tracking
        markers.current.push(marker);
      } catch (e) {
        console.error("Error creating marker:", e);
      }
    });
  }, [clearMarkers]);
  
  return { addHotspotMarkers, clearMarkers };
}
