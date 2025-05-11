
import { MessageItem } from "./MessageItem";
import { Message, Thread } from "@/utils/messageUtils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { MessageCircle } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  selectedThread: Thread | null;
  currentUserId: string;
  isLoading: boolean;
}

export function MessageList({ 
  messages, 
  selectedThread, 
  currentUserId, 
  isLoading 
}: MessageListProps) {
  if (isLoading) {
    return (
      <Card className="flex-1 p-4">
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-6 w-6 text-muted-foreground animate-spin mr-2" />
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </Card>
    );
  }

  if (!selectedThread) {
    return (
      <Card className="flex-1 p-4">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <MessageCircle className="h-12 w-12 text-muted-foreground/50 mb-2" />
          <p className="text-muted-foreground">Select a conversation or create a new one</p>
        </div>
      </Card>
    );
  }

  if (messages.length === 0) {
    return (
      <Card className="flex-1 p-4">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <MessageCircle className="h-12 w-12 text-muted-foreground/50 mb-2" />
          <p className="text-muted-foreground">No messages yet</p>
          <p className="text-xs text-muted-foreground/75 mt-1">
            Start the conversation by typing a message below
          </p>
        </div>
      </Card>
    );
  }

  return (
    <ScrollArea className="flex-1 pr-4">
      <div className="space-y-4 pb-4 p-4">
        {messages.map((message) => (
          <MessageItem 
            key={message.id} 
            message={message}
            isFromCurrentUser={message.sender_id === currentUserId} 
          />
        ))}
      </div>
    </ScrollArea>
  );
}
