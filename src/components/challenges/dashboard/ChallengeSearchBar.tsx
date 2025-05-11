
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ChallengeSearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function ChallengeSearchBar({
  searchQuery,
  setSearchQuery
}: ChallengeSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
      <Input
        placeholder="Search challenges by title or description..."
        className="pl-10 mb-6"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
