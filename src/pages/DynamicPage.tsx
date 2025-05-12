
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageRenderer } from '@/components/cms/pages/PageRenderer';
import { WebsitePage } from '@/types/pageTypes';
import { PageService } from '@/services/page/PageService';
import { PageLoader } from '@/components/ui/page-loader';
import { ErrorHandlingService } from '@/services/errors/ErrorHandlingService';
import { useToast } from '@/components/ui/use-toast';
import { PerformanceMonitoringService } from '@/services/monitoring/PerformanceMonitoringService';

export default function DynamicPage() {
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadPage = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        await PerformanceMonitoringService.measurePerformance('pageLoad', async () => {
          const pageData = await PageService.getPageBySlug(slug);
          setPage(pageData);
          
          if (!pageData) {
            toast({
              title: "Page not found",
              description: "The requested page does not exist or is not published.",
              variant: "destructive"
            });
          }
        }, { pageType: 'dynamic', slug });
      } catch (error) {
        ErrorHandlingService.handleError(error, 'DynamicPage');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPage();
  }, [slug, toast]);
  
  if (isLoading) {
    return <PageLoader />;
  }
  
  if (!page) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }
  
  return <PageRenderer page={page} />;
}
