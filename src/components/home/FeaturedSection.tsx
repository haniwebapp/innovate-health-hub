import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { WaveDivider } from "@/components/animations/WaveDivider";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
interface Stat {
  value: number;
  label: string;
  suffix: string;
}
interface SuccessStory {
  title: string;
  category: string;
  description: string;
  image: string;
}
export default function FeaturedSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, {
    once: true,
    margin: "-100px"
  });
  const carouselInView = useInView(carouselRef, {
    once: true,
    margin: "-100px"
  });
  const {
    language
  } = useLanguage();
  const stats: Stat[] = [{
    value: 325,
    label: "Active Innovators",
    suffix: "+"
  }, {
    value: 42,
    label: "Total Investment (SAR)",
    suffix: "M"
  }, {
    value: 18,
    label: "Solutions Launched",
    suffix: ""
  }, {
    value: 95,
    label: "Implementation Success Rate",
    suffix: "%"
  }];
  const successStories: SuccessStory[] = [{
    title: "AI-Powered Diagnostic Tool",
    category: "Digital Diagnostics",
    description: "An AI solution that helps radiologists detect abnormalities in medical images with 95% accuracy.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
  }, {
    title: "Smart Hospital Management System",
    category: "Healthcare Operations",
    description: "A comprehensive system that reduced administrative workload by 40% in 15 hospitals across the Kingdom.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80"
  }, {
    title: "Patient Engagement Platform",
    category: "Patient Experience",
    description: "A mobile platform that improved medication adherence by 60% for chronic disease patients.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
  }];
  useEffect(() => {
    // Animation for stats section
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);
  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % successStories.length);
  };
  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + successStories.length) % successStories.length);
  };
  return <section className="py-16 bg-white relative">
      <WaveDivider className="-mt-16" color="#ffffff" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
            Success Stories
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Discover how innovations on our platform are transforming healthcare delivery across Saudi Arabia.
          </p>
        </ScrollFadeIn>
        
        {/* Stats Counter Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => <ScrollFadeIn key={index} delay={0.2 * index} className="text-center group">
              <motion.div className="relative flex items-center justify-center" animate={statsInView ? {
            scale: [1, 1.1, 1],
            transition: {
              delay: 1 + index * 0.2,
              duration: 0.6,
              repeat: 2,
              repeatType: "reverse"
            }
          } : {}}>
                {/* Circular progress indicator */}
                <svg className="w-24 h-24 absolute" viewBox="0 0 100 100">
                  <motion.circle cx="50" cy="50" r="40" fill="none" strokeWidth="3" stroke="#E5F8EF" className="absolute" />
                  <motion.circle cx="50" cy="50" r="40" fill="none" strokeWidth="3" stroke="#00814A" strokeLinecap="round" initial={{
                pathLength: 0
              }} animate={statsInView ? {
                pathLength: stat.value / 100
              } : {}} transition={{
                duration: 2,
                delay: 0.5 + index * 0.2
              }} style={{
                pathLength: stat.value / 100,
                rotate: "-90deg",
                transformOrigin: "center"
              }} />
                </svg>
                
                {/* Value */}
                <div className="text-3xl font-bold text-moh-green">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} delay={0.5 + index * 0.2} />
                </div>
              </motion.div>
              <p className="text-gray-600 mt-2 py-[17px]">{stat.label}</p>
              
              {/* Animated particle burst on hover */}
              <motion.div className="absolute inset-0 pointer-events-none" initial="hidden" whileHover="visible" variants={{
            hidden: {
              opacity: 0
            },
            visible: {
              opacity: 1
            }
          }}>
                {[...Array(6)].map((_, i) => <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-moh-green/50" variants={{
              hidden: {
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0
              },
              visible: {
                x: (i % 2 ? 1 : -1) * (20 + i * 5),
                y: (i % 3 === 0 ? 1 : -1) * (15 + i * 5),
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                transition: {
                  duration: 1 + i * 0.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeOut"
                }
              }
            }} style={{
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%"
            }} />)}
              </motion.div>
            </ScrollFadeIn>)}
        </div>
        
        {/* Success Stories Carousel */}
        <div ref={carouselRef}>
          <ScrollFadeIn delay={0.3}>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-moh-darkGreen">Highlighted Success Stories</h3>
          </ScrollFadeIn>
          
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div className="flex" animate={{
              x: `-${activeSlide * 100}%`
            }} transition={{
              x: {
                type: "spring",
                stiffness: 300,
                damping: 30
              },
              duration: 0.5
            }}>
                {successStories.map((story, index) => <div key={index} className="min-w-full">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="h-64 md:h-auto overflow-hidden">
                            <motion.img src={story.image} alt={story.title} className="w-full h-full object-cover" whileHover={{
                          scale: 1.05
                        }} transition={{
                          duration: 0.5
                        }} />
                          </div>
                          <ScrollFadeIn delay={0.4 + index * 0.1} className="p-6 flex flex-col justify-center" direction="left">
                            <div className="text-sm font-medium text-moh-gold mb-2">
                              {story.category}
                            </div>
                            <h4 className="text-xl font-semibold text-moh-darkGreen mb-3">
                              {story.title}
                            </h4>
                            <p className="text-gray-700 mb-4">
                              {story.description}
                            </p>
                            <Button variant="outline" className="border-moh-green text-moh-green self-start group">
                              Read More
                              <motion.span className="inline-block ml-1" animate={{
                            x: [0, 3, 0]
                          }} transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 1
                          }}>
                                →
                              </motion.span>
                            </Button>
                          </ScrollFadeIn>
                        </div>
                      </CardContent>
                    </Card>
                  </div>)}
              </motion.div>
            </div>
            
            {/* Carousel Controls */}
            <motion.div className="flex justify-between mt-6" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.8,
            duration: 0.5
          }}>
              <div className="flex gap-2">
                {successStories.map((_, index) => <button key={index} onClick={() => setActiveSlide(index)} className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-moh-green' : 'bg-gray-300'}`} aria-label={`Go to slide ${index + 1}`} />)}
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={prevSlide} className="rounded-full w-10 h-10 hover:bg-moh-lightGreen hover:border-moh-green">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={nextSlide} className="rounded-full w-10 h-10 hover:bg-moh-lightGreen hover:border-moh-green">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <WaveDivider className="mt-16 rotate-180" color="#ffffff" />
    </section>;
}