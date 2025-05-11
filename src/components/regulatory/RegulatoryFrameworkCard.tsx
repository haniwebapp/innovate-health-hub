
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, Code, Beaker, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface RegulatoryFramework {
  id: string;
  title: string;
  icon: string;
  description: string;
  completedSteps: number;
  totalSteps: number;
  steps: string[];
}

interface RegulatoryFrameworkCardProps {
  framework: RegulatoryFramework;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  compact?: boolean;
}

export function RegulatoryFrameworkCard({ 
  framework, 
  isSelected = false, 
  onSelect = () => {}, 
  compact = false
}: RegulatoryFrameworkCardProps) {
  // Function to render the appropriate icon based on the framework's icon property
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle':
        return <CheckCircle size={24} />;
      case 'Code':
        return <Code size={24} />;
      case 'Beaker':
        return <Beaker size={24} />;
      case 'Shield':
        return <Shield size={24} />;
      default:
        return <CheckCircle size={24} />;
    }
  };

  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer transition-all",
        isSelected ? "border-2 border-moh-green" : "hover:border-moh-green/50"
      )}
      onClick={() => onSelect(framework.id)}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-moh-green/10 rounded-md text-moh-green">
          {renderIcon(framework.icon)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{framework.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{framework.description}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Completion</span>
              <span className="font-medium">{framework.completedSteps}/{framework.totalSteps} steps</span>
            </div>
            <Progress 
              value={(framework.completedSteps / framework.totalSteps) * 100} 
              className="h-2 bg-gray-100" 
            />
          </div>
        </div>
      </div>
      
      {isSelected && !compact && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="font-medium mb-2">Compliance Steps</h4>
          <div className="space-y-2">
            {framework.steps.map((step, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 text-sm"
              >
                {index < framework.completedSteps ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-400" />
                )}
                <span className={index < framework.completedSteps ? "line-through text-gray-400" : ""}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button className="w-full bg-moh-green hover:bg-moh-darkGreen">
              Continue Compliance Process
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
