
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle,
  CheckCircle2, 
  Loader2, 
  Eye 
} from "lucide-react";

interface PageValidationIssuesProps {
  validating: boolean;
  issues: {
    errors: string[];
    warnings: string[];
    seoSuggestions: string[];
  };
  onValidate: () => Promise<boolean>;
}

export function PageValidationIssues({ 
  validating, 
  issues, 
  onValidate 
}: PageValidationIssuesProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {validating ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
              <p>Validating page content...</p>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Errors
              </h3>
              {issues.errors.length === 0 ? (
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>No errors found</span>
                </div>
              ) : (
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  {issues.errors.map((error, i) => (
                    <li key={i} className="text-red-500">
                      {error}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Warnings
              </h3>
              {issues.warnings.length === 0 ? (
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>No warnings found</span>
                </div>
              ) : (
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  {issues.warnings.map((warning, i) => (
                    <li key={i} className="text-amber-500">
                      {warning}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                SEO Suggestions
              </h3>
              {issues.seoSuggestions.length === 0 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>No SEO suggestions</span>
                </div>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {issues.seoSuggestions.map((suggestion, i) => (
                    <li key={i} className="text-blue-600">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {(issues.errors.length === 0 && 
              issues.warnings.length === 0 &&
              issues.seoSuggestions.length === 0) && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-green-700">Content Looks Good!</h3>
                <p className="text-green-600 text-center mt-2">
                  Your page content passed all validation checks.
                </p>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t flex justify-end">
              <Button
                variant="outline"
                onClick={onValidate}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Run Validation Again
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
