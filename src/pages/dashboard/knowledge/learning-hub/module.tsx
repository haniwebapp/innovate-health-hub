
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight, Play, FileText, Check, HelpCircle, CheckCircle } from "lucide-react";

export default function LearningModulePage() {
  const { moduleId } = useParams();
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('content');
  
  // Mock data for the module
  const module = {
    id: moduleId,
    title: "Ideation Techniques for Healthcare",
    description: "Methods and frameworks for generating innovative healthcare solutions.",
    contentType: "video",
    contentUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example URL
    estimatedMinutes: 45,
    orderIndex: 3,
    pathId: "path-1",
    pathTitle: "Healthcare Innovation Fundamentals"
  };

  // Update progress when the video plays or content is scrolled
  const handleProgress = (value: number) => {
    setProgress(value);
  };

  // Mark module as complete
  const handleComplete = () => {
    // In a real app, this would call an API to update the progress
    setProgress(100);
    // Redirect to the next module or back to the path page
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav
          items={[
            { label: t('nav.dashboard'), href: "/dashboard" },
            { label: t('nav.knowledge'), href: "/dashboard/knowledge" },
            { label: t('learning.learningHub'), href: "/dashboard/knowledge/learning-hub" },
            { label: module.pathTitle, href: `/dashboard/knowledge/learning-hub/path/${module.pathId}` }
          ]}
          currentPage={module.title}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Link to={`/dashboard/knowledge/learning-hub/path/${module.pathId}`}>
          <Button variant="ghost" size="sm" className="group">
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:translate-x-[-2px] transition-transform" />
            {t('learning.backToPath')}
          </Button>
        </Link>
        
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {t('learning.moduleProgress')}:
          </div>
          <Progress value={progress} className="w-32 h-2" />
          <div className="text-sm font-medium">
            {progress}%
          </div>
        </div>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{module.title}</h1>
        <p className="text-muted-foreground mt-1">{module.description}</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="content">
            {module.contentType === 'video' ? 
              <Play className="h-4 w-4 mr-2" /> : 
              <FileText className="h-4 w-4 mr-2" />
            }
            {t('learning.content')}
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText className="h-4 w-4 mr-2" />
            {t('learning.resources')}
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <HelpCircle className="h-4 w-4 mr-2" />
            {t('learning.quiz')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          {module.contentType === 'video' ? (
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe 
                src={module.contentUrl} 
                title={module.title} 
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2>Content will be displayed here</h2>
                  <p>This is a placeholder for module content.</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-between mt-6">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('learning.previousModule')}
            </Button>
            <Button onClick={handleComplete}>
              {progress === 100 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {t('learning.completed')}
                </>
              ) : (
                <>
                  {t('learning.markComplete')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('learning.additionalResources')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-moh-green mt-0.5" />
                  <div>
                    <a href="#" className="font-medium hover:underline">Healthcare Innovation Framework</a>
                    <p className="text-sm text-muted-foreground">PDF guide to innovation frameworks in healthcare</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-moh-green mt-0.5" />
                  <div>
                    <a href="#" className="font-medium hover:underline">Case Study: Successful Healthcare Innovations</a>
                    <p className="text-sm text-muted-foreground">Examples of successful healthcare innovations</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-moh-green mt-0.5" />
                  <div>
                    <a href="#" className="font-medium hover:underline">Ideation Workshop Template</a>
                    <p className="text-sm text-muted-foreground">Template for running an ideation workshop</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('learning.knowledgeCheck')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{t('learning.completeQuizDescription')}</p>
              
              <div className="space-y-6">
                {/* Quiz questions would go here */}
                <div className="p-8 text-center text-muted-foreground">
                  {t('learning.quizPlaceholder')}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">{t('learning.resetQuiz')}</Button>
              <Button>{t('learning.submitAnswers')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
