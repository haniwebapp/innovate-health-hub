
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { ProcessFlow } from "@/components/animations/ProcessFlow";
import { ClipboardCheck, Users, Database, BarChart3, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProcessFlowSection() {
  const { t } = useLanguage();
  
  // Sample data to drive animations - In a real app, this would come from Supabase or an API
  const processSteps = [
    {
      icon: <ClipboardCheck className="w-6 h-6 text-moh-green" />,
      title: t('home.process.step1.title'),
      description: t('home.process.step1.description'),
      completionRate: 100, // Process step is complete
      timeMetric: 3 // 3 seconds process time
    },
    {
      icon: <Users className="w-6 h-6 text-moh-gold" />,
      title: t('home.process.step2.title'),
      description: t('home.process.step2.description'),
      completionRate: 85, // Process step is mostly complete
      timeMetric: 12 // 12 seconds process time
    },
    {
      icon: <Database className="w-6 h-6 text-moh-darkGold" />,
      title: t('home.process.step3.title'),
      description: t('home.process.step3.description'),
      completionRate: 60, // Process step is in progress
      timeMetric: 8 // 8 seconds process time
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-moh-darkGreen" />,
      title: t('home.process.step4.title'),
      description: t('home.process.step4.description'),
      completionRate: 30, // Process step is starting
      timeMetric: 5 // 5 seconds process time
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-moh-green" />,
      title: t('home.process.step5.title'),
      description: t('home.process.step5.description'),
      completionRate: 10, // Process step is just beginning
      timeMetric: 2 // 2 seconds process time
    }
  ];
  
  // The current active step
  const activeStepIndex = 2; // 0-based index
  
  // Calculate flow speed based on average process time
  const averageTime = processSteps.reduce((sum, step) => sum + (step.timeMetric || 0), 0) / processSteps.length;
  const flowSpeed = averageTime < 5 ? 'fast' : averageTime > 10 ? 'slow' : 'medium';
  
  // Calculate overall process completion
  const overallCompletion = processSteps.reduce((sum, step) => sum + (step.completionRate || 0), 0) / processSteps.length;
  
  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium mb-4">
            {t('home.process.tag')}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-moh-darkGreen mb-4">
            Process Workflow
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            {t('home.process.description')}
          </p>
          
          {/* Overall completion indicator */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span className="font-medium">{Math.round(overallCompletion)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-moh-lightGreen via-moh-green to-moh-darkGreen"
                initial={{ width: 0 }}
                animate={{ width: `${overallCompletion}%` }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
          </div>
        </ScrollFadeIn>
        
        {/* Data-driven ProcessFlow */}
        <ProcessFlow 
          steps={processSteps} 
          className="mb-16" 
          flowSpeed={flowSpeed}
          isActive={true}
        />
        
        <ScrollFadeIn 
          delay={1.5}
          className="flex flex-col items-center gap-4"
          direction="up"
        >
          {/* Dynamic button based on completion status */}
          <Button 
            size="lg" 
            className={`bg-gradient-to-r ${
              overallCompletion > 75 
                ? "from-moh-darkGreen to-moh-green" 
                : overallCompletion > 50
                ? "from-moh-green to-moh-darkGreen"
                : "from-moh-gold to-moh-darkGold"
            } text-white shadow-md group`}
          >
            {overallCompletion >= 100 
              ? t('home.process.completedButtonText')
              : overallCompletion > 50
              ? t('home.process.buttonText')
              : t('home.process.startButtonText')}
            <motion.div
              animate={{
                x: [0, 5, 0],
                transition: { 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  repeatDelay: overallCompletion > 75 ? 0.3 : 0.8 // More frequent animation when closer to completion
                }
              }}
            >
              →
            </motion.div>
          </Button>
          
          {/* Add step indicator text */}
          <div className="text-sm text-gray-500">
            {`Current step: ${activeStepIndex + 1}/${processSteps.length}`}
          </div>
        </ScrollFadeIn>
      </div>
      
      {/* Animated background elements - speed based on completion */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-moh-lightGreen rounded-full opacity-30 blur-xl"
        animate={{
          x: [0, 20, 0, -20, 0],
          y: [0, -20, 0, 20, 0],
          transition: { 
            duration: 20 - (overallCompletion / 10), // Faster as completion increases
            repeat: Infinity, 
            repeatType: "mirror" 
          }
        }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-moh-lightGold rounded-full opacity-30 blur-xl"
        animate={{
          x: [0, -20, 0, 20, 0],
          y: [0, 20, 0, -20, 0],
          transition: { 
            duration: 22 - (overallCompletion / 8), // Faster as completion increases
            repeat: Infinity, 
            repeatType: "mirror" 
          }
        }}
      />
    </section>
  );
}
