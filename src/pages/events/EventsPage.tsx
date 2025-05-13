
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import EventsHero from "@/components/events/EventsHero";
import FeaturedEvents from "@/components/events/FeaturedEvents";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import PastEvents from "@/components/events/PastEvents";
import EventsFilter from "@/components/events/EventsFilter";
import { CircuitPattern } from "@/components/home/hero/animations/CircuitPattern";
import { FloatingParticles } from "@/components/home/hero/animations/FloatingParticles";
import { GradientOrbs } from "@/components/home/hero/animations/GradientOrbs";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-moh-lightGreen/20 flex flex-col">
      <Navbar />
      
      {/* Main content with background decorations */}
      <div className="relative flex-grow overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <FloatingParticles />
          <CircuitPattern />
          <GradientOrbs />
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          <EventsHero />
          
          <div className="container mx-auto px-4 py-12 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <EventsFilter />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <FeaturedEvents />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-16"
            >
              <UpcomingEvents />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <PastEvents />
            </motion.div>
            
            {/* Events page footer section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 p-8 rounded-xl bg-gradient-to-br from-moh-green/5 to-moh-green/10 border border-moh-green/10 text-center"
            >
              <h3 className="text-2xl font-bold text-moh-darkGreen mb-2">Want to host an event?</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Partner with us to host workshops, webinars, or conferences. 
                Reach healthcare innovators and connect with industry experts.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-moh-green text-white px-6 py-2.5 rounded-md font-medium hover:bg-moh-darkGreen transition-colors"
                >
                  Submit Event Proposal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-moh-gold text-white border border-moh-gold px-6 py-2.5 rounded-md font-medium hover:bg-moh-darkGold transition-colors"
                >
                  Learn About Partnerships
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
