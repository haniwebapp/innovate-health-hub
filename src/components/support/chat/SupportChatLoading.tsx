
import { Loader2, MessageSquare } from "lucide-react";

export function SupportChatLoading() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-lg p-3 bg-slate-100 text-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center gap-1 text-xs opacity-80">
            <MessageSquare size={12} />
            <span>Support Assistant</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Thinking...</span>
        </div>
      </div>
    </div>
  );
}
