
import { Challenge } from "@/types/challenges";
import ChallengeCard from "./ChallengeCard";
import { Button } from "@/components/ui/button";
import ChallengeSkeleton from "@/components/challenges/dashboard/ChallengeSkeleton";

interface ChallengeGridProps {
  challenges: Challenge[] | undefined;
  isLoading: boolean;
  error: unknown;
  filteredChallenges: Challenge[] | undefined;
  handleResetFilters: () => void;
}

export default function ChallengeGrid({ 
  challenges, 
  isLoading, 
  error, 
  filteredChallenges,
  handleResetFilters
}: ChallengeGridProps) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, index) => (
          <ChallengeSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="col-span-full text-center p-8">
        <p className="text-red-500 font-medium">Failed to load challenges. Please try again later.</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }
  
  if (!filteredChallenges?.length) {
    return (
      <div className="col-span-full text-center p-8">
        <p className="font-medium text-lg">No challenges found matching your search criteria.</p>
        <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredChallenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}
