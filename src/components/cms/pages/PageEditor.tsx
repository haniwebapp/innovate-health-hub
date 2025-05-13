
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PageContent } from "@/types/pageTypes";

// Custom hooks
import { useCmsPageData } from "@/hooks/useCmsPageData";
import { useCmsPageValidation } from "@/hooks/useCmsPageValidation";

// Components
import { PageForm } from "./editor/PageForm";
import { ContentTabs } from "./editor/ContentTabs";
import { ActionButtons } from "./editor/ActionButtons";
import { ErrorDisplay } from "./editor/ErrorDisplay";
import { LoadingState } from "./editor/LoadingState";

// Utilities
import { createPageSubmission } from "@/utils/cmsPageSubmission";

export function PageEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Page data loading hook
  const { isNewPage, loading, sections, setSections, form } = useCmsPageData(id);
  
  // Validation hook
  const { validating, validationIssues, serverError, setServerError, validatePageContent } = useCmsPageValidation();
  
  // UI state
  const [activeTab, setActiveTab] = useState("content");
  const [saving, setSaving] = useState(false);

  // Form submission handler
  const onSubmit = async (values: any) => {
    try {
      setSaving(true);
      setServerError(null);
      
      const success = await createPageSubmission(
        values, 
        sections, 
        isNewPage, 
        id, 
        { toast }, 
        validatePageContent
      );
      
      if (success) {
        // Redirect to the pages list after successful create/update
        navigate("/dashboard/admin/cms");
      }
    } catch (error) {
      console.error("Error in submission:", error);
      setServerError("Failed to save page. Please check your connection and try again.");
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

  // Important: The form needs to be wrapped properly
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

      {/* Ensure the PageForm is fully rendered with proper form context */}
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
