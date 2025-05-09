
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, FileText, TrendingUp, BookOpen, Beaker, ChevronRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRTLClasses } from "@/utils/rtlUtils";
import { Button } from "@/components/ui/button";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  ctaLink: string;
  onHover: () => void;
  isActive: boolean;
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
  ctaLink,
  onHover,
  isActive
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
      onHoverStart={onHover}
      className={`flex flex-col items-center bg-white rounded-xl p-6 shadow-md border ${
        isActive ? 'border-moh-green border-2' : 'border-gray-100'
      } hover:border-moh-lightGreen transition-all duration-300 h-full relative overflow-hidden group`}
    >
      {/* Subtle background highlight on active */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-moh-lightGreen/10 via-transparent to-moh-lightGold/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      <div className="mb-4 p-3 rounded-full bg-gradient-to-r from-moh-lightGreen to-moh-lightGold/30 group-hover:from-moh-green group-hover:to-moh-lightGold/50 transition-all duration-300">
        <div className="text-moh-green group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-center text-moh-darkGreen group-hover:text-moh-green transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-5">
        {description}
      </p>
      
      <div className="mt-auto pt-4 w-full">
        {/* Animated underline */}
        <motion.div 
          className="mb-4 pt-4 border-t border-dashed border-moh-lightGreen/40 w-1/3 mx-auto"
          initial={{ width: 0 }}
          whileInView={{ width: "33%" }}
          transition={{ duration: 1, delay: delay * 0.2 + 0.5 }}
          viewport={{ once: true }}
        />
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full border-moh-lightGreen text-moh-green hover:bg-moh-lightGreen hover:text-white transition-all group-hover:border-moh-green"
          asChild
        >
          <a href={ctaLink} className="flex items-center justify-center">
            <span>Learn More</span>
            <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
      
      {/* Animated corner accent */}
      <motion.div 
        className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-moh-lightGreen/0 group-hover:border-r-moh-green/20 transition-colors duration-300"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.2 + 0.8, duration: 0.4 }}
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
  
  // State to track the active feature card
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(null);
  
  const features = [{
    icon: <Brain className="h-6 w-6" />,
    title: t('home.features.ai.title') || "AI-Powered Innovation Matching",
    description: t('home.features.ai.description') || "Our advanced AI algorithms match your innovations with the right investors, challenges, and regulatory pathways for optimal success.",
    ctaLink: "/ai-matching"
  }, {
    icon: <FileText className="h-6 w-6" />,
    title: t('home.features.regulatory.title') || "Regulatory Sandbox Access",
    description: t('home.features.regulatory.description') || "Test your healthcare solutions in a controlled environment with direct access to Ministry of Health guidance and support.",
    ctaLink: "/regulatory"
  }, {
    icon: <TrendingUp className="h-6 w-6" />,
    title: t('home.features.investment.title') || "Investment Marketplace",
    description: t('home.features.investment.description') || "Connect directly with qualified healthcare investors looking for innovation opportunities in the Saudi healthcare sector.",
    ctaLink: "/investment"
  }, {
    icon: <BookOpen className="h-6 w-6" />,
    title: t('home.features.knowledge.title') || "Knowledge Hub",
    description: t('home.features.knowledge.description') || "Access curated resources, research, and insights to help accelerate your healthcare innovation journey.",
    ctaLink: "/knowledge-hub"
  }, {
    icon: <Beaker className="h-6 w-6" />,
    title: t('home.features.challenges.title') || "Challenge Submissions",
    description: t('home.features.challenges.description') || "Participate in healthcare innovation challenges posed by the Ministry of Health and other stakeholders.",
    ctaLink: "/challenges"
  }];
  
  // For vertical text display (decorative)
  const verticalTexts = language === 'en' 
    ? ["INNOVATE", "CONNECT", "TRANSFORM"] 
    : ["ابتكار", "تواصل", "تحول"];
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-moh-lightGreen/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-moh-lightGreen opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-moh-lightGold opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      {/* Decorative vertical text elements */}
      <div className="absolute left-2 top-1/3 hidden lg:block">
        <ArabicVerticalText 
          text={verticalTexts[0]} 
          className="text-moh-green/10 font-bold tracking-widest"
        />
      </div>
      <div className="absolute right-4 top-1/4 hidden lg:block">
        <ArabicVerticalText 
          text={verticalTexts[1]} 
          className="text-moh-gold/10 font-bold tracking-widest"
        />
      </div>
      <div className="absolute left-1/2 bottom-12 hidden lg:block">
        <ArabicVerticalText 
          text={verticalTexts[2]} 
          className="text-moh-darkGreen/10 font-bold tracking-widest"
        />
      </div>
      
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
              ctaLink={feature.ctaLink}
              onHover={() => setActiveFeatureIndex(index)}
              isActive={activeFeatureIndex === index}
            />
          ))}
        </div>
        
        {/* Enhanced call to action with animated elements */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex flex-wrap justify-center gap-6">
            <Button 
              className="bg-gradient-to-r from-moh-green to-moh-darkGreen text-white px-8 py-3 rounded-md font-medium hover:shadow-lg transition-all group"
            >
              <span>{t('home.features.cta') || "Explore All Features"}</span>
              <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline"
              className="border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen/20 px-8 py-3 rounded-md font-medium group"
              asChild
            >
              <a href="/about" className="flex items-center">
                <span>{t('home.features.learnMore') || "Learn About Our Mission"}</span>
                <ExternalLink className="ml-1 h-4 w-4 transition-opacity duration-300 opacity-70 group-hover:opacity-100" />
              </a>
            </Button>
          </div>
          
          {/* Feature stats counter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div>
              <p className="text-2xl font-bold text-moh-green">5+</p>
              <p className="text-sm text-gray-600">Core Features</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-moh-gold">24/7</p>
              <p className="text-sm text-gray-600">Platform Access</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-moh-darkGreen">100%</p>
              <p className="text-sm text-gray-600">MOH Compliance</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
