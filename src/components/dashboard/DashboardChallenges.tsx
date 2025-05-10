
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, CalendarClock, Trophy } from "lucide-react";
import { motion } from "framer-motion";

// Mock challenges data - in a real app, this would be fetched from an API
const activeChallenges = [
  {
    id: 'ch1',
    title: 'Digital Health Solutions',
    status: 'In Progress',
    dueDate: new Date(2023, 5, 15),
    progress: 65
  },
  {
    id: 'ch2',
    title: 'Maternal Health Innovations',
    status: 'Under Review',
    dueDate: new Date(2023, 4, 30),
    progress: 100
  }
];

// Helper function to format dates
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

// Helper function to calculate days remaining
const getDaysRemaining = (dueDate: Date) => {
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper function to get status badge colors
const getStatusBadgeColor = (status: string) => {
  const colors = {
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Under Review': 'bg-amber-100 text-amber-800 border-amber-200',
    'Approved': 'bg-green-100 text-green-800 border-green-200',
    'Rejected': 'bg-red-100 text-red-800 border-red-200',
    'Complete': 'bg-purple-100 text-purple-800 border-purple-200'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export default function DashboardChallenges() {
  const hasChallenges = activeChallenges.length > 0;
  
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
    <Card className="h-full border-moh-green/10 overflow-hidden relative">
      {/* Subtle gradient background effect */}
      <div className="absolute inset-0 bg-green-gold-gradient rounded-lg" />
      
      <CardHeader className="pb-2 relative">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium text-moh-darkGreen flex items-center gap-2">
              <Trophy className="h-4 w-4 text-moh-gold" /> Active Challenges
            </CardTitle>
            <CardDescription>Your ongoing challenge submissions</CardDescription>
          </div>
          <Badge variant="outline" className="text-moh-green border-moh-green/30 bg-white/50">
            {activeChallenges.length} active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        {hasChallenges ? (
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {activeChallenges.map((challenge) => {
              const daysRemaining = getDaysRemaining(challenge.dueDate);
              const isUrgent = daysRemaining <= 3 && daysRemaining > 0;
              
              return (
                <motion.div 
                  key={challenge.id} 
                  variants={item}
                  className={`p-3 rounded-lg transition-colors border ${
                    isUrgent 
                      ? 'bg-amber-50 border-amber-200' 
                      : 'bg-card/80 border-muted hover:bg-moh-glassGreen'
                  } group`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{challenge.title}</h3>
                    <Badge className={getStatusBadgeColor(challenge.status)}>
                      {challenge.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground mb-2 gap-2">
                    <div className="flex items-center">
                      <CalendarClock className="h-3 w-3 mr-1 text-moh-gold" />
                      <span>Due: {formatDate(challenge.dueDate)}</span>
                      {isUrgent && (
                        <Badge variant="outline" className="ml-2 border-red-300 text-red-600 bg-red-50 text-[10px] px-1 py-0">
                          {daysRemaining === 0 ? "Due today" : `${daysRemaining} days left`}
                        </Badge>
                      )}
                    </div>
                    <span>{challenge.progress}% Complete</span>
                  </div>
                  
                  <div className="relative w-full bg-moh-lightGreen rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="h-1.5 rounded-full bg-gradient-to-r from-moh-green to-moh-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${challenge.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-dashed border-moh-green/10 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild
                      className="text-moh-green hover:bg-moh-green/10 -my-1 h-8"
                    >
                      <Link to={`/dashboard/submissions/${challenge.id}`}>
                        <ArrowRight className="h-3 w-3 mr-1" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-6 bg-moh-lightGreen/20 rounded-lg border border-dashed border-moh-green/20">
            <div className="w-16 h-16 rounded-full bg-moh-lightGreen flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-moh-green" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              You haven't submitted any challenges yet.
            </p>
            <Button 
              className="bg-moh-green hover:bg-moh-darkGreen"
              size="sm" 
              asChild
            >
              <Link to="/challenges">Browse Challenges</Link>
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="relative">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-moh-green hover:bg-moh-lightGreen" 
          asChild
        >
          <Link to="/dashboard/submissions" className="flex items-center justify-center">
            View all challenges
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
