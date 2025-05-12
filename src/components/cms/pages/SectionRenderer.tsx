
import React, { memo } from 'react';
import { PageSection } from '@/types/pageTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

interface SectionRendererProps {
  section: PageSection;
}

// Using memo for performance optimization
export const SectionRenderer = memo(({ section }: SectionRendererProps) => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Sanitize content
  const sanitizeContent = (content: string) => {
    return { __html: DOMPurify.sanitize(content) };
  };

  // Render different section types
  switch (section.type) {
    case 'hero':
      return (
        <motion.div 
          className="relative w-full py-24 px-4 flex items-center justify-center text-center bg-cover bg-center min-h-[400px]"
          style={section.backgroundImage ? { backgroundImage: `url(${section.backgroundImage})` } : {}}
          variants={sectionVariants}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            {section.title && <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{section.title}</h1>}
            {section.content && <p className="text-xl text-white/90 mb-8" dangerouslySetInnerHTML={sanitizeContent(section.content)} />}
            {section.buttonText && (
              <Button size="lg">
                {section.buttonText}
              </Button>
            )}
          </div>
        </motion.div>
      );
      
    case 'text':
      return (
        <motion.section 
          className="py-12 px-4"
          variants={sectionVariants}
        >
          <div className="container mx-auto max-w-4xl">
            {section.title && <h2 className="text-3xl font-bold mb-6">{section.title}</h2>}
            {section.content && <div className="prose max-w-none" dangerouslySetInnerHTML={sanitizeContent(section.content)} />}
          </div>
        </motion.section>
      );
      
    case 'image-text':
      return (
        <motion.section 
          className="py-16 px-4"
          variants={sectionVariants}
        >
          <div className="container mx-auto">
            <div className={`flex flex-col ${section.alignment === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
              {section.imageUrl && (
                <div className="w-full md:w-1/2">
                  <motion.img 
                    src={section.imageUrl} 
                    alt={section.title || "Section image"} 
                    className="rounded-lg shadow-lg w-full h-auto"
                    loading="lazy"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
              <div className="w-full md:w-1/2">
                {section.title && <h2 className="text-3xl font-bold mb-4">{section.title}</h2>}
                {section.content && <div dangerouslySetInnerHTML={sanitizeContent(section.content)} className="text-gray-700" />}
              </div>
            </div>
          </div>
        </motion.section>
      );
      
    case 'cta':
      return (
        <motion.section 
          className="bg-primary/10 py-16 px-4"
          variants={sectionVariants}
        >
          <div className="container mx-auto text-center max-w-3xl">
            {section.title && <h2 className="text-3xl font-bold mb-4">{section.title}</h2>}
            {section.content && <p className="text-xl mb-8" dangerouslySetInnerHTML={sanitizeContent(section.content)} />}
            {section.buttonText && (
              <Button size="lg">
                {section.buttonText}
              </Button>
            )}
          </div>
        </motion.section>
      );

    case 'cards':
      return (
        <motion.section 
          className="py-16 px-4"
          variants={sectionVariants}
        >
          <div className="container mx-auto">
            {section.title && <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items?.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-md">
                    {item.title && (
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                    )}
                    <CardContent>
                      {item.content && <div dangerouslySetInnerHTML={sanitizeContent(item.content)} />}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      );
      
    default:
      return (
        <div className="p-4 my-4 border border-gray-200 rounded">
          <p className="text-sm text-gray-500">Unknown section type: {section.type}</p>
        </div>
      );
  }
});

// Add display name for better debugging
SectionRenderer.displayName = 'SectionRenderer';
