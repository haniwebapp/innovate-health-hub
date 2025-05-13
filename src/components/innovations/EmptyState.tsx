
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onResetFilters: () => void;
}

export default function EmptyState({ onResetFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12 bg-moh-lightGreen/20 rounded-lg border border-dashed border-moh-green/30">
      <div className="w-16 h-16 mx-auto mb-4 bg-moh-lightGreen rounded-full flex items-center justify-center">
        <Lightbulb className="text-moh-green h-8 w-8" />
      </div>
      <h3 className="text-xl font-medium mb-2 text-moh-darkGreen">No innovations found</h3>
      <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
      <Button onClick={onResetFilters} className="bg-moh-green hover:bg-moh-darkGreen">
        Reset Filters
      </Button>
    </div>
  );
}
