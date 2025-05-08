
import { Challenge } from "@/types/challenges";
import { CheckCircle } from "lucide-react";

interface ChallengeRequirementsProps {
  eligibility: string;
  requirements: string[];
}

export default function ChallengeRequirements({ eligibility, requirements }: ChallengeRequirementsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-moh-darkGreen">Eligibility</h3>
      <p>{eligibility}</p>
      
      <h3 className="text-xl font-medium text-moh-darkGreen mt-6">Requirements</h3>
      <ul className="space-y-3">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 mt-1">
              <CheckCircle className="h-4 w-4 text-moh-green" />
            </span>
            <span>{req}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
