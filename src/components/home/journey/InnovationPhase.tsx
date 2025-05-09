
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PhaseProps {
  phase: {
    id: string;
    icon: React.ReactNode;
    name: string;
    description: string;
    completionPercent: number;
    isActive: boolean;
    milestones: string[];
  };
  index: number;
  inView: boolean;
  total: number;
}

export function InnovationPhase({ phase, index, inView, total }: PhaseProps) {
  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1]
      }
    })
  };

  // Determine card styles based on completion and active state
  const getCardClasses = () => {
    if (phase.isActive) return "border-moh-green/70 shadow-lg shadow-moh-green/10 ring-1 ring-moh-green/20";
    if (phase.completionPercent === 100) return "border-moh-gold/70 shadow-md shadow-moh-gold/10";
    if (phase.completionPercent > 0) return "border-moh-lightGreen/70";
    return "border-gray-200";
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col"
    >
      <Card 
        className={`h-full flex flex-col relative overflow-hidden ${getCardClasses()}`}
      >
        {/* Completion indicator */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-moh-lightGreen to-moh-green transition-all duration-1000 ease-out"
          style={{ 
            width: `${phase.completionPercent}%`,
            opacity: phase.completionPercent > 0 ? 1 : 0.3
          }}
        />
        
        {/* Active indicator */}
        {phase.isActive && (
          <div className="absolute top-3 right-3">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute h-full w-full rounded-full bg-moh-green opacity-75"></span>
              <span className="relative rounded-full h-3 w-3 bg-moh-green"></span>
            </span>
          </div>
        )}
        
        <CardContent className="p-5 flex flex-col h-full">
          {/* Phase header */}
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              phase.isActive 
                ? "bg-moh-green text-white" 
                : phase.completionPercent === 100 
                  ? "bg-moh-gold/20 text-moh-gold" 
                  : "bg-moh-lightGreen/20 text-moh-darkGreen"
            }`}>
              {phase.completionPercent === 100 ? (
                <Check className="w-5 h-5" />
              ) : (
                phase.icon
              )}
            </div>
            <h3 className="text-lg font-semibold text-moh-darkGreen">{phase.name}</h3>
          </div>
          
          {/* Phase description */}
          <p className="text-sm text-gray-600 mb-4">{phase.description}</p>
          
          {/* Completion percentage */}
          {phase.completionPercent > 0 && (
            <div className="mt-auto">
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className={phase.completionPercent === 100 ? "text-moh-gold" : "text-moh-green"}>
                  {phase.completionPercent}% Complete
                </span>
                {phase.isActive && <span className="text-moh-green">In Progress</span>}
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    phase.completionPercent === 100 
                      ? "bg-moh-gold" 
                      : "bg-moh-green"
                  }`}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${phase.completionPercent}%` } : { width: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {/* Key milestones */}
          <div className="mt-4 space-y-2">
            <h4 className="text-xs font-medium uppercase text-gray-500">Key Milestones</h4>
            <ul className="space-y-1">
              {phase.milestones.map((milestone, idx) => (
                <li 
                  key={idx} 
                  className={`text-xs flex items-center ${
                    phase.completionPercent === 100 || 
                    (phase.completionPercent > 0 && idx < Math.ceil(phase.completionPercent / 25)) 
                      ? "text-moh-darkGreen" 
                      : "text-gray-500"
                  }`}
                >
                  <span className={`mr-1.5 w-1.5 h-1.5 rounded-full inline-block ${
                    phase.completionPercent === 100 || 
                    (phase.completionPercent > 0 && idx < Math.ceil(phase.completionPercent / 25))
                      ? "bg-moh-green" 
                      : "bg-gray-300"
                  }`}></span>
                  {milestone}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
