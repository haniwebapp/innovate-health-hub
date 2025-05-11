
import { useState } from "react";
import { MessageItem } from "./MessageItem";
import { Message, Thread } from "@/utils/messageUtils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

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
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </Card>
    );
  }

  if (!selectedThread) {
    return (
      <Card className="flex-1 p-4">
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Select a conversation</p>
        </div>
      </Card>
    );
  }

  if (messages.length === 0) {
    return (
      <Card className="flex-1 p-4">
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No messages yet</p>
        </div>
      </Card>
    );
  }

  return (
    <ScrollArea className="flex-1 pr-4">
      <div className="space-y-4 pb-4">
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
