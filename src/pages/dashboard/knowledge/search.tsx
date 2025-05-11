
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { getRTLClasses } from '@/utils/rtlUtils';
import { LanguageSwitcher } from '@/components/knowledge/LanguageSwitcher';
import { SemanticSearchBar } from '@/components/knowledge/SemanticSearchBar';
import { SearchResultsList } from '@/components/knowledge/SearchResultsList';
import { KnowledgeAIService, SemanticSearchParams, SearchResults } from '@/services/ai/KnowledgeAIService';
import { useToast } from '@/hooks/use-toast';

export default function SearchResultsPage() {
  const { language, t } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  const { toast } = useToast();
  
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (params: SemanticSearchParams) => {
    if (!params.query.trim()) return;
    
    setIsSearching(true);
    setSearchQuery(params.query);
    
    try {
      const results = await KnowledgeAIService.semanticSearch(params);
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
    <div className={`space-y-6 ${language === 'ar' ? 'rtl-mode' : ''}`}>
      <div className={`flex items-center justify-between ${rtlClasses.flex}`}>
        <BreadcrumbNav
          items={[
            { label: t('nav.dashboard'), href: "/dashboard" },
            { label: t('nav.knowledge'), href: "/dashboard/knowledge" }
          ]}
          currentPage={t('knowledge.search')}
        />
        <LanguageSwitcher />
      </div>

      <h1 className={`text-3xl font-bold tracking-tight mb-2 ${rtlClasses.text}`}>
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
        <div className={`${rtlClasses.text} text-center py-12`}>
          <p>
            {t('knowledge.enterSearchQuery')}
          </p>
        </div>
      )}
    </div>
  );
}
