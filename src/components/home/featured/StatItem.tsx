
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

interface StatProps {
  value: number;
  label: string;
  suffix: string;
  index: number;
  inView: boolean;
}

export const StatItem: React.FC<StatProps> = ({ value, label, suffix, index, inView }) => {
  return (
    <ScrollFadeIn key={index} delay={0.2 * index} className="text-center group">
      <motion.div 
        className="relative flex items-center justify-center" 
        animate={inView ? {
          scale: [1, 1.1, 1],
          transition: {
            delay: 1 + index * 0.2,
            duration: 0.6,
            repeat: 2,
            repeatType: "reverse"
          }
        } : {}}
      >
        {/* Circular progress indicator */}
        <svg className="w-24 h-24 absolute" viewBox="0 0 100 100">
          <motion.circle cx="50" cy="50" r="40" fill="none" strokeWidth="3" stroke="#E5F8EF" className="absolute" />
          <motion.circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            strokeWidth="3" 
            stroke="#00814A" 
            strokeLinecap="round" 
            initial={{ pathLength: 0 }}
            animate={inView ? {
              pathLength: value / 100
            } : {}} 
            transition={{
              duration: 2,
              delay: 0.5 + index * 0.2
            }} 
            style={{
              pathLength: value / 100,
              rotate: "-90deg",
              transformOrigin: "center"
            }} 
          />
        </svg>
        
        {/* Value */}
        <div className="text-3xl font-bold text-moh-green">
          <AnimatedCounter 
            value={value} 
            suffix={suffix} 
            duration={2} 
            delay={0.5 + index * 0.2} 
          />
        </div>
      </motion.div>
      <p className="text-gray-600 mt-2 py-[17px]">{label}</p>
      
      {/* Animated particle burst on hover */}
      <motion.div 
        className="absolute inset-0 pointer-events-none" 
        initial="hidden" 
        whileHover="visible" 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute w-2 h-2 rounded-full bg-moh-green/50" 
            variants={{
              hidden: {
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0
              },
              visible: {
                x: (i % 2 ? 1 : -1) * (20 + i * 5),
                y: (i % 3 === 0 ? 1 : -1) * (15 + i * 5),
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                transition: {
                  duration: 1 + i * 0.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeOut"
                }
              }
            }} 
            style={{
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%"
            }} 
          />
        ))}
      </motion.div>
    </ScrollFadeIn>
  );
};

// Import the ScrollFadeIn component at the top
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
