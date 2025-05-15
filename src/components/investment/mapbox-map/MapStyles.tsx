
import React from 'react';

export function MapStyles() {
  return (
    <style>
      {`
      .mapbox-marker {
        position: relative;
        cursor: pointer;
      }
      
      .mapbox-marker-dot {
        background-color: #00814A;
        border-radius: 50%;
        height: 8px;
        width: 8px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        transition: all 0.3s;
      }
      
      .mapbox-marker-pulse {
        background-color: rgba(0, 129, 74, 0.3);
        border-radius: 50%;
        height: 24px;
        width: 24px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
        animation: pulse 2s infinite;
      }
      
      .mapbox-marker-sm .mapbox-marker-dot {
        height: 6px;
        width: 6px;
      }
      
      .mapbox-marker-sm .mapbox-marker-pulse {
        height: 18px;
        width: 18px;
      }
      
      .mapbox-marker-lg .mapbox-marker-dot {
        height: 10px;
        width: 10px;
      }
      
      .mapbox-marker-lg .mapbox-marker-pulse {
        height: 30px;
        width: 30px;
      }
      
      .mapbox-marker:hover .mapbox-marker-dot {
        transform: translate(-50%, -50%) scale(1.5);
        background-color: #00a35e;
      }
      
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1.2);
          opacity: 0;
        }
      }
      
      /* Improve Mapbox popup styling */
      .mapboxgl-popup-content {
        padding: 10px;
        border-radius: 6px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border: 1px solid #00814A20;
      }
      `}
    </style>
  );
}
