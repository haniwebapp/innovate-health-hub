
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building } from "lucide-react";
import { Challenge } from "@/types/challenges";

interface ChallengeHeaderProps {
  challenge: Challenge;
}

export default function ChallengeHeader({ challenge }: ChallengeHeaderProps) {
  return (
    <div className="relative h-64 md:h-80 overflow-hidden">
      <img 
        src={challenge.image_url} 
        alt={challenge.title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-end">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/challenges" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Link>
          <Badge className="bg-moh-gold hover:bg-moh-darkGold mb-3">
            {challenge.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {challenge.title}
          </h1>
          <div className="flex items-center text-white/80 text-sm">
            <Building className="h-4 w-4 mr-1" />
            <span>{challenge.organizer}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
