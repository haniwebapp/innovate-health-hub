
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PageSection } from "@/types/pageTypes";
import { Button } from "@/components/ui/button";

interface PagePreviewProps {
  title: string;
  sections: PageSection[];
}

export const PagePreview: React.FC<PagePreviewProps> = ({ title, sections }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="border rounded-lg p-6 bg-white min-h-[500px]">
          <h1 className="text-2xl font-bold mb-4">{title || "Page Title"}</h1>
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="border-b pb-6 last:border-0">
                {section.title && (
                  <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                )}
                {section.content && (
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{section.content}</p>
                  </div>
                )}
                {section.type === 'image-text' && section.imageUrl && (
                  <div className={`flex flex-col md:flex-row gap-4 mt-4 ${section.alignment === 'right' ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2">
                      <img src={section.imageUrl} alt={section.title || "Section image"} className="rounded-md w-full h-auto" />
                    </div>
                    <div className="md:w-1/2">
                      <p className="whitespace-pre-wrap">{section.content}</p>
                    </div>
                  </div>
                )}
                {section.type === 'cta' && (
                  <div className="mt-4 flex justify-center">
                    <Button disabled>
                      {section.buttonText || "Call to Action"}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
