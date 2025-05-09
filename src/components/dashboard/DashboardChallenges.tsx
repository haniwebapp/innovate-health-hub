
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

// Helper function to get status badge colors
const getStatusBadgeColor = (status: string) => {
  const colors = {
    'In Progress': 'bg-blue-100 text-blue-800',
    'Under Review': 'bg-amber-100 text-amber-800',
    'Approved': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Complete': 'bg-purple-100 text-purple-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export default function DashboardChallenges() {
  const hasChallenges = activeChallenges.length > 0;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Active Challenges</CardTitle>
          <Badge variant="outline" className="text-xs">
            {activeChallenges.length} active
          </Badge>
        </div>
        <CardDescription>Your ongoing challenge submissions</CardDescription>
      </CardHeader>
      <CardContent>
        {hasChallenges ? (
          <div className="space-y-4">
            {activeChallenges.map(challenge => (
              <div key={challenge.id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{challenge.title}</h3>
                  <Badge className={getStatusBadgeColor(challenge.status)}>
                    {challenge.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Due: {formatDate(challenge.dueDate)}</span>
                  <span>{challenge.progress}% Complete</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className="bg-moh-green h-1.5 rounded-full" 
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-4">
              You haven't submitted any challenges yet.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to="/dashboard/submissions" className="flex items-center justify-center">
            View all challenges
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
