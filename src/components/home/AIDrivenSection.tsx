
import { useEffect, useRef, useState } from "react";
import { Sparkles, Brain, BrainCircuit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function AIDrivenSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const iconAnimationProps = {
    initial: { scale: 0.8, opacity: 0 },
    animate: isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };
  
  const features = [
    {
      title: "Personalized Health Insights",
      description: "AI-powered analysis of healthcare data to provide personalized recommendations.",
      icon: <Brain className="w-8 h-8 text-moh-gold" />
    },
    {
      title: "Advanced Clinical Decision Support",
      description: "Machine learning algorithms assist healthcare providers in making evidence-based decisions.",
      icon: <BrainCircuit className="w-8 h-8 text-moh-gold" />
    },
    {
      title: "Intelligent Innovation Matching",
      description: "AI-driven matching between healthcare challenges and innovative solutions.",
      icon: <Sparkles className="w-8 h-8 text-moh-gold" />
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-moh-lightGreen/30 overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute w-64 h-64 bg-moh-gold/5 rounded-full top-10 -left-20 blur-3xl"></div>
      <div className="absolute w-96 h-96 bg-moh-green/5 rounded-full bottom-10 -right-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium">
              AI-Powered Platform
            </span>
            <motion.div animate={{ rotate: isVisible ? 360 : 0 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}>
              <Sparkles className="w-5 h-5 text-moh-gold" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-moh-green to-moh-gold">
              AI-Driven Healthcare Innovation
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-700 text-lg mb-10"
          >
            Leveraging cutting-edge artificial intelligence to transform healthcare delivery, 
            research, and innovation for better patient outcomes and system efficiency.
          </motion.p>
        </div>
        
        {/* AI Features Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Card className="h-full bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center justify-center w-16 h-16 mx-auto bg-moh-lightGreen rounded-full">
                    <motion.div
                      {...iconAnimationProps}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center text-moh-darkGreen">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* AI Visualization */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div className="relative w-full max-w-2xl h-16 bg-gradient-to-r from-moh-lightGreen via-moh-lightGold to-moh-lightGreen rounded-lg overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-moh-green/60 via-transparent to-moh-gold/60"
              animate={{ 
                x: isVisible ? ["0%", "100%", "0%"] : "0%" 
              }}
              transition={{ 
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="text-white font-medium tracking-wide flex items-center gap-2"
                animate={{ scale: isVisible ? [1, 1.05, 1] : 1 }}
                transition={{ 
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <BrainCircuit className="w-5 h-5" />
                <span>AI processing healthcare innovations in real-time</span>
                <BrainCircuit className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
