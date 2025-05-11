
import { AlertCircle, Check, Clock, Loader2, RefreshCw, Search, ServerOff } from "lucide-react";
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

interface AdminSuccessProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminSuccess({ title, description, action }: AdminSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-green-100 p-3 mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

interface AdminOfflineProps {
  message?: string;
  onRetry?: () => void;
}

export function AdminOffline({ 
  message = "You appear to be offline. Please check your connection.",
  onRetry
}: AdminOfflineProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-amber-100 p-3 mb-4">
        <ServerOff className="h-8 w-8 text-amber-600" />
      </div>
      <h3 className="text-lg font-medium mb-1">Connection Error</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{message}</p>
      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="border-amber-300 text-amber-700 hover:bg-amber-50"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reconnect
        </Button>
      )}
    </div>
  );
}

interface AdminPendingProps {
  message?: string;
}

export function AdminPending({ message = "Processing request..." }: AdminPendingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-blue-100 p-3 mb-4">
        <Clock className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-lg font-medium mb-1">Processing</h3>
      <p className="text-muted-foreground max-w-md">{message}</p>
    </div>
  );
}
