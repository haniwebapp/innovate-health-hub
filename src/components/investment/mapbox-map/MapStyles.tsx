
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
      `}
    </style>
  );
}
