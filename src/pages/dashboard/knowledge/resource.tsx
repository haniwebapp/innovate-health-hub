
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchResourceById, KnowledgeResource } from "@/utils/knowledgeUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from '@/components/knowledge/LanguageSwitcher';
import { ResourceHeader } from '@/components/knowledge/resource/ResourceHeader';
import { ResourceTags } from '@/components/knowledge/resource/ResourceTags';
import { ResourceContent } from '@/components/knowledge/resource/ResourceContent';
import { ResourceActions } from '@/components/knowledge/resource/ResourceActions';
import { ResourceSidebar } from '@/components/knowledge/resource/ResourceSidebar';
import { ResourceError } from '@/components/knowledge/resource/ResourceError';
import { ResourceLoading } from '@/components/knowledge/resource/ResourceLoading';
import { useResourceOperations } from '@/hooks/useResourceOperations';

export default function ResourceViewPage() {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<KnowledgeResource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  
  const { t } = useLanguage();
  
  const {
    summary,
    isSummarizing,
    translatedContent,
    isTranslating,
    handleDownload,
    handleSaveResource,
    handleGenerateSummary,
    handleTranslate,
    setTranslatedContent
  } = useResourceOperations(resource);
  
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
      } catch (error: any) {
        console.error("Error loading resource:", error);
        setError(error.message || "Failed to load resource");
      } finally {
        setLoading(false);
      }
    }
    
    loadResource();
  }, [id]);
  
  // When translatedContent is set, switch to translated tab
  useEffect(() => {
    if (translatedContent) {
      setActiveTab("translated");
    }
  }, [translatedContent]);

  if (loading) {
    return <ResourceLoading />;
  }
  
  if (error || !resource) {
    return <ResourceError error={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
              <ResourceHeader resource={resource} />
            </CardHeader>
            
            <CardContent className="pt-2">
              <ResourceTags category={resource.category} tags={resource.tags} />
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                <TabsList className="flex">
                  <TabsTrigger value="content">{t('knowledge.content')}</TabsTrigger>
                  <TabsTrigger value="summary">{t('knowledge.summary')}</TabsTrigger>
                  {translatedContent && (
                    <TabsTrigger value="translated">{t('knowledge.translatedContent')}</TabsTrigger>
                  )}
                </TabsList>
                
                <ResourceContent
                  content={resource.content}
                  translatedContent={translatedContent}
                  summary={summary}
                  isSummarizing={isSummarizing}
                  isTranslating={isTranslating}
                  activeTab={activeTab}
                  onGenerateSummary={handleGenerateSummary}
                />
              </Tabs>
            </CardContent>
            
            <CardFooter>
              <ResourceActions
                onSaveResource={handleSaveResource}
                onDownload={handleDownload}
                onTranslate={handleTranslate}
                isTranslating={isTranslating}
                hasContent={!!resource.content}
              />
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <ResourceSidebar
            isSummarizing={isSummarizing}
            summary={summary}
            documentTitle={resource.title}
            documentType={resource.type}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </div>
  );
}
