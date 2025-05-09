
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileSearch, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { ComplianceRequirement } from "./ComplianceRequirementCard";
import { useMutation } from "@tanstack/react-query";
import { updateComplianceStatus } from "@/utils/regulatoryUtils";

export interface AIComplianceAnalysis {
  score: number;
  summary: string;
  requirements: ComplianceRequirement[];
  documentRecommendations: string[];
}

interface ComplianceAnalysisResultsProps {
  analysis: AIComplianceAnalysis;
  onMarkRequirementComplete: (id: string) => void;
  refetchData?: () => void;
}

export function ComplianceAnalysisResults({ 
  analysis, 
  onMarkRequirementComplete,
  refetchData 
}: ComplianceAnalysisResultsProps) {
  const { toast } = useToast();
  
  const updateComplianceMutation = useMutation({
    mutationFn: (args: { id: string, completed: boolean }) => 
      updateComplianceStatus(args.id, args.completed),
    onSuccess: () => {
      if (refetchData) {
        refetchData();
      }
    },
    onError: (error) => {
      toast({
        title: "Error updating compliance status",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    }
  });
  
  const handleComplianceStatusUpdate = (id: string, completed: boolean) => {
    updateComplianceMutation.mutate({ id, completed });
    onMarkRequirementComplete(id);
  };
  
  const handleGenerateReport = () => {
    toast({
      title: "Report generated",
      description: "Your compliance report has been generated and is ready for download",
    });
  };
  
  return (
    <Card className="p-6 mb-8 border-l-4 border-l-blue-600">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FileSearch className="h-5 w-5 text-blue-600" />
          Compliance Analysis Results
        </h3>
        <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center">
          <div className="text-center">
            <div className={cn(
              "text-lg font-bold",
              analysis.score > 80 ? "text-green-600" : 
              analysis.score > 60 ? "text-amber-600" : "text-red-600"
            )}>
              {analysis.score}%
            </div>
            <div className="text-xs text-gray-500">Ready</div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{analysis.summary}</p>
      
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-2">Required Compliance Steps</h4>
        <div className="space-y-3">
          {analysis.requirements.map(requirement => (
            <div 
              key={requirement.id} 
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
                  onClick={() => handleComplianceStatusUpdate(requirement.id, !requirement.completed)}
                  disabled={updateComplianceMutation.isPending}
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
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-lg mb-2">Required Documentation</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {analysis.documentRecommendations.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleGenerateReport}
        >
          Generate Compliance Report
        </Button>
      </div>
    </Card>
  );
}
