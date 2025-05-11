
import { RegulatoryFramework, RegulatoryFrameworkCard } from "../RegulatoryFrameworkCard";

interface RegulatoryFrameworkListProps {
  frameworks: RegulatoryFramework[];
  selectedFramework: string | null;
  onSelectFramework: (id: string) => void;
}

export function RegulatoryFrameworkList({ 
  frameworks, 
  selectedFramework, 
  onSelectFramework 
}: RegulatoryFrameworkListProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {frameworks.map((framework) => (
        <RegulatoryFrameworkCard
          key={framework.id}
          framework={framework}
          isSelected={selectedFramework === framework.id}
          onSelect={onSelectFramework}
        />
      ))}
    </div>
  );
}
