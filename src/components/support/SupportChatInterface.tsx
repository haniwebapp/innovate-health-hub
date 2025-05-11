
import { useState, useRef, useEffect } from "react";
import { SupportAIService, SupportQuery, SupportResponse } from "@/services/ai/support/SupportAIService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, MessageSquare, Search, AlertTriangle, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function SupportChatInterface() {
  const [messages, setMessages] = useState<Array<{type: "user" | "assistant", content: string}>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<SupportResponse | null>(null);
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
    setMessages([{ 
      type: "assistant", 
      content: "Hello! I'm your support assistant. How can I help you with your healthcare innovation journey today?" 
    }]);
  }, []);

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
      const query: SupportQuery = {
        query: userMessage,
        userId: user?.id
      };
      
      const response = await SupportAIService.handleSupportQuery(query);
      setCurrentResponse(response);
      
      // Add assistant message to chat
      setMessages(prev => [...prev, { type: "assistant", content: response.answer }]);
    } catch (error: any) {
      console.error("Error getting support response:", error);
      toast({
        variant: "destructive",
        title: "Support Error",
        description: "Failed to get a response from the support assistant.",
      });
      setMessages(prev => [...prev, { 
        type: "assistant", 
        content: "I'm sorry, I encountered an error processing your request. Please try again or submit a ticket for more detailed assistance." 
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
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4 mb-4 border rounded-lg" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, idx) => (
            <div 
              key={idx} 
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user" 
                    ? "bg-moh-green text-white" 
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.type === "user" ? (
                    <div className="flex items-center gap-1 text-xs opacity-80">
                      <span>You</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs opacity-80">
                      <MessageSquare size={12} />
                      <span>Support Assistant</span>
                    </div>
                  )}
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-slate-100 text-slate-800">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1 text-xs opacity-80">
                    <MessageSquare size={12} />
                    <span>Support Assistant</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related resources */}
        {currentResponse?.relatedResources && currentResponse.relatedResources.length > 0 && (
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
                      target="_blank" 
                      rel="noopener noreferrer"
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
        )}

        {/* Follow-up questions */}
        {currentResponse?.followUpQuestions && currentResponse.followUpQuestions.length > 0 && (
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
        )}
      </ScrollArea>

      <div className="flex items-end gap-2">
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
          className="h-[60px] px-5"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
