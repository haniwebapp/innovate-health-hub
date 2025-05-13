
import { motion } from "framer-motion";
import { BackgroundParticles } from "@/components/home/hero/animations/BackgroundParticles";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientOrbs } from "@/components/home/hero/animations/GradientOrbs";
import { ShieldCheck, ChevronRight, FileText, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

export default function PolicyHero() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const keyFeatures = [
    {
      icon: ShieldCheck,
      title: isRTL ? "إطار عمل تنظيمي" : "Regulatory Framework",
      description: isRTL ? "إرشادات شاملة للابتكارات الصحية" : "Comprehensive guidelines for healthcare innovations"
    },
    {
      icon: FileText,
      title: isRTL ? "سياسات مواءمة الرؤية" : "Vision Alignment Policies",
      description: isRTL ? "دعم أهداف رؤية 2030 للرعاية الصحية" : "Supporting Vision 2030 healthcare objectives"
    },
    {
      icon: CheckCircle,
      title: isRTL ? "أدوات الامتثال" : "Compliance Tools",
      description: isRTL ? "تبسيط عملية التقييم والموافقة" : "Streamlining assessment and approval process"
    }
  ];
  
  return (
    <section className="pt-28 pb-16 relative overflow-hidden bg-gradient-to-b from-moh-lightGreen/30 to-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundParticles />
        <GradientOrbs />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="bg-moh-lightGreen/70 rounded-lg p-2 inline-flex items-center">
                <ShieldCheck className="text-moh-darkGreen mr-2 h-5 w-5" />
                <span className="text-moh-darkGreen font-medium">
                  {isRTL ? "سياسة وإطار عمل" : "Policy & Framework"}
                </span>
              </div>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-moh-darkGreen leading-tight"
              variants={item}
            >
              {isRTL ? 
                "سياسات وأطر عمل الابتكار في الرعاية الصحية" : 
                "Healthcare Innovation Policies & Frameworks"}
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={item}
            >
              {isRTL ? 
                "استكشف السياسات والأطر التنظيمية التي تحكم ابتكارات الرعاية الصحية في المملكة العربية السعودية. تم تصميم هذه الأطر لضمان تطوير الابتكارات بطريقة آمنة ومسؤولة ومتوافقة مع أهداف رؤية 2030." : 
                "Explore the policies and regulatory frameworks governing healthcare innovations in Saudi Arabia. These frameworks are designed to ensure innovations are developed in a safe, responsible manner aligned with Vision 2030 objectives."}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
              variants={item}
            >
              <Button 
                className="bg-moh-green hover:bg-moh-darkGreen text-white"
                size="lg"
                asChild
              >
                <Link to="/policy/framework" className="group">
                  {isRTL ? "استكشاف الإطار التنظيمي" : "Explore Regulatory Framework"}
                  <ChevronRight className={`ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen/20"
                size="lg"
                asChild
              >
                <Link to="/policy/compliance-check">
                  {isRTL ? "التحقق من الامتثال" : "Compliance Check"}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Image/Features - Right Side */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/d5f3d02d-fd0b-43f5-ba20-ca6d566850df.png" 
                  alt="Policy Framework" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moh-darkGreen/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">
                    {isRTL ? "إطار عمل الابتكار" : "Innovation Framework"}
                  </h3>
                  <p className="text-sm text-white/90">
                    {isRTL ? "2024 الإصدار" : "2024 Edition"}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {keyFeatures.map((feature, index) => (
                  <ScrollFadeIn key={index} delay={index * 0.1}>
                    <div className="flex items-start p-3 rounded-lg hover:bg-moh-lightGreen/20 transition-colors duration-300">
                      <div className="bg-moh-lightGreen/50 rounded-md p-2 mr-4">
                        <feature.icon className="text-moh-darkGreen h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-moh-darkGreen">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </ScrollFadeIn>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
