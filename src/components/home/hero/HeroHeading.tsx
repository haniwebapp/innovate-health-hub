
import { useRef } from "react";
import { TextReveal } from "@/components/animations/TextReveal";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useAnimation } from "@/components/animations/AnimationProvider";

export function HeroHeading() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { animationsEnabled } = useAnimation();
  
  // Motion values for interactive gradient
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15 });

  // Transform mouse position to gradient position
  const gradientX = useTransform(springX, [-100, 100], [0, 100]);
  const gradientY = useTransform(springY, [-100, 100], [0, 100]);
  
  // Handle mouse move to update gradient position
  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!animationsEnabled) return;
    
    const rect = titleRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Updated to match exact tagline from requirements
  const taglineGradient = "Empowering Health Innovation";
  const taglineDark = "for a Better Tomorrow";
  
  return (
    <h1 
      ref={titleRef} 
      className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 tracking-tight cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <div className="flex flex-row justify-center items-start py-0">
        <div className="relative z-10">
          {/* Interactive gradient element */}
          {animationsEnabled && (
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-moh-green/20 to-moh-gold/20 rounded-lg filter blur-xl opacity-50 -z-10"
              style={{
                background: `radial-gradient(circle at ${gradientX.get()}% ${gradientY.get()}%, rgba(0, 129, 74, 0.3), rgba(195, 168, 107, 0.2), rgba(255, 255, 255, 0))`
              }}
            />
          )}
          
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
          
          {/* Add subtle highlight under the text */}
          <motion.div 
            className="h-1 bg-gradient-to-r from-moh-gold to-moh-green rounded-full mt-4 mx-auto" 
            initial={{ width: "0%" }} 
            animate={{ width: "80%" }} 
            transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
          />
        </div>
        
        {/* Arabic text element */}
        <div className="hidden md:block ml-5">
          <ArabicVerticalText text="الابتكار" />
        </div>
      </div>
    </h1>
  );
}
