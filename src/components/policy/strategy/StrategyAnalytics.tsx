
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const StrategyAnalytics: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('quarterly');
  const [sector, setSector] = useState('all');

  // Mock data - in a real-world scenario, this would be fetched from an API
  const implementationData = [
    { name: 'Q1 2023', Planned: 20, Completed: 15, Progress: 75 },
    { name: 'Q2 2023', Planned: 25, Completed: 18, Progress: 72 },
    { name: 'Q3 2023', Planned: 30, Completed: 24, Progress: 80 },
    { name: 'Q4 2023', Planned: 35, Completed: 30, Progress: 85 },
    { name: 'Q1 2024', Planned: 40, Completed: 35, Progress: 87 },
  ];

  const sectorData = {
    digitalHealth: [
      { name: 'Q1 2023', Planned: 15, Completed: 12, Progress: 80 },
      { name: 'Q2 2023', Planned: 18, Completed: 15, Progress: 83 },
      { name: 'Q3 2023', Planned: 20, Completed: 18, Progress: 90 },
      { name: 'Q4 2023', Planned: 22, Completed: 20, Progress: 91 },
      { name: 'Q1 2024', Planned: 25, Completed: 23, Progress: 92 },
    ],
    telehealth: [
      { name: 'Q1 2023', Planned: 10, Completed: 5, Progress: 50 },
      { name: 'Q2 2023', Planned: 12, Completed: 8, Progress: 67 },
      { name: 'Q3 2023', Planned: 15, Completed: 12, Progress: 80 },
      { name: 'Q4 2023', Planned: 18, Completed: 15, Progress: 83 },
      { name: 'Q1 2024', Planned: 20, Completed: 18, Progress: 90 },
    ],
    medicalDevices: [
      { name: 'Q1 2023', Planned: 8, Completed: 6, Progress: 75 },
      { name: 'Q2 2023', Planned: 12, Completed: 10, Progress: 83 },
      { name: 'Q3 2023', Planned: 15, Completed: 13, Progress: 87 },
      { name: 'Q4 2023', Planned: 18, Completed: 16, Progress: 89 },
      { name: 'Q1 2024', Planned: 22, Completed: 20, Progress: 91 },
    ]
  };

  // Helper function to get the chart data based on selected sector
  const getChartData = () => {
    switch (sector) {
      case 'digital-health':
        return sectorData.digitalHealth;
      case 'telehealth':
        return sectorData.telehealth;
      case 'medical-devices':
        return sectorData.medicalDevices;
      default:
        return implementationData;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="w-full md:w-auto">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto">
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="digital-health">Digital Health</SelectItem>
              <SelectItem value="telehealth">Telehealth</SelectItem>
              <SelectItem value="medical-devices">Medical Devices</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="implementation">
        <TabsList>
          <TabsTrigger value="implementation">Implementation Progress</TabsTrigger>
          <TabsTrigger value="impact">Policy Impact</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="implementation">
          <Card>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getChartData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Planned" fill="#93c5fd" />
                    <Bar dataKey="Completed" fill="#00815c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="impact">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center h-60 bg-moh-lightGreen/10 rounded-md">
                <p className="text-muted-foreground">Impact metrics will be implemented in Phase 2</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center h-60 bg-moh-lightGreen/10 rounded-md">
                <p className="text-muted-foreground">Compliance metrics will be implemented in Phase 2</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
