
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AdminLoadingProps {
  message?: string;
}

export function AdminLoading({ message = "Loading data..." }: AdminLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <Loader2 className="h-12 w-12 text-moh-green animate-spin mb-4" />
      <p className="text-moh-green text-lg font-medium">{message}</p>
    </div>
  );
}

interface AdminErrorProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function AdminError({ 
  title = "An error occurred", 
  description = "There was a problem loading the data. Please try again later.", 
  onRetry 
}: AdminErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Alert variant="destructive" className="mb-4 max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-moh-green text-white rounded-md hover:bg-moh-darkGreen transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function AdminEmpty({ message = "No items found" }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
      <p className="text-lg mb-2">{message}</p>
      <p className="text-sm">Try adjusting your filters or add new items.</p>
    </div>
  );
}
