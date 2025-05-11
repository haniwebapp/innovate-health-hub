
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Upload } from "lucide-react";

interface TestResultsFormProps {
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function TestResultsForm({ onSubmit, isSubmitting = false }: TestResultsFormProps) {
  const [formData, setFormData] = useState({
    summary: "",
    safetyEvents: "",
    metrics: "",
    conclusion: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Test Results</CardTitle>
        <CardDescription>Report on the outcomes of your testing period</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="summary">Summary of Findings</Label>
            <Textarea 
              id="summary" 
              placeholder="Provide a summary of your key findings and observations..."
              rows={5}
              required
              value={formData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="safetyEvents">Safety Events</Label>
            <Textarea 
              id="safetyEvents" 
              placeholder="Describe any safety events or incidents that occurred during testing..."
              rows={3}
              value={formData.safetyEvents}
              onChange={(e) => handleChange('safetyEvents', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="metrics">Performance Metrics</Label>
            <Textarea 
              id="metrics" 
              placeholder="Provide quantitative metrics from your testing..."
              rows={3}
              required
              value={formData.metrics}
              onChange={(e) => handleChange('metrics', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Supporting Documents</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOC, XLS (max 10MB)
              </p>
              <Input 
                type="file" 
                className="hidden" 
                id="file-upload" 
                multiple
              />
              <Button 
                type="button" 
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Select Files
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="conclusion">Conclusion & Next Steps</Label>
            <Textarea 
              id="conclusion" 
              placeholder="Summarize your conclusions and proposed next steps..."
              rows={3}
              required
              value={formData.conclusion}
              onChange={(e) => handleChange('conclusion', e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Test Results
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
