
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading page data..." }) => {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
        <p>{message}</p>
      </div>
    </div>
  );
};
