
import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string | null;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md flex items-center">
      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
      <p>{error}</p>
    </div>
  );
};
