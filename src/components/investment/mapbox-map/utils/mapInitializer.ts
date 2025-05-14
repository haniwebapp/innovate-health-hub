
import mapboxgl from 'mapbox-gl';
import { isValidMapboxToken } from '../config';

/**
 * Initializes a mapbox map instance with the globe projection
 */
export function initializeMapboxGlobe(
  container: HTMLDivElement, 
  token: string,
  options: {
    onLoad?: (map: mapboxgl.Map) => void,
    onError?: (error: any) => void,
    onStyleLoad?: (map: mapboxgl.Map) => void
  } = {}
): mapboxgl.Map | null {
  const { onLoad, onError, onStyleLoad } = options;
  
  // Don't try to initialize if we don't have a valid public token
  if (!isValidMapboxToken(token)) {
    if (onError) {
      onError("Invalid Mapbox token format. Must be a public token (pk.)");
    }
    return null;
  }

  try {
    // Initialize Mapbox
    mapboxgl.accessToken = token;
    
    // Create the map instance
    const map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: { name: 'globe' } as mapboxgl.ProjectionSpecification,
      zoom: 1.5,
      center: [30, 25],
      bearing: 0,
      pitch: 45,
    });

    // Add navigation controls
    map.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Handle map load errors
    map.on('error', (e) => {
      console.error('Mapbox error:', e);
      if (onError) {
        onError(`Error loading map: ${e.error?.message || 'Unknown error'}`);
      }
    });

    // Add globe effects
    map.on('style.load', () => {
      // Add atmosphere and fog effects for a more realistic globe
      map.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });

      if (onStyleLoad) {
        onStyleLoad(map);
      }
    });

    if (onLoad) {
      onLoad(map);
    }

    return map;
  } catch (error) {
    console.error('Error initializing map:', error);
    if (onError) {
      onError(`Failed to initialize map: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    return null;
  }
}
