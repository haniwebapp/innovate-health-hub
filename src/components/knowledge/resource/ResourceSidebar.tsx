
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, MessageSquare, FileText } from "lucide-react";
import { DocumentSummaryCard } from "@/components/knowledge/DocumentSummary";
import { DocumentSummary } from "@/services/ai/KnowledgeAIService";
import { getRTLClasses } from "@/utils/rtlUtils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResourceSidebarProps {
  isSummarizing: boolean;
  summary: DocumentSummary | null;
  documentTitle: string;
  documentType: string;
  onDownload: () => void;
  language: string;
}

export function ResourceSidebar({ 
  isSummarizing, 
  summary, 
  documentTitle, 
  documentType, 
  onDownload,
  language 
}: ResourceSidebarProps) {
  const { t } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  return (
    <div className="space-y-6">
      {/* Document summary card */}
      <DocumentSummaryCard 
        isLoading={isSummarizing}
        summaryData={summary}
        documentTitle={documentTitle}
        documentType={documentType}
        onDownload={onDownload}
      />
      
      {/* Related resources would go here */}
      <Card>
        <CardHeader>
          <CardTitle className={rtlClasses.text}>
            {t('knowledge.relatedResources')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            {t('knowledge.relatedResourcesComingSoon')}
          </p>
        </CardContent>
      </Card>
      
      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className={rtlClasses.text}>
            {t('knowledge.actions')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button className="w-full justify-start" variant="outline">
            <Share2 className={`h-4 w-4 ${rtlClasses.iconMargin}`} />
            {t('knowledge.shareResource')}
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <MessageSquare className={`h-4 w-4 ${rtlClasses.iconMargin}`} />
            {t('knowledge.discussResource')}
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <FileText className={`h-4 w-4 ${rtlClasses.iconMargin}`} />
            {t('knowledge.reportIssue')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
