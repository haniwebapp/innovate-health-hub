
import React from 'react';

export function MapStyles() {
  return (
    <style>
      {`
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

        .mapboxgl-canvas-container {
          height: 100%;
          width: 100%;
          position: absolute;
        }

        .mapboxgl-ctrl-attrib-inner {
          font-size: 10px;
        }

        /* Error styling */
        .mapbox-gl-error {
          padding: 6px 12px;
          background: rgba(255, 0, 0, 0.1);
          color: #721c24;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
          font-size: 12px;
          margin-bottom: 8px;
        }
      `}
    </style>
  );
}
