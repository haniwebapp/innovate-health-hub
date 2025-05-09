
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, PlusCircle } from "lucide-react";

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
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">My Innovations</CardTitle>
          <Badge variant="outline" className="text-xs">
            {myInnovations.length} total
          </Badge>
        </div>
        <CardDescription>Your submitted innovations</CardDescription>
      </CardHeader>
      <CardContent>
        {hasInnovations ? (
          <div className="space-y-4">
            {myInnovations.map(innovation => (
              <div key={innovation.id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">{innovation.title}</h3>
                  <Badge variant={innovation.status === 'Published' ? 'default' : 'outline'}>
                    {innovation.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <Badge variant="outline" className={getCategoryBadgeColor(innovation.category)}>
                    {innovation.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {innovation.views} views • Updated {formatDate(innovation.lastUpdated)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-4">
              You haven't submitted any innovations yet.
            </p>
            <Button size="sm" asChild>
              <Link to="/innovations/submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                Submit Innovation
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/innovations" className="flex items-center">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
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
