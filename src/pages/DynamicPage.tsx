
import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { PageService } from '@/services/page/PageService';
import { WebsitePage } from '@/types/pageTypes';
import { PageRenderer } from '@/components/cms/pages/PageRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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
          // Set page title
          document.title = `${pageData.title} | HealthTech Innovate`;
        }
      } catch (err) {
        console.error('Error fetching page:', err);
        setError('Failed to load page');
        toast({
          title: "Error",
          description: "There was a problem loading the page. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
    
    // Reset page title when unmounting
    return () => {
      document.title = 'HealthTech Innovate';
    };
  }, [slug, toast]);

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
      <motion.div 
        className="container mx-auto py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'Page not found'}
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <PageRenderer page={page} />
    </motion.div>
  );
};

export default DynamicPage;
