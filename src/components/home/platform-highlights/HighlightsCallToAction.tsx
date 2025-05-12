
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HighlightsCallToAction() {
  return (
    <motion.div
      className="mt-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="inline-flex flex-wrap justify-center gap-6">
        <Button 
          className="bg-gradient-to-r from-moh-green to-moh-darkGreen text-white px-8 py-3 rounded-md font-medium hover:shadow-lg transition-all group"
          asChild
        >
          <Link to="/features">
            <span>Explore All Features</span>
            <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
        
        <Button 
          variant="outline"
          className="border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen/20 px-8 py-3 rounded-md font-medium group"
          asChild
        >
          <Link to="/about" className="flex items-center">
            <span>Learn About Our Mission</span>
            <ExternalLink className="ml-1 h-4 w-4 transition-opacity duration-300 opacity-70 group-hover:opacity-100" />
          </Link>
        </Button>
      </div>
      
      {/* Feature stats counter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-8 mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div>
          <p className="text-2xl font-bold text-moh-green">7+</p>
          <p className="text-sm text-gray-600">Core Features</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-moh-gold">24/7</p>
          <p className="text-sm text-gray-600">Platform Access</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-moh-darkGreen">100%</p>
          <p className="text-sm text-gray-600">MOH Compliance</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
