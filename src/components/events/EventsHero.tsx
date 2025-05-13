
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { WaveDivider } from "@/components/animations/WaveDivider";
import { GradientOrbs } from "@/components/home/hero/animations/GradientOrbs";
import { FloatingParticles } from "@/components/home/hero/animations/FloatingParticles";
import { CircuitPattern } from "@/components/home/hero/animations/CircuitPattern";
import { DNAHelixAnimations } from "@/components/home/hero/animations/DNAHelixAnimations";
import Lottie from "lottie-react";
import healthAnimation from "@/assets/animations/health-innovation-anim.json";

export default function EventsHero() {
  return (
    <div className="relative bg-moh-green text-white pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <GradientOrbs />
        <FloatingParticles />
        <CircuitPattern />
        <DNAHelixAnimations />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 min-h-[60vh] lg:min-h-[50vh]">
          {/* Text content */}
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Healthcare Innovation Events
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl opacity-90 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Connect, learn, and collaborate with healthcare innovators through
              webinars, workshops, conferences, and networking opportunities.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-white text-moh-green hover:bg-white/90 hover:text-moh-darkGreen transition-colors"
                asChild
              >
                <Link to="#upcoming">View All Events</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                asChild
              >
                <Link to="/dashboard/collaboration/events">My Events</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Animation */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-80 h-80">
              <Lottie 
                animationData={healthAnimation} 
                loop={true} 
                className="w-full h-full"
              />
              <motion.div
                className="absolute inset-0 bg-moh-green/10 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 20px 10px rgba(0,129,74,0.3)",
                    "0 0 40px 20px rgba(0,129,74,0.2)",
                    "0 0 20px 10px rgba(0,129,74,0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Feature icons */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 -mb-8">
          <motion.div
            className="flex items-center gap-4 backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
        <WaveDivider color="#ffffff" />
      </div>
    </div>
  );
}
