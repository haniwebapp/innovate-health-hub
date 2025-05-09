
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Heart, Users, Award, Lightbulb } from "lucide-react";

export default function ImpactMetricsSection() {
  const { t } = useLanguage();
  
  const metrics = [
    {
      icon: <Users className="w-10 h-10 text-moh-green" />,
      value: "500+",
      label: t('about.innovators'),
      description: t('about.innovatorsDescription')
    },
    {
      icon: <Award className="w-10 h-10 text-moh-darkGold" />,
      value: "40+",
      label: t('about.challenges'),
      description: t('about.challengesDescription')
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-moh-green" />,
      value: "120+",
      label: t('about.solutions'),
      description: t('about.solutionsDescription')
    },
    {
      icon: <Heart className="w-10 h-10 text-moh-darkGold" />,
      value: "3.5M+",
      label: t('about.patientsBenefited'),
      description: t('about.patientsBenefitedDescription')
    }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">{t('about.ourImpact')}</h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            {t('about.impactDescription')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <motion.div 
              key={i} 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="mb-4 mx-auto flex justify-center">
                {metric.icon}
              </div>
              <div className="text-3xl font-bold mb-2 text-moh-darkGreen">{metric.value}</div>
              <h3 className="text-lg font-medium mb-1 text-moh-darkGreen">{metric.label}</h3>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
