
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { GlassButton } from "@/components/ui/glassmorphism";

export function HeroButtons() {
  const { animationsEnabled } = useAnimation();

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-4"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
          }
        }
      }}
    >
      <motion.div
        whileHover={animationsEnabled ? { scale: 1.05, y: -2 } : undefined}
        whileTap={animationsEnabled ? { scale: 0.95 } : undefined}
      >
        <Button
          asChild
          size="lg"
          className={`bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white shadow-md hover:shadow-lg transition-all duration-300 px-6`}
        >
          <Link to="/innovations" className="flex items-center gap-2">
            Explore Innovations
            {animationsEnabled && (
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight size={18} />
              </motion.div>
            )}
            {!animationsEnabled && <ArrowRight size={18} />}
          </Link>
        </Button>
      </motion.div>

      <GlassButton variant="gold" className="px-6 py-2.5" whileHover={{ scale: 1.05 }}>
        <Link to="/about" className="flex items-center gap-2">
          About Platform
        </Link>
      </GlassButton>
    </motion.div>
  );
}
