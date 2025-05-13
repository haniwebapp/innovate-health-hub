
import React from 'react';

export const EmptyStateMessage = () => {
  return (
    <div className="min-w-full flex items-center justify-center py-12">
      <div className="text-center text-gray-500">
        <p className="text-xl font-medium mb-2">No innovations found</p>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    </div>
  );
};
