
import { motion } from "framer-motion";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";

interface BackgroundDecorationsProps {
  verticalTexts: string[];
}

export function BackgroundDecorations({ verticalTexts }: BackgroundDecorationsProps) {
  return (
    <>
      {/* Vertical text decorations */}
      <div className="absolute top-10 left-10 hidden xl:block">
        <ArabicVerticalText text="الابتكار" className="text-moh-green/5" delay={0.5} />
      </div>
      
      <div className="absolute bottom-10 right-10 hidden xl:block">
        <ArabicVerticalText text="الصحة" className="text-moh-gold/5" delay={0.7} />
      </div>
      
      {/* English vertical text */}
      <div className="hidden lg:flex absolute top-20 right-10 flex-col items-center">
        {verticalTexts.map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.07, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
            className="text-2xl font-bold text-moh-darkGreen tracking-widest"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {text}
          </motion.div>
        ))}
      </div>
      
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-16 h-16 opacity-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1, rotate: 45 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="absolute inset-0 border-2 border-moh-gold rounded-md" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-[15%] w-20 h-20 opacity-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="absolute inset-0 border-2 border-moh-green rounded-full" />
      </motion.div>
      
      {/* Animated particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-moh-green/20"
          initial={{ 
            x: Math.random() * 100 + 50, 
            y: Math.random() * 500,
            opacity: 0
          }}
          animate={{
            y: [0, -300],
            opacity: [0, 0.5, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 10 + (i * 2),
            repeat: Infinity,
            delay: i * 2
          }}
        />
      ))}
    </>
  );
}
