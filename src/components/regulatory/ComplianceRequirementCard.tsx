
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Clock, AlertTriangle, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export function ComplianceRequirementCard({ 
  requirement,
  onMarkComplete
}: ComplianceRequirementCardProps) {
  const { id, title, description, status, completed } = requirement;
  
  const getStatusBadge = () => {
    switch (status) {
      case 'required':
        return <Badge className={completed ? "bg-green-500" : "bg-red-500"}>Required</Badge>;
      case 'recommended':
        return <Badge className="bg-amber-500">Recommended</Badge>;
      case 'optional':
        return <Badge className="bg-gray-500">Optional</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getStatusIcon = () => {
    if (completed) {
      return <Check className="h-5 w-5 text-green-500" />;
    }
    
    switch (status) {
      case 'required':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'recommended':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <FileCheck className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <Card className={cn(
      "transition-colors",
      completed && "border-green-200 bg-green-50"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              {getStatusIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">{title}</h4>
                {getStatusBadge()}
              </div>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button
              size="sm"
              variant={completed ? "outline" : "default"}
              className={completed ? "border-green-500 text-green-700" : ""}
              onClick={() => onMarkComplete(id)}
            >
              {completed ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Completed
                </>
              ) : "Mark Complete"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
