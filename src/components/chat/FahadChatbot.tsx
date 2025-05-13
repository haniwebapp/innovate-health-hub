
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QuotationAIService, QuotationQuery, QuotationResponse } from "@/services/ai/quotation/QuotationAIService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Loader2, Send, MessageSquare, Search, Info, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface FahadChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FahadChatbot({ isOpen, onClose }: FahadChatbotProps) {
  const [messages, setMessages] = useState<Array<{type: "user" | "assistant", content: string}>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QuotationResponse | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom of chat
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        type: "assistant", 
        content: "Welcome to our healthcare innovation platform! How can I help you today?" 
      }]);
    }
  }, [isOpen, messages.length]);

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
        context: "healthcare"
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
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderQuickActions = () => {
    const actions = [
      { label: "Purchase info", action: () => setInput("I need information about purchasing") },
      { label: "Order status", action: () => setInput("What is the status of my order?") },
      { label: "Refund info", action: () => setInput("How can I request a refund?") },
      { label: "Shipping", action: () => setInput("Tell me about shipping options") },
    ];

    return (
      <div className="flex flex-wrap gap-2 my-3 px-1">
        {actions.map((action, idx) => (
          <Button 
            key={idx}
            variant="outline" 
            size="sm"
            onClick={action.action}
            className={`text-xs border rounded-full px-4 py-1 ${
              idx === 3 ? "bg-moh-green text-white border-moh-green" : "bg-white text-moh-darkGray border-moh-darkGray/30"
            }`}
          >
            {action.label}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[80vh] max-h-[80vh]">
        <DrawerHeader className="bg-moh-green text-white py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="/lovable-uploads/8b61ff0c-8ac1-4567-a8c2-24b34ecda18b.png" alt="Assistant" />
              <AvatarFallback className="bg-white/20">
                <MessageSquare className="h-4 w-4 text-white" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-medium">Chat with MOH Assistant</h3>
              <p className="text-xs text-white/70">We are online!</p>
            </div>
          </div>
        </DrawerHeader>
        
        <div className="flex flex-col h-full bg-white overflow-hidden">
          <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
            <div className="space-y-4 py-4">
              {messages.map((message, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user" 
                        ? "bg-moh-green text-white" 
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </motion.div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {messages.length === 1 && !isLoading && renderQuickActions()}

            {/* Quotation Data */}
            {currentResponse?.quotationData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="mt-4 bg-moh-green/10 border-moh-green/20">
                  <CardContent className="pt-4">
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-2 text-moh-darkGreen">
                      <Info size={14} />
                      Details
                    </h4>
                    
                    <div className="space-y-2">
                      {currentResponse.quotationData.price && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Estimated Cost:</span>
                          <Badge variant="outline" className="bg-moh-green/5 text-moh-darkGreen">
                            ${currentResponse.quotationData.price.toLocaleString()}
                          </Badge>
                        </div>
                      )}
                      
                      {currentResponse.quotationData.timeframe && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Timeframe:</span>
                          <span className="text-sm font-medium">{currentResponse.quotationData.timeframe}</span>
                        </div>
                      )}
                      
                      {currentResponse.quotationData.services && (
                        <div>
                          <span className="text-sm block mb-1">Services:</span>
                          <div className="flex flex-wrap gap-1">
                            {currentResponse.quotationData.services.map((service, i) => (
                              <Badge key={i} variant="outline" className="bg-moh-green/5">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {currentResponse.quotationData.requirements && (
                        <div>
                          <span className="text-sm block mb-1">Requirements:</span>
                          <div className="flex flex-wrap gap-1">
                            {currentResponse.quotationData.requirements.map((req, i) => (
                              <Badge key={i} variant="outline" className="bg-moh-gold/10 text-moh-gold border-moh-gold/20">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Related resources */}
            {currentResponse?.relatedResources && currentResponse.relatedResources.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="mt-4 bg-gray-50 border-gray-200">
                  <CardContent className="pt-4">
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                      <Search size={14} />
                      Related Resources
                    </h4>
                    <ul className="space-y-2">
                      {currentResponse.relatedResources.map((resource, idx) => (
                        <li key={idx} className="text-sm">
                          <a 
                            href={resource.url} 
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <Badge variant="outline" className="text-xs">
                              {resource.type}
                            </Badge>
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Follow-up questions */}
            {currentResponse?.followUpQuestions && currentResponse.followUpQuestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="mt-4 mb-4 bg-gray-50 border-gray-200">
                  <CardContent className="pt-4">
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                      <Info size={14} />
                      You might also want to ask:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentResponse.followUpQuestions.map((question, idx) => (
                        <Button 
                          key={idx} 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => {
                            setInput(question);
                          }}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </ScrollArea>

          <div className="border-t p-3">
            <div className="flex items-end gap-2 pt-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter your message..."
                className="flex-1 resize-none min-h-[50px] max-h-[100px] border-gray-300"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !input.trim()}
                className="h-[50px] w-[50px] p-0 rounded-full bg-moh-green hover:bg-moh-darkGreen"
              >
                {isLoading ? 
                  <Loader2 className="h-5 w-5 animate-spin" /> : 
                  <Send className="h-5 w-5" />
                }
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
