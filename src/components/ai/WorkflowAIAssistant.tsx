
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Bot, Sparkles } from "lucide-react";
import { callAIAssistant, AIMessage } from "@/utils/aiUtils";

const WORKFLOW_TYPES = [
  { id: "onboarding", name: "User Onboarding" },
  { id: "evaluation", name: "Innovation Evaluation" },
  { id: "regulatory", name: "Regulatory Sandbox" },
  { id: "investment", name: "Investment Matching" },
  { id: "knowledge", name: "Knowledge Hub" },
  { id: "analytics", name: "Platform Analytics" },
  { id: "communication", name: "Communication Engine" },
  { id: "admin", name: "Admin Support" },
  { id: "data", name: "Data Interoperability" }
];

export default function WorkflowAIAssistant() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("onboarding");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateWorkflow = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    const selectedType = WORKFLOW_TYPES.find(type => type.id === selectedWorkflow);
    
    try {
      // Prepare context-specific prompt for the workflow type
      const messages: AIMessage[] = [
        {
          role: "system",
          content: `You are a healthcare innovation platform workflow expert. Generate a detailed workflow for ${selectedType?.name} automation.`
        },
        {
          role: "user",
          content: prompt
        }
      ];
      
      const result = await callAIAssistant(messages, "workflow-automation");
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setResponse(result.message);
    } catch (err: any) {
      setError(err.message || "Failed to generate workflow");
      console.error("Error generating workflow:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-500" />
          Workflow Automation Assistant
        </CardTitle>
        <CardDescription>
          Generate AI-powered workflow automation recommendations for the innovation platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="workflow-type" className="text-sm font-medium">Workflow Type</label>
          <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
            <SelectTrigger id="workflow-type">
              <SelectValue placeholder="Select workflow type" />
            </SelectTrigger>
            <SelectContent>
              {WORKFLOW_TYPES.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="workflow-prompt" className="text-sm font-medium">Workflow Requirements</label>
          <Textarea 
            id="workflow-prompt"
            placeholder="Describe what you're trying to automate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md">
            <p>{error}</p>
          </div>
        )}
        
        {response && (
          <div className="p-4 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-1 mb-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium">Recommended Workflow</h3>
            </div>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleGenerateWorkflow}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Workflow'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
