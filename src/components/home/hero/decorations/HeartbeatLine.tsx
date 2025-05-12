
import { motion } from "framer-motion";
import React from "react";

export function HeartbeatLine() {
  return (
    <div className="absolute bottom-1/3 right-1/4 w-40 lg:block">
      <svg width="100%" height="40" viewBox="0 0 200 40">
        <motion.path
          d="M0,20 L20,20 L40,20 L50,0 L60,40 L70,20 L80,20 L100,20 L110,20 L120,0 L130,40 L140,20 L160,20 L180,20 L200,20"
          fill="none"
          stroke="rgba(0, 129, 74, 0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0, 1, 1, 0],
            x: [-100, 100],
          }}
          transition={{ 
            duration: 3, 
            times: [0, 0.4, 0.7, 1],
            repeat: Infinity, 
            repeatDelay: 1
          }}
        />
      </svg>
    </div>
  );
}
