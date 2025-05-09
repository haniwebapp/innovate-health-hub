
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Beaker, Lightbulb, Target, Rocket, Award } from "lucide-react";
import { TimelineItem } from "@/components/animations/TimelineItem";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

export default function InnovationJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  
  const timelineItems = [
    {
      icon: <Lightbulb className="text-moh-gold w-6 h-6" />,
      title: t('home.journey.ideation.title', 'Ideation'),
      description: t('home.journey.ideation.description', 'Healthcare innovators submit their innovative ideas and concepts to address critical challenges.'),
    },
    {
      icon: <Beaker className="text-moh-green w-6 h-6" />,
      title: t('home.journey.development.title', 'Development'),
      description: t('home.journey.development.description', 'Selected innovations receive support to develop proof-of-concepts and functional prototypes.'),
    },
    {
      icon: <Target className="text-moh-darkGreen w-6 h-6" />,
      title: t('home.journey.validation.title', 'Validation'),
      description: t('home.journey.validation.description', 'Rigorous testing and validation ensures innovations meet healthcare standards and requirements.'),
    },
    {
      icon: <Rocket className="text-moh-darkGold w-6 h-6" />,
      title: t('home.journey.implementation.title', 'Implementation'),
      description: t('home.journey.implementation.description', 'Successful innovations are implemented in healthcare facilities across the kingdom.'),
    },
    {
      icon: <Award className="text-moh-gold w-6 h-6" />,
      title: t('home.journey.impact.title', 'Impact & Scale'),
      description: t('home.journey.impact.description', 'Proven innovations scale nationally and internationally to maximize healthcare impact.'),
    },
  ];
  
  return (
    <section className="py-20 bg-moh-lightGreen/30 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium mb-4">
            {t('home.journey.tag', 'Innovation Pathway')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-moh-darkGreen mb-4">
            {t('home.journey.title', 'The Innovation Journey')}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            {t('home.journey.description', 'From ideation to implementation, our structured process guides healthcare innovations to success.')}
          </p>
        </ScrollFadeIn>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative pb-10">
          {/* Vertical timeline line */}
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-moh-lightGreen"
            style={{ marginLeft: "-1px" }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Timeline items */}
          <div className="space-y-20">
            {timelineItems.map((item, index) => (
              <div key={index} className="relative">
                <TimelineItem 
                  isLeft={index % 2 === 0} 
                  index={index}
                >
                  <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="inline-flex items-center gap-2 mb-2">
                      {index % 2 === 0 && item.icon}
                      <h3 className="text-xl font-semibold text-moh-darkGreen">{item.title}</h3>
                      {index % 2 !== 0 && item.icon}
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </TimelineItem>
              </div>
            ))}
          </div>
          
          {/* End dot */}
          <motion.div 
            className="absolute left-1/2 bottom-0 w-5 h-5 rounded-full bg-moh-green -ml-2.5"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.5 }}
          >
            <motion.div 
              className="absolute inset-0 w-full h-full rounded-full bg-moh-green opacity-50"
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-moh-gold/10 blur-lg"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-moh-green/10 blur-lg"></div>
    </section>
  );
}
