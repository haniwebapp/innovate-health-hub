
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, SendHorizontal, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AdminAIAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello, I'm your admin assistant. I can help you with user management, analytics insights, and platform administration. How can I help you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to the conversation
    const userMessage = { role: "user" as const, content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the AI assistant function
      const { data, error } = await supabase.functions.invoke("admin-assistant", {
        body: { 
          messages: [...messages, userMessage],
          context: "admin-panel"
        }
      });

      if (error) throw error;

      // Add assistant response to the conversation
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: "assistant", content: data.message }
      ]);
    } catch (error: any) {
      console.error("Error calling AI assistant:", error);
      toast({
        title: "AI Assistant Error",
        description: error.message || "Failed to get a response from the assistant",
        variant: "destructive",
      });
      
      // Add error message
      setMessages(prevMessages => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto border shadow-md">
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-moh-green" />
          Admin AI Assistant
        </CardTitle>
        <CardDescription>
          Get help with user management, analytics insights, and administration tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 max-h-[400px] overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div 
              className={`flex items-start gap-2 max-w-[80%] ${
                message.role === "assistant" 
                  ? "bg-muted p-3 rounded-lg rounded-tl-none"
                  : "bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none"
              }`}
            >
              <span className="mt-1">
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </span>
              <div className="text-sm">{message.content}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg rounded-tl-none flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about user management, analytics, or administration..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizontal className="h-5 w-5" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
