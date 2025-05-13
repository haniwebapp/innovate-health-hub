
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Users, Lightbulb, Heart } from "lucide-react";
import { BackgroundParticles } from "@/components/home/hero/animations/BackgroundParticles";
import { GradientOrbs } from "@/components/home/hero/animations/GradientOrbs";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
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
  
  const valueCards = [
    {
      icon: Lightbulb,
      title: isRTL ? "الابتكار" : "Innovation",
      description: isRTL ? "تقديم حلول صحية مبتكرة للمستقبل" : "Delivering innovative healthcare solutions for the future"
    },
    {
      icon: Users,
      title: isRTL ? "التعاون" : "Collaboration",
      description: isRTL ? "العمل معًا لتحقيق نتائج أفضل للمرضى" : "Working together for better patient outcomes"
    },
    {
      icon: Heart,
      title: isRTL ? "التأثير" : "Impact",
      description: isRTL ? "إحداث تغيير إيجابي في حياة الناس" : "Making a positive difference in people's lives"
    }
  ];
  
  return (
    <section className="pt-28 pb-20 relative overflow-hidden bg-gradient-to-b from-moh-lightGreen/20 to-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundParticles />
        <GradientOrbs />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Text Content - Left Side */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-moh-darkGreen leading-tight"
              variants={item}
            >
              {isRTL ? "تحويل الرعاية الصحية من خلال الابتكار" : "Transforming Healthcare Through Innovation"}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={item}
            >
              {isRTL ? 
                "منصة وزارة الصحة للابتكار هي نظام بيئي شامل يربط بين المبتكرين والمستثمرين والمنظمين لتمكين الابتكار في مجال الرعاية الصحية وتحسين نتائج المرضى في جميع أنحاء المملكة العربية السعودية." : 
                "The Ministry of Health Innovation Platform is a comprehensive ecosystem connecting innovators, investors, and regulators to enable healthcare innovation and improve patient outcomes across Saudi Arabia."}
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
                <Link to="/innovations" className="group">
                  {isRTL ? "استكشاف الابتكارات" : "Explore Innovations"}
                  <ChevronRight className={`ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen/20"
                size="lg"
                asChild
              >
                <Link to="/join-us">
                  {isRTL ? "انضم إلينا" : "Join Our Community"}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Image - Right Side */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-moh-green/20 to-moh-gold/20 blur-xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <img 
                src="/lovable-uploads/4b75072f-e048-410c-8071-da579732a493.png" 
                alt="Healthcare Innovation" 
                className="rounded-xl shadow-lg relative z-10 max-w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Value Cards */}
        <ScrollFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {valueCards.map((card, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="bg-moh-lightGreen/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <card.icon className="text-moh-green h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-moh-darkGreen mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
