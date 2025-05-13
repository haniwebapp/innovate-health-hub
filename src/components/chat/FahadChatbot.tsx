
import React, { useState, useRef, useEffect } from "react";
import { QuotationAIService, QuotationQuery, QuotationResponse } from "@/services/ai/quotation/QuotationAIService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

// Import components
import { ChatHeader } from "./components/ChatHeader";
import { ChatContent } from "./components/ChatContent";
import { ChatInput } from "./components/ChatInput";
import { ChatFooter } from "./components/ChatFooter";
import { ChatSections, sections } from "./components/ChatSections";
import { KeyboardShortcutsDialog } from "./components/KeyboardShortcutsDialog";

// Import hook for keyboard shortcuts
import { useChatKeyboardShortcuts } from "@/hooks/useChatKeyboardShortcuts";

interface FahadChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

type Message = {
  type: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export default function FahadChatbot({ isOpen, onClose }: FahadChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QuotationResponse | null>(null);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const [minimized, setMinimized] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const chatContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Helper function to format timestamp
  const getFormattedTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Enhanced scroll functionality - scrolls to bottom whenever messages change
  const scrollToBottom = () => {
    if (chatContentRef.current) {
      // Use setTimeout to ensure DOM update is complete
      setTimeout(() => {
        if (chatContentRef.current) {
          chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
      }, 0);
    }
  };

  // Auto scroll to bottom when messages, loading state, or current response changes
  useEffect(() => {
    if (!minimized) {
      scrollToBottom();
    }
  }, [messages, isLoading, currentResponse, minimized]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        type: "assistant", 
        content: "Welcome to our healthcare innovation platform! How can I help you today?",
        timestamp: getFormattedTimestamp()
      }]);
    }
    
    // Auto-focus the input field when opening
    if (isOpen && inputRef.current && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages.length, minimized]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage = input.trim();
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userMessage,
      timestamp: getFormattedTimestamp()
    }]);
    setInput("");
    setIsLoading(true);
    setCurrentResponse(null);

    try {
      // Call AI service
      const query: QuotationQuery = {
        query: userMessage,
        userId: user?.id,
        context: currentSection || undefined
      };
      
      const response = await QuotationAIService.getInstance().handleQuotationQuery(query);
      setCurrentResponse(response);
      
      // Add assistant message to chat
      setMessages(prev => [...prev, { 
        type: "assistant", 
        content: response.answer,
        timestamp: getFormattedTimestamp()
      }]);
    } catch (error: any) {
      console.error("Error getting response:", error);
      toast({
        variant: "destructive",
        title: "Service Error",
        description: "Failed to get a response. Please try again.",
      });
      setMessages(prev => [...prev, { 
        type: "assistant", 
        content: "I apologize for the inconvenience. I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: getFormattedTimestamp()
      }]);
    } finally {
      setIsLoading(false);
      
      // Auto-focus the input field after sending a message
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const section = sections.find(s => s.id === sectionId);
    
    if (section) {
      setMessages([{ 
        type: "assistant", 
        content: `You're now exploring ${section.label}. ${section.description} How can I help you with this?`,
        timestamp: getFormattedTimestamp()
      }]);
      setActiveTab("chat");
      
      toast({
        title: `${section.label} selected`,
        description: "Chat context has been updated.",
        duration: 3000,
      });
    }
  };

  const toggleMinimize = () => {
    setMinimized(prev => !prev);
  };
  
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const toggleShortcutsDialog = () => {
    setShortcutsDialogOpen(prev => !prev);
  };

  // Use keyboard shortcuts hook
  useChatKeyboardShortcuts({
    isOpen,
    minimized,
    onClose,
    toggleMinimize,
    onSendMessage: handleSendMessage,
    onFocusInput: focusInput,
    onSwitchTab: setActiveTab,
    currentTab: activeTab
  });

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed bottom-4 right-4 z-50 flex flex-col",
            "bg-white dark:bg-gray-900 rounded-xl shadow-2xl",
            "border border-gray-200 dark:border-gray-800",
            "overflow-hidden",
            minimized ? "w-64 h-14" : "w-80 md:w-96 h-[500px] max-h-[80vh]"
          )}
          role="dialog"
          aria-label="Chat with MOH Assistant"
          aria-modal="true"
          style={{
            height: minimized ? "3.5rem" : "500px",
            maxHeight: "80vh"
          }}
        >
          {/* Chatbot Header */}
          <ChatHeader 
            minimized={minimized}
            currentSection={currentSection}
            sections={sections}
            toggleMinimize={toggleMinimize}
            onClose={onClose}
            showKeyboardShortcuts={toggleShortcutsDialog}
          />
          
          {!minimized && (
            <>
              <Tabs 
                defaultValue="chat" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col h-full overflow-hidden"
              >
                <TabsList className="grid grid-cols-2 p-1 mx-4 mt-2 bg-moh-green/10">
                  <TabsTrigger 
                    value="chat" 
                    className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
                    aria-label="Chat tab"
                  >
                    <MessageSquare size={16} className="mr-1" aria-hidden="true" /> Chat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sections" 
                    className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
                    aria-label="Sections tab"
                  >
                    <Menu size={16} className="mr-1" aria-hidden="true" /> Sections
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent 
                  value="chat" 
                  className="flex-1 flex flex-col overflow-hidden mt-2 px-1"
                >
                  <ChatContent 
                    messages={messages}
                    isLoading={isLoading}
                    chatContentRef={chatContentRef}
                    currentResponse={currentResponse}
                    setInput={setInput}
                  />

                  <ChatInput 
                    input={input}
                    setInput={setInput}
                    handleSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    handleKeyPress={handleKeyPress}
                    inputRef={inputRef}
                    characterCount={input.length}
                    maxLength={1000}
                  />
                </TabsContent>
                
                <TabsContent value="sections" className="flex-1 overflow-hidden mt-2">
                  <ChatSections 
                    currentSection={currentSection}
                    onSelectSection={handleSelectSection}
                  />
                </TabsContent>
              </Tabs>
            </>
          )}
          
          {/* Chatbot Footer */}
          <ChatFooter />
        </motion.div>
      </AnimatePresence>
      
      {/* Keyboard shortcuts dialog */}
      <KeyboardShortcutsDialog 
        isOpen={shortcutsDialogOpen} 
        onClose={() => setShortcutsDialogOpen(false)}
      />
    </>
  );
}
