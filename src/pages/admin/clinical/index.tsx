
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import AdminLayout from "@/components/layouts/AdminLayout";
import { ClinicalRecordViewer } from "@/components/clinical/ClinicalRecordViewer";
import { ClinicalRecordForm } from "@/components/clinical/ClinicalRecordForm";
import { FileText, Plus, Activity } from "lucide-react";

export default function AdminClinicalPage() {
  const [activeTab, setActiveTab] = useState("records");
  const [showNewRecordForm, setShowNewRecordForm] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const handleRecordCreated = (recordId: string) => {
    setShowNewRecordForm(false);
    setSelectedRecordId(recordId);
  };

  return (
    <AdminLayout
      title="Clinical Data Management"
      description="Manage and analyze healthcare clinical information"
      actions={
        <Button 
          onClick={() => setShowNewRecordForm(true)}
          disabled={showNewRecordForm}
          className="bg-moh-green hover:bg-moh-darkGreen"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Record
        </Button>
      }
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="records" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Clinical Records
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <Activity className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="records" className="space-y-4">
          {showNewRecordForm ? (
            <ClinicalRecordForm 
              onSubmit={handleRecordCreated} 
              onCancel={() => setShowNewRecordForm(false)} 
            />
          ) : selectedRecordId ? (
            <ClinicalRecordViewer 
              recordId={selectedRecordId} 
              onUpdate={() => {}} 
            />
          ) : (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>No Record Selected</CardTitle>
                <CardDescription>
                  Create a new clinical record or select an existing one to view
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewRecordForm(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Record
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* This would normally include a list of records to select from */}
          {/* We're simplifying for this implementation */}
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Analytics</CardTitle>
              <CardDescription>
                Insights and trends from clinical data analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-16 w-16 mx-auto text-muted-foreground opacity-30" />
                <p className="mt-4 text-muted-foreground">
                  Clinical analytics functionality will be implemented in the next phase.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
