
import React from 'react';
import { ScrollProgress } from '@/components/animations/ScrollProgress';
import { InnovationGuideGenerator } from '@/components/innovations/InnovationGuideGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, Sparkles, Lightbulb, TrendingUp } from 'lucide-react';

export default function InnovationGuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ScrollProgress />
      
      <main className="flex-grow py-10 mt-2">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Innovation Guide
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Receive tailored guidance for every stage of your healthcare innovation journey
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-moh-lightGreen/10 border-moh-green/20">
                  <CardContent className="pt-6 px-4 pb-4 flex flex-col items-center text-center">
                    <Lightbulb className="h-8 w-8 text-moh-green mb-2" />
                    <h3 className="font-medium">Personalized Roadmaps</h3>
                    <p className="text-sm text-muted-foreground">Stage-specific guidance for your innovation</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-moh-lightGreen/10 border-moh-green/20">
                  <CardContent className="pt-6 px-4 pb-4 flex flex-col items-center text-center">
                    <HeartPulse className="h-8 w-8 text-moh-green mb-2" />
                    <h3 className="font-medium">Healthcare Specialized</h3>
                    <p className="text-sm text-muted-foreground">Insights tailored to medical innovation</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-moh-lightGreen/10 border-moh-green/20">
                  <CardContent className="pt-6 px-4 pb-4 flex flex-col items-center text-center">
                    <TrendingUp className="h-8 w-8 text-moh-green mb-2" />
                    <h3 className="font-medium">Market Intelligence</h3>
                    <p className="text-sm text-muted-foreground">Current trends and strategic insights</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <InnovationGuideGenerator />
          </div>
        </div>
      </main>
    </div>
  );
}
