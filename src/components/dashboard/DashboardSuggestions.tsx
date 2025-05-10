
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Sparkles, ShieldAlert, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AISuggestion {
  id: string;
  text: string;
  link: string;
  linkText: string;
  priority: 'high' | 'medium' | 'low';
  isNew?: boolean;
  icon?: 'lightbulb' | 'shield' | 'clock';
}

// Mock AI suggestions - in a real app, these would be fetched from an API
const defaultSuggestions: AISuggestion[] = [
  {
    id: '1',
    text: 'Complete your profile to improve investor matching by 40%',
    link: '/dashboard/profile',
    linkText: 'Update Profile',
    priority: 'high',
    isNew: true,
    icon: 'shield'
  },
  {
    id: '2',
    text: 'The "Digital Health Solutions" challenge closes in 3 days',
    link: '/challenges/digital-health',
    linkText: 'Submit Now',
    priority: 'high',
    icon: 'clock'
  },
  {
    id: '3',
    text: 'Your innovation has received 5 new views since yesterday',
    link: '/dashboard/innovations',
    linkText: 'View Analytics',
    priority: 'medium',
    icon: 'lightbulb'
  },
  {
    id: '4',
    text: 'New funding opportunity matches your "AI Diagnostics" innovation',
    link: '/investment',
    linkText: 'Explore Funding',
    priority: 'medium',
    icon: 'shield'
  },
  {
    id: '5',
    text: 'Review new regulatory guidelines for medical devices',
    link: '/dashboard/regulatory',
    linkText: 'View Guidelines',
    priority: 'medium',
    icon: 'lightbulb'
  },
  {
    id: '6',
    text: 'Connect with 3 innovators working in similar fields',
    link: '/dashboard/collaboration',
    linkText: 'View Connections',
    priority: 'low',
    icon: 'lightbulb'
  },
  {
    id: '7',
    text: 'Update your innovation description for better investor matching',
    link: '/dashboard/innovations',
    linkText: 'Edit Innovation',
    priority: 'low',
    icon: 'shield'
  }
];

// Helper function to get icon component based on type
const getIconComponent = (iconType: string | undefined) => {
  switch(iconType) {
    case 'shield':
      return <ShieldAlert className="h-4 w-4 text-moh-green" />;
    case 'clock':
      return <Clock className="h-4 w-4 text-amber-500" />;
    case 'lightbulb':
    default:
      return <Lightbulb className="h-4 w-4 text-moh-gold" />;
  }
};

export default function DashboardSuggestions() {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch by adding a small delay
    const timer = setTimeout(() => {
      // Sort suggestions by priority
      const sortedSuggestions = [...defaultSuggestions].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      
      setSuggestions(sortedSuggestions);
      setIsLoading(false);
    }, 900);
    
    return () => clearTimeout(timer);
  }, []);

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-amber-500 pl-3';
      case 'medium':
        return 'border-l-4 border-blue-400 pl-3';
      case 'low':
        return 'border-l-4 border-gray-300 pl-3';
      default:
        return '';
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, x: 10 },
    show: { opacity: 1, x: 0 }
  };

  const shimmerAnimation = {
    initial: { left: "-100%" },
    animate: { 
      left: "100%",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear"
      }
    }
  };

  return (
    <Card className="h-full border-moh-green/10 overflow-hidden relative">
      {/* Subtle gradient background effect */}
      <div className="absolute inset-0 bg-green-gold-gradient rounded-lg" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
        <div>
          <CardTitle className="text-lg font-medium text-moh-darkGreen">AI Suggestions</CardTitle>
          <CardDescription>Personalized recommendations</CardDescription>
        </div>
        <div className="flex items-center space-x-1">
          <Sparkles className="h-4 w-4 text-blue-500 animate-pulse-soft" />
          <Lightbulb className="h-4 w-4 text-amber-500 animate-pulse-soft" />
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <ScrollArea className="h-[350px] pr-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                  <div className="flex items-start mb-2">
                    <div className="w-full">
                      <div className="h-4 bg-moh-lightGreen/50 rounded relative overflow-hidden w-4/5 mb-2">
                        <motion.div 
                          className="absolute inset-0 bg-shimmer-gradient" 
                          variants={shimmerAnimation}
                          initial="initial"
                          animate="animate"
                        />
                      </div>
                      <div className="h-3 bg-moh-lightGreen/50 rounded relative overflow-hidden w-2/3">
                        <motion.div 
                          className="absolute inset-0 bg-shimmer-gradient" 
                          variants={shimmerAnimation}
                          initial="initial"
                          animate="animate"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="h-6 w-20 bg-moh-lightGreen/50 rounded relative overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 bg-shimmer-gradient" 
                        variants={shimmerAnimation}
                        initial="initial"
                        animate="animate"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="space-y-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {suggestions.map(suggestion => (
                <motion.div 
                  key={suggestion.id} 
                  variants={item}
                  className={`space-y-2 border-b pb-3 last:border-0 ${getPriorityClass(suggestion.priority)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-full ${
                      suggestion.priority === 'high' 
                        ? 'bg-amber-100' 
                        : suggestion.priority === 'medium'
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                    }`}>
                      {getIconComponent(suggestion.icon)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {suggestion.text}
                        {suggestion.isNew && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                            New
                          </span>
                        )}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-auto text-moh-green hover:text-moh-darkGreen hover:bg-transparent mt-1" 
                        asChild
                      >
                        <Link to={suggestion.link} className="flex items-center">
                          {suggestion.linkText}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
