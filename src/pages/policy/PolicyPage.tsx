
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { StrategyAnalytics, StrategyGapAnalyzer } from '@/components/policy/strategy';
import { Vision2030AlignmentChecker } from '@/components/policy/vision-alignment';
import { ArabicVerticalText } from '@/components/animations/ArabicVerticalText';

export default function PolicyPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState("vision-alignment");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BreadcrumbNav 
          items={[{ label: t('nav.dashboard'), href: "/dashboard" }]} 
          currentPage={t('nav.policy')} 
        />
      </div>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {t('policy.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('policy.description')}
        </p>
      </div>
      
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab}
        value={activeTab}
        className="space-y-6"
      >
        <TabsList className="bg-muted/50">
          <TabsTrigger value="vision-alignment">{t('policy.visionAlignment')}</TabsTrigger>
          <TabsTrigger value="strategy-gap">{t('policy.strategyGap')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('policy.analytics')}</TabsTrigger>
          <TabsTrigger value="impact">{t('policy.impact')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vision-alignment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('policy.visionAlignment')}</CardTitle>
              <CardDescription>
                {t('policy.visionAlignmentDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Vision2030AlignmentChecker />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategy-gap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('policy.strategyGap')}</CardTitle>
              <CardDescription>
                {t('policy.strategyGapDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StrategyGapAnalyzer />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('policy.analytics')}</CardTitle>
              <CardDescription>
                {t('policy.analyticsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StrategyAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('policy.impact')}</CardTitle>
              <CardDescription>
                {t('policy.impactDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">{t('policy.comingSoon')}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
