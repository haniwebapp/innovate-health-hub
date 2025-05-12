
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layouts/AdminLayout";
import { AIMonitoring } from '@/components/ai-governance/AIMonitoring';
import { PredictiveAnalytics } from '@/components/ai-governance/PredictiveAnalytics';
import { BiasDetection } from '@/components/ai-governance/BiasDetection';
import { RiskAssessment } from '@/components/ai-governance/RiskAssessment';
import { AIPolicy } from '@/components/ai-governance/AIPolicy';
import { BrainCircuit, BarChart2, Shield, AlertTriangle, FileText } from 'lucide-react';

export default function AIGovernancePage() {
  return (
    <AdminLayout
      title="AI Governance"
      description="Monitor and manage responsible AI usage across the platform"
    >
      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" />
            <span>AI Monitoring</span>
          </TabsTrigger>
          <TabsTrigger value="predictive" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Predictive Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Risk Assessment</span>
          </TabsTrigger>
          <TabsTrigger value="bias" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Bias Detection</span>
          </TabsTrigger>
          <TabsTrigger value="policy" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>AI Policy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          <AIMonitoring />
        </TabsContent>
        
        <TabsContent value="predictive" className="space-y-6">
          <PredictiveAnalytics />
        </TabsContent>
        
        <TabsContent value="risk" className="space-y-6">
          <RiskAssessment />
        </TabsContent>
        
        <TabsContent value="bias" className="space-y-6">
          <BiasDetection />
        </TabsContent>
        
        <TabsContent value="policy" className="space-y-6">
          <AIPolicy />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
