
import { motion } from "framer-motion";
import { ActivityCard } from "./activity/ActivityCard";
import { recentActivities } from "./activity/mockData";

export default function DashboardActivity() {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ActivityCard activities={recentActivities} />
    </motion.div>
  );
}
