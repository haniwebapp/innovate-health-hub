
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, User, Settings, Bell, BookOpen, DollarSign, VoteIcon, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface DashboardWelcomeProps {
  user: any;
}

export default function DashboardWelcome({ user }: DashboardWelcomeProps) {
  const [greeting, setGreeting] = useState("");
  const [quickActions, setQuickActions] = useState<{ icon: any; label: string; path: string; variant: "default" | "outline" | "ghost" }[]>([]);
  
  // Get user's first name or username for personalized greeting
  const firstName = user?.user_metadata?.firstName || user?.email?.split('@')[0] || 'User';
  
  useEffect(() => {
    // Determine greeting based on time of day
    const hours = new Date().getHours();
    let timeGreeting = "Good evening";
    if (hours < 12) timeGreeting = "Good morning";
    else if (hours < 18) timeGreeting = "Good afternoon";
    setGreeting(timeGreeting);
    
    // Determine quick actions based on user status and activity
    // This is a mock implementation - in a real app, this would be based on user data
    const defaultActions = [
      { 
        icon: FileUp, 
        label: "Submit Innovation", 
        path: "/innovations/submit",
        variant: "default" as const
      },
      { 
        icon: User, 
        label: "My Profile", 
        path: "/dashboard/profile",
        variant: "outline" as const
      },
      { 
        icon: Settings, 
        label: "Settings", 
        path: "/dashboard/settings",
        variant: "ghost" as const
      }
    ];
    
    // Add more context-aware actions based on user type
    if (user?.user_metadata?.userType === 'Innovator') {
      defaultActions.push({
        icon: DollarSign,
        label: "Investment Hub",
        path: "/dashboard/investment",
        variant: "outline" as const
      });
    } else if (user?.user_metadata?.userType === 'Investor') {
      defaultActions.push({
        icon: ListChecks,
        label: "Review Innovations",
        path: "/dashboard/innovations",
        variant: "outline" as const
      });
    }
    
    setQuickActions(defaultActions);
  }, [user]);
  
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
    <Card className="border-moh-green/20 bg-gradient-to-br from-white to-moh-green/5">
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
          {quickActions.map((action, index) => (
            <motion.div variants={item} key={action.label}>
              <Button variant={action.variant} asChild>
                <Link to={action.path} className="flex items-center gap-2">
                  <action.icon size={16} />
                  {action.label}
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-6 flex items-center text-sm text-muted-foreground"
          variants={container}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
        >
          <motion.div variants={item} className="flex items-center mr-4">
            <Bell className="h-4 w-4 mr-1" />
            <span>3 new notifications</span>
          </motion.div>
          <motion.div variants={item} className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>New resources available</span>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
