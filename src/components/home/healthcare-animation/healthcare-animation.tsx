
import React from "react";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Lottie from "lottie-react";
import healthInnovationAnim from "@/assets/animations/health-innovation-anim.json";

export default function HealthcareAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-full"
    >
      <AspectRatio ratio={16/9} className="bg-gradient-to-br from-moh-lightGreen to-white/50 rounded-lg shadow-md overflow-hidden">
        <div className="w-full h-full flex items-center justify-center p-4">
          <Lottie
            animationData={healthInnovationAnim}
            loop={true}
            className="w-full h-full"
          />
        </div>
      </AspectRatio>
    </motion.div>
  );
}
