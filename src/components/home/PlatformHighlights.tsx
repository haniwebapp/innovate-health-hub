
import React from "react";
import { motion } from "framer-motion";
import { Brain, FileText, TrendingUp, BookOpen, Beaker } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRTLClasses } from "@/utils/rtlUtils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({
  icon,
  title,
  description,
  delay
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      className="flex flex-col items-center bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-moh-lightGreen transition-all duration-300 h-full"
    >
      <div className="mb-4 p-3 rounded-full bg-gradient-to-r from-moh-lightGreen to-moh-lightGold/30">
        <div className="text-moh-green">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-center text-moh-darkGreen">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center">
        {description}
      </p>
      
      <motion.div 
        className="mt-6 pt-4 border-t border-dashed border-moh-lightGreen/40 w-1/3"
        initial={{ width: 0 }}
        whileInView={{ width: "33%" }}
        transition={{ duration: 1, delay: delay * 0.2 + 0.5 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
}

export default function PlatformHighlights() {
  const {
    t,
    language
  } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  const features = [{
    icon: <Brain className="h-6 w-6" />,
    title: t('home.features.ai.title') || "AI-Powered Innovation Matching",
    description: t('home.features.ai.description') || "Our advanced AI algorithms match your innovations with the right investors, challenges, and regulatory pathways for optimal success."
  }, {
    icon: <FileText className="h-6 w-6" />,
    title: t('home.features.regulatory.title') || "Regulatory Sandbox Access",
    description: t('home.features.regulatory.description') || "Test your healthcare solutions in a controlled environment with direct access to Ministry of Health guidance and support."
  }, {
    icon: <TrendingUp className="h-6 w-6" />,
    title: t('home.features.investment.title') || "Investment Marketplace",
    description: t('home.features.investment.description') || "Connect directly with qualified healthcare investors looking for innovation opportunities in the Saudi healthcare sector."
  }, {
    icon: <BookOpen className="h-6 w-6" />,
    title: t('home.features.knowledge.title') || "Knowledge Hub",
    description: t('home.features.knowledge.description') || "Access curated resources, research, and insights to help accelerate your healthcare innovation journey."
  }, {
    icon: <Beaker className="h-6 w-6" />,
    title: t('home.features.challenges.title') || "Challenge Submissions",
    description: t('home.features.challenges.description') || "Participate in healthcare innovation challenges posed by the Ministry of Health and other stakeholders."
  }];
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-moh-lightGreen/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-moh-lightGreen opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-moh-lightGold opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium mb-4">
            {t('home.features.tag') || "Platform Features"}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen">
            {t('home.features.title') || "Advancing Healthcare Innovation"}
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-700">
            {t('home.features.subtitle') || "Our platform provides comprehensive tools and resources to support healthcare innovations from concept to implementation."}
          </p>
        </motion.div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 ${rtlClasses.container}`}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="bg-gradient-to-r from-moh-green to-moh-darkGreen text-white px-8 py-3 rounded-md font-medium hover:shadow-lg transition-all">
            {t('home.features.cta') || "Explore All Features"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
