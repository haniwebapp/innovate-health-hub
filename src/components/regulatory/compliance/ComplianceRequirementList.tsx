
import { ComplianceRequirement, ComplianceRequirementCard } from "../ComplianceRequirementCard";

interface ComplianceRequirementListProps {
  requirements: ComplianceRequirement[];
  onMarkComplete: (id: string) => void;
}

export function ComplianceRequirementList({ requirements, onMarkComplete }: ComplianceRequirementListProps) {
  return (
    <div className="space-y-4">
      {requirements.map(requirement => (
        <ComplianceRequirementCard
          key={requirement.id}
          requirement={requirement}
          onMarkComplete={onMarkComplete}
        />
      ))}
    </div>
  );
}
