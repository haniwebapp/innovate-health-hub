
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, RefreshCcw } from "lucide-react";

interface EmptyStateMessageProps {
  onReset?: () => void;
}

export const EmptyStateMessage = ({ onReset }: EmptyStateMessageProps) => {
  return (
    <div className="min-w-full flex items-center justify-center py-12">
      <div className="text-center text-gray-500 space-y-4">
        <div className="mx-auto w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-xl font-medium mb-2">No innovations found</p>
        <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
        {onReset && (
          <Button variant="outline" onClick={onReset} className="mt-4">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};
