
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ChallengeResultInfoProps {
  count: number;
  isLoading: boolean;
  error: unknown;
}

export default function ChallengeResultInfo({ count, isLoading, error }: ChallengeResultInfoProps) {
  if (isLoading) {
    return (
      <div className="flex items-center text-gray-500">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading challenges...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading challenges
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center"
    >
      <span className="font-medium text-moh-darkGreen">{count}</span>
      <span className="ml-1 text-gray-600">
        {count === 1 ? 'challenge' : 'challenges'} found
      </span>
    </motion.div>
  );
}
