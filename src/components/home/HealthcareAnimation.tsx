
import { useEffect, useState, useRef } from "react";
import { Heart, Pill, Beaker, Thermometer } from "lucide-react";
import { NetworkVisualization } from "./healthcare/NetworkVisualization";
import { FloatingIcon } from "./healthcare/FloatingIcon";
import { DataParticle } from "./healthcare/DataParticle";
import { StatisticDisplay } from "./healthcare/StatisticDisplay";
import { SectionHeading } from "./healthcare/SectionHeading";

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
  
  const iconColors = {
    heart: "#ea384c",
    pill: "#9b87f5",
    beaker: "#33C3F0",
    thermometer: "#4AAF46"
  };
  
  const statistics = [
    { label: "Improved Outcomes", value: "87%" },
    { label: "Innovation Success", value: "92%" },
    { label: "Patient Satisfaction", value: "96%" }
  ];
  
  return (
    <section 
      ref={containerRef}
      className="py-16 bg-gradient-to-r from-moh-lightGreen/30 via-white to-moh-lightGold/30 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Revolutionizing Healthcare with"
          description="Our platform connects innovators, healthcare providers, and patients to create a healthier future for all"
          isVisible={isVisible}
        />
        
        <div className="relative h-80 md:h-96 mb-10">
          <NetworkVisualization isVisible={isVisible} />
          
          <FloatingIcon 
            icon={Heart}
            color={iconColors.heart}
            position={{
              top: "10px",
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
              left: "33%",
              transform: "translateX(-50%)"
            }}
            animationDelay={1}
            isVisible={isVisible}
          />
          
          <FloatingIcon 
            icon={Thermometer}
            color={iconColors.thermometer}
            position={{
              bottom: "10px",
              right: "33%",
              transform: "translateX(50%)"
            }}
            animationDelay={1.5}
            isVisible={isVisible}
          />
          
          {Array.from({ length: 8 }).map((_, index) => (
            <DataParticle key={index} index={index} isVisible={isVisible} />
          ))}
        </div>
        
        <StatisticDisplay statistics={statistics} isVisible={isVisible} />
      </div>
    </section>
  );
}
