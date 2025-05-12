
import { motion } from "framer-motion";

interface ArabicVerticalTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function ArabicVerticalText({ text, className = "", delay = 0 }: ArabicVerticalTextProps) {
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * 0.1,
        duration: 0.6,
        ease: [0.455, 0.03, 0.515, 0.955]
      }
    })
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {text.split("").map((char, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          className="font-arabic text-3xl text-moh-green/10 font-bold"
        >
          {char}
        </motion.div>
      ))}
    </div>
  );
}
