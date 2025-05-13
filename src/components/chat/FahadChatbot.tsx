
import React, { useState, useRef, useEffect } from "react";
import { QuotationAIService, QuotationQuery, QuotationResponse } from "@/services/ai/quotation/QuotationAIService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Lightbulb, Award, DollarSign, ShieldCheck, BookOpen, 
  CalendarDays, X, Minimize, Maximize, SendHorizontal, Loader2,
  MessageSquare, Sparkles, Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

interface FahadChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

type Message = {
  type: "user" | "assistant";
  content: string;
}

type Section = {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export default function FahadChatbot({ isOpen, onClose }: FahadChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QuotationResponse | null>(null);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const [minimized, setMinimized] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const chatContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sections: Section[] = [
    { 
      id: "innovation-marketplace", 
      label: "Innovation Marketplace", 
      icon: <Lightbulb className="text-moh-gold" />,
      description: "Discover and connect with innovative healthcare solutions."
    },
    { 
      id: "challenges-portal", 
      label: "Challenges Portal", 
      icon: <Award className="text-moh-gold" />,
      description: "Explore healthcare challenges and submit your solutions."
    },
    { 
      id: "funding-opportunities", 
      label: "Funding Opportunities", 
      icon: <DollarSign className="text-moh-gold" />,
      description: "Find funding options for your healthcare innovation."
    },
    { 
      id: "regulatory-sandbox", 
      label: "Regulatory Sandbox", 
      icon: <ShieldCheck className="text-moh-gold" />,
      description: "Navigate the regulatory landscape for healthcare innovations."
    },
    { 
      id: "knowledge-hub", 
      label: "Knowledge Hub", 
      icon: <BookOpen className="text-moh-gold" />,
      description: "Access resources and educational content."
    },
    { 
      id: "events", 
      label: "Events", 
      icon: <CalendarDays className="text-moh-gold" />,
      description: "Discover upcoming events, workshops, and webinars."
    }
  ];
  
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
        content: "Welcome to our healthcare innovation platform! How can I help you today?" 
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
    setMessages(prev => [...prev, { type: "user", content: userMessage }]);
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
      setMessages(prev => [...prev, { type: "assistant", content: response.answer }]);
    } catch (error: any) {
      console.error("Error getting response:", error);
      toast({
        variant: "destructive",
        title: "Service Error",
        description: "Failed to get a response. Please try again.",
      });
      setMessages(prev => [...prev, { 
        type: "assistant", 
        content: "I apologize for the inconvenience. I'm having trouble processing your request right now. Please try again in a moment." 
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
        content: `You're now exploring ${section.label}. ${section.description} How can I help you with this?` 
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

  if (!isOpen) return null;

  return (
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
      >
        {/* Chatbot Header with Tabs */}
        <div 
          className={cn(
            "flex items-center justify-between px-4 py-2",
            "bg-gradient-to-r from-moh-green to-moh-green/80",
            "text-white"
          )}
        >
          <div className="flex items-center space-x-2">
            {!minimized ? (
              <>
                <div className="flex items-center space-x-1">
                  <Sparkles size={16} className="text-moh-gold" />
                  <span className="font-semibold">MOH Assistant</span>
                </div>
                {currentSection && (
                  <span className="text-xs bg-moh-gold/20 px-2 py-0.5 rounded-full">
                    {sections.find(s => s.id === currentSection)?.label}
                  </span>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-1">
                <Sparkles size={16} className="text-moh-gold" />
                <span className="font-semibold">MOH Assistant</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-white hover:bg-white/20" 
              onClick={toggleMinimize}
            >
              {minimized ? <Maximize size={14} /> : <Minimize size={14} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-white hover:bg-white/20" 
              onClick={onClose}
            >
              <X size={14} />
            </Button>
          </div>
        </div>
        
        {!minimized && (
          <>
            <Tabs 
              defaultValue="chat" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col"
            >
              <TabsList className="grid grid-cols-2 p-1 mx-4 mt-2 bg-moh-green/10">
                <TabsTrigger 
                  value="chat" 
                  className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
                >
                  <MessageSquare size={16} className="mr-1" /> Chat
                </TabsTrigger>
                <TabsTrigger 
                  value="sections" 
                  className="data-[state=active]:bg-moh-green data-[state=active]:text-white"
                >
                  <Menu size={16} className="mr-1" /> Sections
                </TabsTrigger>
              </TabsList>
              
              <TabsContent 
                value="chat" 
                className="flex-1 flex flex-col overflow-hidden mt-2 px-1"
              >
                <div 
                  ref={chatContentRef}
                  className="flex-1 px-2 overflow-y-auto"
                >
                  <div className="space-y-4 pb-4">
                    {messages.map((message, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex",
                          message.type === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] rounded-xl p-3",
                            message.type === "user"
                              ? "bg-gradient-to-br from-moh-green to-moh-green/90 text-white"
                              : "bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-800"
                          )}
                        >
                          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isLoading && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[85%] rounded-xl p-3 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-1">
                            <Loader2 size={12} className="animate-spin" />
                            <span className="text-sm">Thinking...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Follow-up questions */}
                    {currentResponse?.followUpQuestions && currentResponse.followUpQuestions.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="mt-2"
                      >
                        <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentResponse.followUpQuestions.map((question, idx) => (
                            <Button 
                              key={idx} 
                              variant="outline" 
                              size="sm" 
                              className="text-xs py-1 h-auto bg-white hover:bg-moh-green hover:text-white"
                              onClick={() => setInput(question)}
                            >
                              {question}
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Related resources */}
                    {currentResponse?.relatedResources && currentResponse.relatedResources.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="mt-3 p-3 rounded-lg bg-moh-green/5 border border-moh-green/10"
                      >
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Related Resources:</h4>
                        <div className="space-y-1">
                          {currentResponse.relatedResources.map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource.url}
                              className="text-xs flex items-center gap-1 text-moh-green hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="inline-block px-1.5 py-0.5 bg-moh-green/10 text-moh-green rounded text-[10px]">
                                {resource.type}
                              </span>
                              {resource.title}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="p-2 border-t">
                  <div className="relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your question..."
                      className="w-full p-2 pr-10 text-sm border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-moh-green dark:bg-gray-800 dark:border-gray-700"
                      rows={2}
                      disabled={isLoading}
                    />
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                      className="absolute right-1 bottom-1 h-8 w-8 bg-moh-green hover:bg-moh-green/90 p-0"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sections" className="flex-1 overflow-hidden mt-2">
                <div className="h-full overflow-y-auto p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {sections.map((section) => (
                      <motion.button
                        key={section.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-xl",
                          "transition-colors border",
                          currentSection === section.id 
                            ? "bg-moh-green/10 border-moh-green/30" 
                            : "bg-white hover:bg-gray-50 border-gray-100"
                        )}
                        onClick={() => handleSelectSection(section.id)}
                      >
                        <div className="h-8 w-8 flex items-center justify-center mb-2">
                          {section.icon}
                        </div>
                        <span className="text-xs font-medium text-center">{section.label}</span>
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="p-3 mt-2 mx-2 bg-moh-gold/10 rounded-lg border border-moh-gold/20">
                    <h4 className="text-xs font-medium text-moh-gold mb-1">Tip:</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Select a section to get specialized assistance and resources related to that area.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
        
        {/* Chatbot Footer */}
        <div className="px-3 py-1.5 text-[10px] text-center text-gray-400 bg-gray-50 dark:bg-gray-900 border-t">
          Powered by MOH Innovation Platform
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
