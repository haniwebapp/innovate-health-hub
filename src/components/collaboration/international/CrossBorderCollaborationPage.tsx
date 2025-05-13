
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/home/Footer';
import { InternationalPartnerDirectory } from './InternationalPartnerDirectory';
import { GlobalEvents } from './GlobalEvents';
import { CrossBorderTeams } from './CrossBorderTeams';
import { KnowledgeExchange } from './KnowledgeExchange';

export default function CrossBorderCollaborationPage() {
  const { t, isRTL } = useLanguage();
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className={`flex flex-col gap-4 mb-8 ${isRTL ? 'items-end text-right' : 'items-start'}`}>
            <h1 className="text-3xl font-bold text-moh-darkGreen">
              {isRTL ? 'التعاون عبر الحدود' : 'Cross-Border Collaboration'}
            </h1>
            <p className="text-gray-600 max-w-3xl">
              {isRTL 
                ? 'تواصل مع شركاء دوليين، وشارك في فعاليات عالمية، وتبادل المعرفة عبر الحدود.'
                : 'Connect with international partners, participate in global events, and exchange knowledge across borders.'}
            </p>
          </div>
          
          <Tabs defaultValue="partners" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="partners">{t('regulatory.collaboration.internationalPartners')}</TabsTrigger>
              <TabsTrigger value="events">{t('regulatory.collaboration.globalEvents')}</TabsTrigger>
              <TabsTrigger value="teams">{t('regulatory.collaboration.crossBorderTeams')}</TabsTrigger>
              <TabsTrigger value="knowledge">{t('regulatory.collaboration.knowledgeExchange')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="partners">
              <InternationalPartnerDirectory />
            </TabsContent>
            
            <TabsContent value="events">
              <GlobalEvents />
            </TabsContent>
            
            <TabsContent value="teams">
              <CrossBorderTeams />
            </TabsContent>
            
            <TabsContent value="knowledge">
              <KnowledgeExchange />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
