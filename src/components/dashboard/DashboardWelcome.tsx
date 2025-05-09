
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardWelcomeProps {
  user: any;
}

export default function DashboardWelcome({ user }: DashboardWelcomeProps) {
  // Get user's first name or username for personalized greeting
  const firstName = user?.user_metadata?.firstName || user?.email?.split('@')[0] || 'User';
  
  // Determine greeting based on time of day
  const hours = new Date().getHours();
  let greeting = "Good evening";
  if (hours < 12) greeting = "Good morning";
  else if (hours < 18) greeting = "Good afternoon";
  
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <Card className="border-moh-green/20">
      <CardHeader className="pb-2">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <CardTitle className="text-2xl font-bold text-moh-darkGreen">
              {greeting}, {firstName}!
            </CardTitle>
          </motion.div>
          <motion.div variants={item}>
            <CardDescription className="text-base">
              Welcome to your Ministry of Health innovation portal dashboard
            </CardDescription>
          </motion.div>
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="flex flex-wrap gap-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Button asChild>
              <Link to="/innovations/submit" className="flex items-center gap-2">
                <FileUp size={16} />
                Submit Innovation
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={item}>
            <Button variant="outline" asChild>
              <Link to="/dashboard/profile" className="flex items-center gap-2">
                <User size={16} />
                My Profile
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={item}>
            <Button variant="ghost" asChild>
              <Link to="/dashboard/settings" className="flex items-center gap-2">
                <Settings size={16} />
                Settings
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
