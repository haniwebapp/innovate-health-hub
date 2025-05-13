
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { WaveDivider } from "@/components/animations/WaveDivider";

export default function EventsHero() {
  return (
    <div className="relative bg-moh-green text-white pb-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Healthcare Innovation Events
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Connect, learn, and collaborate with healthcare innovators through
            webinars, workshops, conferences, and networking opportunities.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button
              variant="default"
              size="lg"
              asChild
              className="bg-white text-moh-green hover:bg-white/90 hover:text-moh-darkGreen transition-colors"
            >
              <Link to="#upcoming">View All Events</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Link to="/dashboard/collaboration/events">My Events</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Feature icons */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 -mb-8">
          <motion.div
            className="flex items-center gap-4 backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Upcoming Events</h3>
              <p className="text-sm opacity-80">Webinars, workshops & more</p>
            </div>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-4 backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Expert Speakers</h3>
              <p className="text-sm opacity-80">Industry leaders & innovators</p>
            </div>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-4 backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Global & Local</h3>
              <p className="text-sm opacity-80">Virtual & in-person options</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full text-white" 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0 24L60 38C120 52 240 78 360 81.3C480 85 600 65 720 53.3C840 41 960 37 1080 48.7C1200 61 1320 89 1380 102.7L1440 118V0H0V24Z" 
            fill="currentColor" 
          />
        </svg>
      </div>
    </div>
  );
}
