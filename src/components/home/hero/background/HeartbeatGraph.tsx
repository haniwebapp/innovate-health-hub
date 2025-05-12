
import { motion } from "framer-motion";
import React from "react";

export function HeartbeatGraph() {
  // Animated medical models (DNA, cells, heartbeat)
  const models = [
    {
      id: 'heartbeat',
      x: 75,
      y: 65,
      points: [0, 0, 10, -20, 20, 0, 30, 40, 40, 0, 50, -10, 60, 0]
    }
  ];

  return (
    <>
      {/* Heartbeat Line Animation */}
      {models.map((model) => 
        model.id === 'heartbeat' && (
          <div 
            key={model.id}
            className="absolute" 
            style={{ left: `${model.x}%`, top: `${model.y}%` }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60">
              <motion.path
                d="M0,30 L10,30 L20,10 L30,50 L40,30 L50,20 L60,30"
                fill="none"
                stroke="rgba(0, 129, 74, 0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: 1
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </div>
        )
      )}
    </>
  );
}
