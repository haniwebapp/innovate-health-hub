
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface ChallengeFilterBarProps {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
  handleResetFilters: () => void;
}

export default function ChallengeFilterBar({ 
  categoryFilter, 
  setCategoryFilter, 
  categories,
  handleResetFilters 
}: ChallengeFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
      <ChallengeSearchBar searchQuery={''} setSearchQuery={() => {}} />
      <div className="w-full md:w-64">
        <h2 className="text-lg font-medium mb-2">Filter by Category</h2>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
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
      <Button variant="outline" onClick={handleResetFilters} className="h-10">
        <Filter className="h-4 w-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );
}
