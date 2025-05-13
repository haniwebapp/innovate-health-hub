
import { useEffect, useState, RefObject } from "react";
import { Heart, Pill, Beaker, Thermometer } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const useHealthcareAnimation = (containerRef: RefObject<HTMLDivElement>) => {
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
  }, [containerRef]);
  
  // Updated icon colors to only use MOH green and gold variants
  const iconColors = {
    heart: {
      icon: Heart,
      color: "#00814A" // MOH green
    },
    pill: {
      icon: Pill,
      color: "#C3A86B" // MOH gold
    },
    beaker: {
      icon: Beaker,
      color: "#00814A" // MOH green
    },
    thermometer: {
      icon: Thermometer,
      color: "#C3A86B" // MOH gold
    }
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

  return {
    isVisible,
    iconColors,
    networkData,
    statistics
  };
};
