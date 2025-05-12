
import { motion } from "framer-motion";

export function HeroLogo() {
  return (
    <motion.div 
      className="flex justify-center items-center mb-6"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative">
        <div className="p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-white/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div 
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-moh-green to-moh-darkGreen flex items-center justify-center"
                initial={{ rotate: -20, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.svg 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                >
                  <motion.path 
                    d="M12 4v16m-8-8h16" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  <motion.circle 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="white" 
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </motion.svg>
              </motion.div>
              
              {/* Animated pulse effect */}
              <motion.div 
                className="absolute inset-0 rounded-lg bg-moh-green"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 2
                }}
              />
            </div>
            
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg font-semibold text-moh-darkGreen"
            >
              Ministry of Health
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -bottom-2 -right-2 w-full h-full rounded-2xl border border-moh-gold/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
}
