
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TRLBadgeProps {
  trl: number;
}

export default function TRLBadge({ trl }: TRLBadgeProps) {
  // TRL descriptions
  const trlDescriptions = [
    "Basic principles observed and reported",
    "Technology concept and/or application formulated",
    "Analytical and experimental critical function proof-of-concept",
    "Component and/or validation in laboratory environment",
    "Component and/or validation in relevant environment",
    "System/subsystem model or prototype demonstration in relevant environment",
    "System prototype demonstration in operational environment",
    "Actual system completed and qualified through test and demonstration",
    "Actual system proven in operational environment"
  ];
  
  // Colors based on TRL level
  const getBgColor = () => {
    if (trl <= 3) return "bg-amber-500";
    if (trl <= 6) return "bg-orange-500";
    return "bg-green-500";
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            <div className={`text-xs font-bold text-white px-2 py-1 rounded-md ${getBgColor()}`}>
              TRL {trl}/9
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="max-w-xs">
            <p className="font-medium mb-1">Technology Readiness Level {trl}/9</p>
            <p className="text-sm">{trlDescriptions[trl-1]}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
