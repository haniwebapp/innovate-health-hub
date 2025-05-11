
import { useState } from "react";
import { Thread } from "@/utils/messageUtils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
    return format(new Date(timestamp), "MMM d");
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-20">
          <p className="text-muted-foreground">Loading conversations...</p>
        </div>
      </div>
    );
  }

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
      
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1">
          {filteredThreads.length > 0 ? (
            filteredThreads.map(thread => (
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
                    <AvatarFallback>
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
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No conversations found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
