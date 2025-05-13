
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageSection } from "@/types/pageTypes";
import { SectionsList } from "./SectionsList";
import { PagePreview } from "./PagePreview";
import { PageValidationIssues } from "../PageValidationIssues";

interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  sections: PageSection[];
  setSections: React.Dispatch<React.SetStateAction<PageSection[]>>;
  formValues: { title?: string; slug?: string; metaDescription?: string; published?: boolean; };
  validating: boolean;
  validationIssues: { 
    errors: string[], 
    warnings: string[], 
    seoSuggestions: string[] 
  };
  onValidateContent: () => void;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({
  activeTab,
  setActiveTab,
  sections,
  setSections,
  formValues,
  validating,
  validationIssues,
  onValidateContent
}) => {
  const handleAddSection = (type: PageSection["type"]) => {
    const newSection: PageSection = {
      type,
      title: "",
      content: ""
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }
    
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);
  };

  const handleUpdateSection = (index: number, updatedSection: PageSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setSections(newSections);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="validation" className="relative">
          Validation
          {(validationIssues.errors.length > 0 || validationIssues.warnings.length > 0) && (
            <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1 absolute -top-1 -right-1 rounded-full">
              {validationIssues.errors.length + validationIssues.warnings.length}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4 mt-4">
        <SectionsList 
          sections={sections}
          onAddSection={handleAddSection}
          onRemoveSection={handleRemoveSection}
          onMoveSection={handleMoveSection}
          onUpdateSection={handleUpdateSection}
        />
      </TabsContent>

      <TabsContent value="preview" className="mt-4">
        <PagePreview 
          title={formValues.title || "Untitled Page"} 
          sections={sections} 
        />
      </TabsContent>

      <TabsContent value="validation" className="mt-4">
        <PageValidationIssues 
          validating={validating}
          validationIssues={validationIssues}
          onRunValidation={onValidateContent}
        />
      </TabsContent>
    </Tabs>
  );
};
