
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventsHero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-moh-darkGreen via-moh-green to-moh-green/90"></div>
      
      {/* Background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Healthcare Innovation Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Connect, learn, and collaborate with healthcare innovators through webinars, 
            workshops, conferences, and networking opportunities.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-2">
            <Button className="bg-white text-moh-darkGreen hover:bg-white/90">
              View All Events
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Submit Event
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center group">
            <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-all">
              <Calendar className="h-7 w-7" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg text-white">Upcoming Events</h3>
              <p className="text-white/80">Webinars, workshops & more</p>
            </div>
          </div>
          
          <div className="flex items-center group">
            <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-all">
              <Users className="h-7 w-7" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg text-white">Expert Speakers</h3>
              <p className="text-white/80">Industry leaders & innovators</p>
            </div>
          </div>
          
          <div className="flex items-center group">
            <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-all">
              <Globe className="h-7 w-7" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg text-white">Global & Local</h3>
              <p className="text-white/80">Virtual & in-person options</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <ChevronDown className="h-6 w-6 text-white/80 animate-bounce" />
        </motion.div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" 
                fill="currentColor" 
                className="text-white">
          </path>
        </svg>
      </div>
    </div>
  );
}
