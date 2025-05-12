
import React from 'react';
import { PageSection } from '@/types/pageTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SectionRendererProps {
  section: PageSection;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  // Render different section types
  switch (section.type) {
    case 'hero':
      return (
        <div 
          className="relative w-full py-24 px-4 flex items-center justify-center text-center bg-cover bg-center min-h-[400px]"
          style={section.backgroundImage ? { backgroundImage: `url(${section.backgroundImage})` } : {}}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            {section.title && <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{section.title}</h1>}
            {section.content && <p className="text-xl text-white/90 mb-8">{section.content}</p>}
            {section.buttonText && (
              <Button size="lg">
                {section.buttonText}
              </Button>
            )}
          </div>
        </div>
      );
      
    case 'text':
      return (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {section.title && <h2 className="text-3xl font-bold mb-6">{section.title}</h2>}
            {section.content && <div className="prose max-w-none">{section.content}</div>}
          </div>
        </section>
      );
      
    case 'image-text':
      return (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className={`flex flex-col ${section.alignment === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
              {section.imageUrl && (
                <div className="w-full md:w-1/2">
                  <img 
                    src={section.imageUrl} 
                    alt={section.title || "Section image"} 
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
              )}
              <div className="w-full md:w-1/2">
                {section.title && <h2 className="text-3xl font-bold mb-4">{section.title}</h2>}
                {section.content && <p className="text-gray-700">{section.content}</p>}
              </div>
            </div>
          </div>
        </section>
      );
      
    case 'cta':
      return (
        <section className="bg-primary/10 py-16 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            {section.title && <h2 className="text-3xl font-bold mb-4">{section.title}</h2>}
            {section.content && <p className="text-xl mb-8">{section.content}</p>}
            {section.buttonText && (
              <Button size="lg">
                {section.buttonText}
              </Button>
            )}
          </div>
        </section>
      );

    case 'cards':
      return (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {section.title && <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items?.map((item, idx) => (
                <Card key={idx}>
                  {item.title && (
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                  )}
                  <CardContent>
                    {item.content && <p>{item.content}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );
      
    default:
      return (
        <div className="p-4 my-4 border border-gray-200 rounded">
          <p className="text-sm text-gray-500">Unknown section type: {section.type}</p>
        </div>
      );
  }
}
