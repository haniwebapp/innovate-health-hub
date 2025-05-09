
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Heart, Building, Globe } from "lucide-react";

export default function FocusAreasSection() {
  const { t } = useLanguage();
  
  const focusAreas = [
    {
      icon: <Heart className="h-8 w-8 text-moh-green" />,
      title: t('about.preventative'),
      description: t('about.preventativeDesc')
    },
    {
      icon: <Building className="h-8 w-8 text-moh-green" />,
      title: t('about.infrastructure'),
      description: t('about.infrastructureDesc')
    },
    {
      icon: <Globe className="h-8 w-8 text-moh-green" />,
      title: t('about.digital'),
      description: t('about.digitalDesc')
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('about.focusAreas')}
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-700"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t('about.focusDescription')}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {focusAreas.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
