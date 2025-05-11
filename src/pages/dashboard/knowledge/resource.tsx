import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  ArrowLeft, 
  BookOpen, 
  Download, 
  FileText, 
  Loader2, 
  MessageSquare,
  Share2, 
  ThumbsUp 
} from "lucide-react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentSummaryCard } from "@/components/knowledge/DocumentSummary";
import { fetchResourceById, incrementDownloadCount, KnowledgeResource, saveResource } from "@/utils/knowledgeUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRTLClasses } from "@/utils/rtlUtils";
import { DocumentSummary, KnowledgeAIService } from "@/services/ai/KnowledgeAIService";
import { LanguageSwitcher } from '@/components/knowledge/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';

export default function ResourceViewPage() {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<KnowledgeResource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  
  const [summary, setSummary] = useState<DocumentSummary | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  
  const { language, t } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  const { toast } = useToast();

  useEffect(() => {
    async function loadResource() {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const resourceData = await fetchResourceById(id);
        
        if (!resourceData) {
          setError("Resource not found");
          return;
        }
        
        setResource(resourceData);
        
        // If resource already has a summary, use it
        if (resourceData.summary) {
          setSummary({
            summary: resourceData.summary,
            keyPoints: resourceData.key_points || [],
            relevantTopics: resourceData.relevant_topics || []
          });
        }
      } catch (error: any) {
        console.error("Error loading resource:", error);
        setError(error.message || "Failed to load resource");
      } finally {
        setLoading(false);
      }
    }
    
    loadResource();
  }, [id]);

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
        setActiveTab("translated");
        
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-moh-green mr-2" />
        <p>{t('knowledge.loadingResource')}</p>
      </div>
    );
  }
  
  if (error || !resource) {
    return (
      <Alert variant="destructive" className="my-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t('common.error')}</AlertTitle>
        <AlertDescription>
          {error || t('knowledge.resourceNotFound')}
        </AlertDescription>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4" 
          asChild
        >
          <Link to="/dashboard/knowledge">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.goBack')}
          </Link>
        </Button>
      </Alert>
    );
  }

  return (
    <div className={`space-y-6 ${language === 'ar' ? 'rtl-mode' : ''}`}>
      <div className={`flex items-center justify-between ${rtlClasses.flex}`}>
        <BreadcrumbNav 
          items={[
            { label: t('nav.dashboard'), href: "/dashboard" },
            { label: t('nav.knowledge'), href: "/dashboard/knowledge" }
          ]} 
          currentPage={resource.title} 
        />
        <LanguageSwitcher />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className={`flex justify-between items-start ${rtlClasses.flex}`}>
                <div>
                  <CardTitle className={rtlClasses.text}>
                    {resource.title}
                  </CardTitle>
                  <CardDescription className={rtlClasses.text}>
                    {resource.author && `${t('knowledge.by')} ${resource.author} • `}
                    {t('knowledge.published')}: {new Date(resource.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="capitalize">
                  {resource.type}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-moh-lightGreen/30">
                  {resource.category}
                </Badge>
                {resource.tags?.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                <TabsList className={rtlClasses.flex}>
                  <TabsTrigger value="content">{t('knowledge.content')}</TabsTrigger>
                  <TabsTrigger value="summary">{t('knowledge.summary')}</TabsTrigger>
                  {translatedContent && (
                    <TabsTrigger value="translated">{t('knowledge.translatedContent')}</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="content" className="mt-4">
                  {resource?.content ? (
                    <div className={`prose max-w-none ${rtlClasses.text}`}>
                      {resource.content.split('\n').map((paragraph, i) => (
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
                    <div className={`prose max-w-none ${rtlClasses.text}`}>
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
                          <Button onClick={handleGenerateSummary}>
                            {t('knowledge.generateSummary')}
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                {translatedContent && (
                  <TabsContent value="translated" className="mt-4">
                    <div className={`prose max-w-none ${rtlClasses.text}`}>
                      {translatedContent.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-6">
              <Button 
                variant="outline"
                onClick={handleSaveResource}
                className="flex items-center"
              >
                <ThumbsUp className={`h-4 w-4 ${rtlClasses.iconMargin}`} />
                {t('knowledge.saveResource')}
              </Button>
              
              <div className={`flex gap-2 ${rtlClasses.flex}`}>
                {resource?.content && !isTranslating ? (
                  <Button 
                    variant="outline"
                    onClick={handleTranslate}
                    className="flex items-center"
                  >
                    {language === 'en' ? 'ترجمة إلى العربية' : 'Translate to English'}
                  </Button>
                ) : isTranslating && (
                  <Button variant="outline" disabled>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {t('knowledge.translating')}
                  </Button>
                )}
                
                <Button 
                  onClick={handleDownload}
                  className="bg-moh-darkGreen hover:bg-moh-green"
                >
                  <Download className={`h-4 w-4 ${rtlClasses.iconMargin}`} />
                  {t('knowledge.download')}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Document summary card */}
          <DocumentSummaryCard 
            isLoading={isSummarizing}
            summaryData={summary}
            documentTitle={resource.title}
            documentType={resource.type}
            onDownload={handleDownload}
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
      </div>
    </div>
  );
}
