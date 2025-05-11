import React, { useState, useRef } from 'react';
import { Search, Filter, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';
import { getRTLClasses } from '@/utils/rtlUtils';

interface SemanticSearchParams {
  query: string;
  filters?: {
    categories?: string[];
    types?: string[];
    tags?: string[];
  };
  limit?: number;
  language?: string;
}

const filterOptions = {
  categories: ['Regulations', 'Guidelines', 'Reports', 'Tutorials'],
  types: ['Document', 'Article', 'Video', 'Infographic'],
  tags: ['AI', 'Cloud', 'Security', 'Privacy'],
};

export function SemanticSearchBar({ onSearch }: { onSearch: (params: any) => void }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    types: [] as string[],
    tags: [] as string[],
  });
  const { language, t } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSearching(true);
    
    const params: SemanticSearchParams = {
      query: query,
      filters: selectedFilters,
      language: language,
    };
    
    onSearch(params);
    setIsSearching(false);
  };
  
  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setSelectedFilters(prevFilters => {
      const filterArray = prevFilters[filterType] || [];
      
      if (checked) {
        return {
          ...prevFilters,
          [filterType]: [...filterArray, value],
        };
      } else {
        return {
          ...prevFilters,
          [filterType]: filterArray.filter(item => item !== value),
        };
      }
    });
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className={`relative flex w-full items-center ${rtlClasses.flex}`}>
        <Input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('knowledge.searchPlaceholder')}
          className="pr-10 flex-1"
          disabled={isSearching}
        />
        {query && !isSearching && (
          <button 
            type="button"
            className="absolute right-10 text-muted-foreground hover:text-foreground"
            onClick={() => setQuery('')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <Button 
          type="submit" 
          variant="ghost" 
          className="absolute right-0 px-3 h-full" 
          disabled={isSearching}
        >
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </form>
      
      {/* Filter section */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mt-2">
            <Filter className="h-4 w-4 mr-2" />
            {t('knowledge.filter')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <Card>
            <CardContent className="grid gap-4">
              <h4 className="font-medium leading-none">{t('knowledge.categories')}</h4>
              {filterOptions.categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedFilters.categories.includes(category)}
                  onCheckedChange={(checked) => handleFilterChange('categories', category, checked)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
              
              <h4 className="font-medium leading-none">{t('knowledge.types')}</h4>
              {filterOptions.types.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedFilters.types.includes(type)}
                  onCheckedChange={(checked) => handleFilterChange('types', type, checked)}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
              
              <h4 className="font-medium leading-none">{t('knowledge.tags')}</h4>
              {filterOptions.tags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={selectedFilters.tags.includes(tag)}
                  onCheckedChange={(checked) => handleFilterChange('tags', tag, checked)}
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))}
            </CardContent>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
