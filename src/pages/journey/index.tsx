
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Navigation, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const JourneyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-moh-lightGreen/50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-70 rounded-full mb-4">
                  <Navigation className="h-6 w-6 text-moh-green mr-2" />
                  <span className="text-moh-darkGreen font-medium">Start Your Journey</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-moh-darkGreen">
                  Begin Your Healthcare Innovation Journey
                </h1>
                
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  Navigate the path to healthcare innovation success with our comprehensive resources, 
                  tools, and support system designed for Saudi Arabia's healthcare ecosystem.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen" asChild>
                    <Link to="/innovations/submit">Submit Your Innovation</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20" asChild>
                    <Link to="/challenges">Explore Challenges</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Placeholder for journey content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-moh-darkGreen">
              Your Innovation Pathway
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-moh-lightGreen/50 rounded-full flex items-center justify-center mb-4">
                  <span className="text-moh-green font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Ideation & Planning</h3>
                <p className="text-gray-600">Develop your healthcare innovation concept and outline your implementation strategy.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-moh-lightGreen/50 rounded-full flex items-center justify-center mb-4">
                  <span className="text-moh-green font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Development & Testing</h3>
                <p className="text-gray-600">Build your solution and test it with users to refine your approach and validate your concept.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-moh-lightGreen/50 rounded-full flex items-center justify-center mb-4">
                  <span className="text-moh-green font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-medium mb-3 text-moh-darkGreen">Scale & Impact</h3>
                <p className="text-gray-600">Implement your solution at scale and measure its impact on the Saudi healthcare ecosystem.</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button className="bg-moh-green hover:bg-moh-darkGreen" asChild>
                <Link to="/innovations/submit">
                  Start Your Innovation Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default JourneyPage;
