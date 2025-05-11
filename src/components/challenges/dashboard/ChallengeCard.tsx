
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Trophy } from "lucide-react";
import { Challenge, Submission } from "@/types/challenges";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Helper function to get status badge color
const getStatusBadgeColor = (status: string) => {
  const colors = {
    'Open': 'bg-green-100 text-green-800 border-green-200',
    'Closed': 'bg-red-100 text-red-800 border-red-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Submitted': 'bg-amber-100 text-amber-800 border-amber-200',
    'Draft': 'bg-slate-100 text-slate-800 border-slate-200',
    'Under Review': 'bg-purple-100 text-purple-800 border-purple-200',
    'Complete': 'bg-moh-green/20 text-moh-darkGreen border-moh-green/30',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

interface ChallengeCardProps {
  challenge: Challenge;
  submission?: Submission;
}

export default function ChallengeCard({ challenge, submission }: ChallengeCardProps) {
  const hasSubmission = !!submission;
  const submissionStatus = submission?.status || "";
  const submissionProgress = hasSubmission ? 
    (submissionStatus === "Complete" ? 100 : submissionStatus === "Submitted" ? 75 : 40) : 0;

  return (
    <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-moh-green/10">
      <div className="h-40 overflow-hidden">
        <img 
          src={challenge.image_url || "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"} 
          alt={challenge.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="bg-moh-gold hover:bg-moh-darkGold">{challenge.category}</Badge>
          <div className="text-sm text-moh-darkGreen flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Deadline: {challenge.deadline}</span>
          </div>
        </div>
        <CardTitle className="text-xl text-moh-darkGreen mt-2 group-hover:text-moh-green transition-colors">
          {challenge.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">{challenge.description}</p>
        
        {hasSubmission && (
          <>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
              <span>Submission Progress</span>
              <Badge className={getStatusBadgeColor(submissionStatus)}>
                {submissionStatus}
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-moh-green h-2 rounded-full" 
                style={{ width: `${submissionProgress}%` }}
              />
            </div>
          </>
        )}
        
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {challenge.participants || 0} Participants
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            Prize: {challenge.prize}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        {hasSubmission ? (
          <Button asChild className="w-full bg-moh-green hover:bg-moh-darkGreen text-white group">
            <Link to={`/dashboard/submissions/${submission.id}`}>
              View Submission
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        ) : (
          <Button asChild className="w-full border-moh-green text-moh-green hover:bg-moh-green/10 group">
            <Link to={`/dashboard/submit/${challenge.id}`}>
              Submit Solution
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
