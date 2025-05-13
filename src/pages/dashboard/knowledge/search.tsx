
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/knowledge/LanguageSwitcher';
import { SemanticSearchBar, SemanticSearchParams as UISearchParams } from '@/components/knowledge/SemanticSearchBar';
import { SearchResultsList } from '@/components/knowledge/SearchResultsList';
import { KnowledgeAIService, SearchResults } from '@/services/ai/KnowledgeAIService';
import { useToast } from '@/hooks/use-toast';

export default function SearchResultsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Convert UI search params to API search params
  const handleSearch = async (params: UISearchParams) => {
    if (!params.query.trim()) return;
    
    setIsSearching(true);
    setSearchQuery(params.query);
    
    try {
      // Convert UI params to API params
      const apiParams = {
        query: params.query,
        filters: params.filters ? {
          categories: params.filters.category ? [params.filters.category] : undefined,
          types: params.filters.type ? [params.filters.type] : undefined,
          tags: undefined
        } : undefined
      };
      
      const results = await KnowledgeAIService.semanticSearch(apiParams);
      setSearchResults(results);
      setHasSearched(true);
    } catch (error: any) {
      console.error("Search error:", error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: t('knowledge.searchError'),
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav
          items={[
            { label: t('nav.dashboard'), href: "/dashboard" },
            { label: t('nav.knowledge'), href: "/dashboard/knowledge" }
          ]}
          currentPage={t('knowledge.search')}
        />
        <LanguageSwitcher />
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {t('knowledge.searchResults')}
      </h1>

      <SemanticSearchBar onSearch={handleSearch} isSearching={isSearching} />

      {hasSearched ? (
        <SearchResultsList 
          results={searchResults?.results || []} 
          loading={isSearching}
          searchQuery={searchQuery}
        />
      ) : (
        <div className="text-center py-12">
          <p>
            {t('knowledge.enterSearchQuery')}
          </p>
        </div>
      )}
    </div>
  );
}
