
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Trophy } from "lucide-react";
import { Challenge } from "@/types/challenges";

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-none animate-fade-in">
      <div className="h-40 overflow-hidden">
        <img 
          src={challenge.image_url} 
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
        <p className="text-gray-600 mb-4">{challenge.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {challenge.participants} Participants
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            Prize: {challenge.prize}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-moh-green hover:bg-moh-darkGreen text-white group">
          <Link to={`/challenges/${challenge.id}`}>
            View Challenge
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
