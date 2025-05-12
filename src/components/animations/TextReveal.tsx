
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  splitBy?: "chars" | "words";
}

export const TextReveal = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  splitBy = "chars"
}: TextRevealProps) => {
  const [elements, setElements] = useState<string[]>([]);
  
  useEffect(() => {
    if (splitBy === "chars") {
      setElements(text.split(""));
    } else {
      setElements(text.split(" "));
    }
  }, [text, splitBy]);
  
  return (
    <span className={className}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          style={{ display: splitBy === "chars" ? "inline-block" : "inline" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerDelay,
            ease: [0.455, 0.03, 0.515, 0.955]
          }}
        >
          {element}
          {splitBy === "words" && index < elements.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
};
