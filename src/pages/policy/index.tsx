
import React from 'react';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/home/Footer';
import { Vision2030AlignmentChecker } from '@/components/policy/vision-alignment/Vision2030AlignmentChecker';
import { StrategyAnalytics, StrategyGapAnalyzer } from '@/components/policy/strategy';
import { Button } from '@/components/ui/button';
import { ScrollProgress } from '@/components/animations/ScrollProgress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentChangeNotifier } from '@/components/policy/DocumentChangeNotifier';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <ScrollProgress />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
              Healthcare Policy Hub
            </h1>
            <p className="text-lg text-center text-muted-foreground mb-8">
              Analyze and align healthcare innovations with national policy frameworks
            </p>
            
            <Tabs defaultValue="vision" className="mb-8">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="vision">Vision 2030 Alignment</TabsTrigger>
                <TabsTrigger value="analytics">Policy Analytics</TabsTrigger>
                <TabsTrigger value="gap">Gap Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="vision">
                <Card>
                  <CardHeader>
                    <CardTitle>Vision 2030 Alignment Checker</CardTitle>
                    <CardDescription>
                      Check how your healthcare initiative aligns with Saudi Vision 2030 goals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Vision2030AlignmentChecker />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Healthcare Strategy Analytics</CardTitle>
                    <CardDescription>
                      Analyze performance against healthcare strategic goals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StrategyAnalytics />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="gap">
                <Card>
                  <CardHeader>
                    <CardTitle>Strategy Gap Analyzer</CardTitle>
                    <CardDescription>
                      Identify gaps between current initiatives and policy goals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StrategyGapAnalyzer />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <DocumentChangeNotifier />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PolicyPage;
