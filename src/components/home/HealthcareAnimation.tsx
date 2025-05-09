
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Pill, Flask, Thermometer } from "lucide-react";

export default function HealthcareAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
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
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  const pulseVariant = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  const floatVariant = {
    float: (i: number) => ({
      y: [0, -15, 0],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    })
  };
  
  const iconColors = {
    heart: "#ea384c",
    pill: "#9b87f5",
    flask: "#33C3F0",
    thermometer: "#4AAF46"
  };
  
  const pathVariant = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { 
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  return (
    <section 
      ref={containerRef}
      className="py-16 bg-gradient-to-r from-moh-lightGreen/30 via-white to-moh-lightGold/30 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-moh-darkGreen"
          >
            Revolutionizing Healthcare with <span className="text-gradient">Innovation</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-gray-700 max-w-2xl mx-auto"
          >
            Our platform connects innovators, healthcare providers, and patients to create a healthier future for all
          </motion.p>
        </div>
        
        <div className="relative h-80 md:h-96 mb-10">
          {/* Central connection network */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64"
          >
            <svg viewBox="0 0 200 200" width="100%" height="100%" className="fill-none">
              {/* Network connections */}
              <motion.path 
                d="M100,20 L60,80 L100,180 L140,80 Z" 
                stroke="#E5DEFF"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <motion.path 
                d="M60,80 L140,80" 
                stroke="#D3E4FD"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              />
              
              {/* Animated path 1 */}
              <motion.path 
                d="M100,20 C130,50 130,150 100,180" 
                stroke="#9b87f5"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ 
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Animated path 2 */}
              <motion.path 
                d="M140,80 C110,50 110,150 60,80" 
                stroke="#33C3F0"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ 
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Central circle */}
              <motion.circle 
                cx="100" 
                cy="100" 
                r="20" 
                fill="#7E69AB"
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              
              <motion.circle 
                cx="100" 
                cy="100" 
                r="15" 
                fill="#6E59A5"
                animate={isVisible ? {
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </svg>
          </motion.div>
          
          {/* Floating Icons */}
          <motion.div 
            custom={0}
            animate={isVisible ? {
              y: [0, -15, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            } : {}}
            className="absolute top-10 left-1/4 transform -translate-x-1/2 bg-white p-3 md:p-4 rounded-full shadow-lg"
          >
            <motion.div 
              animate={isVisible ? {
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart className="w-6 h-6 md:w-8 md:h-8" style={{ color: iconColors.heart }} />
            </motion.div>
          </motion.div>
          
          <motion.div 
            custom={1}
            animate={isVisible ? {
              y: [0, -15, 0],
              transition: {
                duration: 3.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            } : {}}
            className="absolute top-1/4 right-1/4 transform translate-x-1/2 bg-white p-3 md:p-4 rounded-full shadow-lg"
          >
            <motion.div 
              animate={isVisible ? {
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Pill className="w-6 h-6 md:w-8 md:h-8" style={{ color: iconColors.pill }} />
            </motion.div>
          </motion.div>
          
          <motion.div 
            custom={2}
            animate={isVisible ? {
              y: [0, -15, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            } : {}}
            className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 bg-white p-3 md:p-4 rounded-full shadow-lg"
          >
            <motion.div 
              animate={isVisible ? {
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Flask className="w-6 h-6 md:w-8 md:h-8" style={{ color: iconColors.flask }} />
            </motion.div>
          </motion.div>
          
          <motion.div 
            custom={3}
            animate={isVisible ? {
              y: [0, -15, 0],
              transition: {
                duration: 4.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            } : {}}
            className="absolute bottom-10 right-1/3 transform translate-x-1/2 bg-white p-3 md:p-4 rounded-full shadow-lg"
          >
            <motion.div 
              animate={isVisible ? {
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Thermometer className="w-6 h-6 md:w-8 md:h-8" style={{ color: iconColors.thermometer }} />
            </motion.div>
          </motion.div>
          
          {/* Data nodes/particles */}
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute bg-moh-lightGold rounded-full w-2 h-2 md:w-3 md:h-3"
              style={{
                left: `${20 + (index * 8)}%`,
                top: `${40 + (Math.sin(index) * 30)}%`
              }}
              animate={isVisible ? {
                x: [0, 10, 0, -10, 0],
                y: [0, -10, 0, 10, 0],
                scale: [1, 1.2, 1, 0.8, 1],
                opacity: [0.6, 1, 0.6]
              } : {}}
              transition={{
                duration: 4,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Info stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center space-x-8 md:space-x-16"
        >
          {[
            { label: "Improved Outcomes", value: "87%" },
            { label: "Innovation Success", value: "92%" },
            { label: "Patient Satisfaction", value: "96%" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <motion.p 
                className="text-2xl md:text-3xl font-bold text-moh-green"
                animate={isVisible ? {
                  scale: [1, 1.2, 1],
                  transition: { delay: 1.2 + index * 0.2, duration: 0.8, repeat: 2, repeatType: "reverse" }
                } : {}}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
