
import React from 'react';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardActions } from '@/components/dashboard/DashboardActions';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';
import { RecommendedResources } from '@/components/dashboard/RecommendedResources';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <DashboardHero />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <DashboardStats />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <DashboardActions />
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <RecentActivities />
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-6">
          <UpcomingEvents />
          <RecommendedResources />
        </motion.div>
      </div>
    </motion.div>
  );
}
