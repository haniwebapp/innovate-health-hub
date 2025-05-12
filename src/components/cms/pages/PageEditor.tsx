
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PageService } from "@/services/page/PageService";
import { PageSection, PageContent, WebsitePage, WebsitePageFormData } from "@/types/pageTypes";
import { supabase } from "@/integrations/supabase/client";

// Import refactored components
import { pageFormSchema, PageFormValues, PageForm } from "./editor/PageForm";
import { ContentTabs } from "./editor/ContentTabs";
import { ActionButtons } from "./editor/ActionButtons";
import { ErrorDisplay } from "./editor/ErrorDisplay";
import { LoadingState } from "./editor/LoadingState";

export function PageEditor() {
  const { id } = useParams<{ id: string }>();
  const isNewPage = !id || id === "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationIssues, setValidationIssues] = useState<{ 
    errors: string[], 
    warnings: string[], 
    seoSuggestions: string[] 
  }>({
    errors: [],
    warnings: [],
    seoSuggestions: []
  });
  const [activeTab, setActiveTab] = useState("content");
  const [sections, setSections] = useState<PageSection[]>([{
    type: "hero",
    title: "",
    content: ""
  }]);
  const [serverError, setServerError] = useState<string | null>(null);

  // Form handling
  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      metaDescription: "",
      published: false,
    },
  });

  // Load page data
  const loadPage = useCallback(async () => {
    if (isNewPage) return;

    try {
      setLoading(true);
      setServerError(null);
      const page = await PageService.getPageById(id!);
      
      if (!page) {
        toast({
          title: "Page not found",
          description: "The requested page could not be found.",
          variant: "destructive",
        });
        navigate("/dashboard/admin/cms");
        return;
      }

      form.reset({
        title: page.title,
        slug: page.slug,
        metaDescription: page.metaDescription || "",
        published: page.published,
      });

      // Ensure sections are properly initialized
      setSections(page.content.sections || []);
    } catch (error) {
      console.error("Failed to load page:", error);
      setServerError("Failed to load page data. Please try again or contact support.");
      toast({
        title: "Error",
        description: "Failed to load page data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [id, isNewPage, navigate, toast, form]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  // Content validation
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

  // Form submission handler
  const onSubmit = async (values: PageFormValues) => {
    try {
      setSaving(true);
      setServerError(null);
      
      if (sections.length === 0) {
        toast({
          title: "Error",
          description: "At least one content section is required.",
          variant: "destructive",
        });
        setSaving(false);
        return;
      }
      
      const pageContent: PageContent = {
        sections: sections,
      };
      
      // Validate content before saving
      const isValid = await validatePageContent(pageContent, values.slug);

      // Allow saving with warnings, but notify the user
      if (validationIssues.errors.length > 0) {
        toast({
          title: "Content Issues Detected",
          description: "Please review the validation issues before publishing.",
          variant: "warning",
        });
      }

      const pageData: WebsitePageFormData = {
        slug: values.slug,
        title: values.title,
        content: pageContent,
        metaDescription: values.metaDescription,
        published: values.published,
      };

      let result: WebsitePage;
      if (isNewPage) {
        result = await PageService.createPage(pageData);
        toast({
          title: "Page Created",
          description: "Your page has been successfully created.",
        });
      } else {
        result = await PageService.updatePage(id!, pageData);
        toast({
          title: "Page Updated",
          description: "Your changes have been saved successfully.",
        });
      }

      if (values.published && result.published) {
        toast({
          title: "Page Published",
          description: "The page is now live on the website.",
        });
      }

      // Redirect to the pages list after creating/updating
      navigate("/dashboard/admin/cms");
      
    } catch (error) {
      console.error("Error saving page:", error);
      setServerError("Failed to save page. Please check your connection and try again.");
      toast({
        title: "Error",
        description: "Failed to save page. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Handler functions
  const handleValidateContent = () => {
    return validatePageContent({ sections }, form.getValues().slug);
  };

  const handleNavigateBack = () => {
    navigate("/dashboard/admin/cms");
  };

  // Show loading state
  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <ErrorDisplay error={serverError} />

      <ActionButtons 
        isNewPage={isNewPage}
        saving={saving}
        validating={validating}
        onBack={handleNavigateBack}
        onSave={form.handleSubmit(onSubmit)}
        onValidate={handleValidateContent}
      />

      <PageForm 
        form={form} 
        defaultValues={form.getValues()} 
        onSubmit={onSubmit} 
      />

      <ContentTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sections={sections}
        setSections={setSections}
        formValues={form.getValues()}
        validating={validating}
        validationIssues={validationIssues}
        onValidateContent={handleValidateContent}
      />

      <ActionButtons 
        isNewPage={isNewPage}
        saving={saving}
        validating={validating}
        onBack={handleNavigateBack}
        onSave={form.handleSubmit(onSubmit)}
        onValidate={handleValidateContent}
      />
    </div>
  );
}
