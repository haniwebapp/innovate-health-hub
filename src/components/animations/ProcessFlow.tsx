
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DataParticle } from "../home/healthcare/DataParticle";

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  completionRate?: number; // New: progress/completion percentage
  timeMetric?: number; // New: time metric in seconds or normalized value
}

interface ProcessFlowProps {
  steps: ProcessStep[];
  className?: string;
  flowSpeed?: 'slow' | 'medium' | 'fast'; // New: control flow speed based on data
  isActive?: boolean; // New: indicates if process is currently active
}

export function ProcessFlow({ 
  steps, 
  className = "",
  flowSpeed = 'medium',
  isActive = true
}: ProcessFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  // Calculate speed factor based on flowSpeed parameter
  const speedFactor = {
    'slow': 1.5,
    'medium': 1,
    'fast': 0.6
  }[flowSpeed];
  
  // Get completion status color based on completionRate
  const getCompletionColor = (completionRate: number | undefined) => {
    if (completionRate === undefined) return "bg-moh-lightGreen";
    if (completionRate >= 80) return "bg-moh-green";
    if (completionRate >= 50) return "bg-moh-lightGold";
    return "bg-gray-300";
  };
  
  // Calculate particle count based on activity status and data flow
  const particleCount = isActive ? 
    Math.min(8, Math.max(3, steps.reduce((acc, step) => 
      acc + (step.timeMetric && step.timeMetric < 10 ? 1 : 0), 3))) : 3;
  
  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Steps */}
      <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            className="flex flex-col items-center text-center p-4 md:w-1/5"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.6 * speedFactor, 
              delay: 0.2 + index * 0.2 * speedFactor,
              ease: [0.215, 0.61, 0.355, 1] 
            }}
          >
            {/* Animated Icon Container with completion indicator */}
            <div className="relative">
              <motion.div 
                className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-4"
                animate={inView ? {
                  boxShadow: [
                    "0 4px 6px rgba(0,0,0,0.1)",
                    "0 4px 12px rgba(0,129,74,0.2)",
                    "0 4px 6px rgba(0,0,0,0.1)"
                  ],
                  scale: [1, step.completionRate && step.completionRate > 70 ? 1.08 : 1.05, 1],
                } : {}}
                transition={{ 
                  duration: step.timeMetric ? Math.min(3, step.timeMetric / 5) : 2, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  delay: index * 0.2 * speedFactor
                }}
              >
                {step.icon}
              </motion.div>
              
              {/* Completion indicator ring */}
              {step.completionRate !== undefined && (
                <svg className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 -z-10" viewBox="0 0 100 100">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(229, 248, 239, 0.5)"
                    strokeWidth="4"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke={step.completionRate >= 80 ? "#00814A" : 
                           step.completionRate >= 50 ? "#C3A86B" : "#9CA3AF"}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: step.completionRate / 100 } : { pathLength: 0 }}
                    transition={{ 
                      duration: 1.5 * speedFactor, 
                      delay: 0.5 + index * 0.2,
                      ease: "easeOut"
                    }}
                    style={{ 
                      rotate: "-90deg",
                      transformOrigin: "center"
                    }}
                  />
                </svg>
              )}
            </div>
            
            <h4 className="text-lg font-semibold text-moh-darkGreen mb-2">{step.title}</h4>
            <p className="text-sm text-gray-600">{step.description}</p>
            
            {/* Display completion rate if available */}
            {step.completionRate !== undefined && (
              <motion.div 
                className="mt-2 text-xs font-medium"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                style={{ 
                  color: step.completionRate >= 80 ? "#00814A" : 
                         step.completionRate >= 50 ? "#C3A86B" : "#6B7280" 
                }}
              >
                {step.completionRate}% Complete
                {step.timeMetric && (
                  <span className="ml-1">
                    • {step.timeMetric < 60 ? `${step.timeMetric}s` : `${Math.round(step.timeMetric/60)}m`}
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Connecting line with completion indicator */}
      <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0">
        <motion.div 
          className="h-full bg-moh-lightGreen"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 * speedFactor, delay: 0.5 }}
        />
      </div>
      
      {/* Animated particles along the flow - data-driven quantity and speed */}
      {inView && isActive && Array.from({ length: particleCount }).map((_, index) => (
        <DataParticle 
          key={index} 
          index={index} 
          isVisible={true} 
          speed={flowSpeed === 'fast' ? 'fast' : flowSpeed === 'slow' ? 'slow' : 'normal'}
        />
      ))}
    </div>
  );
}
