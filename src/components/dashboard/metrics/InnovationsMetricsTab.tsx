
import { motion } from "framer-motion";
import { Award, Eye, Users, Target } from "lucide-react";
import { MetricItem } from "./MetricItem";

type InnovationsMetricsProps = {
  innovationMetrics: {
    count: number;
    views: number;
    engagement: number;
    rating: number;
    trend: number;
  };
};

export function InnovationsMetricsTab({ innovationMetrics }: InnovationsMetricsProps) {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <MetricItem 
            icon={<Award className="h-4 w-4 text-moh-green" />}
            value={innovationMetrics.count}
            label="Total Innovations"
          />
        </motion.div>
        <motion.div variants={item}>
          <MetricItem 
            icon={<Eye className="h-4 w-4 text-moh-green" />}
            value={innovationMetrics.views}
            label="Total Views"
            trend={innovationMetrics.trend}
          />
        </motion.div>
        <motion.div variants={item}>
          <MetricItem 
            icon={<Users className="h-4 w-4 text-moh-green" />}
            value={innovationMetrics.engagement}
            label="Engagements"
            trend={5}
          />
        </motion.div>
        <motion.div variants={item}>
          <MetricItem 
            icon={<Target className="h-4 w-4 text-moh-gold" />}
            value={innovationMetrics.rating.toFixed(1)}
            label="Average Rating"
          />
        </motion.div>
      </motion.div>
      
      <div className="pt-2 border-t border-moh-green/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Innovation Growth</span>
          <span className="text-sm font-medium text-moh-green">+27% this month</span>
        </div>
        <div className="w-full h-2 bg-moh-lightGreen rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-moh-green to-moh-gold"
            initial={{ width: 0 }}
            animate={{ width: '78%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </>
  );
}
