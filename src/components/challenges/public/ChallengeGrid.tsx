
import { Challenge } from "@/types/challenges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ChallengeGridProps {
  challenges: Challenge[] | undefined;
  filteredChallenges: Challenge[] | undefined;
  isLoading: boolean;
  error: unknown;
  handleResetFilters: () => void;
}

export default function ChallengeGrid({
  challenges,
  filteredChallenges,
  isLoading,
  error,
  handleResetFilters
}: ChallengeGridProps) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} className="h-[400px] overflow-hidden shadow-md animate-pulse">
            <div className="h-40 bg-moh-lightGreen/50"></div>
            <CardHeader className="pb-2">
              <div className="h-6 w-24 bg-moh-lightGreen/50 rounded mb-2"></div>
              <div className="h-8 w-full bg-moh-lightGreen/50 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-16 w-full bg-moh-lightGreen/50 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-moh-lightGreen/50 rounded"></div>
                <div className="h-4 w-20 bg-moh-lightGreen/50 rounded"></div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-10 w-full bg-moh-lightGreen/50 rounded"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-4 text-moh-darkGreen">Something went wrong</h3>
        <p className="text-gray-600 mb-6">We encountered an error loading the challenges.</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!filteredChallenges?.length) {
    return (
      <div className="text-center py-12 bg-moh-lightGreen/20 rounded-lg border border-dashed border-moh-green/30">
        <div className="w-16 h-16 mx-auto mb-4 bg-moh-lightGreen rounded-full flex items-center justify-center">
          <Trophy className="text-moh-green h-8 w-8" />
        </div>
        <h3 className="text-xl font-medium mb-2 text-moh-darkGreen">No challenges found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
        <Button onClick={handleResetFilters} className="bg-moh-green hover:bg-moh-darkGreen">
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredChallenges.map((challenge, index) => (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-none">
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
              <h3 className="text-xl text-moh-darkGreen mt-2 group-hover:text-moh-green transition-colors font-medium">
                {challenge.title}
              </h3>
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
        </motion.div>
      ))}
    </div>
  );
}
