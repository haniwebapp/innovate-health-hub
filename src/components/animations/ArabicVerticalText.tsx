
import { motion } from "framer-motion";

interface ArabicVerticalTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function ArabicVerticalText({ text, className = "", delay = 0 }: ArabicVerticalTextProps) {
  // Split text into characters
  const characters = text.split("");

  // Words grouping by spaces to create "snap" effect by words
  const wordsGroups: string[][] = [];
  let currentGroup: string[] = [];
  
  characters.forEach(char => {
    if (char === " ") {
      if (currentGroup.length > 0) {
        wordsGroups.push([...currentGroup]);
        currentGroup = [];
      }
      // Adding space as a separate character in its own group
      wordsGroups.push([char]);
    } else {
      currentGroup.push(char);
    }
  });

  // Push the final group if it exists
  if (currentGroup.length > 0) {
    wordsGroups.push(currentGroup);
  }

  // Animation variants for characters
  const containerVariants = {
    hidden: {
      opacity: 1
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay + 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Special animation for word groups - this creates the "snap" effect
  const wordGroupVariants = {
    hidden: {
      opacity: 0
    },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: delay + 0.5 + i * 0.5 // Staggered delay between word groups
      }
    })
  };

  const defaultClasses = "text-3xl md:text-4xl lg:text-5xl font-bold text-moh-green";

  return (
    <motion.div 
      className={`inline-flex flex-col items-center justify-center mx-2 ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {wordsGroups.map((group, groupIndex) => (
        <motion.div 
          key={`group-${groupIndex}`} 
          className="flex flex-col items-center" 
          custom={groupIndex} 
          variants={wordGroupVariants}
        >
          {group.map((char, charIndex) => (
            <motion.div
              key={`${groupIndex}-${charIndex}`}
              className={defaultClasses}
              variants={itemVariants}
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}
