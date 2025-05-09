
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StatisticDisplay } from "./StatisticDisplay";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HealthcareInnovationSection() {
  const { t, language } = useLanguage();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  
  const statistics = [
    {
      label: t('healthcare.stat1.label'),
      value: t('healthcare.stat1.value'),
      previousValue: (87 - 14).toString() + '%',
      trend: 'up' as const,
      importance: 'high' as const
    },
    {
      label: t('healthcare.stat2.label'),
      value: t('healthcare.stat2.value'),
      previousValue: (92 - 7).toString() + '%',
      trend: 'up' as const,
      importance: 'high' as const
    },
    {
      label: t('healthcare.stat3.label'),
      value: t('healthcare.stat3.value'),
      previousValue: (96 - 5).toString() + '%',
      trend: 'up' as const,
      importance: 'medium' as const
    },
    {
      label: t('healthcare.stat4.label'),
      value: t('healthcare.stat4.value'),
      previousValue: (41 - 6).toString() + '%',
      trend: 'up' as const,
      importance: 'medium' as const
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-white to-moh-lightGreen relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-gradient-green text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              {t('healthcare.title.revolutionizing')}
            </div>
            <div className="text-moh-darkGreen text-3xl md:text-4xl lg:text-5xl font-bold">
              {t('healthcare.title.healthcareInnovation')}
            </div>
            <div className="text-moh-gold text-2xl md:text-3xl lg:text-4xl font-medium my-2">
              {t('healthcare.title.with')}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 mt-6 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t('healthcare.description')}
          </motion.p>
        </div>

        <StatisticDisplay statistics={statistics} isVisible={isInView} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-moh-green hover:bg-moh-darkGreen text-white px-8 py-6 rounded-md text-lg font-medium"
          >
            {t('healthcare.button.explore')}
            <ArrowRight className={`h-5 w-5 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
          </Button>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-sm text-gray-500 mt-8"
          >
            {t('healthcare.label.dataActivity')}
          </motion.div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute -right-24 -top-24 w-64 h-64 bg-moh-lightGold rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -left-32 bottom-20 w-72 h-72 bg-moh-lightGreen rounded-full opacity-20 blur-3xl"></div>
    </section>
  );
}
