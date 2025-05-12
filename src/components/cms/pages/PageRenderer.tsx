
import React from 'react';
import { WebsitePage } from '@/types/pageTypes';
import { SectionRenderer } from './SectionRenderer';

interface PageRendererProps {
  page: WebsitePage;
}

export function PageRenderer({ page }: PageRendererProps) {
  return (
    <div className="page-container">
      {/* Page title can be rendered as a header if needed */}
      <title>{page.title}</title>

      {/* Render each section in the page content */}
      <main>
        {page.content.sections.map((section, index) => (
          <SectionRenderer key={index} section={section} />
        ))}
      </main>
    </div>
  );
}
