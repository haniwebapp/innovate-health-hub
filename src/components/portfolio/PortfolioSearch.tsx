
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PortfolioSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function PortfolioSearch({ searchQuery, setSearchQuery }: PortfolioSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search portfolio..." 
        className="pl-8 border-moh-green/20 focus-visible:ring-moh-green/30" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
