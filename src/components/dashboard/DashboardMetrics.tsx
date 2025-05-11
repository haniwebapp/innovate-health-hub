
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardMetricsTabs } from "./metrics/DashboardMetricsTabs";

// Mock metrics data - in a real app, this would come from an API
const mockMetrics = {
  innovations: {
    count: 3,
    views: 78,
    engagement: 23,
    rating: 4.2,
    trend: 12
  },
  challenges: {
    submitted: 2,
    inProgress: 1,
    accepted: 1,
    completed: 0,
    trend: -5
  },
  profile: {
    completeness: 85,
    matchScore: 72,
    connections: 8,
    trend: 15
  }
};

export default function DashboardMetrics() {
  return (
    <motion.div
      className="relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-moh-green/10 overflow-hidden relative">
        {/* Subtle gradient background effect */}
        <div className="absolute inset-0 bg-green-gold-gradient rounded-lg" />
        
        <CardHeader className="pb-2 relative">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium text-moh-darkGreen">Performance Dashboard</CardTitle>
              <CardDescription>Key metrics and insights</CardDescription>
            </div>
            <BarChart className="h-5 w-5 text-moh-green" />
          </div>
        </CardHeader>
        
        <CardContent className="relative">
          <DashboardMetricsTabs metrics={mockMetrics} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
