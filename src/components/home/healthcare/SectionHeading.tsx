
import { motion } from "framer-motion";
import { Pill } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  description: string;
  isVisible: boolean;
}

export function SectionHeading({ title, description, isVisible }: SectionHeadingProps) {
  const titleWords = title.split(" ");
  
  return (
    <div className="text-center mb-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 mb-2 bg-moh-lightGreen/60 rounded-full px-4 py-1"
      >
        <Pill className="w-4 h-4 text-moh-green" />
        <span className="text-sm font-medium text-moh-darkGreen">Healthcare Innovation</span>
      </motion.div>
      
      <div className="overflow-hidden">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-moh-darkGreen flex flex-wrap justify-center gap-x-2"
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: i * 0.1, duration: 0.6 }
              } : { opacity: 0, y: 20 }}
            >
              {word}
              {i === titleWords.length - 2 && (
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-moh-green to-moh-gold ml-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: titleWords.length * 0.1, duration: 0.5 }
                  } : { opacity: 0, scale: 0.9 }}
                >
                  Innovation
                </motion.span>
              )}
            </motion.span>
          ))}
        </motion.h2>
      </div>
      
      <motion.div
        initial={{ width: 0 }}
        animate={isVisible ? { width: "80px" } : { width: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="h-1 bg-gradient-to-r from-moh-gold to-moh-green mx-auto my-4 rounded-full"
      />
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-4 text-gray-700 max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
}
