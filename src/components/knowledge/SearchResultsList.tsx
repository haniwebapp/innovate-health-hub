
import React from 'react';
import { ResourceCard } from '@/components/knowledge/ResourceCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchResultsListProps {
  results: Array<{
    id: string;
    title: string;
    summary: string;
    type: string;
    category: string;
    relevanceScore: number;
  }>;
  loading?: boolean;
}

export function SearchResultsList({ results, loading = false }: SearchResultsListProps) {
  const { t } = useLanguage();
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 h-64 animate-pulse bg-muted/20"></div>
        ))}
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">{t('knowledge.noResultsFound')}</h3>
        <p className="text-muted-foreground">
          {t('knowledge.tryDifferentSearch')}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <ResourceCard
          key={result.id}
          resource={{
            id: result.id,
            title: result.title,
            description: result.summary,
            type: result.type,
            category: result.category,
            matchScore: result.relevanceScore
          }}
        />
      ))}
    </div>
  );
}
