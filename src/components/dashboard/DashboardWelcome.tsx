
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, User, Settings, Bell, BookOpen, DollarSign, VoteIcon, ListChecks, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GeneratedLogo from "@/components/logos/GeneratedLogo";
import { ProfileData } from "@/types/admin";

interface DashboardWelcomeProps {
  user: any;
}

export default function DashboardWelcome({ user }: DashboardWelcomeProps) {
  const [greeting, setGreeting] = useState("");
  const [quickActions, setQuickActions] = useState<{ icon: any; label: string; path: string; variant: "default" | "outline" | "ghost" }[]>([]);
  
  // Get user's first name or username for personalized greeting
  const firstName = user?.user_metadata?.firstName || 
                   user?.first_name || 
                   user?.email?.split('@')[0] || 
                   'User';
  
  // Get formatted name for logo generation
  const formattedName = user?.organization || 
                       `${firstName.charAt(0)}${user?.last_name ? user?.last_name.charAt(0) : ''}`;
  
  useEffect(() => {
    // Determine greeting based on time of day
    const hours = new Date().getHours();
    let timeGreeting = "Good evening";
    if (hours < 12) timeGreeting = "Good morning";
    else if (hours < 18) timeGreeting = "Good afternoon";
    setGreeting(timeGreeting);
    
    // Determine quick actions based on user status and activity
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
    if (user?.user_metadata?.userType === 'Innovator' || user?.user_type === 'Innovator') {
      defaultActions.push({
        icon: DollarSign,
        label: "Investment Hub",
        path: "/dashboard/investment",
        variant: "outline" as const
      });
    } else if (user?.user_metadata?.userType === 'Investor' || user?.user_type === 'Investor') {
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
    <Card className="border border-moh-green/10 overflow-hidden relative bg-gradient-to-br from-white to-moh-glassGreen">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-moh-green/5 rounded-full -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-moh-gold/5 rounded-full -ml-16 -mb-16" />
      
      <CardHeader className="pb-2 relative">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex items-start md:items-center flex-col md:flex-row justify-between"
        >
          <div>
            <motion.div variants={item} className="flex items-center">
              {user?.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={firstName}
                  className="h-12 w-12 rounded-full mr-3 border-2 border-moh-green/20" 
                />
              ) : (
                <div className="mr-3 rounded-full overflow-hidden border-2 border-moh-green/20">
                  <GeneratedLogo 
                    name={formattedName} 
                    size={48} 
                    primaryColor="#00814A" 
                    secondaryColor="#C3A86B"
                    shape="circle" 
                    style="gradient"
                  />
                </div>
              )}
              <div>
                <CardTitle className="text-2xl font-bold text-moh-darkGreen">
                  {greeting}, {firstName}!
                </CardTitle>
                <CardDescription className="text-base">
                  Welcome to your Ministry of Health innovation portal
                </CardDescription>
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={item} className="mt-4 md:mt-0">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">
                {user?.user_type && (
                  <span className="bg-moh-lightGreen text-moh-darkGreen text-xs rounded-full px-3 py-1 font-medium flex items-center">
                    <Crown size={12} className="mr-1" /> {user.user_type}
                  </span>
                )}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </CardHeader>
      
      <CardContent className="relative">
        <motion.div 
          className="flex flex-wrap gap-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {quickActions.map((action, index) => (
            <motion.div variants={item} key={action.label} className="relative overflow-hidden group">
              <Button 
                variant={action.variant} 
                asChild 
                className={`transition-all duration-300 ${
                  action.variant === "default" ? "bg-moh-green hover:bg-moh-darkGreen" : 
                  action.variant === "outline" ? "border-moh-green/30 text-moh-green hover:bg-moh-green/5" : 
                  "hover:bg-moh-glassGreen"
                }`}
              >
                <Link to={action.path} className="flex items-center gap-2">
                  <action.icon size={18} className="transition-transform group-hover:scale-110" />
                  <span>{action.label}</span>
                </Link>
              </Button>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-moh-green/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-6 flex flex-wrap items-center text-sm text-muted-foreground gap-y-2 gap-x-4"
          variants={container}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
        >
          <motion.div variants={item} className="flex items-center">
            <Bell className="h-4 w-4 mr-1 text-moh-gold" />
            <span>3 new notifications</span>
          </motion.div>
          <motion.div variants={item} className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1 text-moh-gold" />
            <span>New resources available</span>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
