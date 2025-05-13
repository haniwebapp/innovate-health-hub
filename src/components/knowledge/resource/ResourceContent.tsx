
import React from 'react';
import { Loader2, BookOpen } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DocumentSummary } from "@/services/ai/KnowledgeAIService";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResourceContentProps {
  content?: string;
  summary: DocumentSummary | null;
  isSummarizing: boolean;
  activeTab: string;
  onGenerateSummary: () => void;
}

export function ResourceContent({
  content,
  summary,
  isSummarizing,
  activeTab,
  onGenerateSummary
}: ResourceContentProps) {
  const { t } = useLanguage();

  return (
    <>
      <TabsContent value="content" className="mt-4">
        {content ? (
          <div className="prose max-w-none">
            {content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('knowledge.noContentAvailable')}</h3>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="summary" className="mt-4">
        {summary ? (
          <div className="prose max-w-none">
            <h3>{t('knowledge.summary')}</h3>
            <p>{summary.summary}</p>
            
            <h4 className="mt-6">{t('knowledge.keyPoints')}</h4>
            <ul className="list-disc pl-5">
              {summary.keyPoints.map((point, index) => (
                <li key={index} className="mb-1">{point}</li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h4>{t('knowledge.relatedTopics')}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {summary.relevantTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="bg-moh-lightGreen/20">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            {isSummarizing ? (
              <>
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-moh-green mb-4" />
                <p>{t('knowledge.generatingSummary')}</p>
              </>
            ) : (
              <>
                <p className="mb-4">{t('knowledge.noSummaryYet')}</p>
                <Button onClick={onGenerateSummary}>
                  {t('knowledge.generateSummary')}
                </Button>
              </>
            )}
          </div>
        )}
      </TabsContent>
    </>
  );
}
