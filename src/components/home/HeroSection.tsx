import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";
export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const {
    t,
    language
  } = useLanguage();
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.classList.add('animate-fade-in');
    }
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  return <section className="pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Logo */}
          <motion.div className="w-28 h-28 mx-auto mb-8 bg-white rounded-full shadow-xl flex items-center justify-center" initial={{
          y: -100,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2
        }}>
            <motion.div className="w-20 h-20 bg-gradient-to-r from-moh-green to-moh-darkGreen rounded-full flex items-center justify-center" animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }} transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}>
              <img alt="MOH Innovation Logo" className="w-18 h-18 object-contain" src="/lovable-uploads/bba68330-974d-4c62-a240-517e2bbdf8f9.png" />
            </motion.div>
          </motion.div>
          
          <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
            <div className="flex flex-row justify-center items-start py-0">
              {language === 'ar'}
              
              <div className={language === 'ar' ? 'ml-4' : 'mr-4'}>
                <TextReveal text={t('home.hero.titleGradient')} className="text-gradient block" delay={0.6} staggerDelay={0.05} splitBy="words" />
                <TextReveal text={t('home.hero.titleDark')} className="text-moh-darkGreen block mt-2" delay={1} staggerDelay={0.04} splitBy="words" />
              </div>
              
              {language === 'en' && <div className="mx-4">
                  <ArabicVerticalText text="تمكين الابتكار الصحي" />
                </div>}
            </div>
          </h1>
          
          <motion.p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 1.4
        }}>
            {t('home.hero.description')}
          </motion.p>
          
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen text-white shadow-md group" asChild>
                <Link to="/innovations">
                  {t('home.hero.exploreButton')}
                  <motion.div animate={{
                  x: [0, 5, 0]
                }} transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2
                }}>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Button size="lg" variant="outline" className="border-moh-gold text-moh-darkGold hover:bg-moh-lightGold hover:text-moh-darkGold/90 shadow-sm group" asChild>
                <Link to="/challenges">
                  <motion.div animate={{
                  rotate: [0, 10, -10, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}>
                    <Sparkles className="mr-2 h-4 w-4" />
                  </motion.div>
                  {t('home.hero.joinButton')}
                </Link>
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen shadow-sm" asChild>
                <Link to="/investment">
                  <Award className="mr-2 h-4 w-4" />
                  {t('home.hero.investmentButton')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div className="mt-16 grid grid-cols-3 gap-4" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <div className="text-center">
              <div className="font-bold text-2xl text-moh-green">
                <AnimatedCounter value={500} suffix="+" duration={2.5} />
              </div>
              <div className="text-sm text-gray-600">{t('home.hero.stats.innovators')}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-moh-darkGold">
                <AnimatedCounter value={250} suffix="M+" duration={2.5} delay={0.2} />
              </div>
              <div className="text-sm text-gray-600">{t('home.hero.stats.investments')}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-moh-green">
                <AnimatedCounter value={40} suffix="+" duration={2.5} delay={0.4} />
              </div>
              <div className="text-sm text-gray-600">{t('home.hero.stats.challenges')}</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements - Keep existing animations */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
      
      <motion.div className="hidden md:block absolute -bottom-16 -right-16 w-64 h-64 bg-moh-lightGreen rounded-full opacity-30 blur-xl" animate={{
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.4, 0.3]
    }} transition={{
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse"
    }}></motion.div>
      
      <motion.div className="hidden md:block absolute -top-16 -left-16 w-48 h-48 bg-moh-lightGold rounded-full opacity-30 blur-xl" animate={{
      scale: [1, 1.15, 1],
      opacity: [0.3, 0.5, 0.3]
    }} transition={{
      duration: 7,
      repeat: Infinity,
      repeatType: "reverse"
    }}></motion.div>
      
      <motion.div className="hidden lg:block absolute top-1/4 right-16 w-24 h-24 bg-moh-gold rounded-full opacity-20 blur-md" animate={{
      x: [0, 10, 0, -10, 0],
      y: [0, 15, 0, -15, 0]
    }} transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror"
    }}></motion.div>
      
      <motion.div className="hidden lg:block absolute bottom-1/4 left-16 w-24 h-24 bg-moh-green rounded-full opacity-20 blur-md" animate={{
      x: [0, -15, 0, 15, 0],
      y: [0, -10, 0, 10, 0]
    }} transition={{
      duration: 12,
      repeat: Infinity,
      repeatType: "mirror"
    }}></motion.div>
    </section>;
}