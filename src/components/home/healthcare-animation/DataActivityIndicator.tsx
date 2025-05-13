
import { motion } from "framer-motion";

interface DataActivityIndicatorProps {
  activityLevel: number;
  isVisible: boolean;
}

export const DataActivityIndicator = ({ activityLevel, isVisible }: DataActivityIndicatorProps) => {
  return (
    <div className="mt-8 flex justify-center">
      <motion.div 
        className="flex gap-2 items-center text-xs text-gray-500 bg-white/80 px-3 py-1 rounded-full shadow-sm"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <span>Data Activity</span>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-1.5 h-3 rounded-full ${
              i < Math.ceil(activityLevel / 20) ? 'bg-moh-green' : 'bg-gray-200'
            }`}
            animate={
              i < Math.ceil(activityLevel / 20) ? {
                scaleY: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              } : {}
            }
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
