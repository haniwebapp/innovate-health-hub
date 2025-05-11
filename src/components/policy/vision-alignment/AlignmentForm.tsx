
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { PolicyData } from "@/services/ai/PolicyAIService";

interface AlignmentFormProps {
  policyData: PolicyData;
  isAnalyzing: boolean;
  onPolicyChange: (field: keyof PolicyData, value: any) => void;
  onGoalInput: (value: string) => void;
  onRemoveGoal: (goal: string) => void;
  onAnalyzeAlignment: () => void;
}

export function AlignmentForm({
  policyData,
  isAnalyzing,
  onPolicyChange,
  onGoalInput,
  onRemoveGoal,
  onAnalyzeAlignment
}: AlignmentFormProps) {
  return (
    <>
      <div>
        <Label htmlFor="policy-name">Policy/Innovation Name</Label>
        <Input
          id="policy-name"
          value={policyData.name}
          onChange={(e) => onPolicyChange('name', e.target.value)}
          placeholder="Enter name of policy or innovation"
        />
      </div>
      
      <div>
        <Label htmlFor="policy-sector">Sector</Label>
        <Select 
          value={policyData.sector} 
          onValueChange={(value) => onPolicyChange('sector', value)}
        >
          <SelectTrigger id="policy-sector">
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="environment">Environment</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="tourism">Tourism</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="policy-description">Description</Label>
        <Textarea
          id="policy-description"
          value={policyData.description}
          onChange={(e) => onPolicyChange('description', e.target.value)}
          placeholder="Describe the policy or innovation in detail"
          rows={4}
        />
      </div>
      
      <div>
        <Label htmlFor="policy-goals">Key Goals (Optional)</Label>
        <div className="flex space-x-2">
          <Input
            id="policy-goals"
            placeholder="Add a goal and press Enter"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onGoalInput((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          <Button 
            variant="outline" 
            onClick={(e) => {
              const input = document.getElementById('policy-goals') as HTMLInputElement;
              onGoalInput(input.value);
              input.value = '';
            }}
          >
            Add
          </Button>
        </div>
        
        {policyData.goals && policyData.goals.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {policyData.goals.map((goal, index) => (
              <Badge key={index} variant="secondary" className="px-2 py-1">
                {goal}
                <button 
                  className="ml-1 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemoveGoal(goal)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <Button 
        onClick={onAnalyzeAlignment} 
        disabled={isAnalyzing || !policyData.name || !policyData.description}
        className="w-full"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Analyze Vision 2030 Alignment'
        )}
      </Button>
    </>
  );
}
