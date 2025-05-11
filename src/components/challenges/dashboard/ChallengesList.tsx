
import { Challenge, Submission } from "@/types/challenges";
import ChallengeCard from "./ChallengeCard";
import ChallengeSkeleton from "./ChallengeSkeleton";
import { ReactNode } from "react";

interface ChallengesListProps {
  challenges?: Challenge[];
  submissions?: Record<string, Submission>;
  isLoading: boolean;
  emptyState: ReactNode;
}

export default function ChallengesList({
  challenges,
  submissions = {},
  isLoading,
  emptyState
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

  if (!challenges?.length) {
    return <>{emptyState}</>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          submission={submissions[challenge.id]}
        />
      ))}
    </div>
  );
}
