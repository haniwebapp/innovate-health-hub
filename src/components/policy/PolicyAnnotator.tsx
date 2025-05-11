
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, Highlighter, BookOpen, MessageSquareDiff, CalendarCheck } from "lucide-react";
import { PolicyAIService, PolicyAnnotationResult, PolicyAnnotation, ImplementationGuidanceResult, PolicyQAResult } from "@/services/ai/PolicyAIService";

export function PolicyAnnotator() {
  const [policyText, setPolicyText] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [activeTab, setActiveTab] = useState("document");
  const [isLoading, setIsLoading] = useState(false);
  const [annotationResults, setAnnotationResults] = useState<PolicyAnnotationResult | null>(null);
  const [implementationGuidance, setImplementationGuidance] = useState<ImplementationGuidanceResult | null>(null);
  const [question, setQuestion] = useState("");
  const [qaResult, setQAResult] = useState<PolicyQAResult | null>(null);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  
  const { toast } = useToast();
  
  const handleAnnotatePolicy = async () => {
    if (!policyText.trim()) {
      toast({
        variant: "destructive",
        title: "Missing policy text",
        description: "Please enter a policy document to analyze",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const results = await PolicyAIService.annotatePolicy(policyText, policyName || "Unnamed Policy");
      setAnnotationResults(results);
      setActiveTab("annotations");
      
      toast({
        title: "Annotation Complete",
        description: "Policy analysis and annotations have been generated",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Annotation failed",
        description: error.message || "An error occurred during analysis",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGetImplementationGuidance = async () => {
    if (!policyText.trim()) {
      toast({
        variant: "destructive",
        title: "Missing policy text",
        description: "Please enter a policy document to analyze",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const guidance = await PolicyAIService.getImplementationGuidance(
        policyText,
        policyName || "Unnamed Policy"
      );
      
      setImplementationGuidance(guidance);
      setActiveTab("implementation");
      
      toast({
        title: "Implementation Guide Ready",
        description: "Implementation guidance has been generated",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to generate guidance",
        description: error.message || "An error occurred during analysis",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAskQuestion = async () => {
    if (!policyText.trim() || !question.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please enter both policy text and a question",
      });
      return;
    }
    
    setIsAskingQuestion(true);
    try {
      const result = await PolicyAIService.askPolicyQuestion(
        policyText,
        question,
        policyName || "Policy Q&A"
      );
      
      setQAResult(result);
      
      toast({
        title: "Question Answered",
        description: "An answer has been generated based on the policy",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to answer question",
        description: error.message || "An error occurred",
      });
    } finally {
      setIsAskingQuestion(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Highlighter className="h-5 w-5 text-moh-green" />
          Policy Analysis & Annotation
        </CardTitle>
        <CardDescription>
          Analyze policy documents to get annotations, implementation guidance, and answers to specific questions
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="annotations" disabled={!annotationResults}>Annotations</TabsTrigger>
            <TabsTrigger value="implementation" disabled={!implementationGuidance}>Implementation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="document" className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Policy Name or Title (Optional)"
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
                className="mb-2"
              />
              
              <Textarea
                placeholder="Paste policy document text here..."
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                className="min-h-[300px]"
              />
            </div>
            
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Ask a Question</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question about this policy..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={isAskingQuestion}
                  />
                  <Button 
                    onClick={handleAskQuestion} 
                    disabled={isAskingQuestion || !policyText.trim() || !question.trim()}
                  >
                    {isAskingQuestion ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Ask
                  </Button>
                </div>
                
                {qaResult && (
                  <Card className="mt-4">
                    <CardHeader className="py-3">
                      <CardTitle className="text-base flex items-center gap-1">
                        <MessageSquareDiff className="h-4 w-4 text-moh-green" />
                        Answer ({qaResult.confidence} confidence)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{qaResult.answer}</p>
                      
                      {qaResult.relevantSections.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-muted-foreground">Relevant Sections</h4>
                          <ul className="list-disc pl-5 text-sm">
                            {qaResult.relevantSections.map((section, index) => (
                              <li key={index}>{section}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleAnnotatePolicy}
                  className="flex-1"
                  disabled={isLoading || !policyText.trim()}
                >
                  {isLoading && activeTab === "document" ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Highlighter className="h-4 w-4 mr-2" />}
                  Annotate Policy
                </Button>
                
                <Button
                  onClick={handleGetImplementationGuidance}
                  className="flex-1"
                  disabled={isLoading || !policyText.trim()}
                  variant="secondary"
                >
                  {isLoading && activeTab === "document" ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CalendarCheck className="h-4 w-4 mr-2" />}
                  Get Implementation Guide
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="annotations" className="space-y-4">
            {annotationResults && (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-medium">Overall Analysis</h3>
                  <p className="text-muted-foreground">{annotationResults.overallAnalysis}</p>
                  
                  <h3 className="text-lg font-medium mt-4">Key Takeaways</h3>
                  <ul className="list-disc pl-5">
                    {annotationResults.keyTakeaways.map((takeaway, index) => (
                      <li key={index}>{takeaway}</li>
                    ))}
                  </ul>
                </div>
                
                <h3 className="text-lg font-medium">Section Annotations</h3>
                
                <div className="space-y-4">
                  {annotationResults.annotations.map((annotation, idx) => (
                    <Card key={idx}>
                      <CardHeader className="py-4 bg-muted/20">
                        <CardTitle className="text-base">Section Text</CardTitle>
                      </CardHeader>
                      <CardContent className="py-3">
                        <p className="whitespace-pre-line text-sm">{annotation.section}</p>
                        
                        <Separator className="my-3" />
                        
                        <h4 className="font-medium">Annotation</h4>
                        <p className="text-sm mb-3">{annotation.annotation}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div>
                            <h4 className="text-sm font-medium">Guidelines</h4>
                            <ul className="list-disc pl-5 text-sm">
                              {annotation.guidelines.map((guideline, gidx) => (
                                <li key={gidx}>{guideline}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Challenges</h4>
                            <ul className="list-disc pl-5 text-sm">
                              {annotation.challenges.map((challenge, cidx) => (
                                <li key={cidx}>{challenge}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
            
            <Button variant="outline" onClick={() => setActiveTab("document")} className="mt-4">
              Back to Document
            </Button>
          </TabsContent>
          
          <TabsContent value="implementation" className="space-y-4">
            {implementationGuidance && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Implementation Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal pl-5 space-y-1">
                        {implementationGuidance.implementationSteps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Required Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {implementationGuidance.requiredResources.map((resource, idx) => (
                          <li key={idx}>{resource}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium">Short Term</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {implementationGuidance.timeline.shortTerm.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Medium Term</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {implementationGuidance.timeline.mediumTerm.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Long Term</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {implementationGuidance.timeline.longTerm.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Key Stakeholders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {implementationGuidance.stakeholders.map((stakeholder, idx) => (
                          <li key={idx}>{stakeholder}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Potential Challenges</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {implementationGuidance.potentialChallenges.map((challenge, idx) => (
                          <li key={idx}>{challenge}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Success Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {implementationGuidance.successMetrics.map((metric, idx) => (
                        <li key={idx}>{metric}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}
            
            <Button variant="outline" onClick={() => setActiveTab("document")} className="mt-4">
              Back to Document
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        {activeTab === "document" ? (
          <p className="text-xs text-muted-foreground">
            Enter a policy document to annotate, analyze implementation requirements, or ask specific questions
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Analysis powered by AI. Results should be reviewed by domain experts.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
