
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Calendar, Award } from "lucide-react";

export default function LearningPathDetailsPage() {
  const { pathId } = useParams();
  const { t } = useLanguage();
  
  // Mock data for the path details
  const path = {
    id: pathId,
    title: "Healthcare Innovation Fundamentals",
    description: "Learn the basics of innovation in the healthcare sector, including ideation, validation, and implementation.",
    level: "beginner" as const,
    category: "Innovation",
    estimatedHours: 8,
    totalModules: 6,
    completedModules: 2,
    progress: 33,
    instructor: "Dr. Sarah Ahmed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Mock data for the modules
  const modules = [
    {
      id: "module-1",
      title: "Introduction to Healthcare Innovation",
      description: "Overview of healthcare innovation and its importance in transforming healthcare delivery.",
      contentType: "video" as const,
      estimatedMinutes: 25,
      orderIndex: 1,
      status: "completed" as const
    },
    {
      id: "module-2",
      title: "Problem Identification and Validation",
      description: "How to identify healthcare problems worth solving and validate them with stakeholders.",
      contentType: "video" as const,
      estimatedMinutes: 35,
      orderIndex: 2,
      status: "completed" as const
    },
    {
      id: "module-3",
      title: "Ideation Techniques for Healthcare",
      description: "Methods and frameworks for generating innovative healthcare solutions.",
      contentType: "interactive" as const,
      estimatedMinutes: 45,
      orderIndex: 3,
      status: "in_progress" as const
    },
    {
      id: "module-4",
      title: "Prototyping Healthcare Solutions",
      description: "How to create low-fidelity prototypes to test healthcare concepts.",
      contentType: "video" as const,
      estimatedMinutes: 40,
      orderIndex: 4,
      status: "not_started" as const
    },
    {
      id: "module-5",
      title: "User Testing in Healthcare Settings",
      description: "Approaches for testing solutions with healthcare professionals and patients.",
      contentType: "article" as const,
      estimatedMinutes: 30,
      orderIndex: 5,
      status: "not_started" as const
    },
    {
      id: "module-6",
      title: "Implementation Strategies",
      description: "Strategies for implementing innovations in healthcare organizations.",
      contentType: "quiz" as const,
      estimatedMinutes: 50,
      orderIndex: 6,
      status: "not_started" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav
          items={[
            { label: t('nav.dashboard'), href: "/dashboard" },
            { label: t('nav.knowledge'), href: "/dashboard/knowledge" },
            { label: t('learning.learningHub'), href: "/dashboard/knowledge/learning-hub" }
          ]}
          currentPage={path.title}
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Link to="/dashboard/knowledge/learning-hub">
            <Button variant="ghost" size="sm" className="group">
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:translate-x-[-2px] transition-transform" />
              {t('learning.backToHub')}
            </Button>
          </Link>
          <Badge variant="outline" className="ml-auto">
            {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
          </Badge>
          <Badge variant="outline" className="bg-moh-green/10 text-moh-green">
            {path.category}
          </Badge>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight">{path.title}</h1>
        <p className="text-muted-foreground">{path.description}</p>
        
        <div className="flex flex-wrap gap-4 items-center mt-2">
          <div className="flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{path.estimatedHours} hours total</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{path.totalModules} modules</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Updated {new Date(path.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Your Progress</CardTitle>
          <CardDescription>Continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{path.completedModules} of {path.totalModules} modules completed</span>
              <span className="font-medium">{path.progress}%</span>
            </div>
            <Progress value={path.progress} className="h-2" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Continue Learning</Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Course Content</h2>
        
        <div className="space-y-3">
          {modules.map((module) => (
            <Card key={module.id} className={`overflow-hidden border ${
              module.status === 'completed' ? 'border-green-200 bg-green-50' : 
              module.status === 'in_progress' ? 'border-blue-200 bg-blue-50' : ''
            }`}>
              <CardHeader className="py-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {module.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center 
                        ${module.status === 'in_progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        {module.orderIndex}
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-base">{module.title}</CardTitle>
                      <CardDescription className="line-clamp-1">{module.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {module.contentType}
                    </Badge>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {module.estimatedMinutes} min
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="py-2 bg-white border-t flex justify-end">
                <Link to={`/dashboard/knowledge/learning-hub/module/${module.id}`}>
                  <Button variant={module.status === 'completed' ? 'outline' : 'default'} size="sm">
                    {module.status === 'completed' ? 'Review' : module.status === 'in_progress' ? 'Continue' : 'Start'}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-moh-lightGreen/10 border-moh-green/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-moh-green" />
            {t('learning.certification')}
          </CardTitle>
          <CardDescription>
            {t('learning.certificationDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {t('learning.completionRequirement')}
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" disabled={path.progress < 80}>
            {path.progress >= 80 ? t('learning.claimCertificate') : t('learning.certificateUnavailable')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
