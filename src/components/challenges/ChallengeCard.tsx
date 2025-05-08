
import React from "react";
import { Link } from "react-router-dom";
import { Challenge } from "@/types/challenges";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock, Users, Trophy } from "lucide-react";

interface ChallengeCardProps {
  challenge: Challenge;
  showActions?: boolean;
}

export default function ChallengeCard({ challenge, showActions = true }: ChallengeCardProps) {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-500/10 text-green-600 hover:bg-green-500/20";
      case "closed":
        return "bg-red-500/10 text-red-600 hover:bg-red-500/20";
      case "upcoming":
        return "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20";
      case "completed":
        return "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20";
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={challenge.image_url} 
          alt={challenge.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={getStatusColor(challenge.status)}>
            {challenge.status}
          </Badge>
          <Badge variant="outline">{challenge.category}</Badge>
        </div>
        <CardTitle className="text-xl mt-2 line-clamp-2">{challenge.title}</CardTitle>
        <CardDescription className="line-clamp-2">{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-1 gap-2 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarClock className="h-4 w-4 mr-2 text-moh-green" />
            <span>Deadline: {challenge.deadline}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-moh-green" />
            <span>{challenge.participants} Participants</span>
          </div>
          <div className="flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-moh-gold" />
            <span>{challenge.prize}</span>
          </div>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="pt-0">
          <Link to={`/challenges/${challenge.id}`} className="w-full">
            <Button variant="default" className="w-full bg-moh-green hover:bg-moh-darkGreen">
              View Challenge
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
