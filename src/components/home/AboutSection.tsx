
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { ParallaxCard } from "@/components/animations/ParallaxCard";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

export default function AboutSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const inView = useInView(contentRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="grid md:grid-cols-2 gap-12 items-center opacity-0">
          <div className="order-2 md:order-1">
            <ScrollFadeIn delay={0.2} direction="right" className="mb-4">
              <div className="inline-block px-4 py-1 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium">
                {t('home.about.tag')}
              </div>
            </ScrollFadeIn>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen leading-tight">
              <TextReveal 
                text={t('home.about.title')} 
                delay={0.3} 
                splitBy="words" 
                staggerDelay={0.06} 
              />
            </h2>
            
            <div className="space-y-4 mb-8">
              <ScrollFadeIn delay={0.6} className="text-gray-700 leading-relaxed">
                {t('home.about.paragraph1')}
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.8} className="text-gray-700 leading-relaxed">
                {t('home.about.paragraph2')}
              </ScrollFadeIn>
            </div>
            
            <ScrollFadeIn delay={1} className="flex flex-wrap gap-4">
              <Button 
                variant="outline" 
                className="border-moh-green text-moh-green hover:bg-moh-lightGreen group"
              >
                {t('home.about.vision2030Button')}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                >
                  <ExternalLink className="ml-2 h-4 w-4" />
                </motion.div>
              </Button>
              <Button 
                variant="outline" 
                className="border-moh-gold text-moh-darkGold hover:bg-moh-lightGold group"
              >
                {t('home.about.strategyButton')}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1, delay: 0.5 }}
                >
                  <ExternalLink className="ml-2 h-4 w-4" />
                </motion.div>
              </Button>
            </ScrollFadeIn>
          </div>
          
          <div className="order-1 md:order-2">
            <ScrollFadeIn delay={0.4} direction="left">
              <ParallaxCard className="rounded-2xl overflow-hidden shadow-xl bg-moh-darkGreen/5">
                <div className="aspect-video relative">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Healthcare innovation" 
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-moh-green/90 flex items-center justify-center cursor-pointer hover:bg-moh-green hover:scale-110 transition-all shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ 
                        boxShadow: [
                          "0 10px 15px -3px rgba(0, 129, 74, 0.3)",
                          "0 15px 20px -3px rgba(0, 129, 74, 0.5)",
                          "0 10px 15px -3px rgba(0, 129, 74, 0.3)"
                        ],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <Play className="w-6 h-6 text-white ml-1" />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="absolute bottom-4 left-4 right-4 flex justify-between items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <span className="bg-moh-green text-white px-4 py-2 text-sm rounded-md font-medium">
                      {t('home.about.videoOverlay')}
                    </span>
                    <span className="bg-white/80 backdrop-blur-sm text-moh-darkGreen px-3 py-1 text-xs rounded-md">
                      {t('home.about.videoDuration')}
                    </span>
                  </motion.div>
                </div>
              </ParallaxCard>
            </ScrollFadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
