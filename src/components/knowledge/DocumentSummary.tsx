
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, FileText, BookOpen, List, Tag } from "lucide-react";
import { DocumentSummary } from "@/services/ai/KnowledgeAIService";
import { useLanguage } from "@/contexts/LanguageContext";

interface DocumentSummaryCardProps {
  isLoading: boolean;
  summaryData: DocumentSummary | null;
  documentTitle: string;
  documentType: string;
  onDownload?: () => void;
}

export function DocumentSummaryCard({ 
  isLoading, 
  summaryData, 
  documentTitle,
  documentType,
  onDownload 
}: DocumentSummaryCardProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-moh-lightGreen pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-moh-darkGreen flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            {t('knowledge.documentSummary')}
          </CardTitle>
          <Badge variant="outline" className="capitalize">
            {documentType}
          </Badge>
        </div>
        <CardDescription>
          {documentTitle}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-moh-green mb-4" />
            <p className="text-muted-foreground">{t('knowledge.generatingSummary')}</p>
          </div>
        ) : summaryData ? (
          <>
            <div>
              <h3 className="text-lg font-medium mb-2">{t('knowledge.summary')}</h3>
              <p className="text-gray-700">{summaryData.summary}</p>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <List className="h-5 w-5 mr-2 text-moh-green" />
                {t('knowledge.keyPoints')}
              </h3>
              <ul className="space-y-2">
                {summaryData.keyPoints.map((point, index) => (
                  <li key={index} className="flex">
                    <span className="font-medium mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-moh-green" />
                {t('knowledge.relevantTopics')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {summaryData.relevantTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="bg-moh-lightGreen/50">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{t('knowledge.noSummaryAvailable')}</p>
          </div>
        )}
      </CardContent>
      
      {!isLoading && summaryData && onDownload && (
        <CardFooter className="flex justify-end bg-gray-50 pt-4">
          <Button variant="outline" onClick={onDownload} className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            {t('knowledge.downloadSummary')}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
