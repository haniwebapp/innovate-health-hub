
import { motion } from "framer-motion";
import React from "react";

export function MicroscopeView() {
  return (
    <div className="absolute left-[60%] top-[20%]">
      <motion.div
        className="w-32 h-32 rounded-full border-4 border-moh-green/30 overflow-hidden"
        animate={{ scale: [1, 1.05, 1], borderColor: ['rgba(0,129,74,0.3)', 'rgba(0,129,74,0.5)', 'rgba(0,129,74,0.3)'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-full h-full bg-gradient-to-br from-moh-lightGreen/10 to-transparent relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Cell structures */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`cell-${i}`}
              className="absolute rounded-full bg-moh-green/40"
              style={{
                width: 10 + (i * 3),
                height: 10 + (i * 3),
                left: 40 + (i * 6) * Math.cos(i),
                top: 40 + (i * 6) * Math.sin(i),
              }}
              animate={{ 
                x: [0, Math.sin(i) * 10],
                y: [0, Math.cos(i) * 10],
                scale: [1, 1.2, 0.9, 1],
              }}
              transition={{ 
                duration: 3 + i,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
