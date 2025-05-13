
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Brain, Lightbulb, LineChart, Sparkles } from "lucide-react";
import { ChallengeIdeaGenerator } from '@/components/innovation/ChallengeIdeaGenerator';
import { SuccessPredictor } from '@/components/innovation/SuccessPredictor';
import { PersonalizedRecommendations } from '@/components/recommendation/PersonalizedRecommendations';

export default function AIEnhancedPage() {
  const [activeTab, setActiveTab] = useState("challenges");

  return (
    <>
      <Navbar />
      <main className="py-8 px-4 container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-moh-darkGreen mb-2">AI-Enhanced Healthcare Innovation</h1>
          <p className="text-muted-foreground max-w-3xl">
            Leverage cutting-edge AI tools to generate healthcare challenge ideas, predict innovation success, and receive personalized recommendations.
          </p>
        </div>

        <Card className="bg-gradient-to-r from-moh-lightGreen to-moh-green p-0.5 mb-8">
          <CardContent className="bg-white rounded-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <div className="h-12 w-12 rounded-full bg-moh-lightGreen/20 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-moh-gold" />
                </div>
                <h3 className="text-lg font-medium mb-2">Challenge Idea Generator</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  Generate innovative healthcare challenge ideas tailored to specific sectors and focus areas.
                </p>
              </div>
              
              <div className="flex flex-col">
                <div className="h-12 w-12 rounded-full bg-moh-lightGreen/20 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-moh-green" />
                </div>
                <h3 className="text-lg font-medium mb-2">Innovation Success Predictor</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  Predict the success probability of healthcare innovations with AI-powered analysis.
                </p>
              </div>
              
              <div className="flex flex-col">
                <div className="h-12 w-12 rounded-full bg-moh-lightGreen/20 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-moh-green" />
                </div>
                <h3 className="text-lg font-medium mb-2">Personalized Recommendations</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  Discover tailored recommendations for challenges, resources, events, and learning materials.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="mx-auto flex justify-center">
            <TabsTrigger value="challenges" className="px-4">Challenge Generator</TabsTrigger>
            <TabsTrigger value="predictor" className="px-4">Success Predictor</TabsTrigger>
            <TabsTrigger value="recommendations" className="px-4">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="challenges" className="space-y-6">
            <ChallengeIdeaGenerator />
          </TabsContent>
          
          <TabsContent value="predictor" className="space-y-6">
            <SuccessPredictor />
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-6">
            <PersonalizedRecommendations />
          </TabsContent>
        </Tabs>
        
        <Card className="mt-8 border-moh-gold/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-moh-gold" />
              About Our AI Features
            </CardTitle>
            <CardDescription>
              How our AI-enhanced tools can elevate your healthcare innovation journey
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Our AI-enhanced features are designed to support every stage of your healthcare innovation journey. 
              By leveraging cutting-edge artificial intelligence, we provide tools that can generate fresh ideas, 
              predict success factors, and deliver personalized recommendations that align with your interests 
              and goals.
            </p>
            
            <h4>Challenge Idea Generator</h4>
            <p>
              The Challenge Idea Generator uses advanced AI to create innovative healthcare challenge ideas 
              tailored to specific sectors. Whether you're interested in Digital Health, Preventive Care, 
              or any other healthcare domain, our AI can generate fresh, relevant challenge ideas complete 
              with descriptions, potential impact assessments, and Vision 2030 alignment analysis.
            </p>
            
            <h4>Innovation Success Predictor</h4>
            <p>
              Our Success Predictor tool analyzes your healthcare innovation against key success factors 
              and provides a comprehensive assessment of its likely success. The AI evaluates technical 
              feasibility, market fit, implementation challenges, and alignment with healthcare priorities, 
              offering specific recommendations to improve success probability.
            </p>
            
            <h4>Personalized Recommendations</h4>
            <p>
              Using sophisticated recommendation algorithms, we deliver personalized suggestions for 
              challenges, resources, events, and learning materials that align with your interests and 
              past activity. Our AI continually learns from your feedback to improve recommendation quality 
              over time.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
