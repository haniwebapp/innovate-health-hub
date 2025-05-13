
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StrategyAnalytics, StrategyGapAnalyzer } from '@/components/policy/strategy';
import { Vision2030AlignmentChecker } from '@/components/policy/vision-alignment';
import { motion } from "framer-motion";

const PolicyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vision2030');

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-moh-darkGreen mb-2">Health Policy Center</h1>
        <p className="text-gray-600 max-w-3xl">
          Analyze, develop, and align healthcare policies with Saudi Vision 2030 goals. 
          Use our tools to ensure regulatory compliance and strategic alignment.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="vision2030" className="text-sm">Vision 2030 Alignment</TabsTrigger>
          <TabsTrigger value="analytics" className="text-sm">Policy Analytics</TabsTrigger>
          <TabsTrigger value="gap" className="text-sm">Gap Analysis</TabsTrigger>
        </TabsList>
        
        <div className="mt-8">
          <TabsContent value="vision2030" className="space-y-4">
            <Card>
              <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-transparent">
                <CardTitle className="text-xl font-playfair text-moh-darkGreen">Vision 2030 Alignment</CardTitle>
                <CardDescription>
                  Check how healthcare initiatives align with Vision 2030 objectives
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Vision2030AlignmentChecker />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-transparent">
                <CardTitle className="text-xl font-playfair text-moh-darkGreen">Strategy Analytics</CardTitle>
                <CardDescription>
                  Analyze healthcare policy metrics and performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <StrategyAnalytics />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gap" className="space-y-4">
            <Card>
              <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-transparent">
                <CardTitle className="text-xl font-playfair text-moh-darkGreen">Strategy Gap Analysis</CardTitle>
                <CardDescription>
                  Identify gaps between current healthcare strategies and Vision 2030 goals
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <StrategyGapAnalyzer />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PolicyPage;
