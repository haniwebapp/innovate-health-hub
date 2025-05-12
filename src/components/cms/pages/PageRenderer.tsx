
import React, { useEffect } from 'react';
import { WebsitePage } from '@/types/pageTypes';
import { SectionRenderer } from './SectionRenderer';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

interface PageRendererProps {
  page: WebsitePage;
}

export function PageRenderer({ page }: PageRendererProps) {
  const { toast } = useToast();
  
  // Set proper page metadata
  useEffect(() => {
    // Check if the page has sections before attempting to render
    if (!page.content?.sections || page.content.sections.length === 0) {
      toast({
        title: "Warning",
        description: "This page doesn't have any content sections.",
        variant: "default"
      });
    }
  }, [page, toast]);
  
  // Safely parse page content with sanitization
  const sanitizedTitle = DOMPurify.sanitize(page.title);
  const sanitizedDescription = page.description || page.metaDescription || '';
  const description = DOMPurify.sanitize(sanitizedDescription);
  
  // Animation variants for staggered section animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="page-container min-h-screen">
      <Helmet>
        <title>{sanitizedTitle} | HealthTech Innovate</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={sanitizedTitle} />
        <meta property="og:description" content={description} />
      </Helmet>

      {/* Render each section in the page content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {page.content?.sections ? (
          page.content.sections.map((section, index) => (
            <SectionRenderer key={index} section={section} />
          ))
        ) : (
          <div className="container mx-auto py-12 text-center">
            <p className="text-muted-foreground">This page has no content sections.</p>
          </div>
        )}
      </motion.main>
    </div>
  );
}
