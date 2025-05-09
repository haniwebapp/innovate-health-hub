
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

export const StatisticsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  
  const statsData = [
    { value: 120, suffix: "+", label: "Innovations", importance: "high" as const },
    { value: 35, suffix: "+", label: "Categories", importance: "medium" as const },
    { value: 18, suffix: "M+", label: "Investment", importance: "high" as const },
  ];
  
  return (
    <motion.div 
      ref={sectionRef}
      className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="flex gap-8 mb-6 md:mb-0">
        {statsData.map((stat, index) => (
          <div key={index} className="text-center">
            <motion.div 
              className="text-3xl font-bold text-moh-darkGreen"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
            >
              <AnimatedCounter 
                value={stat.value} 
                suffix={stat.suffix} 
                duration={2} 
                delay={index * 0.3}
                importance={stat.importance}
              />
            </motion.div>
            <motion.p 
              className="text-gray-500"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              {stat.label}
            </motion.p>
          </div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button className="bg-gradient-to-r from-moh-darkGreen to-moh-green text-white hover:shadow-lg transition-all">
          View All Innovations
        </Button>
      </motion.div>
    </motion.div>
  );
};
