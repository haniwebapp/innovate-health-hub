
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DataParticle } from "../home/healthcare/DataParticle";

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessFlow({ steps, className = "" }: ProcessFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
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
              duration: 0.6, 
              delay: 0.2 + index * 0.2,
              ease: [0.215, 0.61, 0.355, 1] 
            }}
          >
            {/* Animated Icon Container */}
            <motion.div 
              className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-4"
              animate={inView ? {
                boxShadow: [
                  "0 4px 6px rgba(0,0,0,0.1)",
                  "0 4px 12px rgba(0,129,74,0.2)",
                  "0 4px 6px rgba(0,0,0,0.1)"
                ],
                scale: [1, 1.05, 1],
              } : {}}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                delay: index * 0.2 
              }}
            >
              {step.icon}
            </motion.div>
            
            <h4 className="text-lg font-semibold text-moh-darkGreen mb-2">{step.title}</h4>
            <p className="text-sm text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Connecting line */}
      <motion.div 
        className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-moh-lightGreen z-0"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      {/* Animated particles along the flow */}
      {inView && Array.from({ length: 6 }).map((_, index) => (
        <DataParticle key={index} index={index} isVisible={true} />
      ))}
    </div>
  );
}
