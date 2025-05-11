
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { MessageList } from "@/components/collaboration/messages/MessageList";
import { MessageComposer } from "@/components/collaboration/messages/MessageComposer";
import { ThreadList } from "@/components/collaboration/messages/ThreadList";
import { Thread, Message, fetchUserThreads, fetchThreadMessages, sendMessage, markMessagesAsRead } from "@/utils/messageUtils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import NewThreadDialog from "@/components/collaboration/messages/NewThreadDialog";

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();
  
  // Fetch user threads on component mount
  useEffect(() => {
    const loadThreads = async () => {
      try {
        setIsLoading(true);
        const userThreads = await fetchUserThreads();
        setThreads(userThreads);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load threads:", error);
        toast({
          variant: "destructive",
          title: "Error loading conversations",
          description: "Please try again later."
        });
        setIsLoading(false);
      }
    };
    
    loadThreads();
  }, [toast]);
  
  // Fetch messages when a thread is selected
  useEffect(() => {
    const loadMessages = async () => {
      if (selectedThreadId) {
        try {
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
      
      setIsSending(false);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Please try again."
      });
      setIsSending(false);
    }
  };
  
  const handleCreateThread = async (title: string, participantIds: string[]) => {
    // This will be implemented in the NewThreadDialog component
    setIsDialogOpen(false);
    
    // Refresh threads list after creating a new thread
    try {
      const userThreads = await fetchUserThreads();
      setThreads(userThreads);
      
      // Select the newly created thread (assumed to be the first one)
      if (userThreads.length > 0) {
        setSelectedThreadId(userThreads[0].id);
      }
      
      toast({
        title: "Conversation created",
        description: "Your new conversation has been created."
      });
    } catch (error) {
      console.error("Failed to refresh threads:", error);
    }
  };

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
        
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>
      
      <Card className="h-[calc(100vh-14rem)] flex">
        <div className="w-full md:w-72 lg:w-80 h-full">
          <ThreadList 
            threads={threads}
            selectedThreadId={selectedThreadId}
            onSelectThread={handleSelectThread}
            isLoading={isLoading}
          />
        </div>
        
        <div className="flex-1 flex flex-col h-full">
          <MessageList 
            messages={messages}
            selectedThread={selectedThread}
            currentUserId={user?.id || ''}
            isLoading={isLoading}
          />
          <MessageComposer 
            selectedThread={selectedThread}
            onSendMessage={handleSendMessage}
            isLoading={isSending}
          />
        </div>
      </Card>
      
      <NewThreadDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onCreateThread={handleCreateThread} 
      />
    </div>
  );
}
