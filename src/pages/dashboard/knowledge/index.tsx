import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/knowledge/LanguageSwitcher';
import { SemanticSearchBar } from '@/components/knowledge/SemanticSearchBar';
import { ResourceCard } from '@/components/knowledge/ResourceCard';
import { mockData } from '@/components/knowledge/mockData';
import { BookOpen, FileText, GraduationCap, Calendar, Search, Filter } from 'lucide-react';

// This is a placeholder for the knowledge hub dashboard that will be enhanced
export default function DashboardKnowledgePage() {
  const { t } = useLanguage();
  const featuredResources = mockData.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav
          items={[
            { label: t('nav.dashboard'), href: "/dashboard" }
          ]}
          currentPage={t('nav.knowledge')}
        />
        <LanguageSwitcher />
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {t('knowledge.title')}
      </h1>

      <SemanticSearchBar />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-2 bg-gradient-to-br from-moh-lightGreen/30 to-moh-green/10 border-moh-green/20 hover:border-moh-green/30 transition-colors cursor-pointer">
          <Link to="/dashboard/knowledge/learning-hub" className="block h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-moh-green" />
                Learning Hub
              </CardTitle>
              <CardDescription>
                Enhance your healthcare innovation skills with structured learning paths
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Access curated learning paths, earn certifications, and connect with mentors to accelerate your innovation journey.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Explore Learning Hub</Button>
            </CardFooter>
          </Link>
        </Card>

        <Card className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300 transition-colors cursor-pointer">
          <Link to="/dashboard/knowledge/resources" className="block h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Resource Library
              </CardTitle>
              <CardDescription>
                Discover knowledge resources on healthcare innovation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Access white papers, case studies, research reports, and best practice guides to inform your innovation journey.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary">Browse Resources</Button>
            </CardFooter>
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Featured Resources</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Webinars</CardTitle>
              <CardDescription>Register for learning events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">AI in Healthcare Diagnostics</h3>
                  <Badge variant="outline">Tomorrow</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Learn about the latest AI applications in medical imaging and diagnostics.</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Register</Button>
                  <Button size="sm" variant="ghost">Details</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">Regulatory Navigation Workshop</h3>
                  <Badge variant="outline">Next Week</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">A practical guide to navigating healthcare regulatory requirements.</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Register</Button>
                  <Button size="sm" variant="ghost">Details</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View All Events
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
