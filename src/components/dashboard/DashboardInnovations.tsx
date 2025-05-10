
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, PlusCircle, Eye, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

// Mock innovations data - in a real app, this would be fetched from an API
const myInnovations = [
  {
    id: 'inn1',
    title: 'AI-Powered Diagnostic Tool',
    category: 'Digital Health',
    status: 'Published',
    views: 78,
    lastUpdated: new Date(2023, 4, 8)
  },
  {
    id: 'inn2',
    title: 'Remote Patient Monitoring Device',
    category: 'MedTech',
    status: 'Draft',
    views: 0,
    lastUpdated: new Date(2023, 4, 5)
  }
];

// Helper function to format dates
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

// Helper function for category badge colors
const getCategoryBadgeColor = (category: string) => {
  const colors = {
    'Digital Health': 'bg-moh-lightGreen text-moh-darkGreen',
    'MedTech': 'bg-amber-100 text-amber-800',
    'Telehealth': 'bg-blue-100 text-blue-800',
    'Healthcare IT': 'bg-indigo-100 text-indigo-800',
    'Therapeutics': 'bg-rose-100 text-rose-800'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export default function DashboardInnovations() {
  const hasInnovations = myInnovations.length > 0;
  
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
      
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium text-moh-darkGreen">My Innovations</CardTitle>
            <CardDescription>Your submitted innovations</CardDescription>
          </div>
          <Badge variant="outline" className="text-moh-green border-moh-green/30 bg-white/50">
            {myInnovations.length} total
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        {hasInnovations ? (
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {myInnovations.map((innovation) => (
              <motion.div 
                key={innovation.id} 
                variants={item}
                className={`p-3 rounded-lg transition-colors ${
                  innovation.status === 'Published' 
                    ? 'bg-moh-glassGreen border border-moh-green/10' 
                    : 'border border-muted hover:bg-moh-glassGreen'
                } group`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">{innovation.title}</h3>
                  <Badge 
                    className={`${innovation.status === 'Published' 
                      ? 'bg-moh-green/90 hover:bg-moh-green text-white' 
                      : 'bg-muted-foreground/20'}`}
                  >
                    {innovation.status}
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <Badge variant="outline" className={`${getCategoryBadgeColor(innovation.category)} w-fit`}>
                    {innovation.category}
                  </Badge>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1 text-moh-green" />
                      <span>{innovation.views} views</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-moh-gold" />
                      <span>Updated {formatDate(innovation.lastUpdated)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-dashed border-moh-green/10 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="text-moh-green hover:bg-moh-green/10 -my-1 h-8">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-moh-lightGreen rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusCircle className="h-8 w-8 text-moh-green" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              You haven't submitted any innovations yet.
            </p>
            <Button 
              size="sm" 
              asChild
              className="bg-moh-green hover:bg-moh-darkGreen"
            >
              <Link to="/innovations/submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                Submit Innovation
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="relative z-10">
        <div className="flex w-full justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="text-moh-green hover:text-moh-darkGreen hover:bg-moh-lightGreen"
          >
            <Link to="/dashboard/innovations" className="flex items-center">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="border-moh-green/30 text-moh-green hover:bg-moh-green hover:text-white"
          >
            <Link to="/innovations/submit" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Innovation
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
