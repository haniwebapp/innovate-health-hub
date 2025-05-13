
import { useEffect, useState, useRef } from "react";
import { Heart, Pill, Beaker, Thermometer, ChevronRight } from "lucide-react";
import { NetworkVisualization } from "./healthcare/NetworkVisualization";
import { FloatingIcon } from "./healthcare/FloatingIcon";
import { DataParticle } from "./healthcare/DataParticle";
import { StatisticDisplay } from "./healthcare/StatisticDisplay";
import { SectionHeading } from "./healthcare/SectionHeading";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
          
          // Show a welcome toast when the section becomes visible
          setTimeout(() => {
            toast({
              title: "Healthcare Innovation Hub",
              description: "Discover how our platform is transforming healthcare",
              duration: 5000,
            });
          }, 1000);
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
  
  const iconColors = {
    heart: "#ea384c",
    pill: "#9b87f5",
    beaker: "#33C3F0",
    thermometer: "#4AAF46"
  };
  
  // Sample data for the network - in a real app, this would come from an API or Supabase
  const networkData = {
    nodes: [
      { id: 'node1', activity: 85, size: 1.2 },
      { id: 'node2', activity: 60, size: 0.9 },
      { id: 'node3', activity: 75, size: 1.1 },
      { id: 'node4', activity: 45, size: 0.8 }
    ],
    connections: [
      { source: 'node1', target: 'node2', strength: 80, dataFlow: 65 },
      { source: 'node3', target: 'node4', strength: 60, dataFlow: 40 }
    ],
    activityLevel: 72 // Overall network activity level (0-100)
  };
  
  // Enhanced statistics with trend indicators
  const statistics = [
    { 
      label: "Improved Outcomes", 
      value: "87%",
      previousValue: "73%",
      trend: "up" as const,
      importance: "high" as const
    },
    { 
      label: "Innovation Success", 
      value: "92%",
      previousValue: "85%", 
      trend: "up" as const,
      importance: "medium" as const
    },
    { 
      label: "Patient Satisfaction", 
      value: "96%",
      previousValue: "91%",
      trend: "up" as const,
      importance: "high" as const
    },
    { 
      label: "Cost Reduction", 
      value: "41%",
      previousValue: "35%",
      trend: "up" as const,
      importance: "medium" as const
    }
  ];
  
  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 bg-white overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-0 w-40 h-40 rounded-full bg-moh-green/5"
          initial={{ opacity: 0 }}
          animate={isVisible ? { 
            opacity: 1,
            x: [0, 10, 0],
            y: [0, -10, 0],
            transition: { 
              opacity: { duration: 1 },
              x: { 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse" 
              },
              y: { 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }
            }
          } : {}}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-moh-gold/5"
          initial={{ opacity: 0 }}
          animate={isVisible ? { 
            opacity: 1,
            x: [0, -15, 0],
            y: [0, 10, 0],
            transition: { 
              opacity: { duration: 1 },
              x: { 
                duration: 12, 
                repeat: Infinity,
                repeatType: "reverse" 
              },
              y: { 
                duration: 9, 
                repeat: Infinity,
                repeatType: "reverse" 
              }
            }
          } : {}}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Revolutionizing Healthcare with"
          description="Our platform connects innovators, healthcare providers, and patients to create a healthier future for all through technology, collaboration, and breakthrough innovations."
          isVisible={isVisible}
        />
        
        <div className="relative h-80 md:h-96 lg:h-[28rem] mb-16 max-w-4xl mx-auto">
          {/* Data-driven network visualization */}
          <NetworkVisualization 
            isVisible={isVisible} 
            nodes={networkData.nodes}
            connections={networkData.connections}
            activityLevel={networkData.activityLevel}
          />
          
          <FloatingIcon 
            icon={Heart}
            color={iconColors.heart}
            position={{
              top: "10%",
              left: "25%",
              transform: "translateX(-50%)"
            }}
            animationDelay={0}
            isVisible={isVisible}
            pulseIntensity="high"
          />
          
          <FloatingIcon 
            icon={Pill}
            color={iconColors.pill}
            position={{
              top: "25%",
              right: "25%",
              transform: "translateX(50%)"
            }}
            animationDelay={0.5}
            isVisible={isVisible}
            pulseIntensity="medium"
          />
          
          <FloatingIcon 
            icon={Beaker}
            color={iconColors.beaker}
            position={{
              bottom: "25%",
              left: "30%",
              transform: "translateX(-50%)"
            }}
            animationDelay={1}
            isVisible={isVisible}
            pulseIntensity="high"
          />
          
          <FloatingIcon 
            icon={Thermometer}
            color={iconColors.thermometer}
            position={{
              bottom: "15%",
              right: "30%",
              transform: "translateX(50%)"
            }}
            animationDelay={1.5}
            isVisible={isVisible}
            pulseIntensity="medium"
          />
          
          {/* Data particles with increased count and varied speeds */}
          {Array.from({ length: 12 }).map((_, index) => (
            <DataParticle 
              key={index} 
              index={index} 
              isVisible={isVisible} 
              speed={index % 3 === 0 ? 'fast' : index % 3 === 1 ? 'normal' : 'slow'}
              size={index % 3 === 0 ? 'small' : index % 3 === 1 ? 'normal' : 'large'}
            />
          ))}
        </div>
        
        {/* Data-driven statistics */}
        <StatisticDisplay statistics={statistics} isVisible={isVisible} />
        
        {/* Add a CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-moh-green to-moh-darkGreen text-white rounded-md font-medium flex items-center gap-2 mx-auto"
            onClick={() => {
              toast({
                title: "Explore Healthcare Innovations",
                description: "Redirecting to our innovation showcase",
                duration: 3000,
              });
            }}
          >
            Explore Healthcare Solutions
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
        
        {/* Data activity indicators */}
        <div className="mt-8 flex justify-center">
          <motion.div 
            className="flex gap-2 items-center text-xs text-gray-500 bg-white/80 px-3 py-1 rounded-full shadow-sm"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <span>Data Activity</span>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-3 rounded-full ${
                  i < Math.ceil(networkData.activityLevel / 20) ? 'bg-moh-green' : 'bg-gray-200'
                }`}
                animate={
                  i < Math.ceil(networkData.activityLevel / 20) ? {
                    scaleY: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  } : {}
                }
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
