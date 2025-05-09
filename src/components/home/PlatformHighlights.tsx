
import React from "react";
import { motion } from "framer-motion";
import { Brain, FileText, TrendingUp, BookOpen, Flask } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRTLClasses } from "@/utils/rtlUtils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="mb-4 bg-gradient-to-r from-moh-green to-moh-darkGreen p-3 rounded-lg inline-block text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-moh-darkGreen">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export default function PlatformHighlights() {
  const { t, language } = useLanguage();
  const rtlClasses = getRTLClasses(language);
  
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: t('home.features.ai.title') || "AI-Powered Innovation Matching",
      description: t('home.features.ai.description') || "Our advanced AI algorithms match your innovations with the right investors, challenges, and regulatory pathways for optimal success.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: t('home.features.regulatory.title') || "Regulatory Sandbox Access",
      description: t('home.features.regulatory.description') || "Test your healthcare solutions in a controlled environment with direct access to Ministry of Health guidance and support.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t('home.features.investment.title') || "Investment Marketplace",
      description: t('home.features.investment.description') || "Connect directly with qualified healthcare investors looking for innovation opportunities in the Saudi healthcare sector.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: t('home.features.knowledge.title') || "Knowledge Hub",
      description: t('home.features.knowledge.description') || "Access curated resources, research, and insights to help accelerate your healthcare innovation journey.",
    },
    {
      icon: <Flask className="h-6 w-6" />,
      title: t('home.features.challenges.title') || "Challenge Submissions",
      description: t('home.features.challenges.description') || "Participate in healthcare innovation challenges posed by the Ministry of Health and other stakeholders.",
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-moh-darkGreen mb-4">
            {t('home.features.title') || "Platform Highlights"}
          </h2>
          <p className="text-lg text-gray-600">
            {t('home.features.subtitle') || "Discover the key features powering healthcare innovation across Saudi Arabia"}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
