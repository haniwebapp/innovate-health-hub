
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ChallengeSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ChallengeSearchBar({ searchQuery, setSearchQuery }: ChallengeSearchBarProps) {
  return (
    <div className="flex-1">
      <h2 className="text-lg font-medium mb-2">Search Challenges</h2>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search by keywords..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
