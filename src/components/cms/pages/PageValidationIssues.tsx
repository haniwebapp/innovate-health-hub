
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export interface PageValidationIssuesProps {
  validationIssues: {
    errors: string[];
    warnings: string[];
    seoSuggestions: string[];
  };
  validating: boolean;
  onValidate: () => Promise<boolean>;
}

export const PageValidationIssues: React.FC<PageValidationIssuesProps> = ({
  validationIssues,
  validating,
  onValidate,
}) => {
  const hasErrors = validationIssues.errors && validationIssues.errors.length > 0;
  const hasWarnings = validationIssues.warnings && validationIssues.warnings.length > 0;
  const hasSuggestions = validationIssues.seoSuggestions && validationIssues.seoSuggestions.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Content Validation</h3>
        <Button 
          onClick={onValidate} 
          disabled={validating}
          variant="outline"
          size="sm"
        >
          {validating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Validating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Validation
            </>
          )}
        </Button>
      </div>

      {!hasErrors && !hasWarnings && !hasSuggestions && !validating && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <p>No validation issues found. Your page looks good!</p>
          </CardContent>
        </Card>
      )}

      {hasErrors && (
        <div className="space-y-2">
          <h4 className="font-medium flex items-center">
            <XCircle className="h-4 w-4 text-red-500 mr-2" />
            Errors
            <Badge variant="outline" className="ml-2 bg-red-50 text-red-600 border-red-200">
              {validationIssues.errors.length}
            </Badge>
          </h4>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <ul className="list-disc pl-5 space-y-1">
                {validationIssues.errors.map((error, index) => (
                  <li key={index} className="text-sm text-red-800">{error}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {hasWarnings && (
        <div className="space-y-2">
          <h4 className="font-medium flex items-center">
            <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
            Warnings
            <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-600 border-amber-200">
              {validationIssues.warnings.length}
            </Badge>
          </h4>
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <ul className="list-disc pl-5 space-y-1">
                {validationIssues.warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-amber-800">{warning}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {hasSuggestions && (
        <div className="space-y-2">
          <h4 className="font-medium flex items-center">
            <AlertCircle className="h-4 w-4 text-blue-500 mr-2" />
            SEO Suggestions
            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">
              {validationIssues.seoSuggestions.length}
            </Badge>
          </h4>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <ul className="list-disc pl-5 space-y-1">
                {validationIssues.seoSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-blue-800">{suggestion}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      <Separator />

      <div className="text-sm text-muted-foreground">
        <p>
          Validation checks for common issues like missing content, SEO problems, and technical errors.
          Run validation before publishing to ensure your page meets all requirements.
        </p>
      </div>
    </div>
  );
};
