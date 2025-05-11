
interface ChallengeResultInfoProps {
  count: number;
  isLoading: boolean;
  error: unknown;
}

export default function ChallengeResultInfo({ count, isLoading, error }: ChallengeResultInfoProps) {
  return (
    <p className="text-gray-600">
      {isLoading ? (
        "Loading challenges..."
      ) : error ? (
        "Error loading challenges"
      ) : (
        `Showing ${count} challenges`
      )}
    </p>
  );
}
