
import { useState } from "react";
import { Thread } from "@/utils/messageUtils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Users, MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ThreadListProps {
  threads: Thread[];
  selectedThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  isLoading: boolean;
}

export function ThreadList({ threads, selectedThreadId, onSelectThread, isLoading }: ThreadListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter threads based on search query
  const filteredThreads = threads.filter(thread => 
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format the timestamp to a readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return format(date, "h:mm a"); // Today, show time only
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  };

  return (
    <div className="border-r h-full flex flex-col">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="p-6 flex justify-center">
          <p className="text-muted-foreground">Loading conversations...</p>
        </div>
      ) : filteredThreads.length > 0 ? (
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-1">
            {filteredThreads.map(thread => (
              <Button
                key={thread.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start p-3 h-auto",
                  selectedThreadId === thread.id ? "bg-muted" : "hover:bg-muted"
                )}
                onClick={() => onSelectThread(thread.id)}
              >
                <div className="flex w-full items-start gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={cn(
                      thread.is_group ? "bg-blue-100 text-blue-700" : "bg-moh-green/20 text-moh-green"
                    )}>
                      {thread.title.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex justify-between w-full">
                      <span className="font-medium truncate">{thread.title}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatTimestamp(thread.updated_at)}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground truncate">
                      {thread.is_group ? 'Group conversation' : 'Direct message'}
                    </span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <MessageSquarePlus className="h-12 w-12 text-muted-foreground/50 mb-2" />
          <p className="text-muted-foreground mb-1">No conversations found</p>
          <p className="text-xs text-muted-foreground/75 mb-4">
            Create a new conversation to get started
          </p>
        </div>
      )}
    </div>
  );
}
