
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Layers, FileText, TrendingUp } from "lucide-react";

interface AdminStatCardsProps {
  userCount: number;
}

export function AdminStatCards({ userCount }: AdminStatCardsProps) {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
    >
      <motion.div variants={itemVariants}>
        <Card className="border-l-4 border-l-moh-green hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold">{userCount}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">↑ 12%</span> from last month
                </p>
              </div>
              <div className="bg-moh-green/10 p-3 rounded-full">
                <Users className="h-5 w-5 text-moh-green" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Challenges</p>
                <h3 className="text-2xl font-bold">5</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-amber-500">2</span> ending soon
                </p>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-full">
                <Layers className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Submissions</p>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">↑ 24%</span> this week
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-full">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Status</p>
                <h3 className="text-2xl font-bold">Healthy</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  All systems operational
                </p>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-full">
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
