
import { AIComplianceAnalyzer } from "@/components/regulatory/AIComplianceAnalyzer";
import { ComplianceRequirementList } from "@/components/regulatory/compliance/ComplianceRequirementList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Upload, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface DocumentsTabContentProps {
  innovationDescription: string;
  innovationType: string;
  isAnalyzingCompliance: boolean;
  onDescriptionChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onAnalyzeClick: () => void;
  onMarkComplete: (id: string) => void;
  requirements: any[];
}

export function DocumentsTabContent({
  innovationDescription,
  innovationType,
  isAnalyzingCompliance,
  onDescriptionChange,
  onTypeChange,
  onAnalyzeClick,
  onMarkComplete,
  requirements,
}: DocumentsTabContentProps) {
  return (
    <div className="space-y-4">
      <AIComplianceAnalyzer
        innovationDescription={innovationDescription}
        innovationType={innovationType}
        isAnalyzingCompliance={isAnalyzingCompliance}
        onDescriptionChange={onDescriptionChange}
        onTypeChange={onTypeChange}
        onAnalyzeClick={onAnalyzeClick}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Compliance Requirements</CardTitle>
          <CardDescription>
            Documents and assessments required for your innovation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ComplianceRequirementList
            requirements={requirements}
            onMarkComplete={onMarkComplete}
          />
          
          <div className="mt-6 pt-4 border-t flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              <HelpCircle className="inline h-4 w-4 mr-1" />
              Need help with compliance? Contact our regulatory experts
            </div>
            <Button asChild>
              <Link to="/dashboard/regulatory/documents/upload">
                <Upload className="h-4 w-4 mr-1" />
                Upload Documents
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>
            Your uploaded compliance documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              You haven't uploaded any documents yet
            </p>
            <Button className="mt-4" asChild>
              <Link to="/dashboard/regulatory/documents/upload">
                <Upload className="h-4 w-4 mr-1" />
                Upload Documents
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
