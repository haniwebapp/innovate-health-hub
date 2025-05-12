
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageService } from '@/services/page/PageService';
import { WebsitePage } from '@/types/pageTypes';
import { PageRenderer } from '@/components/cms/pages/PageRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!slug) {
          setError('Page not found');
          setLoading(false);
          return;
        }
        
        const pageData = await PageService.getPageBySlug(slug);
        
        if (!pageData) {
          setError('Page not found');
        } else if (!pageData.published) {
          setError('This page is not published yet');
        } else {
          setPage(pageData);
        }
      } catch (err) {
        console.error('Error fetching page:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 space-y-6">
        <Skeleton className="h-12 w-full max-w-xl mb-6" />
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container mx-auto py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'Page not found'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <PageRenderer page={page} />;
};

export default DynamicPage;
