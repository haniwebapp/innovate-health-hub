
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Download, ExternalLink, Calendar, Award, Medal, Shield } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

const mockCertificates = [
  {
    id: "1",
    title: "Healthcare Innovation Specialist",
    issuer: "Saudi Health Innovation Authority",
    issueDate: "2023-09-15T00:00:00Z",
    expiryDate: "2025-09-15T00:00:00Z",
    credentialId: "MHIC-2023-1578",
    skills: ["Innovation Management", "Design Thinking", "Healthcare Solutions"],
    certificateUrl: "#",
    pathId: "1",
    pathTitle: "Healthcare Innovation Fundamentals"
  },
  {
    id: "2",
    title: "Digital Health Compliance",
    issuer: "Saudi FDA",
    issueDate: "2023-11-05T00:00:00Z",
    expiryDate: "2026-11-05T00:00:00Z",
    credentialId: "SFDA-DHC-8721",
    skills: ["Regulatory Compliance", "Risk Management", "Data Privacy"],
    certificateUrl: "#",
    pathId: "2",
    pathTitle: "Regulatory Pathways for Digital Health"
  }
];

const mockAvailableCertifications = [
  {
    id: "3",
    title: "Healthcare AI Practitioner",
    issuer: "Saudi Data & AI Authority",
    description: "Master the application of AI in healthcare diagnostics and treatment planning",
    duration: "6 months",
    level: "Advanced",
    requirements: ["Basic knowledge of AI", "Healthcare background", "Programming experience"],
    skills: ["Healthcare AI", "Machine Learning", "Medical Data Analysis"],
    icon: <Shield className="h-10 w-10 text-purple-500" />
  },
  {
    id: "4",
    title: "Medical Device Innovation Lead",
    issuer: "Saudi Innovation Center",
    description: "Learn to lead medical device innovation projects from concept to market",
    duration: "3 months",
    level: "Intermediate",
    requirements: ["Healthcare experience", "Basic product development knowledge"],
    skills: ["Medical Device Development", "Regulatory Strategy", "Clinical Validation"],
    icon: <Medal className="h-10 w-10 text-blue-500" />
  },
  {
    id: "5",
    title: "Healthcare Entrepreneur",
    issuer: "Ministry of Health Innovation Hub",
    description: "Develop the skills to create and grow sustainable healthcare ventures",
    duration: "4 months",
    level: "Beginner to Intermediate",
    requirements: ["Healthcare passion", "Business interest"],
    skills: ["Business Development", "Healthcare Market Analysis", "Funding Strategy"],
    icon: <Award className="h-10 w-10 text-green-500" />
  }
];

export function CertificationsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("earned");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">{t('learning.certifications')}</h2>
          <p className="text-sm text-muted-foreground">{t('learning.certificationsDescription')}</p>
        </div>
      </div>

      <Tabs defaultValue="earned" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="earned">
            {t('learning.earnedCertificates')}
          </TabsTrigger>
          <TabsTrigger value="available">
            {t('learning.availableCertifications')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="earned" className="space-y-4">
          {mockCertificates.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Award className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium">{t('learning.noCertificatesYet')}</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {t('learning.completeCourseForCertificate')}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveTab("available")}
                >
                  {t('learning.browseCertifications')}
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockCertificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <CardDescription>{cert.issuer}</CardDescription>
                      <div className="flex gap-1 mt-1.5">
                        {cert.skills.slice(0, 2).map((skill, i) => (
                          <Badge key={i} variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen">
                            {skill}
                          </Badge>
                        ))}
                        {cert.skills.length > 2 && (
                          <Badge variant="outline">+{cert.skills.length - 2}</Badge>
                        )}
                      </div>
                    </div>
                    <Award className="h-10 w-10 text-moh-green" />
                  </CardHeader>
                  
                  <CardContent className="pt-2">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('learning.credentialId')}</span>
                        <span className="font-medium">{cert.credentialId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('learning.issueDate')}</span>
                        <span>{new Date(cert.issueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('learning.expiryDate')}</span>
                        <span>{new Date(cert.expiryDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('learning.completedPath')}</span>
                        <span className="font-medium">{cert.pathTitle}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-2 grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      {t('learning.download')}
                    </Button>
                    <Button size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {t('learning.verify')}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAvailableCertifications.map((cert) => (
              <Card key={cert.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <CardDescription>{cert.issuer}</CardDescription>
                    </div>
                    {cert.icon}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-2">
                  <p className="text-sm mb-3">{cert.description}</p>
                  
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{cert.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{cert.level}</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">{t('learning.requirements')}</h4>
                    <ul className="text-sm space-y-1">
                      {cert.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full">
                    {t('learning.startCertification')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
