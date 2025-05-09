
import { motion } from "framer-motion";

interface WaveDividerProps {
  inverted?: boolean;
  className?: string;
  color?: string;
}

export function WaveDivider({ 
  inverted = false, 
  className = "",
  color = "#F8F8F8" 
}: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <motion.svg 
        viewBox="0 0 1440 120" 
        className={`w-full ${inverted ? 'rotate-180' : ''}`}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.path
          fill={color}
          fillOpacity="1"
          d="M0,32L48,48C96,64,192,96,288,101.3C384,107,480,85,576,90.7C672,96,768,128,864,122.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,128L1392,128C1344,128,1248,128,1152,128C1056,128,960,128,864,128C768,128,672,128,576,128C480,128,384,128,288,128C192,128,96,128,48,128L0,128Z"
          initial={{ pathLength: 0, pathOffset: 1 }}
          whileInView={{ pathLength: 1, pathOffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </motion.svg>
    </div>
  );
}
