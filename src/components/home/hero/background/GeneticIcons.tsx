
import { motion } from "framer-motion";
import { Dna, Atom, TestTube, Microscope } from "lucide-react";

interface GeneticIcon {
  Icon: React.ElementType;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

export function GeneticIcons() {
  // DNA and genetic icons with positions
  const geneticIcons: GeneticIcon[] = [
    { Icon: Dna, x: 15, y: 20, size: 24, color: 'rgba(0, 129, 74, 0.2)', duration: 18 },
    { Icon: Atom, x: 80, y: 35, size: 30, color: 'rgba(195, 168, 107, 0.2)', duration: 20 },
    { Icon: TestTube, x: 25, y: 70, size: 28, color: 'rgba(0, 129, 74, 0.25)', duration: 22 },
    { Icon: Microscope, x: 70, y: 75, size: 32, color: 'rgba(195, 168, 107, 0.25)', duration: 24 },
    { Icon: Dna, x: 45, y: 30, size: 20, color: 'rgba(0, 129, 74, 0.15)', duration: 25 },
    { Icon: Atom, x: 60, y: 60, size: 22, color: 'rgba(195, 168, 107, 0.15)', duration: 19 }
  ];

  return (
    <>
      {geneticIcons.map((item, index) => {
        const { Icon, x, y, size, color, duration } = item;
        return (
          <motion.div
            key={`icon-${index}`}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              color: color,
            }}
            animate={{
              y: [-5, 5, -5],
              rotate: [-5, 5, -5],
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </motion.div>
        );
      })}
    </>
  );
}
