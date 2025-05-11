
import { AlertCircle, Loader2, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLoadingProps {
  message?: string;
}

export function AdminLoading({ message = "Loading..." }: AdminLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Loader2 className="h-8 w-8 text-moh-green animate-spin mb-4" />
      <p className="text-muted-foreground font-medium">{message}</p>
    </div>
  );
}

interface AdminErrorProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function AdminError({
  title = "Something went wrong",
  description = "There was a problem with your request.",
  onRetry,
}: AdminErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-red-100 p-3 mb-4">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="border-moh-green/30 text-moh-darkGreen hover:bg-moh-lightGreen/20"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}

interface AdminEmptyProps {
  message?: string;
  icon?: React.ReactNode;
}

export function AdminEmpty({
  message = "No items found",
  icon = <Search className="h-8 w-8 text-muted-foreground" />,
}: AdminEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed rounded-lg bg-muted/20">
      <div className="mb-4">
        {icon}
      </div>
      <p className="text-muted-foreground max-w-md">{message}</p>
    </div>
  );
}
