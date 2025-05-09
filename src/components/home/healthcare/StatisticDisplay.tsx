
import { motion } from "framer-motion";

interface Statistic {
  label: string;
  value: string;
}

interface StatisticDisplayProps {
  statistics: Statistic[];
  isVisible: boolean;
}

export function StatisticDisplay({ statistics, isVisible }: StatisticDisplayProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="flex justify-center space-x-8 md:space-x-16"
    >
      {statistics.map((stat, index) => (
        <motion.div 
          key={index}
          whileHover={{ scale: 1.05 }}
          className="text-center"
        >
          <motion.p 
            className="text-2xl md:text-3xl font-bold text-moh-green"
            animate={isVisible ? {
              scale: [1, 1.2, 1],
              transition: { delay: 1.2 + index * 0.2, duration: 0.8, repeat: 2, repeatType: "reverse" }
            } : {}}
          >
            {stat.value}
          </motion.p>
          <p className="text-sm text-gray-600">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
