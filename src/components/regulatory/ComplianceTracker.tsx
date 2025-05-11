
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, AlertTriangle, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  status: "required" | "recommended" | "optional";
  completed: boolean;
  dueDate?: string;
}

interface ComplianceTrackerProps {
  requirements: ComplianceRequirement[];
  onMarkComplete: (id: string) => void;
  applicationId?: string;
}

export function ComplianceTracker({ requirements, onMarkComplete, applicationId }: ComplianceTrackerProps) {
  const { toast } = useToast();
  const [activeRequirement, setActiveRequirement] = useState<string | null>(null);
  
  // Calculate compliance metrics
  const totalRequirements = requirements.length;
  const completedRequirements = requirements.filter(req => req.completed).length;
  const requiredItems = requirements.filter(req => req.status === "required");
  const requiredCompleted = requiredItems.filter(req => req.completed).length;
  
  const compliancePercentage = totalRequirements > 0 
    ? Math.round((completedRequirements / totalRequirements) * 100) 
    : 0;
  
  const requiredCompliancePercentage = requiredItems.length > 0
    ? Math.round((requiredCompleted / requiredItems.length) * 100)
    : 100;
    
  // Get color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-amber-500";
    return "bg-red-500";
  };
  
  // Get status badge
  const getStatusBadge = (status: "required" | "recommended" | "optional") => {
    switch (status) {
      case "required":
        return <Badge className="bg-red-500">Required</Badge>;
      case "recommended":
        return <Badge className="bg-amber-500">Recommended</Badge>;
      case "optional":
        return <Badge className="bg-slate-500">Optional</Badge>;
    }
  };
  
  const handleUpdateStatus = (id: string) => {
    onMarkComplete(id);
    
    toast({
      title: "Requirement updated",
      description: "Your compliance progress has been saved."
    });
  };
  
  // Group requirements by status for better organization
  const requiredRequirements = requirements.filter(req => req.status === "required");
  const recommendedRequirements = requirements.filter(req => req.status === "recommended");
  const optionalRequirements = requirements.filter(req => req.status === "optional");
  
  return (
    <Card className="border-l-4 border-l-moh-green">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Compliance Requirements</CardTitle>
            <CardDescription>Track your regulatory compliance progress</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold">{compliancePercentage}%</div>
            <div className="text-xs text-muted-foreground">Overall Progress</div>
            <div className="mt-1 flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span>{requiredCompliancePercentage}% of required items</span>
            </div>
          </div>
        </div>
        
        <div className="mt-3 space-y-2">
          <Progress 
            value={compliancePercentage} 
            className="h-2" 
            indicatorClassName={getProgressColor(compliancePercentage)}
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{completedRequirements} of {totalRequirements} completed</span>
            {requiredCompleted < requiredItems.length && (
              <span className="text-red-500 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {requiredItems.length - requiredCompleted} required items pending
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Required Requirements Section */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Required Items
          </h3>
          <div className="space-y-3">
            {requiredRequirements.map(req => (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "p-4 border rounded-md",
                  req.completed ? "bg-green-50 border-green-200" : "bg-white",
                  activeRequirement === req.id ? "ring-2 ring-moh-green ring-opacity-50" : ""
                )}
                onClick={() => setActiveRequirement(activeRequirement === req.id ? null : req.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      {getStatusBadge(req.status)}
                    </div>
                    <div>
                      <h4 className="font-medium">{req.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                      
                      {req.dueDate && (
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Due by {req.dueDate}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant={req.completed ? "outline" : "default"}
                    className={req.completed ? "border-green-500 text-green-500" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateStatus(req.id);
                    }}
                  >
                    {req.completed ? (
                      <>
                        <CheckIcon className="h-4 w-4 mr-1" /> Completed
                      </>
                    ) : "Mark Complete"}
                  </Button>
                </div>
                
                {activeRequirement === req.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 pt-3 border-t"
                  >
                    <div className="flex items-center text-sm text-moh-green">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Download requirement documentation</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
            
            {requiredRequirements.length === 0 && (
              <div className="text-center p-4 text-muted-foreground">
                No required compliance items found
              </div>
            )}
          </div>
        </div>
        
        {/* Recommended Requirements Section */}
        {recommendedRequirements.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium mb-3 flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              Recommended Items
            </h3>
            <div className="space-y-3">
              {recommendedRequirements.map(req => (
                <motion.div 
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "p-4 border rounded-md",
                    req.completed ? "bg-green-50 border-green-200" : "bg-white"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {getStatusBadge(req.status)}
                      </div>
                      <div>
                        <h4 className="font-medium">{req.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant={req.completed ? "outline" : "default"}
                      className={req.completed ? "border-green-500 text-green-500" : ""}
                      onClick={() => handleUpdateStatus(req.id)}
                    >
                      {req.completed ? (
                        <>
                          <CheckIcon className="h-4 w-4 mr-1" /> Completed
                        </>
                      ) : "Mark Complete"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Optional Requirements Section */}
        {optionalRequirements.length > 0 && (
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
              Optional Items
            </h3>
            <div className="space-y-3">
              {optionalRequirements.map(req => (
                <motion.div 
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "p-4 border rounded-md",
                    req.completed ? "bg-green-50 border-green-200" : "bg-white"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {getStatusBadge(req.status)}
                      </div>
                      <div>
                        <h4 className="font-medium">{req.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant={req.completed ? "outline" : "default"}
                      className={req.completed ? "border-green-500 text-green-500" : ""}
                      onClick={() => handleUpdateStatus(req.id)}
                    >
                      {req.completed ? (
                        <>
                          <CheckIcon className="h-4 w-4 mr-1" /> Completed
                        </>
                      ) : "Mark Complete"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
