
import { motion } from "framer-motion";
import { CircleDollarSign, Shield, Lightbulb, Handshake } from "lucide-react";

export default function MarketplaceHero() {
  return (
    <section className="bg-gradient-to-r from-moh-green to-moh-darkGreen py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Innovation Marketplace
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover breakthrough healthcare innovations ready for licensing and commercialization
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition duration-300">
            <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Lightbulb size={28} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Discover Innovations</h3>
            <p className="text-white/80">Find cutting-edge healthcare solutions to address industry challenges</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition duration-300">
            <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Shield size={28} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Protected IP</h3>
            <p className="text-white/80">Access innovations with comprehensive intellectual property protection</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition duration-300">
            <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Handshake size={28} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Licensing Options</h3>
            <p className="text-white/80">Flexible licensing terms to meet your commercialization needs</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition duration-300">
            <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CircleDollarSign size={28} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">ROI Potential</h3>
            <p className="text-white/80">Innovations with validated market potential and clear ROI forecasts</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
