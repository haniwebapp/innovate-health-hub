
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PageContent } from "@/types/pageTypes";
import { supabase } from "@/integrations/supabase/client";
import { ValidationIssues } from "@/components/cms/pages/PageValidationIssues";

export function useCmsPageValidation() {
  const { toast } = useToast();
  const [validating, setValidating] = useState(false);
  const [validationIssues, setValidationIssues] = useState<ValidationIssues>({
    errors: [],
    warnings: [],
    seoSuggestions: []
  });
  const [serverError, setServerError] = useState<string | null>(null);

  const validatePageContent = async (content: PageContent, slug: string) => {
    try {
      setValidating(true);
      setValidationIssues({ errors: [], warnings: [], seoSuggestions: [] });
      setServerError(null);

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error("Authentication required");
      }
      
      const response = await fetch(`https://ntgrokpnwizohtfkcfec.supabase.co/functions/v1/page-validator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ content, slug }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Validation API error:", errorText);
        throw new Error(`Validation failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      setValidationIssues({
        errors: result.errors || [],
        warnings: result.warnings || [],
        seoSuggestions: result.seoSuggestions || []
      });

      return result.isValid !== false;
    } catch (error) {
      console.error("Validation error:", error);
      setServerError("Validation service unavailable. You can still save, but we recommend validating before publishing.");
      toast({
        title: "Validation Error",
        description: "Failed to validate page content. You can still save the page.",
        variant: "destructive",
      });
      return true; // Allow saving despite validation failure
    } finally {
      setValidating(false);
    }
  };

  return {
    validating,
    validationIssues,
    serverError,
    setServerError,
    validatePageContent,
  };
}
