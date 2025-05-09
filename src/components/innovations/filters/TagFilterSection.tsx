
import { Badge } from "@/components/ui/badge";

interface TagFilterSectionProps {
  allTags: string[];
  tagFilter: string | null;
  setTagFilter: (tag: string | null) => void;
}

export default function TagFilterSection({ 
  allTags, 
  tagFilter, 
  setTagFilter 
}: TagFilterSectionProps) {
  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Popular tags:</span>
        {allTags.slice(0, 6).map(tag => (
          <Badge 
            key={tag}
            variant="outline" 
            className={`cursor-pointer hover:bg-gray-100 ${tag === tagFilter ? 'bg-moh-lightGreen text-moh-darkGreen' : 'bg-white'}`}
            onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
