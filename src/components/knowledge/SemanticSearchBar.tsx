
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface SemanticSearchParams {
  query: string;
  filters?: {
    category?: string;
    type?: string;
    date?: string;
  };
}

interface SemanticSearchBarProps {
  onSearch: (params: SemanticSearchParams) => void;
  isSearching?: boolean;
}

export function SemanticSearchBar({ onSearch, isSearching = false }: SemanticSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query: searchQuery });
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search for knowledge resources, guidelines, and documentation..."
        className="pl-10 pr-24 py-6"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button 
        type="submit" 
        className="absolute right-1 top-1 bottom-1"
        disabled={isSearching || searchQuery.trim().length === 0}
      >
        {isSearching ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}
