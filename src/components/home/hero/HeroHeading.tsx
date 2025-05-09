
import { useRef } from "react";
import { TextReveal } from "@/components/animations/TextReveal";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";

export function HeroHeading() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Using direct text instead of translations
  const taglineGradient = "Empowering Health Innovation";
  const taglineDark = "for a Better Tomorrow";
  
  return (
    <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
      <div className="flex flex-row justify-center items-start py-0">
        <div className="mr-4">
          <TextReveal 
            text={taglineGradient} 
            className="text-gradient bg-gradient-to-r from-moh-green to-moh-gold bg-clip-text text-transparent block" 
            delay={0.6} 
            staggerDelay={0.05} 
            splitBy="words" 
          />
          <TextReveal 
            text={taglineDark} 
            className="text-moh-darkGreen block mt-2" 
            delay={1} 
            staggerDelay={0.04} 
            splitBy="words" 
          />
        </div>
        
        <ArabicVerticalText text="2030" className="mr-4" delay={0.5} />
      </div>
    </h1>
  );
}
