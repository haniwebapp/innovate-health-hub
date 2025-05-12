
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import DashboardActivity from "@/components/dashboard/DashboardActivity";
import DashboardSuggestions from "@/components/dashboard/DashboardSuggestions";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import DashboardChallenges from "@/components/dashboard/DashboardChallenges";
import DashboardInnovations from "@/components/dashboard/DashboardInnovations";
import PromotedFeatures from "@/components/dashboard/features/PromotedFeatures";
import QuickLinksSection from "@/components/dashboard/features/QuickLinksSection";
import ActivitySection from "@/components/dashboard/features/ActivitySection";

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <DashboardWelcome user={user} />
      
      {/* Prominently featured action cards */}
      <PromotedFeatures />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <DashboardChallenges />
        </motion.div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DashboardInnovations />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DashboardMetrics />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          className="md:col-span-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <DashboardActivity />
        </motion.div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <DashboardSuggestions />
        </motion.div>
      </div>
      
      <QuickLinksSection />
      
      <ActivitySection />
    </div>
  );
}
