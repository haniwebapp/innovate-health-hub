
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/home/Footer';
import { RegulatoryMap } from './RegulatoryMap';
import { ComplianceChecklists } from './ComplianceChecklists';
import { RegulationComparison } from './RegulationComparison';
import { HarmonizationTools } from './HarmonizationTools';

export default function InternationalRegulationsPage() {
  const { t, isRTL } = useLanguage();
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className={`flex flex-col gap-4 mb-8 ${isRTL ? 'items-end text-right' : 'items-start'}`}>
            <h1 className="text-3xl font-bold text-moh-darkGreen">
              {t('regulatory.international.title')}
            </h1>
            <p className="text-gray-600 max-w-3xl">
              {isRTL 
                ? 'استكشف اللوائح التنظيمية عبر الأسواق العالمية وقارن المتطلبات وخطط لدخول السوق العالمي.'
                : 'Explore regulations across global markets, compare requirements, and plan for international market entry.'}
            </p>
          </div>
          
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="map">{t('regulatory.international.regulatoryMap')}</TabsTrigger>
              <TabsTrigger value="checklists">{t('regulatory.international.complianceChecklist')}</TabsTrigger>
              <TabsTrigger value="compare">{t('regulatory.international.compareRegions')}</TabsTrigger>
              <TabsTrigger value="harmonize">{t('regulatory.international.harmonization')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map">
              <RegulatoryMap />
            </TabsContent>
            
            <TabsContent value="checklists">
              <ComplianceChecklists />
            </TabsContent>
            
            <TabsContent value="compare">
              <RegulationComparison />
            </TabsContent>
            
            <TabsContent value="harmonize">
              <HarmonizationTools />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
