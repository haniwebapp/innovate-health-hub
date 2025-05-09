
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { callAIAssistant, AIMessage } from "@/utils/aiUtils";

export default function IntegrationAIAssistant() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<AIMessage[]>([
    {
      role: "system",
      content: "You are an AI assistant specialized in healthcare platform integrations."
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);

    const userMessage: AIMessage = {
      role: "user",
      content: question
    };

    const newChatHistory = [...chatHistory, userMessage];
    setChatHistory(newChatHistory);

    try {
      const result = await callAIAssistant(newChatHistory, "admin-integrations");
      
      if (result.error) {
        throw new Error(result.error);
      }

      const assistantMessage: AIMessage = {
        role: "assistant",
        content: result.message
      };

      setChatHistory([...newChatHistory, assistantMessage]);
      setResponse(result.message);
      setQuestion("");
    } catch (err: any) {
      setError(err.message || "Failed to get a response from the assistant");
      console.error("Error calling AI assistant:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          Integration Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about integrations, best practices, or get help setting up new connections
        </CardDescription>
      </CardHeader>
      <CardContent>
        {response && (
          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea 
            placeholder="Ask about integration options, configuration, or best practices..." 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !question.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Ask Assistant'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
