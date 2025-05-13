import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QuotationAIService, QuotationQuery, QuotationResponse } from "@/services/ai/quotation/QuotationAIService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Loader2, Send, MessageSquare, Search, Info, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
        content: "مرحبًا! I'm Fahad, your investment assistant. How can I help with your investment queries and quotations today?" 
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
        context: "investment"
      };
      
      const response = await QuotationAIService.handleQuotationQuery(query);
      setCurrentResponse(response);
      
      // Add assistant message to chat
      setMessages(prev => [...prev, { type: "assistant", content: response.answer }]);
    } catch (error: any) {
      console.error("Error getting quotation response:", error);
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

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[80vh] max-h-[80vh]">
        <DrawerHeader className="bg-moh-green text-white">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <DrawerTitle>Fahad - Investment Assistant</DrawerTitle>
              <DrawerDescription className="text-white/70 text-xs">
                Ask me about investments and quotations
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>
        
        <div className="flex flex-col h-full p-4 overflow-hidden">
          <ScrollArea className="flex-1 mb-4 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
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
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.type === "user" ? (
                        <div className="flex items-center gap-1 text-xs opacity-80">
                          <User size={12} />
                          <span>You</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs opacity-80">
                          <MessageSquare size={12} />
                          <span>Fahad</span>
                        </div>
                      )}
                    </div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </motion.div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-[80%] rounded-lg p-3 bg-slate-100 text-slate-800"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center gap-1 text-xs opacity-80">
                        <MessageSquare size={12} />
                        <span>Fahad</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

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
                      Quotation Details
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
                <Card className="mt-4 bg-slate-50 border-slate-200">
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
                <Card className="mt-4 bg-slate-50 border-slate-200">
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

          <div className="flex items-end gap-2 pt-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your question here..."
              className="flex-1 resize-none min-h-[60px]"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !input.trim()}
              className="h-[60px] px-5 bg-moh-green hover:bg-moh-darkGreen"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
