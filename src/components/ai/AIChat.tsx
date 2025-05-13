
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAI } from '@/context/AIContext';
import { Loader2, Bot, User, SendHorizontal } from 'lucide-react';
import { AIMessage } from '@/types/chatTypes';

interface AIChatProps {
  title?: string;
  description?: string;
  context?: string;
  placeholder?: string;
  initialMessage?: string;
}

export function AIChat({ 
  title = "AI Assistant", 
  description = "How can I help you today?", 
  context = "general", 
  placeholder = "Type your message...",
  initialMessage
}: AIChatProps) {
  const { sendMessage, isProcessing } = useAI();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([]);

  // If there's an initial message, add it when the component mounts
  useState(() => {
    if (initialMessage) {
      setMessages([{
        role: 'assistant',
        content: initialMessage
      }]);
    }
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    // Add user message to the conversation
    const userMessage: AIMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    try {
      // Get response from AI
      const response = await sendMessage(input, context);
      
      // Add AI response to the conversation
      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error('Error in AI chat:', error);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" /> {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 h-[300px] overflow-y-auto space-y-4">
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
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg rounded-tl-none flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isProcessing}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isProcessing || !input.trim()}>
            {isProcessing ? (
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
