
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
  
  const statistics = [
    { label: "Improved Outcomes", value: "87%" },
    { label: "Innovation Success", value: "92%" },
    { label: "Patient Satisfaction", value: "96%" },
    { label: "Cost Reduction", value: "41%" }
  ];
  
  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 bg-gradient-to-br from-moh-lightGreen/30 via-white to-moh-lightGold/30 overflow-hidden relative"
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
          <NetworkVisualization isVisible={isVisible} />
          
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
          />
          
          {/* Data particles with increased count for more visual impact */}
          {Array.from({ length: 12 }).map((_, index) => (
            <DataParticle key={index} index={index} isVisible={isVisible} />
          ))}
        </div>
        
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
      </div>
    </section>
  );
}
