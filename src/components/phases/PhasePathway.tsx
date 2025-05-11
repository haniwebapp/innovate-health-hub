
import React from 'react';
import { motion } from 'framer-motion';

interface PathwayProps {
  inView: boolean;
  accentColor?: string;
}

export function PhasePathway({ inView, accentColor = "bg-moh-lightGreen" }: PathwayProps) {
  return (
    <div className="absolute hidden lg:block">
      {/* Horizontal connecting line */}
      <div className="absolute top-20 left-0 w-full h-0.5 bg-gray-100">
        <motion.div
          className={`h-full ${accentColor}`}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Connection nodes */}
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={`absolute top-20 w-4 h-4 rounded-full bg-white border-2 border-moh-lightGreen`}
          style={{ 
            left: `${index * 25 + 10}%`,
            marginLeft: "-8px",
            marginTop: "-8px"
          }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ 
            delay: 0.8 + index * 0.2,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        />
      ))}

      {/* Moving particle along the path */}
      {inView && (
        <motion.div
          className={`absolute top-20 w-3 h-3 rounded-full bg-moh-green shadow-md shadow-moh-green/30`}
          style={{ 
            marginTop: "-6px",
            marginLeft: "-6px"
          }}
          animate={{ 
            left: ["10%", "85%", "10%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 15,
            times: [0, 0.4, 0.6, 1],
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}
