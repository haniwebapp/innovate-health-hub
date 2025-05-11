
import { AlertTriangle } from "lucide-react";

export function AccessDeniedSection() {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-6 bg-red-50 border border-red-200 rounded-lg">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-2" />
      <h2 className="text-2xl font-bold text-red-700">Access Denied</h2>
      <p className="text-red-600">You don't have permission to view this page.</p>
    </div>
  );
}
