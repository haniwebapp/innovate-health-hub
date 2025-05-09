
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Beaker, Lightbulb, Target, Rocket, Award } from "lucide-react";
import { TimelineItem } from "@/components/animations/TimelineItem";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

export default function InnovationJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  
  // Sample data with hardcoded text instead of translation keys
  const timelineItems = [
    {
      icon: <Lightbulb className="text-moh-gold w-6 h-6" />,
      title: "Ideation Phase",
      description: "Gathering innovative ideas from healthcare professionals and entrepreneurs across the Kingdom",
      isActive: false,
      importance: 'high' as const,
      completionPercent: 100,
      duration: 3
    },
    {
      icon: <Beaker className="text-moh-green w-6 h-6" />,
      title: "Development",
      description: "Building prototypes and testing core functionality with stakeholder feedback",
      isActive: true, // Currently active phase
      importance: 'high' as const,
      completionPercent: 65,
      duration: 8
    },
    {
      icon: <Target className="text-moh-darkGreen w-6 h-6" />,
      title: "Validation",
      description: "Clinical trials and regulatory review to ensure safety and efficacy standards",
      isActive: false,
      importance: 'medium' as const,
      completionPercent: 15,
      duration: 5
    },
    {
      icon: <Rocket className="text-moh-darkGold w-6 h-6" />,
      title: "Implementation",
      description: "Scaling solutions across healthcare facilities and integrating with existing systems",
      isActive: false,
      importance: 'medium' as const,
      completionPercent: 0,
      duration: 10
    },
    {
      icon: <Award className="text-moh-gold w-6 h-6" />,
      title: "Impact Measurement",
      description: "Evaluating outcomes and optimizing solutions based on real-world performance data",
      isActive: false,
      importance: 'low' as const,
      completionPercent: 0,
      duration: 4
    },
  ];
  
  return (
    <section className="py-20 bg-moh-lightGreen/30 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium mb-4">
            Innovation Journey
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-moh-darkGreen mb-4">
            Healthcare Innovation Roadmap
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            Our structured approach to healthcare innovation ensures ideas are properly vetted, developed, and implemented across Saudi Arabia's healthcare system.
          </p>
          
          {/* Current phase indicator */}
          <div className="mt-6 inline-block px-4 py-2 bg-white rounded-full text-sm font-medium text-moh-green shadow-sm">
            Current Phase: {timelineItems.find(item => item.isActive)?.title || 'Planning'}
          </div>
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
                  isActive={item.isActive}
                  importance={item.importance}
                  duration={item.duration}
                >
                  <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="inline-flex items-center gap-2 mb-2">
                      {index % 2 === 0 && item.icon}
                      <h3 className="text-xl font-semibold text-moh-darkGreen">{item.title}</h3>
                      {index % 2 !== 0 && item.icon}
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                    
                    {/* Completion percent indicator */}
                    {item.completionPercent > 0 && (
                      <motion.div 
                        className="mt-2"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="grow h-1 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full ${
                                item.completionPercent > 80 ? 'bg-moh-green' :
                                item.completionPercent > 40 ? 'bg-moh-gold' :
                                'bg-moh-lightGold'
                              }`}
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${item.completionPercent}%` } : { width: 0 }}
                              transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600">
                            {item.completionPercent}%
                          </span>
                        </div>
                      </motion.div>
                    )}
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
