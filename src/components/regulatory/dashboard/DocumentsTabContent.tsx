
import { AIComplianceAnalyzer } from "@/components/regulatory/AIComplianceAnalyzer";
import { ComplianceRequirementList } from "@/components/regulatory/compliance/ComplianceRequirementList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Upload, FileText, CheckCircle, FileCheck, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface DocumentsTabContentProps {
  innovationDescription: string;
  innovationType: string;
  isAnalyzingCompliance: boolean;
  onDescriptionChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onAnalyzeClick: () => void;
  onMarkComplete: (id: string) => void;
  requirements: any[];
}

export function DocumentsTabContent({
  innovationDescription,
  innovationType,
  isAnalyzingCompliance,
  onDescriptionChange,
  onTypeChange,
  onAnalyzeClick,
  onMarkComplete,
  requirements,
}: DocumentsTabContentProps) {
  // Calculate compliance score
  const completedRequirements = requirements.filter(req => req.completed).length;
  const totalRequirements = requirements.length;
  const compliancePercentage = totalRequirements > 0 
    ? Math.round((completedRequirements / totalRequirements) * 100) 
    : 0;
  
  // Get compliance status
  const getComplianceStatus = () => {
    if (compliancePercentage === 100) return "complete";
    if (compliancePercentage >= 60) return "in-progress";
    return "attention";
  };
  
  const complianceStatus = getComplianceStatus();

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AIComplianceAnalyzer
          innovationDescription={innovationDescription}
          innovationType={innovationType}
          isAnalyzingCompliance={isAnalyzingCompliance}
          onDescriptionChange={onDescriptionChange}
          onTypeChange={onTypeChange}
          onAnalyzeClick={onAnalyzeClick}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span>Compliance Requirements</span>
                  {complianceStatus === "complete" && (
                    <CheckCircle size={18} className="text-green-500" />
                  )}
                  {complianceStatus === "attention" && (
                    <AlertTriangle size={18} className="text-amber-500" />
                  )}
                </CardTitle>
                <CardDescription>
                  Documents and assessments required for your innovation
                </CardDescription>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">
                  {compliancePercentage}%
                </div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </div>
            
            <div className="mt-3">
              <Progress value={compliancePercentage} className="h-2" 
                style={{ 
                  background: 'rgba(0,129,74,0.2)',
                  '--progress-background': compliancePercentage === 100 ? '#00814A' : 
                                         compliancePercentage >= 60 ? '#C3A86B' : '#F59E0B'
                } as any} 
              />
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="requirements">
              <TabsList className="mb-4">
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="submitted">Submitted Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="requirements">
                <ComplianceRequirementList
                  requirements={requirements}
                  onMarkComplete={onMarkComplete}
                />
                
                <div className="mt-6 pt-4 border-t flex justify-between items-center flex-wrap gap-4">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <HelpCircle className="inline h-4 w-4 mr-1 text-moh-green" />
                    Need help with compliance? Contact our regulatory experts
                  </div>
                  <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
                    <Link to="/dashboard/regulatory/documents/upload">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Documents
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="submitted">
                {requirements.some(req => req.completed) ? (
                  <div className="space-y-4">
                    {requirements
                      .filter(req => req.completed)
                      .map((req, index) => (
                        <div key={req.id} className="flex items-start p-3 border rounded-md bg-moh-green/5">
                          <div className="bg-moh-green/10 p-2 rounded-full mr-3">
                            <FileCheck className="h-4 w-4 text-moh-green" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">{req.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Submitted on {new Date().toLocaleDateString()}
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800 text-[10px]">
                                Approved
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      You haven't submitted any documents yet
                    </p>
                    <Button className="mt-4" asChild>
                      <Link to="/dashboard/regulatory/documents/upload">
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Documents
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
