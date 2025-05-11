
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ComplianceService } from "@/services/compliance/ComplianceService";
import { ComplianceRecord } from "@/types/complianceTypes";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertTriangle, AlertCircle, Loader2, Check, Info } from "lucide-react";

interface ComplianceChecklistProps {
  resourceId: string;
  resourceType: string;
  onUpdate?: () => void;
}

export function ComplianceChecklist({ resourceId, resourceType, onUpdate }: ComplianceChecklistProps) {
  const { toast } = useToast();
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchComplianceRecords();
  }, [resourceId]);

  const fetchComplianceRecords = async () => {
    setIsLoading(true);
    try {
      const records = await ComplianceService.getRecords({
        resourceId,
        resourceType
      });
      
      setComplianceRecords(records);
      
      // Initialize checked state based on retrieved records
      const initialCheckedState: Record<string, boolean> = {};
      records.forEach(record => {
        initialCheckedState[record.id] = record.status === 'compliant';
      });
      setCheckedItems(initialCheckedState);
    } catch (error) {
      console.error("Error fetching compliance records:", error);
      toast({
        variant: "destructive",
        title: "Error loading compliance data",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemCheck = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      for (const id in checkedItems) {
        const record = complianceRecords.find(r => r.id === id);
        if (record) {
          const newStatus = checkedItems[id] ? 'compliant' : 'non-compliant';
          if (record.status !== newStatus) {
            await ComplianceService.reviewRecord(id, newStatus);
          }
        }
      }
      
      toast({
        title: "Compliance status updated",
        description: "All compliance items have been updated successfully.",
      });
      
      // Refresh the data
      fetchComplianceRecords();
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error updating compliance records:", error);
      toast({
        variant: "destructive",
        title: "Error updating compliance",
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate compliance percentage
  const totalItems = complianceRecords.length;
  const compliantItems = Object.values(checkedItems).filter(Boolean).length;
  const compliancePercentage = totalItems > 0 ? Math.round((compliantItems / totalItems) * 100) : 0;

  // Group records by standard for better organization
  const recordsByStandard: Record<string, ComplianceRecord[]> = {};
  complianceRecords.forEach(record => {
    if (!recordsByStandard[record.standard_name]) {
      recordsByStandard[record.standard_name] = [];
    }
    recordsByStandard[record.standard_name].push(record);
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 min-h-[200px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
          <p className="text-muted-foreground">Loading compliance checklist...</p>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Compliance Checklist</span>
          <Badge 
            className={`text-white ${
              compliancePercentage === 100 
                ? 'bg-green-500' 
                : compliancePercentage >= 75 
                ? 'bg-amber-500' 
                : 'bg-red-500'
            }`}
          >
            {compliancePercentage}% Compliant
          </Badge>
        </CardTitle>
        <CardDescription>Verify compliance with required standards and regulations</CardDescription>
        
        <div className="mt-2">
          <Progress value={compliancePercentage} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {complianceRecords.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Info className="h-10 w-10 mx-auto text-muted-foreground opacity-50 mb-2" />
              <p className="text-muted-foreground">No compliance requirements found</p>
              <p className="text-xs text-muted-foreground mt-1">
                This resource may not have any applicable compliance requirements
              </p>
            </div>
          </div>
        ) : (
          <>
            {Object.entries(recordsByStandard).map(([standard, records]) => (
              <div key={standard} className="space-y-3">
                <h3 className="text-lg font-medium">{standard}</h3>
                <div className="space-y-3">
                  {records.map((record) => {
                    const isChecked = checkedItems[record.id] || false;
                    
                    return (
                      <div 
                        key={record.id} 
                        className={`p-4 rounded-lg border ${
                          isChecked 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-amber-200 bg-amber-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="pt-0.5">
                            <Checkbox 
                              id={`check-${record.id}`} 
                              checked={isChecked}
                              onCheckedChange={(checked) => handleItemCheck(record.id, checked === true)}
                            />
                          </div>
                          <div className="space-y-1 flex-1">
                            <Label 
                              htmlFor={`check-${record.id}`}
                              className="font-medium cursor-pointer"
                            >
                              {record.title}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {record.description}
                            </p>
                            
                            {record.applicable_regulations && record.applicable_regulations.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {record.applicable_regulations.map((regulation, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {regulation}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <div>
                            {isChecked ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-amber-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {compliancePercentage < 100 && (
              <Alert className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle>Compliance Gaps Detected</AlertTitle>
                <AlertDescription>
                  This resource is not fully compliant with required standards. Please address the unchecked items.
                </AlertDescription>
              </Alert>
            )}
            
            {compliancePercentage === 100 && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Fully Compliant</AlertTitle>
                <AlertDescription>
                  This resource meets all required compliance standards.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="pt-2">
              <Button 
                className="w-full" 
                disabled={isSaving}
                onClick={handleSave}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Save Compliance Status
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
