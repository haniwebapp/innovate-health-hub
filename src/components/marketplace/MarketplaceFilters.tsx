
import { Search, List, Grid, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MarketplaceFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  saveSearch: () => void;
  resultsCount: number;
}

export default function MarketplaceFilters({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  saveSearch,
  resultsCount
}: MarketplaceFiltersProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search box */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search innovations by name, description, or tags..."
            className="pl-10 border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Actions and view toggle */}
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={saveSearch}>
                  <BookmarkPlus size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save this search & get notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className={`rounded-none ${viewMode === "grid" ? "bg-moh-green text-white" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={18} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className={`rounded-none ${viewMode === "list" ? "bg-moh-green text-white" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mt-4 text-sm text-gray-600">
        Found {resultsCount} {resultsCount === 1 ? 'innovation' : 'innovations'}
      </div>
    </div>
  );
}
