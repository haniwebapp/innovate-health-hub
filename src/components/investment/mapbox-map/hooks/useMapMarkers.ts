
import { useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { InvestmentHotspot } from '../types';

export function useMapMarkers() {
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    if (popupRef.current) {
      popupRef.current.remove();
    }
  };

  const createMarker = (hotspot: InvestmentHotspot, map: mapboxgl.Map): mapboxgl.Marker => {
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
      .addTo(map);

    // Create popup once if it doesn't exist
    if (!popupRef.current) {
      popupRef.current = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25,
        className: 'investment-popup'
      });
    }

    // Add hover and click events
    el.addEventListener('mouseenter', () => {
      if (!popupRef.current) return;

      popupRef.current
        .setLngLat(hotspot.coordinates)
        .setHTML(`
          <div class="font-medium text-sm">${hotspot.city}, ${hotspot.country}</div>
          <div class="text-sm font-bold text-moh-green">${hotspot.amount}</div>
        `)
        .addTo(map);
      
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
      map.flyTo({
        center: hotspot.coordinates,
        zoom: 5,
        duration: 1000
      });
    });

    return marker;
  };

  const addHotspotMarkers = (map: mapboxgl.Map, hotspots: InvestmentHotspot[]) => {
    if (!map) return;

    // Clear any existing markers
    clearMarkers();

    // Add markers for each hotspot
    hotspots.forEach((hotspot) => {
      const marker = createMarker(hotspot, map);
      markersRef.current.push(marker);
    });
  };

  return { addHotspotMarkers, clearMarkers };
}
