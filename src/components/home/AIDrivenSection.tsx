
import { useEffect, useRef, useState } from "react";
import { Sparkles, Brain, BrainCircuit, Zap, LightbulbIcon, FunctionSquare, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export default function AIDrivenSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const { toast } = useToast();
  
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

  // Rotate through features automatically
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

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
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 }
    }
  };
  
  const iconAnimationProps = {
    initial: { scale: 0.8, opacity: 0 },
    animate: isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const dataPointItems = [
    { value: "87%", label: "Diagnostic Accuracy" },
    { value: "93%", label: "User Satisfaction" },
    { value: "56%", label: "Cost Reduction" },
    { value: "2.5x", label: "Decision Speed" }
  ];
  
  const features = [
    {
      title: "Personalized Health Insights",
      description: "AI-powered analysis of healthcare data to provide personalized recommendations.",
      icon: <Brain className="w-8 h-8 text-moh-gold" />,
      color: "from-moh-lightGreen to-moh-lightGold",
      stats: "Improves outcome prediction by 73%"
    },
    {
      title: "Advanced Clinical Decision Support",
      description: "Machine learning algorithms assist healthcare providers in making evidence-based decisions.",
      icon: <BrainCircuit className="w-8 h-8 text-moh-gold" />,
      color: "from-moh-lightGold to-moh-gold/30",
      stats: "Reduces diagnostic errors by 47%"
    },
    {
      title: "Intelligent Innovation Matching",
      description: "AI-driven matching between healthcare challenges and innovative solutions.",
      icon: <Sparkles className="w-8 h-8 text-moh-gold" />,
      color: "from-moh-gold/30 to-moh-lightGreen",
      stats: "Accelerates solution discovery by 62%"
    },
    {
      title: "Predictive Analytics",
      description: "Forecast healthcare trends and patient outcomes with advanced AI models.",
      icon: <FunctionSquare className="w-8 h-8 text-moh-gold" />,
      color: "from-moh-lightGreen/50 to-moh-green/30",
      stats: "95% prediction accuracy rate"
    }
  ];

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index);
    toast({
      title: features[index].title,
      description: features[index].stats,
      duration: 3000,
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-moh-lightGreen/30 overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute w-64 h-64 bg-moh-gold/5 rounded-full top-10 -left-20 blur-3xl"></div>
      <div className="absolute w-96 h-96 bg-moh-green/5 rounded-full bottom-10 -right-20 blur-3xl"></div>
      <motion.div 
        className="absolute top-40 left-10 w-10 h-10 rounded-full bg-moh-gold/10"
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-40 right-10 w-16 h-16 rounded-full bg-moh-green/10"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
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
            <motion.div 
              animate={{ 
                rotate: isVisible ? [0, 360] : 0,
                scale: isVisible ? [1, 1.2, 1] : 1
              }} 
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatDelay: 5 }}
            >
              <Sparkles className="w-5 h-5 text-moh-gold" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={headingVariants}
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

          {/* AI Data Points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
            {dataPointItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg py-3 px-4 shadow-sm border border-gray-100"
              >
                <motion.div 
                  className="text-2xl font-bold text-moh-green"
                  animate={isVisible ? { 
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 1, delay: index * 0.2 + 0.8, repeat: 3, repeatDelay: 5 }}
                >
                  {item.value}
                </motion.div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* AI Features Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <TooltipProvider>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover="hover"
                onClick={() => handleFeatureClick(index)}
                className={`cursor-pointer ${activeFeature === index ? "ring-2 ring-moh-green ring-opacity-50" : ""}`}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className={`h-full bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                      activeFeature === index ? "bg-gradient-to-br bg-opacity-5" : ""
                    }`}>
                      <CardContent className="p-6">
                        <div className={`mb-5 flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color}`}>
                          <motion.div
                            {...iconAnimationProps}
                            transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                            className={`transform ${activeFeature === index ? "scale-110" : ""}`}
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
                        
                        {activeFeature === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-3 border-t border-dashed border-moh-lightGreen"
                          >
                            <p className="text-sm text-moh-green font-medium text-center">
                              {feature.stats}
                            </p>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to see statistics</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </TooltipProvider>
        </div>
        
        {/* AI Processing Visualization */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div className="relative w-full max-w-3xl h-20 bg-gradient-to-r from-moh-lightGreen via-moh-lightGold to-moh-lightGreen rounded-lg overflow-hidden shadow-lg">
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
            
            {/* Data nodes */}
            <div className="absolute inset-0 flex items-center justify-between px-8">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-3 w-3 rounded-full bg-white"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="text-white font-medium tracking-wide flex items-center gap-2 bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm"
                animate={{ 
                  scale: isVisible ? [1, 1.02, 1] : 1,
                  y: isVisible ? [0, -2, 0] : 0
                }}
                transition={{ 
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <BrainCircuit className="w-5 h-5" />
                </motion.div>
                <span>AI processing healthcare innovations in real-time</span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="w-5 h-5 text-moh-gold" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-moh-green to-moh-darkGreen text-white px-8 py-3 rounded-md font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Lightbulb className="w-5 h-5" />
              <span>Explore AI Solutions</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
