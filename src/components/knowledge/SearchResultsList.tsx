
import React from 'react';
import { ResourceCard } from '@/components/knowledge/ResourceCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { SearchResults } from '@/services/ai/KnowledgeAIService';

interface SearchResultItemType {
  id: string;
  title: string;
  summary?: string;
  snippet?: string;
  type: string;
  category: string;
  relevanceScore: number;
}

interface SearchResultsListProps {
  results: Array<SearchResultItemType> | SearchResults;
  loading?: boolean;
  searchQuery?: string;
}

export function SearchResultsList({ results, loading = false, searchQuery }: SearchResultsListProps) {
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
  
  // Handle both array of results and SearchResults object
  const resultsArray = Array.isArray(results) ? results : (results as SearchResults).results || [];
  
  if (resultsArray.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">{t('knowledge.noResultsFound')}</h3>
        <p className="text-muted-foreground">
          {searchQuery ? t('knowledge.tryDifferentSearch') : t('knowledge.enterSearchQuery')}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resultsArray.map((result) => (
        <ResourceCard
          key={result.id}
          resource={{
            id: result.id,
            title: result.title,
            description: result.summary || result.snippet || "",
            type: result.type,
            category: result.category,
            matchScore: result.relevanceScore
          }}
        />
      ))}
    </div>
  );
}
