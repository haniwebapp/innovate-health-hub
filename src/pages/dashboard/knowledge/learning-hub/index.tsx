
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { LanguageSwitcher } from "@/components/knowledge/LanguageSwitcher";
import { LearningPathList } from "@/components/learning/LearningPathList";
import { FeaturedCourseCarousel } from "@/components/learning/FeaturedCourseCarousel";
import { MentorshipSection } from "@/components/learning/MentorshipSection";
import { CertificationsSection } from "@/components/learning/CertificationsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, BookOpen, Award, Users, Zap } from "lucide-react";

export default function LearningHubPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav
          items={[
            { label: t('nav.dashboard'), href: "/dashboard" },
            { label: t('nav.knowledge'), href: "/dashboard/knowledge" }
          ]}
          currentPage={t('learning.learningHub')}
        />
        <LanguageSwitcher />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('learning.learningHub')}</h1>
        <p className="text-muted-foreground">
          {t('learning.hubDescription')}
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('learning.searchCourses')}
          className="pl-10 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <FeaturedCourseCarousel />

      <Tabs defaultValue="learning-paths" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="learning-paths">
            <BookOpen className="h-4 w-4 mr-2" />
            {t('learning.learningPaths')}
          </TabsTrigger>
          <TabsTrigger value="certifications">
            <Award className="h-4 w-4 mr-2" />
            {t('learning.certifications')}
          </TabsTrigger>
          <TabsTrigger value="mentorship">
            <Users className="h-4 w-4 mr-2" />
            {t('learning.mentorship')}
          </TabsTrigger>
          <TabsTrigger value="quick-courses">
            <Zap className="h-4 w-4 mr-2" />
            {t('learning.quickCourses')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learning-paths" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">{t('learning.availablePaths')}</h2>
              <p className="text-sm text-muted-foreground">{t('learning.pathsDescription')}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                {t('learning.filter')}
              </Button>
              <Button>
                {t('learning.enrollNew')}
              </Button>
            </div>
          </div>
          <LearningPathList query={searchQuery} />
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <CertificationsSection />
        </TabsContent>

        <TabsContent value="mentorship" className="space-y-4">
          <MentorshipSection />
        </TabsContent>

        <TabsContent value="quick-courses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Quick courses will be populated here */}
            <div className="border rounded-lg p-6 flex items-center justify-center h-48">
              <p className="text-muted-foreground">{t('learning.comingSoon')}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
