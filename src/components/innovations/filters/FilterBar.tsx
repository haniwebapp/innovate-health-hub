
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  stageFilter: string;
  setStageFilter: (stage: string) => void;
  categories: string[];
  stages: string[];
  handleResetFilters: () => void;
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  stageFilter,
  setStageFilter,
  categories,
  stages,
  handleResetFilters
}: FilterBarProps) {
  return (
    <div className="mb-8 p-6 rounded-xl bg-white shadow-sm border border-moh-lightGreen">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Innovations
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search by title or description..."
              className="block w-full pl-10 pr-3 py-2 border border-moh-green/20 rounded-md leading-5 bg-white 
                  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-moh-green focus:border-moh-green sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full md:w-64">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            className="block w-full pl-3 pr-10 py-2 border border-moh-green/20 rounded-md leading-5 bg-white 
                focus:outline-none focus:ring-2 focus:ring-moh-green focus:border-moh-green sm:text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-full md:w-64">
          <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
            Stage
          </label>
          <select
            id="stage"
            className="block w-full pl-3 pr-10 py-2 border border-moh-green/20 rounded-md leading-5 bg-white 
                focus:outline-none focus:ring-2 focus:ring-moh-green focus:border-moh-green sm:text-sm"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
          >
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
