
import React from "react";
import { SectionsList } from "./SectionsList";
import { PageSection } from "@/types/pageTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageValidationIssues } from "../PageValidationIssues";
import { PagePreview } from "./PagePreview";

export interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sections: PageSection[];
  setSections: React.Dispatch<React.SetStateAction<PageSection[]>>;
  formValues: any;
  validating: boolean;
  validationIssues: {
    errors: string[];
    warnings: string[];
    seoSuggestions: string[];
  };
  onValidateContent: () => Promise<boolean>;
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content Sections</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <SectionsList 
              sections={sections} 
              setSections={setSections} 
            />
          </TabsContent>

          <TabsContent value="preview">
            <PagePreview
              title={formValues.title}
              sections={sections}
            />
          </TabsContent>

          <TabsContent value="validation">
            <PageValidationIssues
              validationIssues={validationIssues}
              validating={validating}
              onValidate={onValidateContent}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
