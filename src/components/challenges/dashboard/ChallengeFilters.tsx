
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";

interface ChallengeFiltersProps {
  categories: string[];
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  handleResetFilters: () => void;
}

export default function ChallengeFilters({
  categories,
  categoryFilter,
  setCategoryFilter,
  handleResetFilters
}: ChallengeFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <TabsList>
        <TabsTrigger value="all">All Challenges</TabsTrigger>
        <TabsTrigger value="submitted">My Submissions</TabsTrigger>
        <TabsTrigger value="not-submitted">Not Submitted</TabsTrigger>
      </TabsList>
      
      <div className="flex items-center gap-2">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
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
        
        <Button variant="outline" onClick={handleResetFilters} size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
