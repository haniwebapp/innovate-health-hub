
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

interface SupportChatMessageProps {
  type: "user" | "assistant";
  content: string;
}

export function SupportChatMessage({ type, content }: SupportChatMessageProps) {
  return (
    <div 
      className={`flex ${type === "user" ? "justify-end" : "justify-start"}`}
    >
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          type === "user" 
            ? "bg-moh-green text-white" 
            : "bg-slate-100 text-slate-800"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          {type === "user" ? (
            <div className="flex items-center gap-1 text-xs opacity-80">
              <span>You</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs opacity-80">
              <MessageSquare size={12} />
              <span>Support Assistant</span>
            </div>
          )}
        </div>
        <div className="whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
}
