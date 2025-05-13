
import { Challenge, Submission } from "@/types/challenges";
import ChallengeCard from "./ChallengeCard";
import ChallengeSkeleton from "./ChallengeSkeleton";
import { ReactNode } from "react";
import { mockChallenges, mockSubmissions } from "./mockData";

interface ChallengesListProps {
  challenges?: Challenge[];
  submissions?: Record<string, Submission>;
  isLoading: boolean;
  emptyState: ReactNode;
  useFallbackData?: boolean;
}

export default function ChallengesList({
  challenges,
  submissions = {},
  isLoading,
  emptyState,
  useFallbackData = false
}: ChallengesListProps) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <ChallengeSkeleton key={index} />
        ))}
      </div>
    );
  }

  // If no challenges and we're not using fallback, show empty state
  if (!challenges?.length && !useFallbackData) {
    return <>{emptyState}</>;
  }

  // Use provided challenges or fall back to mock data if explicitly requested
  const displayChallenges = challenges?.length ? challenges : (useFallbackData ? mockChallenges : []);
  const displaySubmissions = Object.keys(submissions).length ? submissions : (useFallbackData ? mockSubmissions : {});

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayChallenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          submission={displaySubmissions[challenge.id]}
        />
      ))}
    </div>
  );
}
