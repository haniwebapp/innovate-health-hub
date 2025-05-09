
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
            transition: { delay: index * 0.2 + 1.2, duration: 0.5 }
          } : {}}
        >
          <motion.div
            className="text-2xl md:text-3xl font-bold text-moh-green"
            animate={isVisible ? {
              scale: [1, 1.2, 1],
              transition: { delay: 1.5 + index * 0.2, duration: 0.8, repeat: 2, repeatType: "reverse" }
            } : {}}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isVisible ? { 
                opacity: 1,
                transition: { delay: 1.5 + index * 0.2, duration: 0.5 }
              } : {}}
            >
              {stat.value}
            </motion.span>
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
          
          {/* Add subtle animation line */}
          <motion.div
            className="mt-2 h-1 rounded-full bg-gradient-to-r from-moh-lightGreen via-moh-green to-moh-lightGreen"
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
