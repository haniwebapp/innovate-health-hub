
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRTLClasses } from "@/utils/rtlUtils";
import { SemanticSearchParams } from "@/services/ai/KnowledgeAIService";

// Sample filter options - replace with your actual options
const CATEGORY_OPTIONS = [
  { id: 'regulatory', label: 'Regulatory' },
  { id: 'clinical', label: 'Clinical' },
  { id: 'technical', label: 'Technical' },
  { id: 'innovation', label: 'Innovation' },
  { id: 'investment', label: 'Investment' }
];

const TYPE_OPTIONS = [
  { id: 'document', label: 'Document' },
  { id: 'video', label: 'Video' },
  { id: 'presentation', label: 'Presentation' },
  { id: 'course', label: 'Course' },
  { id: 'research', label: 'Research Paper' }
];

const TAG_OPTIONS = [
  { id: 'ai', label: 'AI' },
  { id: 'telemedicine', label: 'Telemedicine' },
  { id: 'digital-health', label: 'Digital Health' },
  { id: 'regulations', label: 'Regulations' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'funding', label: 'Funding' },
  { id: 'startups', label: 'Startups' }
];

interface SemanticSearchBarProps {
  onSearch: (params: SemanticSearchParams) => void;
  isSearching?: boolean;
}

export function SemanticSearchBar({ onSearch, isSearching = false }: SemanticSearchBarProps) {
  const { language, t } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<SemanticSearchParams['filters']>({
    categories: [],
    types: [],
    tags: []
  });

  const handleSearch = () => {
    if (query.trim()) {
      onSearch({
        query,
        filters,
        language
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleCategory = (categoryId: string) => {
    setFilters(prev => {
      const currentCategories = prev.categories || [];
      return {
        ...prev,
        categories: currentCategories.includes(categoryId)
          ? currentCategories.filter(id => id !== categoryId)
          : [...currentCategories, categoryId]
      };
    });
  };

  const toggleType = (typeId: string) => {
    setFilters(prev => {
      const currentTypes = prev.types || [];
      return {
        ...prev,
        types: currentTypes.includes(typeId)
          ? currentTypes.filter(id => id !== typeId)
          : [...currentTypes, typeId]
      };
    });
  };

  const toggleTag = (tagId: string) => {
    setFilters(prev => {
      const currentTags = prev.tags || [];
      return {
        ...prev,
        tags: currentTags.includes(tagId)
          ? currentTags.filter(id => id !== tagId)
          : [...currentTags, tagId]
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      types: [],
      tags: []
    });
  };

  // Count active filters
  const activeFilterCount = 
    (filters.categories?.length || 0) + 
    (filters.types?.length || 0) + 
    (filters.tags?.length || 0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={`flex flex-row items-center gap-2 ${rtlClasses.flex}`}>
        <div className="relative flex-1">
          <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`${language === 'ar' ? 'pr-10' : 'pl-10'}`}
            placeholder={t('knowledge.searchPlaceholder')}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
        
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">{t('knowledge.filters')}</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-moh-green text-[10px] font-medium text-white">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className={`${language === 'ar' ? 'rtl-mode' : ''}`}>
            <DialogHeader>
              <DialogTitle className={rtlClasses.text}>
                <Filter className={`h-4 w-4 inline ${rtlClasses.iconMargin}`} />
                {t('knowledge.searchFilters')}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <h4 className={`font-medium ${rtlClasses.text}`}>
                  {t('knowledge.categories')}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORY_OPTIONS.map(category => (
                    <div key={category.id} className={`flex items-center space-x-2 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                      <Checkbox 
                        id={`category-${category.id}`}
                        checked={(filters.categories || []).includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label 
                        htmlFor={`category-${category.id}`}
                        className={rtlClasses.text}
                      >
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className={`font-medium ${rtlClasses.text}`}>
                  {t('knowledge.resourceTypes')}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {TYPE_OPTIONS.map(type => (
                    <div key={type.id} className={`flex items-center space-x-2 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                      <Checkbox 
                        id={`type-${type.id}`}
                        checked={(filters.types || []).includes(type.id)}
                        onCheckedChange={() => toggleType(type.id)}
                      />
                      <Label 
                        htmlFor={`type-${type.id}`}
                        className={rtlClasses.text}
                      >
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className={`font-medium ${rtlClasses.text}`}>
                  {t('knowledge.tags')}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {TAG_OPTIONS.map(tag => (
                    <div key={tag.id} className={`flex items-center space-x-2 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                      <Checkbox 
                        id={`tag-${tag.id}`}
                        checked={(filters.tags || []).includes(tag.id)}
                        onCheckedChange={() => toggleTag(tag.id)}
                      />
                      <Label 
                        htmlFor={`tag-${tag.id}`}
                        className={rtlClasses.text}
                      >
                        {tag.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter className={`flex ${rtlClasses.justify}`}>
              <Button
                variant="outline"
                onClick={clearFilters}
                className={rtlClasses.margin}
              >
                {t('knowledge.clearFilters')}
              </Button>
              <Button onClick={() => setIsFilterOpen(false)}>
                {t('knowledge.applyFilters')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Button 
          onClick={handleSearch} 
          disabled={!query.trim() || isSearching}
          className="bg-moh-darkGreen hover:bg-moh-green"
        >
          {isSearching ? (
            <>
              <Loader2 className={`h-4 w-4 animate-spin ${rtlClasses.iconMargin}`} />
              {t('knowledge.searching')}
            </>
          ) : (
            <>
              <Search className={`h-4 w-4 ${rtlClasses.iconMargin}`} />
              {t('knowledge.search')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
