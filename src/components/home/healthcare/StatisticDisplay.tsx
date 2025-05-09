
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

interface Statistic {
  label: string;
  value: string;
  previousValue?: string; // For showing growth/decline
  importance?: 'low' | 'medium' | 'high';
  trend?: 'up' | 'down' | 'stable';
}

interface StatisticDisplayProps {
  statistics: Statistic[];
  isVisible: boolean;
}

export function StatisticDisplay({ statistics, isVisible }: StatisticDisplayProps) {
  // Calculate if a stat is showing improvement
  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    if (!trend || trend === 'stable') return "bg-gray-400";
    return trend === 'up' ? "bg-green-500" : "bg-amber-500";
  };
  
  // Get animation duration based on statistical significance
  const getAnimationDelay = (stat: Statistic, index: number) => {
    // Important stats appear first
    if (stat.importance === 'high') return index * 0.1 + 0.8;
    if (stat.importance === 'low') return index * 0.1 + 1.5;
    return index * 0.2 + 1.2; // Default for medium importance
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="flex flex-wrap justify-center gap-4 md:gap-8"
    >
      {statistics.map((stat, index) => (
        <motion.div 
          key={index}
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
          className="bg-white px-6 py-4 rounded-lg shadow-md text-center min-w-[120px]"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: getAnimationDelay(stat, index), duration: 0.5 }
          } : {}}
        >
          <motion.div
            className="text-2xl md:text-3xl font-bold text-moh-green"
            animate={isVisible ? {
              scale: [1, parseFloat(stat.value) > 80 ? 1.3 : 1.2, 1],
              transition: { 
                delay: 1.5 + index * 0.2, 
                duration: 0.8, 
                repeat: parseFloat(stat.value) > 90 ? 3 : 2, 
                repeatType: "reverse" 
              }
            } : {}}
          >
            <AnimatedCounter
              value={parseInt(stat.value.replace(/\D/g, ''))}
              suffix={stat.value.replace(/\d/g, '')}
              duration={3}
              delay={1.5 + index * 0.2}
              scaleDuration={true}
              importance={stat.importance}
            />
          </motion.div>
          <motion.p 
            className="text-sm text-gray-600 mt-1"
            initial={{ opacity: 0 }}
            animate={isVisible ? { 
              opacity: 1,
              transition: { delay: 1.7 + index * 0.2, duration: 0.5 }
            } : {}}
          >
            {stat.label}
          </motion.p>
          
          {/* Show trend indicator if previous value exists */}
          {stat.previousValue && (
            <motion.div 
              className="flex items-center justify-center mt-1 text-xs"
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 2 + index * 0.2, duration: 0.4 }}
            >
              <div className={`px-1.5 py-0.5 rounded-sm text-white ${getTrendColor(stat.trend)}`}>
                {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '–'}
                &nbsp;
                {Math.abs(parseFloat(stat.value) - parseFloat(stat.previousValue)).toFixed(1)}%
              </div>
            </motion.div>
          )}
          
          {/* Add subtle animation line with data-driven colors */}
          <motion.div
            className={`mt-2 h-1 rounded-full bg-gradient-to-r ${
              stat.trend === 'up' 
                ? 'from-moh-lightGreen via-moh-green to-moh-lightGreen' 
                : stat.trend === 'down'
                ? 'from-amber-200 via-amber-400 to-amber-200'
                : 'from-moh-lightGold via-moh-gold to-moh-lightGold'
            }`}
            initial={{ width: 0 }}
            animate={isVisible ? { 
              width: "100%",
              transition: { delay: 1.9 + index * 0.2, duration: 0.6 }
            } : { width: 0 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
