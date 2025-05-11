
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { getRTLClasses } from '@/utils/rtlUtils';
import { LanguageSwitcher } from '@/components/knowledge/LanguageSwitcher';

// This is a placeholder for the learning path page that will be implemented later
export default function LearningPathPage() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const rtlClasses = getRTLClasses(language);

  return (
    <div className={`space-y-6 ${language === 'ar' ? 'rtl-mode' : ''}`}>
      <div className={`flex items-center justify-between ${rtlClasses.flex}`}>
        <BreadcrumbNav
          items={[
            { label: t('nav.dashboard'), href: "/dashboard" },
            { label: t('nav.knowledge'), href: "/dashboard/knowledge" }
          ]}
          currentPage={t('knowledge.learningPath')}
        />
        <LanguageSwitcher />
      </div>

      <h1 className={`text-3xl font-bold tracking-tight mb-2 ${rtlClasses.text}`}>
        {t('knowledge.learningPathDetails')}
      </h1>

      <div className={`${rtlClasses.text}`}>
        <p>
          {t('knowledge.learningPathIdParam', { id })}
        </p>
        <p className="mt-4">
          {t('knowledge.learningPathImplementation')}
        </p>
      </div>
    </div>
  );
}
