
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { MessageList } from "@/components/collaboration/messages/MessageList";
import { MessageComposer } from "@/components/collaboration/messages/MessageComposer";
import { ThreadList } from "@/components/collaboration/messages/ThreadList";
import { Thread, Message, fetchUserThreads, fetchThreadMessages, sendMessage, markMessagesAsRead, createThread } from "@/utils/messageUtils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import NewThreadDialog from "@/components/collaboration/messages/NewThreadDialog";

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();
  
  // Fetch user threads on component mount
  useEffect(() => {
    const loadThreads = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);
        
        if (!user) {
          setFetchError("Authentication required");
          setIsLoading(false);
          return;
        }
        
        const userThreads = await fetchUserThreads();
        setThreads(userThreads);
      } catch (error) {
        console.error("Failed to load threads:", error);
        setFetchError("Failed to load conversations");
        toast({
          variant: "destructive",
          title: "Error loading conversations",
          description: "Please try again later."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      loadThreads();
    }
  }, [toast, user]);
  
  // Fetch messages when a thread is selected
  useEffect(() => {
    const loadMessages = async () => {
      if (selectedThreadId) {
        try {
          setIsFetching(true);
          const threadMessages = await fetchThreadMessages(selectedThreadId);
          setMessages(threadMessages);
          
          // Mark messages as read
          await markMessagesAsRead(selectedThreadId);
          
          // Update the selected thread
          const thread = threads.find(t => t.id === selectedThreadId) || null;
          setSelectedThread(thread);
        } catch (error) {
          console.error("Failed to load messages:", error);
          toast({
            variant: "destructive",
            title: "Error loading messages",
            description: "Please try again later."
          });
        } finally {
          setIsFetching(false);
        }
      } else {
        setMessages([]);
        setSelectedThread(null);
      }
    };
    
    loadMessages();
  }, [selectedThreadId, threads, toast]);
  
  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId);
  };
  
  const handleSendMessage = async (content: string) => {
    if (!selectedThreadId || !user) return;
    
    try {
      setIsSending(true);
      const newMessage = await sendMessage(content, selectedThreadId);
      setMessages(prev => [...prev, newMessage]);
      
      // Update thread's updated_at time
      setThreads(prev => prev.map(thread => 
        thread.id === selectedThreadId 
          ? { ...thread, updated_at: new Date().toISOString() }
          : thread
      ));
      
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Please try again."
      });
      return Promise.reject(error);
    } finally {
      setIsSending(false);
    }
  };
  
  const handleCreateThread = async (title: string, participantIds: string[]) => {
    setIsDialogOpen(false);
    
    try {
      setIsLoading(true);
      
      // Create new thread
      const newThread = await createThread(title, participantIds);
      
      // Refresh threads list
      const userThreads = await fetchUserThreads();
      setThreads(userThreads);
      
      // Select the newly created thread
      setSelectedThreadId(newThread.id);
      
      toast({
        title: "Conversation created",
        description: "Your new conversation has been created."
      });
    } catch (error) {
      console.error("Failed to create thread:", error);
      toast({
        variant: "destructive",
        title: "Failed to create conversation",
        description: "Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-14rem)]">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-4">Please sign in to access the messaging system.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav 
          currentPage="Messages" 
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Collaboration", href: "/dashboard/collaboration" },
          ]}
        />
        
        <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading}>
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>
      
      {isLoading && (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 text-moh-green animate-spin" />
        </div>
      )}
      
      {fetchError && !isLoading && (
        <Card className="p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{fetchError}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Card>
      )}
      
      {!isLoading && !fetchError && (
        <Card className="h-[calc(100vh-14rem)] flex">
          <div className="w-full md:w-72 lg:w-80 h-full">
            <ThreadList 
              threads={threads}
              selectedThreadId={selectedThreadId}
              onSelectThread={handleSelectThread}
              isLoading={false}
            />
          </div>
          
          <div className="flex-1 flex flex-col h-full">
            <MessageList 
              messages={messages}
              selectedThread={selectedThread}
              currentUserId={user?.id || ''}
              isLoading={isFetching}
            />
            <MessageComposer 
              selectedThread={selectedThread}
              onSendMessage={handleSendMessage}
              isLoading={isSending}
            />
          </div>
        </Card>
      )}
      
      <NewThreadDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onCreateThread={handleCreateThread} 
      />
    </div>
  );
}
