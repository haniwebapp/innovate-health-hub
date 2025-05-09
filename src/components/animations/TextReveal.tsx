import { useRef } from "react";
import { motion, useInView } from "framer-motion";
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "words" | "chars";
  staggerDelay?: number;
}
export function TextReveal({
  text,
  className = "",
  delay = 0,
  splitBy = "words",
  staggerDelay = 0.1
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-50px"
  });

  // Split text into words or characters
  const items = splitBy === "words" ? text.split(" ") : text.split("");
  return <div ref={ref} className={`overflow-hidden inline-block ${className}`}>
      <motion.div initial={{
      opacity: 1
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.5
    }} className="flex flex-wrap gap-x-2">
        {items.map((item, i) => <motion.span key={`${item}-${i}`} initial={{
        y: "100%",
        opacity: 0
      }} animate={inView ? {
        y: 0,
        opacity: 1
      } : {}} transition={{
        duration: 0.5,
        delay: delay + i * staggerDelay,
        ease: [0.215, 0.61, 0.355, 1] // easeOutCubic
      }} className="inline-block text-moh-darkGreen">
            {splitBy === "words" ? item : item === " " ? "\u00A0" : item}
            {splitBy === "words" && i < items.length - 1 ? "\u00A0" : ""}
          </motion.span>)}
      </motion.div>
    </div>;
}