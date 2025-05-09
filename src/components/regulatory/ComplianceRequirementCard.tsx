
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  status: "required" | "recommended" | "optional";
  completed: boolean;
}

interface ComplianceRequirementCardProps {
  requirement: ComplianceRequirement;
  onMarkComplete: (id: string) => void;
}

export function ComplianceRequirementCard({ requirement, onMarkComplete }: ComplianceRequirementCardProps) {
  return (
    <div 
      className={cn(
        "p-4 border rounded-md",
        requirement.completed ? "bg-green-50 border-green-200" : "bg-white"
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {requirement.status === "required" && (
            <Badge className="bg-red-500">Required</Badge>
          )}
          {requirement.status === "recommended" && (
            <Badge className="bg-amber-500">Recommended</Badge>
          )}
          {requirement.status === "optional" && (
            <Badge className="bg-gray-500">Optional</Badge>
          )}
          <h5 className="font-medium">{requirement.title}</h5>
        </div>
        <Button 
          size="sm" 
          variant={requirement.completed ? "outline" : "default"}
          className={requirement.completed ? "border-green-500 text-green-500" : ""}
          onClick={() => onMarkComplete(requirement.id)}
        >
          {requirement.completed ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1" /> Completed
            </>
          ) : "Mark Complete"}
        </Button>
      </div>
      <p className="text-sm text-gray-600 mt-2">{requirement.description}</p>
    </div>
  );
}
