
import React, { useState } from 'react';
import { InvestmentTabs } from '@/components/investment/InvestmentTabs';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/home/Footer';
import { ScrollFadeIn } from '@/components/animations/ScrollFadeIn';
import { ArabicVerticalText } from '@/components/animations/ArabicVerticalText';

export default function InvestmentPage() {
  const [activeTab, setActiveTab] = useState('startups');
  const { t, language } = useLanguage();
  
  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-20">
        {language === 'ar' && (
          <div className="absolute top-32 -right-2">
            <ArabicVerticalText text="الاستثمار" className="opacity-10" />
          </div>
        )}
        
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <ScrollFadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('investment.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('investment.subtitle')}
            </p>
          </ScrollFadeIn>
        </div>
        
        <InvestmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Footer />
    </>
  );
}
