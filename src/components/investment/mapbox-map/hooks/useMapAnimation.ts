
import { useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface UseMapAnimationOptions {
  secondsPerRevolution?: number;
  maxSpinZoom?: number;
  slowSpinZoom?: number;
}

export function useMapAnimation(options: UseMapAnimationOptions = {}) {
  const {
    secondsPerRevolution = 240,
    maxSpinZoom = 3,
    slowSpinZoom = 2
  } = options;
  
  const userInteractingRef = useRef(false);
  const spinEnabledRef = useRef(true);

  const spinGlobe = (map: mapboxgl.Map | null) => {
    if (!map) return;
    
    const zoom = map.getZoom();
    if (spinEnabledRef.current && !userInteractingRef.current && zoom < maxSpinZoom) {
      let distancePerSecond = 360 / secondsPerRevolution;
      if (zoom > slowSpinZoom) {
        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
        distancePerSecond *= zoomDif;
      }
      const center = map.getCenter();
      center.lng -= distancePerSecond;
      map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
  };

  const setupAnimationControls = (map: mapboxgl.Map) => {
    // Control interaction states
    map.on('mousedown', () => {
      userInteractingRef.current = true;
    });
    
    map.on('dragstart', () => {
      userInteractingRef.current = true;
    });
    
    map.on('mouseup', () => {
      userInteractingRef.current = false;
      setTimeout(() => {
        spinGlobe(map);
      }, 1000);
    });
    
    map.on('touchend', () => {
      userInteractingRef.current = false;
      setTimeout(() => {
        spinGlobe(map);
      }, 1000);
    });

    map.on('moveend', () => {
      spinGlobe(map);
    });

    // Start the globe spinning initially
    spinGlobe(map);
  };

  return { spinGlobe, setupAnimationControls };
}
