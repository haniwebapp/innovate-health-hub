
import { useState } from 'react';
import { KnowledgeAIService, DocumentSummary } from "@/services/ai/KnowledgeAIService";
import { incrementDownloadCount, saveResource, KnowledgeResource } from "@/utils/knowledgeUtils";
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export function useResourceOperations(resource: KnowledgeResource | null) {
  const [summary, setSummary] = useState<DocumentSummary | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  
  const { language, t } = useLanguage();
  const { toast } = useToast();
  
  // Initialize summary if resource has one
  if (resource?.summary && !summary) {
    setSummary({
      summary: resource.summary,
      keyPoints: resource.key_points || [],
      relevantTopics: resource.relevant_topics || []
    });
  }

  const handleDownload = async () => {
    if (!resource) return;
    
    try {
      // Track download count
      await incrementDownloadCount(resource.id);
      
      // If there's a file URL, open it
      if (resource.file_url) {
        window.open(resource.file_url, '_blank');
      }
      
      toast({
        title: t('knowledge.downloadStarted'),
        description: t('knowledge.resourceDownloading'),
      });
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const handleSaveResource = async () => {
    if (!resource) return;
    
    try {
      const result = await saveResource(resource.id);
      
      if (result) {
        toast({
          title: t('knowledge.resourceSaved'),
          description: t('knowledge.resourceSavedDescription'),
        });
      } else {
        toast({
          variant: "destructive",
          title: t('common.error'),
          description: t('knowledge.resourceSaveError'),
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: t('knowledge.resourceSaveError'),
      });
    }
  };

  const handleGenerateSummary = async () => {
    if (!resource || !resource.content) {
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: t('knowledge.noContentForSummary'),
      });
      return;
    }
    
    setIsSummarizing(true);
    
    try {
      const summaryData = await KnowledgeAIService.generateDocumentSummary({
        id: resource.id,
        title: resource.title,
        content: resource.content,
        type: resource.type,
        category: resource.category,
      });
      
      setSummary(summaryData);
      
      toast({
        title: t('knowledge.summaryGenerated'),
        description: t('knowledge.summaryGeneratedDescription'),
      });
    } catch (error: any) {
      console.error("Summary generation error:", error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: t('knowledge.summaryGenerationError'),
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleTranslate = async () => {
    if (!resource || !resource.content) return;
    
    setIsTranslating(true);
    
    try {
      // Target language is opposite of current UI language
      const targetLang = language === 'en' ? 'ar' : 'en';
      
      const result = await KnowledgeAIService.translateContent(
        resource.content,
        targetLang
      );
      
      if (result.translatedContent) {
        setTranslatedContent(result.translatedContent);
        
        toast({
          title: t('knowledge.contentTranslated'),
          description: language === 'en' 
            ? 'المحتوى تمت ترجمته إلى العربية' 
            : 'Content has been translated to English',
        });
      }
    } catch (error: any) {
      console.error("Translation error:", error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: t('knowledge.translationError'),
      });
    } finally {
      setIsTranslating(false);
    }
  };
  
  return {
    summary,
    isSummarizing,
    translatedContent,
    isTranslating,
    handleDownload,
    handleSaveResource,
    handleGenerateSummary,
    handleTranslate,
    setTranslatedContent
  };
}
