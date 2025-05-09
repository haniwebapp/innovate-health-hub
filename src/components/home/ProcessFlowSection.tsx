
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { ProcessFlow } from "@/components/animations/ProcessFlow";
import { ClipboardCheck, Users, Database, BarChart3, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProcessFlowSection() {
  const { t } = useLanguage();
  
  const processSteps = [
    {
      icon: <ClipboardCheck className="w-6 h-6 text-moh-green" />,
      title: t('home.process.step1.title'),
      description: t('home.process.step1.description')
    },
    {
      icon: <Users className="w-6 h-6 text-moh-gold" />,
      title: t('home.process.step2.title'),
      description: t('home.process.step2.description')
    },
    {
      icon: <Database className="w-6 h-6 text-moh-darkGold" />,
      title: t('home.process.step3.title'),
      description: t('home.process.step3.description')
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-moh-darkGreen" />,
      title: t('home.process.step4.title'),
      description: t('home.process.step4.description')
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-moh-green" />,
      title: t('home.process.step5.title'),
      description: t('home.process.step5.description')
    }
  ];
  
  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium mb-4">
            {t('home.process.tag')}
          </div>
          <p className="max-w-2xl mx-auto text-gray-700">
            {t('home.process.description')}
          </p>
        </ScrollFadeIn>
        
        <ProcessFlow steps={processSteps} className="mb-16" />
        
        <ScrollFadeIn 
          delay={1.5}
          className="flex justify-center"
          direction="up"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-moh-green to-moh-darkGreen text-white shadow-md group"
          >
            {t('home.process.buttonText')}
            <motion.div
              animate={{
                x: [0, 5, 0],
                transition: { duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 0.5 }
              }}
            >
              →
            </motion.div>
          </Button>
        </ScrollFadeIn>
      </div>
      
      {/* Animated background elements */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-moh-lightGreen rounded-full opacity-30 blur-xl"
        animate={{
          x: [0, 20, 0, -20, 0],
          y: [0, -20, 0, 20, 0],
          transition: { duration: 15, repeat: Infinity, repeatType: "mirror" }
        }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-moh-lightGold rounded-full opacity-30 blur-xl"
        animate={{
          x: [0, -20, 0, 20, 0],
          y: [0, 20, 0, -20, 0],
          transition: { duration: 18, repeat: Infinity, repeatType: "mirror" }
        }}
      />
    </section>
  );
}
