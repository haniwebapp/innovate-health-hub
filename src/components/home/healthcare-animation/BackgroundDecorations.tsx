
import { motion } from "framer-motion";

interface BackgroundDecorationsProps {
  isVisible: boolean;
}

export const BackgroundDecorations = ({ isVisible }: BackgroundDecorationsProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-20 left-0 w-40 h-40 rounded-full bg-moh-green/5"
        initial={{ opacity: 0 }}
        animate={isVisible ? { 
          opacity: 1,
          x: [0, 10, 0],
          y: [0, -10, 0],
          transition: { 
            opacity: { duration: 1 },
            x: { 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            },
            y: { 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }
          }
        } : {}}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-moh-gold/5"
        initial={{ opacity: 0 }}
        animate={isVisible ? { 
          opacity: 1,
          x: [0, -15, 0],
          y: [0, 10, 0],
          transition: { 
            opacity: { duration: 1 },
            x: { 
              duration: 12, 
              repeat: Infinity,
              repeatType: "reverse" 
            },
            y: { 
              duration: 9, 
              repeat: Infinity,
              repeatType: "reverse" 
            }
          }
        } : {}}
      />
    </div>
  );
};
