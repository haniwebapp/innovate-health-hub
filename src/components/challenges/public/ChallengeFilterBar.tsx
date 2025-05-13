
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, XCircle } from "lucide-react";

interface ChallengeFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
  handleResetFilters: () => void;
}

export default function ChallengeFilterBar({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  categories,
  handleResetFilters
}: ChallengeFilterBarProps) {
  const hasActiveFilters = searchQuery || categoryFilter !== "All Categories";
  
  return (
    <div className="mb-8 p-6 rounded-xl bg-white shadow-sm border border-moh-lightGreen">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Challenges
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              id="search"
              type="text"
              placeholder="Search by title or description..."
              className="pl-10 border-moh-green/20 focus-visible:ring-moh-green"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <XCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-64">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category" className="border-moh-green/20 focus:ring-moh-green">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            className="border-moh-green text-moh-green hover:bg-moh-lightGreen"
            onClick={handleResetFilters}
          >
            <Filter className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
