
import React, { useState, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Loader2, AlertCircle, FileText, MessageSquare } from 'lucide-react';
import { PolicyAnnotationService } from '@/services/ai/policy';

interface Annotation {
  id: string;
  text: string;
  startIndex: number;
  endIndex: number;
  category: string;
  insights: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface PolicyAnalysisResult {
  annotations: Annotation[];
  overallAnalysis: string;
  keyTakeaways: string[];
  error?: string;
}

const PolicyAnnotator: React.FC = () => {
  const [policyText, setPolicyText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<PolicyAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"analysis" | "qa">("analysis");
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const handlePolicyAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await PolicyAnnotationService.annotatePolicy(policyText);
      if (result.error) {
        setError(result.error);
      } else {
        setAnalysisResult({
          annotations: result.annotations || [],
          overallAnalysis: result.overallAnalysis || 'No analysis available.',
          keyTakeaways: result.keyTakeaways || [],
          error: result.error,
        });
      }
    } catch (err: any) {
      console.error("Error during policy analysis:", err);
      setError(err.message || 'Failed to analyze policy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [policyText]);

  const handleAskQuestion = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await PolicyAnnotationService.askPolicyQuestion(policyText, question);
      if (result.error) {
        setError(result.error);
        setAnswer('Unable to retrieve an answer due to an error.');
      } else {
        setAnswer(result.answer || 'No answer available.');
      }
    } catch (err: any) {
      console.error("Error asking policy question:", err);
      setError(err.message || 'Failed to get answer. Please try again.');
      setAnswer('Unable to retrieve an answer due to an error.');
    } finally {
      setIsLoading(false);
    }
  }, [policyText, question]);

  return (
    <Card className="w-full">
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste policy text here..."
          value={policyText}
          onChange={(e) => setPolicyText(e.target.value)}
          className="mb-4"
        />

        <div className="flex justify-between items-center">
          <Button onClick={handlePolicyAnalysis} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Analyze Policy
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={(value: "analysis" | "qa") => setActiveTab(value)} className="mt-4">
          <TabsList>
            <TabsTrigger value="analysis">Policy Analysis</TabsTrigger>
            <TabsTrigger value="qa">Question & Answer</TabsTrigger>
          </TabsList>
          <TabsContent value="analysis" className="space-y-2">
            {analysisResult ? (
              <>
                <h3 className="text-lg font-semibold">Overall Analysis</h3>
                <p>{analysisResult.overallAnalysis}</p>

                <h3 className="text-lg font-semibold">Key Takeaways</h3>
                <ul>
                  {analysisResult.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="list-disc ml-5">
                      {takeaway}
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold">Annotations</h3>
                {analysisResult.annotations.length > 0 ? (
                  <ul>
                    {analysisResult.annotations.map((annotation) => (
                      <li key={annotation.id} className="mb-2 p-2 border rounded-md">
                        <p>
                          <strong>Category:</strong> {annotation.category}
                        </p>
                        <p>
                          <strong>Text:</strong> {annotation.text}
                        </p>
                        <p>
                          <strong>Insights:</strong> {annotation.insights}
                        </p>
                        <p>
                          <strong>Sentiment:</strong> {annotation.sentiment}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No annotations available.</p>
                )}
              </>
            ) : (
              <p>No analysis available. Please analyze the policy text.</p>
            )}
          </TabsContent>
          <TabsContent value="qa" className="space-y-2">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Ask a question about the policy..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Button onClick={handleAskQuestion} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Asking...
                  </>
                ) : (
                  <>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask
                  </>
                )}
              </Button>
            </div>
            {answer && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Answer</h3>
                <p>{answer}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PolicyAnnotator;
