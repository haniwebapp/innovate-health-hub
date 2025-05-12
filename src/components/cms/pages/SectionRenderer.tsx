
import React, { memo } from 'react';
import { PageSection } from '@/types/pageTypes';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

interface SectionRendererProps {
  section: PageSection;
}

// Using memo to prevent unnecessary rerenders
export const SectionRenderer = memo(({ section }: SectionRendererProps) => {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  // Safely sanitize content
  const sanitizeContent = (content?: string) => {
    return content ? DOMPurify.sanitize(content) : '';
  };
  
  // Render different section types
  const renderSection = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className={`py-16 px-4 ${section.backgroundImage ? 'bg-cover bg-center' : 'bg-primary/10'}`}
               style={section.backgroundImage ? { backgroundImage: `url(${section.backgroundImage})` } : {}}>
            <div className="container mx-auto max-w-4xl text-center">
              {section.title && <h1 className="text-4xl md:text-5xl font-bold mb-6">{section.title}</h1>}
              {section.content && <div className="text-xl mb-8" dangerouslySetInnerHTML={{ __html: sanitizeContent(section.content) }} />}
              {section.buttonText && (
                <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                  {section.buttonText}
                </button>
              )}
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              {section.title && <h2 className="text-3xl font-bold mb-6">{section.title}</h2>}
              {section.content && <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeContent(section.content) }} />}
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              {section.title && <h2 className="text-3xl font-bold mb-6 text-center">{section.title}</h2>}
              {section.imageUrl && (
                <div className="rounded-lg overflow-hidden shadow-lg my-6">
                  <img src={section.imageUrl} alt={section.title || 'Section image'} className="w-full h-auto" />
                </div>
              )}
              {section.content && <div className="mt-6 text-center" dangerouslySetInnerHTML={{ __html: sanitizeContent(section.content) }} />}
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div className="py-12 px-4">
            <div className="container mx-auto max-w-6xl">
              {section.title && <h2 className="text-3xl font-bold mb-10 text-center">{section.title}</h2>}
              {section.items && section.items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                      {item.title && <h3 className="text-xl font-semibold mb-3">{item.title}</h3>}
                      {item.content && <div dangerouslySetInnerHTML={{ __html: sanitizeContent(item.content) }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="py-8 px-4">
            <div className="container mx-auto border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
              <p>Unknown section type: {section.type}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.section
      variants={sectionVariants}
      className={`section section-${section.type} ${section.alignment ? `text-${section.alignment}` : ''}`}
    >
      {renderSection()}
    </motion.section>
  );
}, (prevProps, nextProps) => {
  // Custom comparison logic for memoization
  // Only re-render if the section actually changed
  return JSON.stringify(prevProps.section) === JSON.stringify(nextProps.section);
});

SectionRenderer.displayName = 'SectionRenderer';
