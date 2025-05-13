
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Globe } from "lucide-react";

export default function EventsHero() {
  return (
    <div className="bg-gradient-to-br from-moh-green/90 to-moh-green text-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Healthcare Innovation Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Connect, learn, and collaborate with healthcare innovators through webinars, 
            workshops, conferences, and networking opportunities.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center">
            <div className="bg-white/20 p-3 rounded-full">
              <Calendar className="h-7 w-7" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg">Upcoming Events</h3>
              <p>Webinars, workshops & more</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-white/20 p-3 rounded-full">
              <Users className="h-7 w-7" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg">Expert Speakers</h3>
              <p>Industry leaders & innovators</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-white/20 p-3 rounded-full">
              <Globe className="h-7 w-7" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg">Global & Local</h3>
              <p>Virtual & in-person options</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
