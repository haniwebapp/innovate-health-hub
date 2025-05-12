
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import AdminLayout from "@/components/layouts/AdminLayout";
import { ClinicalRecordViewer } from "@/components/clinical/ClinicalRecordViewer";
import { ClinicalRecordForm } from "@/components/clinical/ClinicalRecordForm";
import { FileText, Plus, Activity } from "lucide-react";
import { ClinicalRecord } from '@/types/clinicalTypes';

// Mock clinical record for demo purposes
const mockRecord: ClinicalRecord = {
  id: "cr-123",
  title: "Cardiac Monitoring Device",
  description: "Wearable device for continuous cardiac monitoring with real-time alerts and data analysis",
  record_type: "Medical Device",
  symptoms: ["Arrhythmia", "Chest Pain", "Palpitations"],
  diagnosis: ["Atrial Fibrillation", "Heart Failure"],
  created_by: "user-1",
  created_at: "2025-05-10T08:30:00Z",
  updated_at: "2025-05-11T14:45:00Z",
  medical_codes: {
    "ICD-10": "I48.91",
    "CPT": "93224"
  }
};

export default function AdminClinicalPage() {
  const [activeTab, setActiveTab] = useState("records");
  const [showNewRecordForm, setShowNewRecordForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(mockRecord);

  const handleRecordCreated = (data: {
    title?: string;
    description?: string;
    diagnosis?: string[];
    record_type?: string;
    symptoms?: string[];
  }) => {
    // In a real implementation, this would save to the database
    console.log("Creating record:", data);
    
    // Create a mock record with the submitted data
    const newRecord: ClinicalRecord = {
      id: `cr-${Date.now()}`,
      title: data.title || "",
      description: data.description,
      record_type: data.record_type || "",
      symptoms: data.symptoms,
      diagnosis: data.diagnosis,
      created_by: "user-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setSelectedRecord(newRecord);
    setShowNewRecordForm(false);
  };

  const handleUpdateRecord = () => {
    // This would show the edit form in a real implementation
    console.log("Update record requested");
    // For this demo, we'll just toggle the form
    setShowNewRecordForm(true);
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
              initialData={selectedRecord || undefined}
            />
          ) : selectedRecord ? (
            <ClinicalRecordViewer 
              record={selectedRecord} 
              onUpdate={handleUpdateRecord} 
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
