
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SandboxComplianceRequirement, updateSandboxComplianceStatus } from '@/utils/regulatoryUtils';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, CircleAlert, CircleHelp } from 'lucide-react';

interface SandboxComplianceListProps {
  requirements: SandboxComplianceRequirement[];
  onRequirementsChange?: () => void;
  readOnly?: boolean;
}

export function SandboxComplianceList({
  requirements,
  onRequirementsChange,
  readOnly = false
}: SandboxComplianceListProps) {
  const { toast } = useToast();
  const [updating, setUpdating] = React.useState<string | null>(null);

  const handleComplianceUpdate = async (requirementId: string, completed: boolean) => {
    if (readOnly) return;
    
    setUpdating(requirementId);
    try {
      await updateSandboxComplianceStatus(requirementId, completed);
      toast({
        title: "Requirement updated",
        description: `Requirement marked as ${completed ? 'completed' : 'incomplete'}`,
      });
      
      if (onRequirementsChange) {
        onRequirementsChange();
      }
    } catch (error) {
      console.error('Error updating compliance status:', error);
      toast({
        title: "Update failed",
        description: "Failed to update requirement status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUpdating(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'required':
        return <CircleAlert className="h-5 w-5 text-red-500" />;
      case 'recommended':
        return <CircleAlert className="h-5 w-5 text-amber-500" />;
      case 'optional':
        return <CircleHelp className="h-5 w-5 text-blue-500" />;
      default:
        return <CircleHelp className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'required':
        return <Badge variant="destructive">Required</Badge>;
      case 'recommended':
        return <Badge className="bg-amber-500">Recommended</Badge>;
      case 'optional':
        return <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">Optional</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (requirements.length === 0) {
    return (
      <div className="text-center py-8">
        <CircleHelp className="h-10 w-10 mx-auto text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-500">No compliance requirements</h3>
        <p className="mt-1 text-sm text-gray-400">No requirements have been defined for this application yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requirements.map((requirement) => (
        <Card key={requirement.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="pt-1">
                {getStatusIcon(requirement.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{requirement.title}</h3>
                  {getStatusBadge(requirement.status)}
                </div>
                <p className="text-sm text-gray-500">{requirement.description}</p>
              </div>
              <div className="flex items-center pt-1">
                {readOnly ? (
                  requirement.completed ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm">Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-400">
                      <CircleHelp className="h-5 w-5 mr-1" />
                      <span className="text-sm">Pending</span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center">
                    <Checkbox
                      checked={requirement.completed}
                      onCheckedChange={(checked) => {
                        handleComplianceUpdate(requirement.id, Boolean(checked));
                      }}
                      disabled={updating === requirement.id}
                      className="mr-2"
                    />
                    <span className="text-sm">Completed</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
