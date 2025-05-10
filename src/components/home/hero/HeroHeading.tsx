import { useRef } from "react";
import { TextReveal } from "@/components/animations/TextReveal";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";
import { motion } from "framer-motion";
export function HeroHeading() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Updated to match exact tagline from requirements
  const taglineGradient = "Empowering Health Innovation";
  const taglineDark = "for a Better Tomorrow";
  return <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 tracking-tight">
      <div className="flex flex-row justify-center items-start py-0">
        <div className="mr-4">
          <TextReveal text={taglineGradient} className="text-gradient bg-gradient-to-r from-moh-green to-moh-gold bg-clip-text text-transparent block" delay={0.6} staggerDelay={0.05} splitBy="words" />
          <TextReveal text={taglineDark} className="text-moh-darkGreen block mt-2" delay={1} staggerDelay={0.04} splitBy="words" />
          
          {/* Add subtle highlight under the text */}
          <motion.div className="h-1 bg-gradient-to-r from-moh-gold to-moh-green rounded-full mt-4 mx-auto" initial={{
          width: "0%"
        }} animate={{
          width: "80%"
        }} transition={{
          delay: 1.5,
          duration: 1.2,
          ease: "easeOut"
        }} />
        </div>
        
        
      </div>
    </h1>;
}