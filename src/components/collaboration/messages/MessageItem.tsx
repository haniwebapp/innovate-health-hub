
import { Message } from "@/utils/messageUtils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState, useEffect } from "react";

interface MessageItemProps {
  message: Message;
  isFromCurrentUser: boolean;
}

export function MessageItem({ message, isFromCurrentUser }: MessageItemProps) {
  const [formattedTime, setFormattedTime] = useState<string>("");
  
  // Format the timestamp
  useEffect(() => {
    const messageDate = new Date(message.created_at);
    setFormattedTime(format(messageDate, "p"));
  }, [message.created_at]);
  
  // Get the initials for the avatar
  const getInitials = (id: string) => {
    return id.substring(0, 2).toUpperCase();
  };

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[85%]",
        isFromCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback className={cn(
          isFromCurrentUser ? "bg-moh-green/20 text-moh-green" : "bg-slate-200 text-slate-600"
        )}>
          {getInitials(message.sender_id)}
        </AvatarFallback>
      </Avatar>
      <div>
        <div
          className={cn(
            "p-3 rounded-lg",
            isFromCurrentUser
              ? "bg-moh-green text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground block mt-1 px-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
