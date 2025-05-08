
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Challenge } from "@/types/challenges";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Users, Trophy, Building, CheckCircle, Share2 } from "lucide-react";

interface ChallengeDetailsProps {
  challenge: Challenge;
  isLoading?: boolean;
}

export default function ChallengeDetails({ challenge, isLoading = false }: ChallengeDetailsProps) {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied",
        description: "Challenge link copied to clipboard",
      });
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-64 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={
              challenge.status.toLowerCase() === "open" 
                ? "bg-green-500/10 text-green-600" 
                : challenge.status.toLowerCase() === "upcoming" 
                ? "bg-blue-500/10 text-blue-600"
                : "bg-gray-500/10 text-gray-600"
            }>
              {challenge.status}
            </Badge>
            <Badge variant="outline">{challenge.category}</Badge>
          </div>
          <h1 className="text-3xl font-bold">{challenge.title}</h1>
          <p className="text-muted-foreground mt-2">{challenge.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Link to={`/dashboard/submit/${challenge.id}`}>
            <Button className="bg-moh-green hover:bg-moh-darkGreen">
              Submit Solution
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6">
            <img 
              src={challenge.image_url} 
              alt={challenge.title} 
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Challenge Overview</h2>
            <p>{challenge.long_description}</p>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">Requirements</h3>
            <ul className="space-y-1">
              {challenge.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-moh-green flex-shrink-0 mt-0.5" />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-4">Challenge Details</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-moh-green" />
                <div>
                  <p className="text-sm text-muted-foreground">Submission Deadline</p>
                  <p className="font-medium">{challenge.deadline}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Trophy className="h-5 w-5 mr-3 text-moh-gold" />
                <div>
                  <p className="text-sm text-muted-foreground">Prize</p>
                  <p className="font-medium">{challenge.prize}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-moh-green" />
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="font-medium">{challenge.participants}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-3 text-moh-green" />
                <div>
                  <p className="text-sm text-muted-foreground">Organizer</p>
                  <p className="font-medium">{challenge.organizer}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Eligibility</p>
                <p>{challenge.eligibility}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-3">Timeline</h3>
            <div className="space-y-3">
              {challenge.timeline.map((item, index) => (
                <div key={index} className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-moh-green flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{item.date}</p>
                    <p className="text-sm text-muted-foreground">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
