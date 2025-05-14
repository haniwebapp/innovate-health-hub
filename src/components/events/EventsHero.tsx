
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";

export default function EventsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-moh-green via-moh-darkGreen to-moh-green text-white">
      {/* Background decoration elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-moh-gold blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-moh-lightGold blur-3xl"></div>
        <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-moh-darkGreen blur-3xl"></div>
      </div>
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop" 
          alt="Healthcare professionals at a conference" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-moh-darkGreen/90 to-moh-darkGreen/70"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1 rounded-full bg-moh-green/30 text-moh-lightGreen text-sm font-medium"
          >
            Connect & Learn
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Healthcare <span className="text-transparent bg-clip-text bg-gradient-to-r from-moh-gold to-moh-lightGold">Innovation Events</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-moh-lightGreen/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Connect with healthcare innovators, investors, and policymakers at our events focused on transforming healthcare in Saudi Arabia through innovation and collaboration.
          </motion.p>
          
          <motion.div
            className="flex justify-center items-center gap-8 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-moh-gold mr-2" />
              <span className="text-lg text-moh-lightGreen/90">30+ Events Annually</span>
            </div>
            <div className="flex items-center">
              <Users className="h-6 w-6 text-moh-gold mr-2" />
              <span className="text-lg text-moh-lightGreen/90">10,000+ Attendees</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}
